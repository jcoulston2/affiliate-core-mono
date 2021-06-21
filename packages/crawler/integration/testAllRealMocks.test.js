import { constructMockPages, getPageHtml, getSampleSchemas } from '../helpers';
import { getAffiliateSchema } from '@affiliate-master/common';
import { AFF_DATA } from '../constants';
import Extractor from '../Extractor';
import 'regenerator-runtime/runtime';

let realPageMocks;
let extracts;
let currentUrl;
let targetSchemas;

// prepare test specific mocks
const createPage = (markup) => (document.body.innerHTML = markup);
const mockPromise = (res) => Promise.resolve(res);
const mockExtractor = (...args) => {
  const Ext = new Extractor(...args);
  jest.spyOn(Ext, 'crawlInterval').mockImplementation(() => {});
  jest.spyOn(Ext, 'gotoPage').mockImplementation(async (url) => {
    currentUrl = url;
    return mockPromise();
  });
  return Ext;
};

const mockedPageMethods = {
  goto: jest.fn(),
  setRequestInterception: jest.fn(),
  on: jest.fn(),
  setDefaultNavigationTimeout: jest.fn(),
  setUserAgent: jest.fn(),
  waitForNavigation: jest.fn(),
  cookies: () => mockPromise,
  waitFor: () => mockPromise,
  evaluate: (fn, param) => {
    // by passing in the param, we can decide which page mock to serve
    createPage(getPageHtml(realPageMocks, currentUrl, param));
    return fn(param);
  },
};

jest.setTimeout(10000000);
jest.mock('puppeteer-extra', () => {
  return {
    use: () => {},
    launch: () =>
      mockPromise({
        newPage: () => mockPromise(mockedPageMethods),
        close: () => mockPromise('closed'),
      }),
  };
});

beforeAll(async () => {
  const allSchemas = await getAffiliateSchema(AFF_DATA, 'json');
  realPageMocks = await constructMockPages();
  targetSchemas = getSampleSchemas(allSchemas, realPageMocks);
  const Ext = mockExtractor(targetSchemas);
  const { extracts: _extracts, extractorErrors, evaluationWarnings } = await Ext.init();

  console.log(':: ERRORS ::', extractorErrors);
  console.log(':: WARNINGS ::', evaluationWarnings);

  // TODO: maybe we can copy warnings to clipboard
  extracts = _extracts;
});

describe('extractor => end pipeline result', () => {
  describe('When successful extractor pipeline has completed with the above schema', () => {
    test('Extracts is an array with two sections (mens & womens)', () => {
      expect(extracts.length).toBeGreaterThan(0);

      extracts.forEach((extract) => {
        expect(extract.section).toEqual(expect.any(String));
      });
    });

    test('Each section has a data array of correct length', () => {
      extracts.forEach((extract) => {
        expect(extract.data.length).toBeGreaterThan(0);
      });
    });

    test('Section data includes a category, label and nested category data array', () => {
      extracts.forEach((extract) => {
        const catLevel = extract.data;
        catLevel.forEach((cat) => {
          expect(cat.category).toEqual(expect.any(String));
          expect(cat.label).toEqual(expect.any(String));
          expect(cat.data.length).toBeGreaterThan(0);
        });
      });
    });

    test('Category data includes top level, detailed data and metaData', () => {
      extracts.forEach((extract) => {
        const dataLevel = extract.data;
        dataLevel.forEach((data) => {
          const innerDataLevel = data.data;
          innerDataLevel.forEach((_data) => {
            expect(_data.topLevelData).toBeDefined();
            expect(_data.detailedData).toBeDefined();
            expect(_data.metaData).toBeDefined();
            expect(_data.metaData.brand).toEqual(expect.any(String));
            expect(_data.metaData.domain).toEqual(expect.any(String));
          });
        });
      });
    });

    test('Product top level & detailed data returns correct values from schema', () => {
      extracts.forEach((extract) => {
        const dataLevel = extract.data;
        dataLevel.forEach((data) => {
          const innerDataLevel = data.data;
          innerDataLevel.forEach((_data) => {
            const topLevelData = _data.topLevelData;
            const detailedData = _data.detailedData;
            const assertPrice = !topLevelData.price
              ? {
                  wasPrice: expect.anything(),
                  nowPrice: expect.anything(),
                }
              : {
                  price: expect.anything(),
                };

            expect(topLevelData).toEqual(
              expect.objectContaining({
                name: expect.any(String),
                link: expect.any(String),
                image: expect.anything(),
                ...assertPrice,
              })
            );

            if (topLevelData.wasPrice && topLevelData.nowPrice) {
              const priceToDigit = /\d+/;
              const wasPrice = parseInt(topLevelData.wasPrice.match(priceToDigit));
              const nowPrice = parseInt(topLevelData.nowPrice.match(priceToDigit));
              expect(wasPrice).toBeGreaterThan(nowPrice);
            }

            if (!topLevelData.price) {
              expect(topLevelData.wasPrice.length).toBeGreaterThan(0);
              expect(topLevelData.nowPrice.length).toBeGreaterThan(0);
            } else {
              expect(topLevelData.price.length).toBeGreaterThan(0);
            }
            expect(topLevelData.image.length).toBeGreaterThan(0);
            expect(detailedData.images.length).toBeGreaterThan(0);

            // TODO: The following two assertions are just placeholders for now until we rewrite some more dynamic schema assertions
            // Note that product description and variants are not required props
            const { description, variants } = detailedData;
            if (description) expect(description.length).toBeGreaterThan(0);
            if (variants) expect(variants.length).toBeGreaterThan(0);
          });
        });
      });
    });

    test('The relevant product tags are collected', () => {
      extracts.forEach((extract) => {
        const dataLevel = extract.data;
        dataLevel.forEach((data) => {
          const innerDataLevel = data.data;
          innerDataLevel.forEach((_data) => {
            const topLevelData = _data.topLevelData;
            const detailedData = _data.detailedData;
            expect(topLevelData.tags.length).toBeGreaterThan(0);
            expect(detailedData.tags).toBeUndefined();
          });
        });
      });
    });
  });
});
