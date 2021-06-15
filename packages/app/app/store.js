//@flow
import rootReducer from './reducer/root-reducer';
import { createStore, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-sagas';
import { type Store } from '../types/redux';
import throttle from 'lodash/throttle';
import { persistState } from './subscribers';
import { USER_SETTINGS_KEY, WISH_LIST_KEY } from '@constants';
import { getLocalStorage } from '@helpers/common';
import { createStoreWithPersist } from './helper';

export const configureStore = (initialState: { [string]: any }): Store => {
  const sagaMiddleware = createSagaMiddleware();
  const middleWares = [sagaMiddleware];
  const localStorageKeys = [USER_SETTINGS_KEY, WISH_LIST_KEY].map((key) => getLocalStorage(key));

  const store = createStore(
    rootReducer,
    createStoreWithPersist(initialState, ...localStorageKeys),
    applyMiddleware(...middleWares)
  );

  store.subscribe(throttle(() => persistState(store), 1000));
  sagaMiddleware.run(rootSaga);
  return store;
};

export const wrapper = createWrapper(configureStore, { debug: false });
