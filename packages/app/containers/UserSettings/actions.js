//@flow
import { type User } from '@types/user';
import { type ActionPartial } from '@types/redux';

export const actionTypes = {
  SET_USER_SETTINGS: 'SET_USER_SETTINGS',
  SET_USER_SETTINGS_SUCCESS: 'SET_USER_SETTINGS',
  SET_USER_COOKIE_POLICY: 'SET_USER_COOKIE_POLICY',
  SET_USER_COOKIE_POLICY_SUCCESS: 'SET_USER_COOKIE_POLICY_SUCCESS',
};

export const actions = {
  setUserSettings: (user: User): ActionPartial => ({ type: actionTypes.SET_USER_SETTINGS, user }),
  setUserSettingsSuccess: (user: User): ActionPartial => ({
    type: actionTypes.SET_USER_SETTINGS_SUCCESS,
    user,
  }),

  setUserCookiePolicy: (allowCookies: boolean): ActionPartial => ({
    type: actionTypes.SET_USER_COOKIE_POLICY,
    allowCookies,
  }),

  setUserCookiePolicySuccess: (allowCookies: boolean): ActionPartial => ({
    type: actionTypes.SET_USER_COOKIE_POLICY_SUCCESS,
    allowCookies,
  }),
};
