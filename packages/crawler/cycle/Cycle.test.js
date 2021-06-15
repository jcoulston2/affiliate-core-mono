import 'regenerator-runtime/runtime';
import ExtractorCycle from './Cycle';
import { transmitLogsToSlack } from '../api';
import schemas from '../mocks/schema-mocks/test-mocks/multipleSectionsSchema';

let mockExtractorReturnValues = {
  evaluationWarnings: ['mock warning'],
  extractorErrors: [],
  currentIterable: 1,
  numberOfcrawledProducts: 1,
};

// Mocks
jest.mock('../Extractor');
jest.mock('../logger/Logger');
jest.mock('../helpers');
jest.mock('../api');

// Mocks Functions
transmitLogsToSlack.mockImplementation(() => new Promise((resolve) => resolve({ success: true })));

const Cycle = new ExtractorCycle([...schemas, ...schemas]);

jest.spyOn(Cycle, 'coolOff').mockImplementation(() => {});
jest.spyOn(Cycle, 'startExtractor').mockImplementation((schemas, iterable = 0) => {
  const extracts = [{}, {}, {}, {}, {}, {}];
  const mockPromise = (res) => Promise.resolve(res);

  return mockPromise({
    extracts,
    ...mockExtractorReturnValues,
    currentIterable: ++mockExtractorReturnValues.currentIterable,
  });
});

// Spies
jest.spyOn(Cycle, 'validateExtractor');
jest.spyOn(Cycle, 'handleCycleNotifications');
jest.spyOn(Cycle, 'validateSchemas');
jest.spyOn(Cycle, 'hasFinishedFullCyle');
jest.spyOn(Cycle, 'clearHeldExtracts');
jest.spyOn(Cycle, 'holdExtracts');
jest.spyOn(Cycle, 'startExtractor');
jest.spyOn(Cycle, 'init');
jest.setTimeout(20000);

describe('When initializing ExtractorCycle with no errors returned', () => {
  test('the relevant functions are called (business logic) on a mock successful cycle', async () => {
    mockExtractorReturnValues.currentIterable = 3;
    await Cycle.init();
    //jest.clearAllMocks();
    expect(Cycle.validateExtractor).toHaveBeenCalled();
    expect(Cycle.handleCycleNotifications).toHaveBeenCalled();
    expect(Cycle.validateSchemas).toHaveBeenCalled();
    expect(Cycle.hasFinishedFullCyle).toHaveBeenCalled();
    expect(Cycle.holdExtracts).toHaveBeenCalled();
    expect(Cycle.clearHeldExtracts).toHaveBeenCalled();
    expect(Cycle.startExtractor).toHaveBeenCalled();
  });

  test('the cycle does not recursively call itself with a next iterable for a clean cycle', async () => {
    expect(Cycle.init).toHaveBeenCalledTimes(1);
  });

  test('the cycle has not broken at an iterable', async () => {
    expect(Cycle.extractorBrokeAtIterable).toEqual(null);
  });

  test('expected results are returned on extract completion', async () => {
    jest.clearAllMocks();
    mockExtractorReturnValues.currentIterable = 2;
    const cycleResult = await Cycle.init();
    expect(Cycle.startExtractor).toHaveBeenCalled();
    expect(Cycle.hasFinishedFullCyle).toHaveBeenCalled();
    expect(cycleResult).toEqual({
      extracts: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      numberOfcrawledProducts: 2,
      warnings: ['mock warning', 'mock warning'],
      errors: [],
    });
  });

  test('extracts, errors and warnings are cleared upon completion', async () => {
    expect(Cycle.heldExtracts).toEqual([]);
    expect(Cycle.cycleWarnings).toEqual([]);
    expect(Cycle.cycleErrors).toEqual([]);
  });
});

describe('When the extractor returns an error for a given cycle', () => {
  test('the iterable value is set and used when starting extractor', async () => {
    mockExtractorReturnValues.currentIterable = 1;
    mockExtractorReturnValues.extractorErrors = ['mock error'];
    jest.clearAllMocks();
    await Cycle.init();
    expect(Cycle.startExtractor).toBeCalledWith(expect.anything(), 4, true);
  });

  test('errors and warnings are sent as notifications', async () => {
    expect(Cycle.handleCycleNotifications).toBeCalledWith(
      ['mock error'],
      ['mock warning'],
      expect.any(Number)
    );
  });

  test('the cycle recursively calls itself with a next iterable', async () => {
    expect(Cycle.init).toHaveBeenCalledTimes(3);
  });

  test('results are returned after an error and then extracts are cleared from class instance', async () => {
    mockExtractorReturnValues.currentIterable = 2;
    mockExtractorReturnValues.extractorErrors = ['mock error'];
    Cycle.clearHeldExtracts();
    jest.clearAllMocks();
    const cycleResult = await Cycle.init();
    expect(Cycle.extracts.length).toEqual(0);
    expect(cycleResult).toEqual({
      extracts: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
      numberOfcrawledProducts: 2,
      warnings: ['mock warning', 'mock warning'],
      errors: ['mock error', 'mock error'],
    });
  });
});

describe('When the extractor returns an error for the very last cycle', () => {
  test('the iterable is set back to 0 so the extractor can start a fresh cycle again', async () => {
    mockExtractorReturnValues.extractorErrors = ['mock error'];
    mockExtractorReturnValues.currentIterable = 4;
    await Cycle.init();
    jest.clearAllMocks();
    await Cycle.init();
    expect(Cycle.startExtractor).toHaveBeenCalledWith(expect.any(Array), 0, true);
  });
});
