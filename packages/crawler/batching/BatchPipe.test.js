import 'regenerator-runtime/runtime';
import Batch from './BatchPipe';
import responseMock from '../mocks/response-mocks/cycle-response-mock';
import get from 'lodash/get';

const persistOldProductsUntilRound = 5;
const responseMockCatData = responseMock[0].data[0];
const responseMockProdData = responseMockCatData.data[0];
const createNewData = (sectionName, catName, productNames, productLinks) => {
  const prodData =
    productNames && productLinks
      ? {
          data: Array(productNames.length)
            .fill('')
            .map((_, index) => ({
              ...responseMockProdData,
              topLevelData: {
                ...responseMockProdData.topLevelData,
                name: productNames[index],
                link: productLinks[index],
              },
            })),
        }
      : responseMockCatData;
  return {
    section: sectionName,
    data: [
      {
        ...prodData,
        category: catName,
      },
    ],
  };
};

describe('When a new section is present in an incoming batch', () => {
  test('the new section is included in the new batch', () => {
    const currentBatch = responseMock;
    const incomingBatch = [
      ...responseMock,
      {
        ...responseMock[0].data,
        section: 'new stuff',
      },
    ];
    const _Batch = new Batch({ currentBatch, incomingBatch, persistOldProductsUntilRound });
    const { updatedBatch } = _Batch.processBatch();

    expect(updatedBatch.length).toEqual(3);
    expect(updatedBatch.some((o) => o.section === 'new stuff')).toBeTruthy();
  });
});

describe('When a new category is present in an incoming batch and an old category no longer exists', () => {
  const currentBatch = [...responseMock, { ...createNewData('new stuff', 'pink chinos') }];
  const incomingBatch = [...responseMock, { ...createNewData('new stuff', 'blue chinos') }];
  const _Batch = new Batch({ currentBatch, incomingBatch, persistOldProductsUntilRound });
  const { updatedBatch, metrics } = _Batch.processBatch();

  test('new batch has correct length', () => {
    expect(updatedBatch.length).toEqual(3);
  });

  test('the new category is included in the new batch', () => {
    expect(updatedBatch.some((o) => o?.data[0]?.category === 'blue chinos')).toBeTruthy();
  });

  test('the old category is included in the new batch', () => {
    expect(updatedBatch.some((o) => o?.data[1]?.category === 'pink chinos')).toBeTruthy();
  });

  test('the old category is held in metrics as a cautious cetegory (but no products are marked)', () => {
    expect(metrics.cautiousCategories).toEqual([
      {
        section: 'new stuff',
        category: 'pink chinos',
        label: 'clothing',
      },
    ]);
  });
});

describe('When a new product is present in an incoming batch', () => {
  const currentBatch = [
    ...responseMock,
    { ...createNewData('new stuff', 'jeans', ['limbo bimbo'], ['someLink']) },
  ];
  const incomingBatch = [
    ...responseMock,
    {
      ...createNewData(
        'new stuff',
        'jeans',
        ['limbo bimbo', 'mambo wanbo'],
        ['someLink', 'someNewLink']
      ),
    },
  ];

  const _Batch = new Batch({ currentBatch, incomingBatch, persistOldProductsUntilRound });
  const { updatedBatch } = _Batch.processBatch();
  test('the new product is included in the new batch', () => {
    expect(get(updatedBatch[2], 'data[0].data[1].topLevelData.name')).toEqual('mambo wanbo');
  });
});

describe('When a an old product is no longer included in the new batch', () => {
  const getMockStaticbatch = () => [
    ...responseMock,
    { ...createNewData('new stuff', 'jeans', ['limbo bimbo'], ['someLink']) },
  ];
  const currentBatch = [
    ...responseMock,
    {
      ...createNewData(
        'new stuff',
        'jeans',
        ['limbo bimbo', 'mambo wanbo'],
        ['someLink', 'someNewLink']
      ),
    },
  ];

  const BatchOne = new Batch({
    currentBatch,
    incomingBatch: getMockStaticbatch(),
    persistOldProductsUntilRound,
  });
  let accumulatedResult = BatchOne.processBatch();

  test('The product is marked cautious in metrics', () => {
    expect(accumulatedResult.metrics.cautiousProducts).toEqual([
      {
        category: 'jeans',
        link: 'https://www.isawitfirst.comsomeNewLink',
        name: 'mambo wanbo',
        section: 'new stuff',
      },
    ]);
  });

  test('the old product is marked "cautious" but is still added to the new batch', () => {
    expect(
      get(accumulatedResult.updatedBatch[2], 'data[0].data[1].metaData.markedCautiousTimes')
    ).toEqual(1);
  });

  test('the old / cautious product is appended to the end of the list meaning secure products will be prioritized for a given feed', () => {
    const combinedResults = get(accumulatedResult.updatedBatch[2], 'data[0].data');
    expect(combinedResults[combinedResults.length - 1].metaData.markedCautiousTimes).toEqual(1);
  });

  describe('Given N > 1 cycles', () => {
    test('the product is marked cautious more than once for N > 1 cycles', () => {
      const BatchTwo = new Batch({
        currentBatch: accumulatedResult.updatedBatch,
        incomingBatch: getMockStaticbatch(),
        persistOldProductsUntilRound,
      });
      accumulatedResult = BatchTwo.processBatch();
      expect(
        get(accumulatedResult.updatedBatch[2], 'data[0].data[1].metaData.markedCautiousTimes')
      ).toEqual(2);
    });
  });

  describe('Given a new batch with a persist threshold', () => {
    test('the product is removed when satisfying the persist threshold', () => {
      const BatchThree = new Batch({
        currentBatch: accumulatedResult.updatedBatch,
        incomingBatch: getMockStaticbatch(),
        persistOldProductsUntilRound: 2,
      });
      accumulatedResult = BatchThree.processBatch();
      expect(get(accumulatedResult.updatedBatch[2], 'data[0].data[1]')).toBeUndefined();
      expect(accumulatedResult.metrics.removedProducts).toEqual([
        {
          category: 'jeans',
          link: 'https://www.isawitfirst.comsomeNewLink',
          name: 'mambo wanbo',
          section: 'new stuff',
        },
      ]);
    });
  });
});

describe('When a previous cautious product is included in the new batch', () => {
  test("the product's marked status is removed", () => {
    const incomingBatch = [
      ...responseMock,
      { ...createNewData('new stuff', 'jeans', ['limbo bimbo'], ['someLink']) },
    ];
    const currentBatch = [
      ...responseMock,
      {
        ...createNewData(
          'new stuff',
          'jeans',
          ['limbo bimbo', 'mambo wanbo'],
          ['someLink', 'someNewLink']
        ),
      },
    ];
    const BatchOne = new Batch({
      currentBatch,

      // the incoming batch does not include the product 'mambo wanbo'
      incomingBatch,
      persistOldProductsUntilRound,
    });

    let accumulatedResult = BatchOne.processBatch();
    expect(accumulatedResult.metrics.cautiousProducts.length).toEqual(1);

    const BatchTwo = new Batch({
      currentBatch: accumulatedResult.updatedBatch,

      // the incoming batch now includes the product 'mambo wanbo'
      incomingBatch: currentBatch,
      persistOldProductsUntilRound,
    });

    accumulatedResult = BatchTwo.processBatch();

    expect(
      get(accumulatedResult.updatedBatch[2], 'data[0].data[1].metaData.markedCautiousTimes')
    ).toBeUndefined();
    expect(accumulatedResult.metrics.cautiousProducts).toEqual([]);
  });
});
