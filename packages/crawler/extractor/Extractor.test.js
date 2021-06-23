import commonPageMockPlp from '../mocks/page-mocks/test-mocks/commonMockPlp';
import commonPageMockPdp from '../mocks/page-mocks/test-mocks/commonMockPdp';
import mockWithInvalidImagesPlp from '../mocks/page-mocks/test-mocks/mockWithInvalidImagesPlp';
import mockWithInvalidPricePlp from '../mocks/page-mocks/test-mocks/mockWithInvalidPricePlp';
import commonSchema from '../mocks/schema-mocks/test-mocks/commonSchema';
import multipleUrlSchema from '../mocks/schema-mocks/test-mocks/multipleUrlSchema';
import duplicateSectionsSchema from '../mocks/schema-mocks/test-mocks/multipleSectionsSchema';
import Extractor from './Extractor';
import 'regenerator-runtime/runtime';

// prepare test specific mocks
const createPage = (markup) => (document.body.innerHTML = markup);
const mockPromise = (res) => Promise.resolve(res);
const mockExtractor =
  (pageMockPlp = commonPageMockPlp) =>
  (...args) => {
    const Ext = new Extractor(...args);
    jest.spyOn(Ext, 'crawlInterval').mockImplementation(() => {});
    jest.spyOn(Ext, 'gotoPage').mockImplementation(async (url) => {
      if (/products/.test(url)) {
        createPage(commonPageMockPdp);
      } else {
        createPage(pageMockPlp);
      }

      return mockPromise();
    });
    return Ext;
  };

const mockedPageMethods = {
  goto: jest.fn(),
  setDefaultNavigationTimeout: jest.fn(),
  setRequestInterception: jest.fn(),
  waitForNavigation: jest.fn(),
  setUserAgent: jest.fn(),
  waitFor: jest.fn(),
  on: jest.fn(),
  evaluate: (fn, param) => {
    return fn(param);
  },
};

jest.setTimeout(15000);
jest.mock('puppeteer-extra', () => {
  return {
    use: () => {},
    launch: () =>
      mockPromise({
        newPage: () => mockPromise(mockedPageMethods),
        close: () => mockPromise('closed'),
        setDefaultNavigationTimeout: () => mockPromise(''),
      }),
  };
});

const mockSchema = ['womens dresses', 'womens tops', 'mens shorts'].map((section) => {
  return {
    ...commonSchema,
    section: section.split(' ')[0],
    category: section.split(' ')[1],
  };
});

let extracts;
let warnings;
let iterable;
let crawledProductsInCycle;

const clone = (o) => JSON.parse(JSON.stringify(o));
const runMocksExtractor = async (pageMockPlp = commonPageMockPlp, schema = mockSchema) => {
  const Ext = mockExtractor(pageMockPlp)(schema, 0);
  const {
    extracts: _extracts,
    evaluationWarnings,
    currentIterable,
    numberOfcrawledProducts,
  } = await Ext.init();

  extracts = _extracts;
  warnings = evaluationWarnings;
  iterable = currentIterable;
  crawledProductsInCycle = numberOfcrawledProducts;
};

beforeAll(async () => {
  await runMocksExtractor();
});

describe('extractor => end pipeline result', () => {
  describe('When successful extractor pipeline has completed with the above schema', () => {
    test('Extracts is an array with two sections (mens & womens)', () => {
      expect(extracts.length).toEqual(2);
      expect(extracts[0].section).toEqual('womens');
      expect(extracts[1].section).toEqual('mens');
    });

    test('Each section has a data array of correct length', () => {
      expect(extracts[0].data.length).toEqual(2);
      expect(extracts[1].data.length).toEqual(1);
    });

    test('Section data includes a category', () => {
      const catLevelWomen = extracts[0].data[0];
      const catLevelMen = extracts[1].data[0];

      expect(catLevelWomen.category).toEqual('dresses');
      expect(catLevelMen.category).toEqual('shorts');
    });

    test('a "categoryLastUpdated" is created which is a date string', () => {
      const catLevelWomen = extracts[0].data[0];
      const catLevelMen = extracts[1].data[0];
      const expectedStringFormat = /\d{4}-\d{2}/;

      expect(catLevelWomen.categoryLastUpdated).toEqual(
        expect.stringMatching(expectedStringFormat)
      );
      expect(catLevelMen.categoryLastUpdated).toEqual(expect.stringMatching(expectedStringFormat));
    });

    test('Section data includes a label', () => {
      const catLevelWomen = extracts[0].data[0];
      const catLevelMen = extracts[1].data[0];

      expect(catLevelWomen.label).toEqual('clothing');
      expect(catLevelMen.label).toEqual('clothing');
    });

    test('Section data includes a nested category level data array', () => {
      const catLevelWomen = extracts[0].data[0];
      const catLevelMen = extracts[1].data[0];

      expect(catLevelWomen.data.length).toEqual(4);
      expect(catLevelMen.data.length).toEqual(4);
    });

    test('Category data includes top level and detailed data', () => {
      const prodLevelWomen = extracts[0].data[0].data[0];
      const prodLevelMen = extracts[1].data[0].data[0];
      expect(prodLevelWomen.topLevelData).toBeDefined();
      expect(prodLevelWomen.detailedData).toBeDefined();
      expect(prodLevelMen.topLevelData).toBeDefined();
      expect(prodLevelMen.detailedData).toBeDefined();
    });

    test('Category data includes meta data which includes a brand name and domain', () => {
      const prodLevelWomen = extracts[0].data[0].data[0];
      const prodLevelMen = extracts[1].data[0].data[0];
      expect(prodLevelWomen.metaData).toBeDefined();
      expect(prodLevelMen.metaData).toBeDefined();
      expect(prodLevelMen.metaData.brand).toEqual(expect.any(String));
      expect(prodLevelMen.metaData.domain).toEqual(expect.any(String));
    });

    test('Product top level & detailed data returns correct values from schema (women)', () => {
      const topLevelDataWomen = extracts[0].data[0].data[0].topLevelData;
      const detailedDataWomen = extracts[0].data[0].data[0].detailedData;
      expect(topLevelDataWomen).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          price: expect.any(String),
          wasPrice: expect.any(String),
          link: expect.any(String),
          image: expect.any(String),
        })
      );

      expect(detailedDataWomen).toEqual(
        expect.objectContaining({
          images: expect.any(Array),
          description: expect.any(Array),
          variants: expect.any(Array),
        })
      );

      expect(topLevelDataWomen.image).toEqual(expect.stringMatching('cdn.shopify.com/s/files/'));
      expect(detailedDataWomen.images).toHaveLength(5);
      expect(detailedDataWomen.description).toHaveLength(2);
      expect(detailedDataWomen.variants).toHaveLength(2);

      // Variant should have some sold out variants
      const variantSizes = detailedDataWomen.variants[1].data;
      expect(variantSizes[0].soldOut).toBeTruthy();
      expect(variantSizes[1].soldOut).toBeTruthy();
      expect(variantSizes[2].soldOut).toBeFalsy();
    });

    test('Product top level & detailed data returns correct values from schema (mens)', () => {
      const topLevelDataMen = extracts[0].data[0].data[0].topLevelData;
      const detailedDataMen = extracts[0].data[0].data[0].detailedData;

      expect(topLevelDataMen).toEqual(
        expect.objectContaining({
          name: expect.any(String),
          price: expect.any(String),
          wasPrice: expect.any(String),
          link: expect.any(String),
          image: expect.any(String),
        })
      );

      expect(detailedDataMen).toEqual(
        expect.objectContaining({
          images: expect.any(Array),
          description: expect.any(Array),
          variants: expect.any(Array),
        })
      );

      expect(topLevelDataMen.image).toEqual(expect.stringMatching('cdn.shopify.com/s/files/'));
      expect(detailedDataMen.images).toHaveLength(5);
      expect(detailedDataMen.description).toHaveLength(2);
      expect(detailedDataMen.variants).toHaveLength(2);
    });

    test('The relevant product tags are collected', () => {
      const topLevelDataMen = extracts[0].data[0].data[0].topLevelData;
      const detailedDataMen = extracts[0].data[0].data[0].detailedData;
      expect(topLevelDataMen.tags).toHaveLength(6);
      expect(detailedDataMen.tags).toBeUndefined();
    });

    test('Warnings are clear', () => {
      expect(warnings.length).toEqual(0);
    });

    test('the extractor gives back the correct number of crawled products and the current iterable', () => {
      expect(iterable).toEqual(3);
      expect(crawledProductsInCycle).toEqual(12);
    });
  });

  describe('When Multiple URLs are included in the schema', () => {
    test('The data for all those URLs are included in the response extract', async () => {
      const Ext = mockExtractor()([multipleUrlSchema]);
      const { extracts: multipleUrlextract } = await Ext.init();
      const catLevelWomen = multipleUrlextract[0].data[0];
      expect(multipleUrlextract[0].section).toEqual('womens');
      expect(catLevelWomen.category).toEqual('tops');
      expect(catLevelWomen.data.length).toEqual(8);
    });
  });

  // Multiple same section with same category test
  describe('When there are multiple of the same section including the same category', () => {
    test('The data is appended to the relevant section on Cat in extracts', async () => {
      const Ext = mockExtractor()(duplicateSectionsSchema);
      const { extracts: multipleSectionextract } = await Ext.init();

      const catLevelWomen = multipleSectionextract[0].data[0];
      expect(multipleSectionextract).toHaveLength(1);
      expect(multipleSectionextract[0].data).toHaveLength(1);
      expect(multipleSectionextract[0].section).toEqual('womens');
      expect(catLevelWomen.category).toEqual('dresses');
      expect(catLevelWomen.data.length).toEqual(8);
    });
  });

  describe('When multiple url params are given (e.g. for multiple pages on a PLP)', () => {
    test('Pupeteer "goto" mehtod is called with the relevant number of times with the relevant urls', async () => {
      const urlParamsSchema = {
        ...commonSchema,
        ...{
          urls: ['/collections/hats?page=1'],
        },
        ...{
          multipleUrls: {
            queryString: '?page=',
            interval: 1,
            start: 1,
            end: 5,
          },
        },
      };
      const domain = 'https://www.isawitfirst.com';
      const Ext = mockExtractor()([urlParamsSchema]);
      const _gotoPage = jest.spyOn(Ext, 'gotoPage');
      await Ext.init();

      expect(_gotoPage).toHaveBeenNthCalledWith(
        1,
        domain + '/collections/hats?page=1',
        expect.any(Number)
      );
      expect(_gotoPage).toHaveBeenNthCalledWith(
        6,
        domain + '/collections/hats?page=2',
        expect.any(Number)
      );
      expect(_gotoPage).toHaveBeenNthCalledWith(
        11,
        domain + '/collections/hats?page=3',
        expect.any(Number)
      );
      expect(_gotoPage).toHaveBeenNthCalledWith(
        16,
        domain + '/collections/hats?page=4',
        expect.any(Number)
      );
      expect(_gotoPage).toHaveBeenNthCalledWith(
        21,
        domain + '/collections/hats?page=5',
        expect.any(Number)
      );
    });
  });

  describe('When a schema is defined with selectors that do not exist on a PDP page', () => {
    test('Warnings are given for a PDP', async () => {
      const expectedPlpWarning =
        'Could not find the data prop: "other" for selector: ".nonExistentSelectorShouldThrowAnErrorPDP"';
      let _commonSchema = clone(commonSchema);
      let schemaDetails = _commonSchema.extracts.details;
      schemaDetails.data.other = {
        selector: '.nonExistentSelectorShouldThrowAnErrorPDP',
        getDataFrom: 'text',
      };

      _commonSchema.extracts.details = schemaDetails;

      const Ext = mockExtractor()([_commonSchema]);
      const { evaluationWarnings } = await Ext.init();

      expect(evaluationWarnings.length).toBeGreaterThan(0);
      expect(evaluationWarnings[0][0].message).toEqual(expectedPlpWarning);
    });
  });

  describe('When a schema is defined with selectors that do not exist on a PLP page', () => {
    test('Warnings are given for a PLP', async () => {
      const expectedPdpWarning =
        'Could not find the data prop: "name" for selector: ".nonExistentSelectorShouldThrowAnErrorPLP"';

      let _commonSchema = clone(commonSchema);
      let topLevel = _commonSchema.extracts.topLevel;
      topLevel.data.name = {
        selector: '.nonExistentSelectorShouldThrowAnErrorPLP',
        getDataFrom: 'text',
      };

      _commonSchema.extracts.topLevel = topLevel;

      const Ext = mockExtractor()([_commonSchema]);
      const { evaluationWarnings } = await Ext.init();

      expect(evaluationWarnings.length).toBeGreaterThan(0);
      expect(evaluationWarnings[0][0].message).toEqual(expectedPdpWarning);
    });
  });

  describe('Given a PLP with invalid product images (2 duplicates base path and 1 svg)', () => {
    test('Warnings are given for invalid images and products when "omitDuplicateImgByBase" is set to true in the schama', async () => {
      await runMocksExtractor(mockWithInvalidImagesPlp);
      const [warningResults] = warnings;

      expect(warningResults[0].message).toEqual(
        expect.stringMatching('isValidImage: true, isDuplicateImage: true')
      );

      expect(warningResults[1].message).toEqual(
        expect.stringMatching('isValidImage: false, isDuplicateImage: false')
      );
    });

    test('Products are filterd out if they have an invalid image when "omitDuplicateImgByBase" is set to true in the schama', async () => {
      const expectedProductsExcludingFiltered = 3;
      const products = extracts[0].data[0].data;
      expect(products.length).toEqual(expectedProductsExcludingFiltered);
    });

    test('Duplicate base path imgs are not filterd out when "omitDuplicateImgByBase" is set to false in the schama', async () => {
      const newSchema = {
        ...commonSchema,
        extracts: {
          topLevel: {
            ...commonSchema.extracts.topLevel,
            omitDuplicateImgByBase: false,
          },
          details: commonSchema.extracts.details,
        },
        ...commonSchema.meta,
      };

      await runMocksExtractor(mockWithInvalidImagesPlp, [newSchema]);
      const expectedProductsExcludingFiltered = 4;
      const products = extracts[0].data[0].data;
      expect(products.length).toEqual(expectedProductsExcludingFiltered);
    });

    test('Warnings are given for invalid images and products when "omitDuplicateImgByBase" is set to false in the schama', async () => {
      const [warningResults] = warnings;
      expect(warningResults[0].message).toEqual(
        expect.stringMatching('isValidImage: false, isDuplicateImage: false')
      );

      expect(warningResults[1].message).toEqual(
        expect.stringMatching('isValidImage: true, isDuplicateImage: true')
      );
    });
  });

  describe('Given a PLP with an invalid price (1 product with an invalid price)', () => {
    test('Warnings are given for invalid priced products', async () => {
      await runMocksExtractor(mockWithInvalidPricePlp);
      const [warningResults] = warnings;
      expect(warningResults[0].message).toEqual(expect.stringMatching('invalid price for product'));
    });

    test('Products are filterd out if they have an invalid price', async () => {
      const expectedProductsExcludingFiltered = 3;
      const products = extracts[0].data[0].data;
      expect(products.length).toEqual(expectedProductsExcludingFiltered);
    });
  });
});
