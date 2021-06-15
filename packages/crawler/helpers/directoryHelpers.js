import glob from 'glob';
import path from 'path';
import fs from 'fs';
import { mapSeries } from 'bluebird';
import * as zip from 'zipson';

function getSchemaFiles(dir, extension) {
  return new Promise((resolve) => {
    const target = `../${dir}/**/*.${extension}`;
    const _path = path.join(__dirname, target);
    glob(_path, {}, (err, files) => {
      if (err) {
        console.log(err);
      }

      resolve(files);
    });
  });
}

function readSchemaFiles(file, extension) {
  return new Promise((resolve) => {
    fs.readFile(file, 'utf8', (err, data) => {
      return resolve(extension === 'js' || extension === 'json' ? JSON.parse(data) : data);
    });
  });
}

export async function getAffiliateSchema(dir, extension) {
  const schemaFiles = await getSchemaFiles(dir, extension);

  return mapSeries(schemaFiles, async (file) => {
    const schema = await readSchemaFiles(file, extension);
    return schema;
  });
}

export async function writeStoreCache(extracts) {
  const zipped = zip.stringify(extracts);
  const store = JSON.stringify({ store: zipped });
  const outputFileDir = __dirname + '/../__store-cache__';

  return new Promise((resolve) =>
    fs.writeFile(`${outputFileDir}/store-cache.json`, store, 'utf8', (err) => {
      if (err) throw err;
      resolve();
    })
  );
}

export function parseStoreCache(zipped) {
  return zip.parse(zipped);
}
