//@flow
import { fork, all } from 'redux-saga/effects';
import headerSaga from '@containers/Header/saga';
import productListingSaga from '@containers/ListingContent/saga';
import userSettingsSaga from '@containers/UserSettings/saga';
import wishListSaga from '@containers/WishList/saga';
import pwaSaga from '@containers/Pwa/saga';
import { type Saga } from '@types/redux';

export function* rootSaga(): Saga {
  yield all([
    fork(headerSaga),
    fork(productListingSaga),
    fork(userSettingsSaga),
    fork(wishListSaga),
    fork(pwaSaga),
  ]);
}
