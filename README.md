# Setting up repos:

## Setup

- At root level: `npm i`
- `npm run boot`: this will bootstrap all the packages

## Common commands

- `npm run dev`: will run the Front End in dev mode on port 3000
- `npm run build-schemas`: builds schemas ready for crawling after defining config
- `npm run start-crawl`: will start a crawl

# Starting a scrape (detailed)

This is a step by step guide to running a crawl. For e2e instructions from crawling to deployment please refer to the `E2E - Crawl to deployment` section.

We'll need to define configuration in the `config/lib` package.

1. If we're setting up a new app for the first time and starting our first crawl, go to `packages/store/__store-cache__/store-cache.json` and ensure the following is defined in the file `{"store":""}`
2. Define an exported array of categories and sections in `config/lib/affiliate-categories`
3. Go to `builder/web-console/get-category-plps.js` and also navigate to the desired affiliate home page
4. Now we need to get all the page links / category links for the scrape cycles. Each of these category links will sit inside
   a section e.g. 'mens' or 'womens'. We will need to modify the below object as follows (in terms of how to define URL page numbers, please refer to the main readme). In terms of looking at multiple pages for a given category - each page structure will be different for each brand, some brands might have page numbers where others might have single listing pages with lazy loading etc, you can assume these will be governed by a URL structure e.g. `?page=2`. For this you will need to visit a PLP to obtain this structure and input in the object below. For lazy loading pages that don't have page numbers, you can comment out the multiple URL's properties, the number of products crawled, in that case, can be governed by the scroll page prop but we'll get to that later.

Note that we will need to run the script for each section desired.

```
var templateSchema = {
  section: 'mens',
  label: 'clothing',
  multipleUrls: {
    queryString: '?currentPage=',
    interval: 1,
    start: 1,
    end: 1,
  },
};
```

Next thing we'll need to do, we'll obtain the query selector for the page links - in most cases, this will be an `<a>` tag so make sure to select it properly. We also need to key in the brand name:

```
var brand = 'gap';
var domain = 'https://www.gap.co.uk';
var anchorSelector = 'a.ListItemLink';
```

Sometimes you might end up pulling in a lot of links you don't (e.g. if you using a generic selector), so you will have to remove these a bit later but we'll get to that.

5. Run the script and if you defined the page link selector correct, we'll get something like this:

```
{
  "meta": {
    "brand": "gap",
    "domain": "https://www.gap.co.uk"
  },
  "categories": [
    {
      "urls": ["/gap/women/clothing/jeans/?nav=hamnav:Women:Clothing:Jeans"],
      "category": "_____",
      "section": "womens",
      "label": "clothing"
    },
    {
      "urls": ["/gap/women/clothing/tees-and-tops/?nav=hamnav:Women:Clothing:Tees & Tops"],
      "category": "_____",
      "section": "womens",
      "label": "clothing"
    }
  ]
}

```

6. Next thing we have to do is run `npm run new-schema <BRAND>`, this will create a new directory in `config/lib/affiliate-data` with a schema.json with a template and blank categories.json. Copy the output from the console script and modify the category entry to match the appropriate category defined in point 1 (this is the manual bit).

7. Next thing we need to do is define our schema. Go to schema.json and start defining the relevant selectors. For this we will need to go to a PDP, we need to make sure are selectors are as specific as possible. Note for 'wasPrice' selectors, we will need to probably visit a sale page PLP.

8. There are a few test phases we will need to do. For the first phase, a good idea to make sure we've defined the schema with the relevant selectors, is to open up the web console in chrome dev tools. We'll make use of the `helpers/evaluation-helper-console.md` script, this is an emulation of the actual evaluation script with the extractor. Navigate to a PLP of choice and paste the script in the console. Go to your schema and call `evaluate` with the `topLevelData` object defined in the schema, for example:

```
evaluate({
  "scrollPage": true,
  "scrollPageWaitTime": 10000,
  ...,
  ...,
})
```

The response of that script will give a response like the below. If there are a lot of warnings or if we have no data, there's a chance there might be an incorrect selector. If there is data populated in the `data` prop, then this is good, but we should still check the data to make sure it's pulled in the expected information. Once we're happy with a PLP test scrape then we can try for a PDP, we can do exactly the same here but we can call testScrape with the `details` object, again, checking the data is correctly obtained and checking warnings. It is a good idea to check at least two different PLP and PDP pages.

```
{
  data: []
  debug: undefined,
  warnings: []
}
```

9. Once we're happy with the console testing and we've added all our brands, we should see in the affiliate-data directory all the brand folders which include a schema.json and category.json, it's worth running through each created brand to make sure everything is correct. Next, we need to run `npm run build-schemas`. This will create an `__affiliate-definitions__` and a `__static-paths__` folder in `packages/store` with all our brands and new directories for each category - this is the format needed and will be used for running the crawler extraction. Note for the build to output successfully, each category and section defined in a schema needs to match the categories and sections array lists defined in point 1. If there is a mismatch, an error will be thrown pointing to the category object that needs to be changed.

10. Before running the extractor we'll need to run our builder integration checks: `npm run builder:test-e2e`. This will cycle through all our schemas and crawl a PDP and PLP page. As this is going on, it's a good idea to have the terminal open so we can see the data being output for each crawl, this will help us debug in the case of a failed test. If there are any failures, this will be logged out in red at the end of the test. To pass, each schema must output some required core data, such as image, price, link etc. If this is passing, we can be pretty confident that our schemas are in a good place ready for the real crawl. Note the two points below use the actual crawler package, so for more integration testing, these can also be used if needed.

11. (OPTIONAL for more testing, but point 9 should suffice) In `crawler` package we'll need to set up our integration tests with our newly created brand schemas (this is manual for now as well). Go to the `setUpMocks` file in the integration directory and define an object for each brand given below

```
{
  brand: 'cos',
  domain: 'https://www.cosstores.com',
  plpExample: '/en_gbp/women/dresses/shirt-dresses.html',
  containerSelectorPlp: '#productContainer',
  pdpExample: '/en_gbp/women/womenswear/dresses/product.pleated-shirt-dress-blue.0973697001.html',
  containerSelectorPdp: '#pdpContainer',
  scrollPage: true,
}
```

NOTE: the brand name should match the schema brand name

Next run `pull-mocks` to fetch the pages for our integration tests. Now the painful part, running (and fixing) the integration tests. This will test the selectors we've defined in the schema and assert some data is extracted. Note only the brands defined in `setUpMocks` will be tested, so make sure all the brands are defined there. If a particular brand fails, sometimes it can be a little hard to find which one. In the test, the errors and warnings are logged to the terminal so this might help - in some cases we may have to manually go through each object defined in `setUpMocks` and test individually or by running the e2e given down below.

12. (OPTIONAL) The above should validate our schemas, we can also run an `npm run crawler:test-e2e` test on a single schema. This will run the real crawler process as a trial run. This is not a pass or fail test, just a manual indication that a brand will work. To do this, just place the desired brand folder within `packages/crawler/mocks/schema-mocks/real-mocks` and run `npm run crawler:test-e2e`

13. Once we're happy with our tests, we should be good to go with the extraction process. The amount of time taken for a full extraction will largly depend on the number of brand schemas and the number of products in a page scrape. It's common for an extraction cycle to take 12 hours or longer with tens of thousands of products being collected on an overnight scrape.

IMPORTANT - when running a scrape, make sure the laptop does not hibernate or sleep as this will cause a disruption in the process, so be sure to go to energy saver settings if needed. To kick off the process run `npm run start-crawl`

The extraction is integrated with slack, so be sure to check notifications on how many products were extracted and details about errors. Slack should give how many products are crawled, the amount of time a scrape takes and how many products are marked as cautious (this is done in batching but we'll get to that later). Worth noting that after a crawl, the crawler calls the builder to create a `__predictive-search__` JSON, which will be used in the app.

14. Once we've done the above, we should generate the site map for the app, go ahead and run `npm run gen-site-map`.

# Deployment

- the app is hosted in the vercel platform with a dev and production environment. `develop` branch points to dev env and `main` points to prod. It follows then that, to push to staging simply push to develop, and to deploy to production, create a PR to merge develop into main. (https://vercel.com/fliik).

For more info on Vercel including credentials and cloud info, please refer to https://docs.google.com/document/d/1mzPu9M2Tm6nJfRaX9jofhM604FqiNl-o-Qf5Ia9SZu8/edit

- For the monorepo deployment to work in vercel, a custom install command needs to be configured, please refer to the `docs/vercel-project-settings` image for more details

# More information on brands can be found here:

https://docs.google.com/document/d/1vYYjcFCb3vAScBtT14cGk_tS2e12opxZwr-04CIb6mI/edit

# E2E - Crawl to deployment

Detailed instructions on setting up a crawl are above, these make up many of the steps outlined below.

1. Make a new branch for Core before starting (off develop). And name it `release-mono-XX`
2. turn of router for 15 minutes and ensure no `Chromium` instances are already running your machine.
3. (temp) IF first time crawling, navigate to `store-cache.json` in packages/store and make sure the following is in that file `{"store":""}`
4. Builder => If updating schemas: builder => `npm run build-schemas`
5. Extractor => `npm run start-crawl`
6. Core => If first time scrape `gen-site-map` to gen the site map
7. Core => PR into develop (dev env)
8. Core => Develop into Main (prod env)
9. Check in vercel/fliik that it's deployed (more info on deployment in the `Deployment` section).
