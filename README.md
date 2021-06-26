# Setting up repos

## Setup

- At root level: `npm i`
- `npm run boot`: this will bootstrap all the packages

## Common commands

- `npm run dev`: will run the Front End in dev mode on port 3000
- `npm run build-schemas`: builds schemas ready for crawling after defining config
- `npm run start-crawl`: will start a crawl

# Starting a scrape

When building a new project we'll need to define configuration in the `config/lib` package:

1. Define an exported array of categories and sections in `config/lib/affiliate-categories`.
2. Go to `builder/web-console/get-category-plps.js` and navigate to the desired affiliate home page
3. Now we need to get all the page links / category links for the scrape cycles. Each of these category links will sit inside
   a section e.g. 'mens' or 'womens'. We will need to modify the below object as follows (in terms of how to define URL page numbers, please refer to the main readme). In terms of looking at multiple pages for a given category - each page structure will be diffeent for each brand, some brands might have page numbers where others might have single listing pages with lazy loading etc, you can assume these will be governed by a URL structure e.g. `?page=2`. For this you will need to visit a PLP to obtain this structure and input in the object below. For lazy loading pages that don't have page numbers, you can comment out the multiple URL's property, the amount of products crawled in that case can be governed by the scroll page prop but we'll get to that later.

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

Next thing we'll need to do, we'll obtain the query selector for the page links - in most cases this will be an `<a>` tag so make sure to select it properly. We also need to key in the brand name:

```
var brand = 'gap';
var domain = 'https://www.gap.co.uk';
var anchorSelector = 'a.ListItemLink';
```

Sometimes you might end up pulling in a lot of links you don't (e.g. if you using a generic selector), so you will have to remove thiese a bit later but we'll get to that.

4. Run the script and if you defined the page link selector correct, we'll get something like this:

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

5. Next thing we have to do is run `npm run new-schema <BRAND>`, this will create a new directory in `config/lib/affiliate-data` with a schema.json with a template and blank categories.json. Copy the output from the console script and modify the category entry to match the appropriate category defined in point 1 (this is the manual bit).

6. Next thing we need to do is define our schema. Go to schema.json and start defining the relevant selectors. For this we will need to go to a PDP, we need to make sure are selectors are as specific as possible. Note for 'wasPrice' selectors, we will need to probably visit a sale page PLP.

7. There are a few test phases we will need to do. For the first phase, a good idea to make sure we've defined the schema with the relevent selectors, is to open up the web console in dev tools with the `test-scrape.js` script defined in the web-console directory. This is an emulation of the actual evaluation script with the extractor. Navigate to a PLP of choice and paste the script in the console. Go to your schema and call `testScrape` with the `topLevelData` object defined in the schema, for example:

```
testScrape({
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

8. Once we're happy with the console testing and we've added all our brands, we should see in the affiliate-data directory all the brand folders which include a schema.json and category.json, it's worth running through each created brand to make sure everything is correct. Next we need to run `npm run build-schemas`. This will create an `__affiliate-definitions__` and a `__static-paths__` folder in `packages/store` with all our brands and new directories for each category - this is the format needed and will be used for running the crawler extraction. Note for the build to output sucessfully, each category and section defined in a schema needs to match the categories and sections array lists defined in point 1. If these is a missmatch, an error will be thrown pointing to the category object that needs to be changed.

9. Before running the extractor run a simple builder integration test `npm run builder:test-e2e`. This will cycle through all our schema PLP URL's, check the URL is valid and also test our product tile selctor we define in our schemas. If we want to test one brand, we can modify the integration test file and change the variable `testOne` to the brand name of the schema. Sometimes a few fails are ok if it's a one off page that has no products. If we are finding that are the tests are failing for a given brand, we should go to the schema and check the URLs are properly defined and validate it via tesOne.

10. (OPTIONAL but worth doing so!) Now in `extractor-service` repo we'll need to set up our integration tests with our newly created brand schemas (this is manual for now as well)). Go to the `setUpMocks` file in the integration directory and define an object for each brand given below

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

11. The above should validate our schemas, we can also run an `npm run crawler:test-e2e` test on a single schema. This will run the real crawler process as a trial run. This is not a pass or fail test, just a manual indication that a brand will work. To do this, just place the desired brand folder within `packages/crawler/mocks/schema-mocks/real-mocks` and run `npm run crawler:test-e2e`

12. Once we're happy with our tests, we should be good to go with the extraction process. The amount of time taken for a full extraction will largly depend on the number of brand schemas and the amount of products in a page scrape. It's common for an extraction cycle to take 12 hours or longer with tens of thousands of products being collected on an over night scrape.

IMPORTANT - when running a scrape, make sure the laptop does not hibernate or sleep as this will cause a disruption in the process, so be sure to go to energy saver settings if needed. To kick off the process run `npm run start-crawl`

The extraction is integrated with slack, so be sure to check notifications on how many products were extracted and details about errors. Slack should give how many products are cralwed, the amount of time a scrape takes and how many products are marked as cautious (this is done in batching but we'll get to that later). Worth noting that the after a crawl, the the crawler calls the builder to create a `__predictive-search__` JSON, which will be used in the app.

13. Once we've dont he above, we should generate the site map for the app, go ahead and run `npm run gen-site-map`.

# Deployment

- the app is hosted in the vercel platform. Develop is hooked into the preview environment (we can call this staging even though technically it's not a staging env) and master is hooked into the production environment. To push to staging simple push to develop, and to deply to production, create a PR to merge develop into master. (https://vercel.com/fliik)

# More information on brands can be found here:

https://docs.google.com/document/d/1vYYjcFCb3vAScBtT14cGk_tS2e12opxZwr-04CIb6mI/edit

# Quick crawl cheatsheet (without testing)

1. Make a new branch for Core before starting (off develop)
2. turn of router for 15 minutes
3. Builder => If updating schemas: builder => `npm run build-schemas`
4. Extractor => `npm run start-crawl`
5. Core => If firt time scrape `gen-site-map` to gen the site map
6. Core => PR into develop (dev env)
7. Core => Develop into Master (prod env)
8. Chcek in vercel/fliik that it's deployed
