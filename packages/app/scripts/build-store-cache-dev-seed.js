import { zipParse } from '../helpers/common';
import storeCache from '../__store-cache__/store-cache.json';
import * as zip from 'zipson';
import fs from 'fs';

const maxOfProductsPerPage = 50;
function trimStore() {
  console.log(':::::::::: COLLECTING STORE CACHE ::::::::::');
  const configuredStore = zipParse(storeCache.store);
  console.log(':::::::::: PARSED STORE CACHE ::::::::::');
  return configuredStore.map((sec) => {
    return {
      data: sec.data.map((cat) => {
        return {
          category: cat.category,
          label: cat.label,
          data: maxOfProductsPerPage ? cat.data.slice(0, maxOfProductsPerPage) : cat.data,
          totalProductsInCategory: cat.totalProductsInCategory,
          categoryLastUpdated: cat.categoryLastUpdated,
        };
      }),
      section: sec.section,
    };
  });
}

function createFolder(dir) {
  return new Promise((resolve) => fs.mkdir(dir, { recursive: true }, (err) => resolve(dir)));
}

async function writeDevStore(devOptimizedStore) {
  const dir = __dirname + '/../__store-cache-dev-seed__';
  await createFolder(dir);
  console.log(':::::::::: WRITING DEV STORE ::::::::::');
  const zipped = zip.stringify(devOptimizedStore);
  const store = JSON.stringify({ store: zipped });

  fs.writeFile(`${dir}/store-cache.json`, store, 'utf8', (err) => {
    if (err) throw err;
    console.log(':::::::::: DEV STORE CREATED ::::::::::');
  });
}

function init() {
  const devOptimizedStore = trimStore();
  console.log(':::::::::: CREATED DEV STORE ::::::::::');
  writeDevStore(devOptimizedStore);
}

init();
