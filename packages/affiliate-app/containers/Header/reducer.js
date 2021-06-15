//@flow
import produce from 'immer';
import initalState from './initalState';
import { actionTypes } from './actions';
import { type HeaderState } from '../../types/appState';

type HeaderActions = {
  type: string,
  mobileMenuOpen: string,
  flag?: boolean,
};

export default function reducer(
  state: HeaderState = initalState,
  action: HeaderActions = {}
): HeaderState {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.MOBILE_NAV_TOGGLE_SUCCESS:
        {
          const mobileStatus =
            typeof action.flag === 'boolean' ? action.flag : !state.mobileMenuOpen;

          draft.mobileMenuOpen = mobileStatus;
        }

        return draft;
      default:
        return state;
    }
  });
}
