import FullCycle from '../cycle/FullCycle';
import Logger from '../logger/Logger';
import messages from '../logger/logTypes';
import { getAffiliateSchema } from '@affiliate-master/common';
import { MOCKS } from '../constants';

function copyToClip(json) {
  const proc = require('child_process').spawn('pbcopy');
  proc.stdin.write(JSON.stringify(json));
  proc.stdin.end();
}

export async function startFullCycle() {
  const schemas = await getAffiliateSchema(`${MOCKS}schema-mocks/real-mocks`, 'json');
  const Cycle = new FullCycle({
    schemas: [schemas[0]],
    chunks: 1,
    cycleRunTime: 'linear',
    useBatching: false,
    writeStoreCache: false,
    headless: false,
  });

  const results = await Cycle.initFullCycle();
  Logger.publicLog(messages.e2eFinished, 'cyan');
  copyToClip(results);
}
