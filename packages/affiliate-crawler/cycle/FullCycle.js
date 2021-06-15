import chunk from 'lodash/chunk';
import shuffle from 'lodash/shuffle';
import set from 'lodash/set';
import SingleCycle from './Cycle';
import clock from 'pretty-ms';
import { StopWatch } from 'stopwatch-node';
import {
  writeStoreCache,
  assignToExtract,
  parseStoreCache,
  separateCautiousProducts,
} from '../helpers';
import { transmitExtractsToCore, transmitLogsToSlack } from '../api';
import messages from '../logger/logTypes';
import Logger from '../logger/Logger';
import storeCache from '../__store-cache__/store-cache.json';
import BatchPipe from '../batching/BatchPipe';

export default class FullCycle {
  constructor({
    chunks,
    schemas,
    cycleRunTime,
    useTransmitStoreApi,
    persistOldProductsUntilRound = 5,
    useBatching = true,
    writeStoreCache = true,
    headless = true,
    shuffleFeeds = true,
  }) {
    this.chunks = chunks;
    this.schemas = schemas;
    this.cycleRunTime = cycleRunTime;
    this.chunkedSchemas = chunk(schemas, chunks);
    this.useTransmitStoreApi = useTransmitStoreApi;
    this.stopWatch;
    this.store = (useBatching && storeCache?.store) || null;
    this.writeStoreCache = writeStoreCache;
    this.headless = headless;
    this.shuffleFeeds = shuffleFeeds;
    this.persistOldProductsUntilRound = persistOldProductsUntilRound;
  }

  setStopWatch(operation) {
    if (operation === 'start') {
      this.stopWatch = new StopWatch('sw');
      this.stopWatch.start('cycle');
    } else if (operation === 'stop') {
      this.stopWatch.stop();
    }
  }

  sendSlackNotification(msg) {
    return transmitLogsToSlack({
      text: msg,
    });
  }

  combineExtracts(extracts, newExtracts) {
    if (newExtracts) {
      newExtracts.forEach(({ section, data }) => {
        data.forEach(({ category, label, data: productInformation }) => {
          assignToExtract(extracts, section, category, label, productInformation);
        });
      });
    }

    return extracts;
  }

  combineResults(results) {
    return results.reduce((acc, cur) => {
      return {
        extracts: this.combineExtracts(cur.extracts, acc.extracts),
        numberOfcrawledProducts: cur.numberOfcrawledProducts + acc.numberOfcrawledProducts,
        warnings: [...cur.warnings, ...acc.warnings],
        errors: [...cur.errors, ...acc.errors],
      };
    });
  }

  handleCoreResponseNotifications(coreResponse) {
    return transmitLogsToSlack({
      text: coreResponse.success
        ? messages.slackExtractCoreSuccess
        : messages.slackExtractCoreFailure,
    });
  }

  parseStore() {
    return parseStoreCache(this.store);
  }

  batchDataWithExistingStore(extracts) {
    try {
      const fullStore = this.parseStore();
      const Batch = new BatchPipe({
        currentBatch: fullStore,
        incomingBatch: extracts,
        persistOldProductsUntilRound: this.persistOldProductsUntilRound,
      });
      return Batch.processBatch();
    } catch (e) {
      Logger.publicLog(messages.batchFail(e), 'red');
    }
  }

  logBatchMetrics(metrics) {
    const batchOutputDir = `${__dirname}/../__log__/batchMetrics.log`;
    Logger.setWritableLogs(batchOutputDir);
    Logger.publicLog(messages.batchSuccess(metrics), 'green', true);
    this.sendSlackNotification(messages.slackBatchMetrics(metrics));
  }

  shuffleProductFeeds(extracts) {
    Logger.publicLog(messages.shufflingFeed, 'blue');
    extracts.forEach(({ data: secData }, secIndex) => {
      secData.forEach(({ data: catData }, catIndex) => {
        const [secure, cautious] = separateCautiousProducts(catData);
        set(extracts, `[${secIndex}].data[${catIndex}].data`, [...shuffle(secure), ...cautious]);
      });
    });

    return extracts;
  }

  // TODO: we'll need to make use of the aff builder package here
  orderProductCategories(extracts) {
    extracts.forEach(({ data: secData }, secIndex) => {
      secData.forEach(({ data: catData }, catIndex) => {
        console.log('catData', catData);
      });
    });

    return extracts;
  }

  async writeStoreToCache(extracts) {
    if (!this.writeStoreCache) return;
    try {
      await writeStoreCache(extracts);
    } catch (e) {
      Logger.publicLog(messages.writeStoreToCacheFail(e), 'red');
    }
  }

  async startSingleCycleChunk(affilaiteSchemaChunk) {
    const Cycle = new SingleCycle(affilaiteSchemaChunk, this.headless);
    return await Cycle.init();
  }

  async transmitExtractsViaApi() {
    const toCoreResponse = await transmitExtractsToCore();
    this.handleCoreResponseNotifications(toCoreResponse);
  }

  async startCycleChunks() {
    const cyclePromises = this.chunkedSchemas.map(
      async (affilaiteSchemaChunk) => await this.startSingleCycleChunk(affilaiteSchemaChunk)
    );
    return await Promise.all(cyclePromises);
  }

  async initFullCycle() {
    this.sendSlackNotification(messages.slackStartingCycle);
    this.setStopWatch('start');
    let batchResponse;
    const cycleResults = await this.startCycleChunks();
    const { extracts, numberOfcrawledProducts, warnings, errors } =
      this.combineResults(cycleResults);

    this.setStopWatch('stop');
    if (this.store) {
      batchResponse = this.batchDataWithExistingStore(extracts);
    }

    let concludedExtracts = batchResponse ? batchResponse.updatedBatch : extracts;
    if (this.shuffleFeeds) concludedExtracts = this.shuffleProductFeeds(concludedExtracts);
    this.orderProductCategories(concludedExtracts);
    await this.writeStoreToCache(concludedExtracts);

    Logger.publicLog(messages.writeStoreToCacheSuccess, 'blue');

    if (this.useTransmitStoreApi) {
      const coreResponse = await this.transmitExtractsViaApi();
      this.handleCoreResponseNotifications(coreResponse);
    }

    this.sendSlackNotification(
      messages.slackFinishedCycle(
        numberOfcrawledProducts,
        clock(this.stopWatch.totalTimeMillis),
        warnings.length,
        errors.length
      )
    );

    if (batchResponse) this.logBatchMetrics(batchResponse.metrics);
    Logger.publicLog(messages.fullCycleEnded, 'blue');

    return concludedExtracts;
  }
}
