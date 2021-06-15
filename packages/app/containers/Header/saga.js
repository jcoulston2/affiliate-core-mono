//@flow
import { actions, actionTypes } from './actions';
import { take, put, all, fork } from 'redux-saga/effects';
import { type Saga } from '../../types/redux';

export function* watchMobileNav(): Saga {
  while (true) {
    const { flag } = yield take(actionTypes.MOBILE_NAV_TOGGLE);
    yield put(actions.togglMobileNavSuccess(flag));
  }
}

export default function* rootSaga(): Saga {
  yield all([fork(watchMobileNav)]);
}
