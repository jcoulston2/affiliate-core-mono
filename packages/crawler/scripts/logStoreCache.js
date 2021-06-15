import storeCache from '../__store-cache__/store-cache.json';
import { parseStoreCache } from '../helpers';

function logStoreCache() {
  console.log(':::::: STARTING PARSE ::::::');
  const parsedStore = parseStoreCache(storeCache.store);
  console.log(':::::: STORE PARSED ::::::');
  console.log(parsedStore);
}

logStoreCache();
