import { setLocalStorage } from '@helpers/common';
import { USER_SETTINGS_KEY, WISH_LIST_KEY } from '@constants';

export function persistState(store) {
  const { userSettingsState, wishListState } = store.getState();
  setLocalStorage(USER_SETTINGS_KEY, userSettingsState.user);
  setLocalStorage(WISH_LIST_KEY, {
    savedProducts: wishListState.savedProducts,
  });
}
