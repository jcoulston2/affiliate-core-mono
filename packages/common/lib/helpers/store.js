//@flow
import * as zip from 'zipson';
import fs from 'fs';

export function zipParse(zipped: string): Array<any> | Object {
  return zip.parse(zipped);
}

export function zipParseIncrements(zipped: Array<string>): Array<any> | Object {
  zipped.forEach((chunk) => {
    zip.parseIncremental(chunk);
  });
  return zip.parseIncremental(null);
}

export async function writeStoreCache(outputFileDir, extracts) {
  const zipped = zip.stringify(extracts);
  const store = JSON.stringify({ store: zipped });

  return new Promise((resolve) =>
    fs.writeFile(`${outputFileDir}store-cache.json`, store, 'utf8', (err) => {
      if (err) throw err;
      resolve();
    })
  );
}
