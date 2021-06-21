import betterFs from 'fs-extra';

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
