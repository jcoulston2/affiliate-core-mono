import glob from 'glob';
import fs from 'fs';
import bb from 'bluebird';
import 'regenerator-runtime/runtime';

function getSchemaFiles(dir, extension) {
  return new Promise((resolve) => {
    glob(`${dir}/**/*${extension}`, {}, (err, files) => {
      if (err) console.log(err);
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

  return bb.mapSeries(schemaFiles, async (file) => {
    const schema = await readSchemaFiles(file, extension);
    return schema;
  });
}

export function getFullSchemaUrl(schema) {
  const domain = schema.domain;
  const baseUrl = schema.urls[0];
  const multipleUrls = schema.multipleUrls;
  const queryString = multipleUrls?.queryString;
  const queryStringValue = multipleUrls?.start;
  const urlQueryString = multipleUrls ? `${queryString}${queryStringValue}` : '';
  return domain + baseUrl + urlQueryString;
}
