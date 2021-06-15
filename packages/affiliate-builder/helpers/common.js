import glob from 'glob';
import path from 'path';
import fs from 'fs';
import { mapSeries } from 'bluebird';
import 'regenerator-runtime/runtime';
import betterFs from 'fs-extra';

export function prettyJson(str) {
  return JSON.stringify(str, null, 2);
}

export function getSchemaFiles(dir, extension) {
  return new Promise((resolve) => {
    const target = `${dir}/**/*.${extension}`;
    const _path = path.join(__dirname, '..', target);
    glob(_path, {}, (err, files) => {
      if (err) console.log(err);
      resolve(files);
    });
  });
}

export function readSchemaFiles(file, extension) {
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

export function getFullSchemaUrl(schema) {
  const domain = schema.domain;
  const baseUrl = schema.urls[0];
  const multipleUrls = schema.multipleUrls;
  const queryString = multipleUrls?.queryString;
  const queryStringValue = multipleUrls?.start;
  const urlQueryString = multipleUrls ? `${queryString}${queryStringValue}` : '';
  return domain + baseUrl + urlQueryString;
}

export function cleanOutput(dir) {
  return new Promise((resolve) => {
    betterFs.remove(dir, (er) => {
      if (er) console.log(er);
      resolve();
    });
  });
}

export function writeFileToOutput(location, data) {
  const jsonWrite = JSON.stringify(data, null, 2);
  return new Promise((resolve) =>
    betterFs.writeFile(location, jsonWrite, 'utf8', (err) => resolve())
  );
}

export function createOutput(dir) {
  return new Promise((resolve) => betterFs.mkdir(dir, { recursive: true }, (err) => resolve(dir)));
}

export function urlCase(str) {
  return str?.replace(/\s&\s/g, '-and-')?.replace(/\s/g, '-')?.replace(/\s/g, '-') || str;
}
