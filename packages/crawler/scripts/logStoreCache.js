import storeCache from '@affiliate-master/store';
import { zipParse as parseStoreCache } from '@affiliate-master/common';

function logStoreCache() {
  console.log(':::::: STARTING PARSE ::::::');
  const parsedStore = parseStoreCache(storeCache.store);
  console.log(':::::: STORE PARSED ::::::');
  console.log(parsedStore);
}

logStoreCache();
