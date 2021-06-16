//@flow
import { storeCache } from '@affiliate-master/store';
import { zipParse } from '@affiliate-master/common';
import { type Store } from '@types/store';

function getStore(): Store {
  const store: string = storeCache.store;
  const parsedStore = zipParse(store);
  return parsedStore;
}

const configuredStore: Store = getStore();

export { configuredStore, getStore };
