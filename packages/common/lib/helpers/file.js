//@flow
/* eslint no-console: */
import betterFs from 'fs-extra';

export function cleanOutput(dir: any): Promise<void> {
  return new Promise((resolve) => {
    betterFs.remove(dir, (er) => {
      if (er) console.log(er);
      resolve();
    });
  });
}

export function writeFileToOutput(location: any, data: any): Promise<void> {
  const jsonWrite = JSON.stringify(data, null, 2);
  return new Promise((resolve) => betterFs.writeFile(location, jsonWrite, 'utf8', () => resolve()));
}

export function createOutput(dir: any): Promise<void> {
  return new Promise((resolve) => betterFs.mkdir(dir, { recursive: true }, () => resolve(dir)));
}
