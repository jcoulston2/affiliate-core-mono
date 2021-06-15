// TODO: this script is unfinished but will write the schemas to the extractor

import glob from 'glob';
import path from 'path';
import fs from 'fs';
import { mapSeries } from 'bluebird';

// export async function writeStoreCache(extracts) {
//   const outputFileDir = __dirname + '/../__store-cache__';

//   return new Promise((resolve) =>
//     fs.writeFile(`${outputFileDir}/store-cache.json`, JSON.stringify(extracts), 'utf8', (err) =>
//       resolve()
//     )
//   );
// }

export async function writeStoreCache(extracts) {
  const outputFileDir = __dirname + '/../affiliate-core';

  return new Promise((resolve) =>
    fs.writeFile(`${outputFileDir}/testy.json`, JSON.stringify({ hello: 1 }), 'utf8', (err) =>
      resolve()
    )
  );
}

export async function deployCore() {}

async function init() {
  await writeStoreCache();
  await deployCore();
  console.log('::::DONE::::');
}

init();
