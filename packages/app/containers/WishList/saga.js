//@flow
import { actions, actionTypes } from './actions';
import { take, put, all, fork } from 'redux-saga/effects';
import { type Saga } from '@types/redux';

export function* watcherSetWishList(): Saga {
  while (true) {
    const { product } = yield take(actionTypes.ADD_PRODUCT_TO_WISHLIST);
    yield put(actions.addProductToWishListSuccess(product));
  }
}

export function* watcherRemoveWishList(): Saga {
  while (true) {
    const { productLink } = yield take(actionTypes.REMOVE_PRODUCT_FROM_WISHLIST);
    yield put(actions.removeProductfromWishListSuccess(productLink));
  }
}

export default function* rootSaga(): Saga {
  yield all([fork(watcherSetWishList), fork(watcherRemoveWishList)]);
}
