//@flow
import { type ActionPartial } from '@types/redux';

export const actionTypes = {
  SET_PWA_INITIALISED: 'SET_PWA_INITIALISED',
  SET_PWA_INITIALISED_SUCCESS: 'SET_PWA_INITIALISED_SUCCESS',
};

export const actions = {
  setPwaInitialised: (flag?: boolean): ActionPartial => ({
    type: actionTypes.SET_PWA_INITIALISED,
    flag,
  }),

  setPwaInitialisedSuccess: (flag?: boolean): ActionPartial => ({
    type: actionTypes.SET_PWA_INITIALISED_SUCCESS,
    flag,
  }),
};
