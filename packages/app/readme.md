# Affilaite Core:

TODO: this readme will need updating and much of this content will eventually be migrated to 'Affilaite builder'

## What is Affilaite Core?

Affilate Core is the main template for rendering affiliate data through a series of react components. The repo is server side rendered with an express server. Content is configured via a CMS (hard-coded for now) and affilate data is provided and passed by the extractor service.

## Setting up core for an affiliate

- Extractor service needs to be set up (please refer to the extractor service repo for instuctions)
- `.env` file needs to be created (see example.env)
- `env.client.js` needs to be created (see example.env.client.js)

## Configurable content types

- Almost everything is configurable via the cms, the following common configurable examples are given below (this will be a growing list):

```javascript

  {
    // CTA / BUTTON
    cmsButtomProp: {
      primary: true,
      secondary: false,
      color: null /* reverts to theme settings unless color specifieid*/,
      bgColor: null,
      fullWidth: true,
      size: 'large',
      maxWidth: '500px',
    },

    // Copy / text
    cmsCopyTextProp: {
      mobile: { size: null, weight: 400, color: null, margin: '1em 0 0.8em 0' },
      tablet: { size: null, weight: 400, color: null, margin: '1em 0 0.8em 0' },
      desktop: { size: null, weight: 400, color: null, margin: '1em 0 0.8em 0' },
    }
  }
```

## Setting up development environemnt

- Copy the contents of example env and make an env file, for setting up secrets please refer to the google drive. Note the value of API_SECRET must be matched with extractor service for the two services to hook up to each other when testing e2e

- Install and run redis if it's not already: `brew install redis` then `redis-server`

## Setting up production environment

- Note for production see configured redis labs: https://app.redislabs.com/#/bdb/tabs/conf/9731417

## Running local

Running the core template in isloation can be achieved by pupulating the cache with dummy data, to do that
run the following commands (Note make sure we configure a redis key in .env, the flush and build scripts will only work against that key)

- Run `redis-server`
- Run `npm run build-mock-db` (first time to build db)
- Run `npm run dev`

## Running e2e locally with extractor-service (mock data, including first time set up)

- Running the full e2e application will require setting up a series of schemas & brands in Affiliate builder & extractor service. We should first define the data to be used in a mock cycle - this will require running extractor service to create the output data needed for core to render it. It's a good idea, to mimic the production version in terms of the brands used, but we shouldn't worry too much about having multiple pages as this will take a long time to crawl all these pages, possible several days. Instead we should try to define all of the categories, sections and brands, and we can just just define only one crawled page in the schema. Worth noting running this cycle will still take a fair amount of time. The basic steps are as follows:

- Set up all the brands and schemas in affiliate-builder (this can be found in the read me in builder)
- configure the 'multiple pages' in schemas to only be one page (ensure to run integration tests in builder to make sure URL's are valid)
- Run builder to construct an output (this should contain all the schemas for all the brands and categories)
- Copy the contents of the output into extractor-service/mocks/schema-mocks/real-mocks/
- Run `redis-server`
- It's not a bad idea to run `flush-mock-db`
- Run `npm run dev`
- In extractor service run `start-mock-cycle` (mock data will be used)
- wait for the cycle to run (checking slack for alerts and status checks, this may take a while)
- If everything went smoothly we should now have a local mocked db agasint the env name key we specified!
- This will now simulate a full e2e journey, make sure

## Setting up the production cycle

- todo!

## Testing extracts quickly with extractor-service

- It can be a little bit unproductive to wait for the mock journey to complete when running the extractor service, we can start firing batches manaully from extractor service to test the api for example. This can be done by following the same steps as above, but running `test-core-api` from extractor-service instead of `start-mock-cycle`

## Technical notes on how batching extracts works:

- See google drive batching notes: https://docs.google.com/document/d/12xTCq4I70nT7tCV6XBRFrsSLgFb1POUMiJCH4d3PrRo/edit
