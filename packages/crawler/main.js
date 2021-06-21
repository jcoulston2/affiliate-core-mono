import { getAffiliateSchema } from '@affiliate-master/common';
import { crawlerConfig as config } from '@affiliate-master/config';
import FullCycle from './cycle/FullCycle';
import Logger from './logger/Logger';
import { AFF_DATA, CRAWL_LOG } from './constants';

const {
  numberOfConcurrentCycles,
  cycleRunTime,
  useTransmitStoreApi,
  useBatching,
  writeStoreCache,
  headless,
  persistOldProductsUntilRound,
} = config;

export async function startFullCycle() {
  const schemas = await getAffiliateSchema(AFF_DATA, 'json');
  const numberOfChunks = numberOfConcurrentCycles;
  const chunks = numberOfChunks < schemas.length ? schemas.length / numberOfChunks : 1;

  Logger.setWritableLogs(CRAWL_LOG);

  const Cycle = new FullCycle({
    schemas,
    chunks,
    cycleRunTime,
    useTransmitStoreApi,
    useBatching,
    writeStoreCache,
    headless,
    persistOldProductsUntilRound,
  });

  Cycle.initFullCycle();
}
