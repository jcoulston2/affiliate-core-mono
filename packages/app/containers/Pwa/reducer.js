//@flow
import produce from 'immer';
import initialState from './initialState';
import { actionTypes } from './actions';
import { type PwaState } from '@types/appState';

type PwaActions = {
  type: string,
  flag: boolean,
};

export default function reducer(state: PwaState = initialState, action: PwaActions = {}): PwaState {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.SET_PWA_INITIALISED_SUCCESS:
        draft.isPwaInitiated = action.flag;
        return draft;
      default:
        return state;
    }
  });
}
