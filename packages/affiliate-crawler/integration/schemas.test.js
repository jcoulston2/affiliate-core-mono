import { getAffiliateSchema } from '../helpers';
import 'regenerator-runtime/runtime';
let schemas;

beforeAll(async () => {
  schemas = await getAffiliateSchema('affiliate-data', 'json');
});

describe('Given a schema in a directory', () => {
  test('schema has correct descriptive structure', () => {
    schemas.forEach((schema) => {
      expect(schema.brand).toEqual(expect.any(String));
      expect(schema.domain).toEqual(expect.any(String));
      expect(schema.section).toEqual(expect.any(String));
      expect(schema.label).toEqual(expect.any(String));
      expect(schema.category).toEqual(expect.any(String));
      expect(schema.urls).toEqual(expect.any(Array));
    });
  });

  test('schema has correct key / required extracts top level format', () => {
    schemas.forEach((schema) => {
      const { topLevel } = schema.extracts;
      const topLevelData = topLevel.data;

      expect(topLevelData.name).toHaveProperty('selector');
      expect(topLevelData.name).toHaveProperty('getDataFrom');

      expect(topLevelData.price).toHaveProperty('selector');
      expect(topLevelData.price).toHaveProperty('getDataFrom');

      expect(topLevelData.link).toHaveProperty('selector');
      expect(topLevelData.link).toHaveProperty('getDataFrom');

      expect(topLevelData.image).toHaveProperty('selector');
      expect(topLevelData.image).toHaveProperty('getDataFrom');
    });
  });

  test('schema has correct key / required extracts detail level format', () => {
    schemas.forEach((schema) => {
      const { details } = schema.extracts;
      const detailsData = details.data;

      expect(detailsData.images).toHaveProperty('selector');
      expect(detailsData.images).toHaveProperty('getDataFrom');
    });
  });
});
