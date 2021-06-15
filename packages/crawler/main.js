import { getAffiliateSchema } from './helpers';
import FullCycle from './cycle/FullCycle';
import Logger from './logger/Logger';
import config from './config';

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
  const schemas = await getAffiliateSchema('affiliate-data', 'json');
  const numberOfChunks = numberOfConcurrentCycles;
  const chunks = numberOfChunks < schemas.length ? schemas.length / numberOfChunks : 1;

  Logger.setWritableLogs();

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
