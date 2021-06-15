//@flow
import { type ActionPartial } from '@types/redux';

export const actionTypes = {
  MOBILE_NAV_TOGGLE: 'MOBILE_NAV_TOGGLE',
  MOBILE_NAV_TOGGLE_SUCCESS: 'MOBILE_NAV_TOGGLE_SUCCESS',
};

export const actions = {
  togglMobileNav: (flag?: boolean): ActionPartial => ({
    flag,
    type: actionTypes.MOBILE_NAV_TOGGLE,
  }),

  togglMobileNavSuccess: (flag?: boolean): ActionPartial => ({
    type: actionTypes.MOBILE_NAV_TOGGLE_SUCCESS,
    flag,
  }),
};
