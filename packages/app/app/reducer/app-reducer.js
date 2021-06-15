//@flow
import { actionTypes } from '../root-actions';
import produce from 'immer';

type State = {
  clientWidth: ?number,
  mobileMenuOpen: boolean,
};

type AppStateActions = { type: string, clientWidth: number };

export default function globalAppState(
  state: State = {
    clientWidth: null,
    mobileMenuOpen: false,
  },
  action: AppStateActions
) {
  return produce((state: State), (draft: Object): State => {
    switch (action.type) {
      case actionTypes.SET_CLIENT_WIDTH:
        draft.clientWidth = action.clientWidth;
        return draft;

      default:
        return state;
    }
  });
}
