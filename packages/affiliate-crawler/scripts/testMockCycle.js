import { getAffiliateSchema, copyToClip } from '../helpers';
import FullCycle from '../cycle/FullCycle';
import Logger from '../logger/Logger';
import messages from '../logger/logTypes';

export async function startFullCycle() {
  const schemas = await getAffiliateSchema('mocks/schema-mocks/real-mocks', 'json');
  const Cycle = new FullCycle({
    schemas: [schemas[0]],
    chunks: 1,
    cycleRunTime: 'linear',
    useTransmitStoreApi: false,
    useBatching: false,
    writeStoreCache: false,
    headless: false,
  });

  const results = await Cycle.initFullCycle();
  Logger.publicLog(messages.e2eFinished, 'cyan');
  copyToClip(results);
}
