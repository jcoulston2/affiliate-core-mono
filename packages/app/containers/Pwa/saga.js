//@flow
import { actions, actionTypes } from './actions';
import { take, put, all, fork } from 'redux-saga/effects';
import { type Saga } from '../../types/redux';

export function* watchPwaStatus(): Saga {
  while (true) {
    const { flag } = yield take(actionTypes.SET_PWA_INITIALISED);
    yield put(actions.setPwaInitialisedSuccess(flag));
  }
}

export default function* rootSaga(): Saga {
  yield all([fork(watchPwaStatus)]);
}
