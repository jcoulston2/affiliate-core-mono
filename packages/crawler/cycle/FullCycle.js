import { writeStoreCache, zipParse } from '@affiliate-master/common';
import { affiliateCategories } from '@affiliate-master/config';
import { storeCache } from '@affiliate-master/store';
import chunk from 'lodash/chunk';
import shuffle from 'lodash/shuffle';
import set from 'lodash/set';
import SingleCycle from './Cycle';
import clock from 'pretty-ms';
import { StopWatch } from 'stopwatch-node';
import { transmitLogsToSlack } from '../api';
import { Logger, messages } from '@affiliate-master/common';
import BatchPipe from '../batching/BatchPipe';
import { STORE_CACHE, BATCH_LOG } from '../constants';
import { separateCautiousProducts, assignToExtract } from '../helpers';

export default class FullCycle {
  constructor({
    chunks,
    schemas,
    cycleRunTime,
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

  parseStore() {
    return zipParse(this.store);
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
    Logger.setWritableLogs(BATCH_LOG);
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

  // Order product categories based on the affiliateCategories list in config. Categories with lower indexes will
  // be prioitised.
  orderProductCategories(extracts) {
    extracts.forEach(({ data: secData, section }, secIndex) => {
      const orderRefList = affiliateCategories[section];
      if (orderRefList) {
        let orderedCatData = [];
        secData.forEach(
          (catData) => (orderedCatData[orderRefList.indexOf(catData.category)] = catData)
        );

        set(
          extracts,
          `[${secIndex}].data`,
          orderedCatData.filter((notNull) => notNull)
        );
      }
    });

    return extracts;
  }

  async writeStoreToCache(extracts) {
    if (!this.writeStoreCache) return;
    try {
      await writeStoreCache(STORE_CACHE, extracts);
    } catch (e) {
      Logger.publicLog(messages.writeStoreToCacheFail(e), 'red');
    }
  }

  async startSingleCycleChunk(affilaiteSchemaChunk) {
    const Cycle = new SingleCycle(affilaiteSchemaChunk, this.headless);
    return await Cycle.init();
  }

  async startCycleChunks() {
    const cyclePromises = this.chunkedSchemas.map(
      async (affilaiteSchemaChunk) => await this.startSingleCycleChunk(affilaiteSchemaChunk)
    );
    return await Promise.all(cyclePromises);
  }

  async initFullCycle() {
    let batchResponse;

    this.sendSlackNotification(messages.slackStartingCycle);
    this.setStopWatch('start');
    const cycleResults = await this.startCycleChunks();
    const { extracts, numberOfcrawledProducts, warnings, errors } =
      this.combineResults(cycleResults);

    this.setStopWatch('stop');
    if (this.store) {
      batchResponse = this.batchDataWithExistingStore(extracts);
    }

    let concludedExtracts = batchResponse ? batchResponse.updatedBatch : extracts;
    if (this.shuffleFeeds) concludedExtracts = this.shuffleProductFeeds(concludedExtracts);

    concludedExtracts = this.orderProductCategories(concludedExtracts);

    await this.writeStoreToCache(concludedExtracts);
    Logger.publicLog(messages.writeStoreToCacheSuccess, 'blue');

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
