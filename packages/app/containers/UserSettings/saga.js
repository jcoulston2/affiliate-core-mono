//@flow
import { actions, actionTypes } from './actions';
import { take, put, all, fork } from 'redux-saga/effects';
import { type Saga } from '@types/redux';
import initalSettings from './initalState';

export function* watcherSetUserSettings(): Saga {
  while (true) {
    const { user } = yield take(actionTypes.SET_USER_SETTINGS);
    const userWithDefaults = { ...initalSettings.user, ...user };
    yield put(actions.setUserSettingsSuccess(userWithDefaults));
  }
}

export function* watcherSetUserCookies(): Saga {
  while (true) {
    const { allowCookies } = yield take(actionTypes.SET_USER_COOKIE_POLICY);
    yield put(actions.setUserCookiePolicySuccess(allowCookies));
  }
}

export default function* rootSaga(): Saga {
  yield all([fork(watcherSetUserSettings), fork(watcherSetUserCookies)]);
}
