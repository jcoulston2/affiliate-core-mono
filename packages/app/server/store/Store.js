//@flow
import storeCache from '../../__store-cache__/store-cache.json';
import { zipParse } from '../../helpers/common';
import { type Store } from '@types/store';

function getStore(): Store {
  const store: string = storeCache.store;
  const parsedStore = zipParse(store);
  return parsedStore;
}

const configuredStore: Store = getStore();

export { configuredStore, getStore };
