import { getAffiliateSchema, validateUrl, getFullSchemaUrl } from '../helpers';
import { mapSeries } from 'bluebird';

// Configure testOne to run only on brand (brand name prop), if setting this to null, the integration test
// will cycle through and validate all the brands. To run a target schema, the name must match
// the 'brand' property
const testOne = '';
let affilaiteSchemas;
let validation;
jest.setTimeout(1000000);

async function validateUrls() {
  const failedValidation = [];
  await mapSeries(affilaiteSchemas, async (schema) => {
    if (testOne && schema.brand !== testOne) return;
    const hasTargetNode = await validation.testSchema(schema);
    if (!hasTargetNode) failedValidation.push(getFullSchemaUrl(schema));
  });

  return failedValidation;
}

beforeAll(async () => {
  affilaiteSchemas = await getAffiliateSchema('output', 'json');
  validation = validateUrl();
  await validation.setUpBrowser();
});

afterAll(async () => {
  await validation.closeSession();
});

describe('For each section schema', () => {
  test('a valid url is present', async () => {
    const failedValidation = await validateUrls();
    if (failedValidation.length) {
      failedValidation.forEach((url) => console.log(`:::::: VALIDATION FAILED FOR ${url}  ::::::`));
    }
    expect(failedValidation.length).toEqual(0);
  });
});
