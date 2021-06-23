import 'regenerator-runtime/runtime';
import FullCycle from './FullCycle';
import { transmitLogsToSlack } from '../api';
import commonSchema from '../mocks/schema-mocks/test-mocks/commonSchema';
import extractResponse from '../mocks/response-mocks/cycle-response-mock';

jest.mock('../Extractor');
jest.mock('../logger/Logger');
jest.mock('../api');
jest.mock('../../store/__store-cache__/store-cache.json', () => ({
  store: global.mockZippedStore,
}));

const mockPromise = () => new Promise((resolve) => resolve());
const schemas = [
  'brand1 womens dresses',
  'brand2 mens jeans',
  'brand2 mens shorts',
  'brand3 mens jeans',
].map((section) => {
  return {
    ...commonSchema,
    brand: section.split(' ')[0],
    section: section.split(' ')[1],
    category: section.split(' ')[2],
  };
});
const numberOfChunks = schemas.length / 3;
const Cycle = new FullCycle({
  schemas,
  numberOfChunks,
  cycleRunTime: 'linear',
});

const setSpies = (Cycle) => {
  jest.spyOn(Cycle, 'sendSlackNotification').mockImplementation(() => mockPromise);
  jest.spyOn(Cycle, 'writeStoreToCache').mockImplementation((extracts) => mockPromise(extracts));
  transmitLogsToSlack.mockImplementation(() => mockPromise);
  jest.spyOn(Cycle, 'writeStoreToCache');
  jest.spyOn(Cycle, 'setStopWatch');
  jest.spyOn(Cycle, 'sendSlackNotification');
  jest.spyOn(Cycle, 'combineExtracts');
  jest.spyOn(Cycle, 'combineResults');
  jest.spyOn(Cycle, 'startSingleCycleChunk');
  jest.spyOn(Cycle, 'initFullCycle');
  jest.spyOn(Cycle, 'batchDataWithExistingStore');
  jest.spyOn(Cycle, 'logBatchMetrics');
  jest.spyOn(Cycle, 'shuffleProductFeeds');
  jest.spyOn(Cycle, 'startSingleCycleChunk').mockImplementation((affilaiteSchemaChunk) => {
    const [{ section, category }] = affilaiteSchemaChunk;
    const [{ data }] = extractResponse;

    return Promise.resolve({
      extracts: extractResponse.map((_, index) => ({
        section: `${section}${index}`,
        data: [
          {
            ...data[0],
            category: category,
            categoryLastUpdated: '2021-01-29T19:43:57+00:00',
          },
        ],
      })),
      numberOfcrawledProducts: 2,
      warnings: ['mock warning one', 'mock warning two'],
      errors: ['mock error one', 'mock error two'],
    });
  });
};

setSpies(Cycle);

beforeAll(async () => {
  jest.clearAllMocks();
  await Cycle.initFullCycle();
});

const expectedStoreCache = [
  {
    section: 'mens0',
    data: [
      {
        category: 'jeans',
        categoryLastUpdated: expect.any(String),
        label: 'clothing',
        data: expect.any(Array),
      },
      {
        category: 'shorts',
        categoryLastUpdated: expect.any(String),
        label: 'clothing',
        data: expect.any(Array),
      },
    ],
  },
  {
    section: 'mens1',
    data: [
      {
        category: 'jeans',
        categoryLastUpdated: expect.any(String),
        label: 'clothing',
        data: expect.any(Array),
      },
      {
        category: 'shorts',
        categoryLastUpdated: expect.any(String),
        label: 'clothing',
        data: expect.any(Array),
      },
    ],
  },
  {
    section: 'womens0',
    data: [
      {
        category: 'dresses',
        categoryLastUpdated: expect.any(String),
        label: 'clothing',
        data: expect.any(Array),
      },
    ],
  },
  {
    section: 'womens1',
    data: [
      {
        category: 'dresses',
        categoryLastUpdated: expect.any(String),
        label: 'clothing',
        data: expect.any(Array),
      },
    ],
  },
];

describe('When initializing a full cycle with all schemas split into chunks', () => {
  test('Expected class methods are called (business logic)', async () => {
    expect(Cycle.writeStoreToCache).toHaveBeenCalled();
    expect(Cycle.setStopWatch).toHaveBeenCalled();
    expect(Cycle.sendSlackNotification).toHaveBeenCalled();
    expect(Cycle.combineExtracts).toHaveBeenCalled();
    expect(Cycle.combineResults).toHaveBeenCalled();
    expect(Cycle.startSingleCycleChunk).toHaveBeenCalled();
    expect(Cycle.initFullCycle).toHaveBeenCalled();
    expect(Cycle.batchDataWithExistingStore).toHaveBeenCalled();
    expect(Cycle.logBatchMetrics).toHaveBeenCalled();
    expect(Cycle.shuffleProductFeeds).toHaveBeenCalled();
  });

  test('All Cycles give back results', () => {
    const expectedCycleResults = Array(4)
      .fill('')
      .map(() => ({
        extracts: expect.any(Array),
        numberOfcrawledProducts: 2,
        warnings: expect.any(Array),
        errors: expect.any(Array),
      }));

    expect(Cycle.combineResults).toHaveBeenCalledWith(expectedCycleResults);
  });

  test('A store cache is written with the combined extract results from the cycles', async () => {
    expect(Cycle.writeStoreToCache).toHaveBeenCalledWith(expectedStoreCache);
  });
});

describe('When there is no initial store or opting out of batching', () => {
  test('A store cache is written with the combined extract results from the cycles without being batched against existing store', async () => {
    const Cycle = new FullCycle({
      schemas,
      numberOfChunks,
      cycleRunTime: 'linear',
      useBatching: false,
    });
    setSpies(Cycle);
    await Cycle.initFullCycle();

    expect(Cycle.batchDataWithExistingStore).not.toHaveBeenCalled();
    expect(Cycle.logBatchMetrics).not.toHaveBeenCalled();
    expect(Cycle.writeStoreToCache).toHaveBeenCalledWith(expectedStoreCache);
  });
});

describe('When calling a product shuffle in a cycle', () => {
  test('Products are correctly shuffled', async () => {
    const mockResponses = Array(10)
      .fill('')
      .map(() => JSON.stringify(Cycle.shuffleProductFeeds(extractResponse)));

    const productsAreShuffled =
      mockResponses.filter((response) => response === mockResponses[0]).length <
      mockResponses.length;

    expect(productsAreShuffled).toBeTruthy();
  });
});
