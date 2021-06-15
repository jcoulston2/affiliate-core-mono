import fs from 'fs';

function createFolder(dir) {
  return new Promise((resolve) => fs.mkdir(dir, { recursive: true }, (err) => resolve(dir)));
}

async function init() {
  const dir = __dirname + '/../__store-cache-dev-seed__';
  await createFolder(dir);
  const store = JSON.stringify({ store: [] });

  fs.writeFile(`${dir}/store-cache.json`, store, 'utf8', (err) => {
    if (err) throw err;
  });
}

init();
