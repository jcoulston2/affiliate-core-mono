import { getAffiliateSchema, getFullSchemaUrl, Logger } from '@affiliate-master/common';
import { validateUrl } from './helper';
import { mapSeries } from 'bluebird';
import { BUILD_DATA_OUTPUT } from '../constants/paths';

// Configure testOne to run only on brand (brand name prop), if setting this to null, the integration test
// will cycle through and validate all the brands. To run a target schema, the name must match
// the 'brand' property
const testOne = '';
let sampledSchemas;
let validationResults;
jest.setTimeout(1000000);

function getSchemaSamples(affilaiteSchemas) {
  const recordedBrands = [];
  return affilaiteSchemas.filter((schema) => {
    const { brand } = schema;
    const isNewSample = !recordedBrands.includes(brand);
    if (isNewSample) {
      recordedBrands.push(brand);
    }
    return isNewSample;
  });
}

async function validateSchemas() {
  const validation = validateUrl();
  await validation.setUpBrowser();
  const failedRequiredPlpData = [];
  const failedRequiredPdpData = [];
  await mapSeries(sampledSchemas, async (schema) => {
    const brand = schema.brand;
    if (testOne && brand !== testOne) return;

    const plpUrl = getFullSchemaUrl(schema);
    const plpParam = schema.extracts.topLevel;
    const pdpParam = schema.extracts.details;

    const { extractedDataItem: extractedDataPlp } = await validation.testSchema(
      plpParam,
      plpUrl,
      brand
    );
    let { link: crawledLink } = extractedDataPlp || {};
    const { domain } = schema;
    const link = Array.isArray(crawledLink) ? crawledLink[0] : crawledLink;
    const pdpCrawlUrl = link?.includes(domain) ? link : domain + link;

    if (!link) {
      failedRequiredPdpData.push('PDP crawl is undefined');
      return;
    }

    const { extractedDataItem: extractedDataPdp } = await validation.testSchema(
      pdpParam,
      pdpCrawlUrl,
      brand
    );

    const { name, price, nowPrice, link: extractedLink, image, tags } = extractedDataPlp;
    const { images: pdpImages } = extractedDataPdp;
    const hasRequiredPlpData =
      name?.length &&
      (price?.length || nowPrice?.length) &&
      extractedLink?.length &&
      image?.length &&
      tags?.length;
    const hasRequiredPdpData = pdpImages?.length && pdpImages[0];

    if (!hasRequiredPlpData) failedRequiredPlpData.push(brand);
    if (!hasRequiredPdpData) failedRequiredPdpData.push(brand);
  });

  await validation.closeSession();

  return { failedRequiredPlpData, failedRequiredPdpData };
}

beforeAll(async () => {
  const affilaiteSchemas = await getAffiliateSchema(BUILD_DATA_OUTPUT, 'json');
  sampledSchemas = getSchemaSamples(affilaiteSchemas);
  validationResults = await validateSchemas();
});

describe('For each section schema', () => {
  test('required PLP data is obtained', async () => {
    const { failedRequiredPlpData } = validationResults;
    if (failedRequiredPlpData.length) {
      failedRequiredPlpData.forEach((brand) =>
        Logger.publicLog(`:::::: VALIDATION PLP FAILED FOR ${brand}  ::::::`, 'red')
      );
    }

    expect(failedRequiredPlpData.length).toEqual(0);
  });

  test('required PDP data is obtained', async () => {
    const { failedRequiredPdpData } = validationResults;
    if (failedRequiredPdpData.length) {
      failedRequiredPdpData.forEach((brand) =>
        Logger.publicLog(`:::::: VALIDATION PDP FAILED FOR ${brand}  ::::::`, 'red')
      );
    }

    expect(failedRequiredPdpData.length).toEqual(0);
  });
});
