//@flow
import produce from 'immer';
import initalState from './initalState';
import { type UserSettingsState } from '@types/appState';
import { actionTypes } from './actions';
import { type User } from '@types/user';

type UserAction = {
  type: string,
  user: User,
  allowCookies: boolean,
};

export default function reducer(
  state: UserSettingsState = initalState,
  action: UserAction = {}
): UserSettingsState {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.SET_USER_SETTINGS_SUCCESS:
        draft.user = action.user;
        return draft;

      case actionTypes.SET_USER_COOKIE_POLICY_SUCCESS:
        draft.user.allowCookies = action.allowCookies;
        return draft;

      default:
        return state;
    }
  });
}
