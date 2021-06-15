//@flow
import { type User } from '@types/user';
import { type WishList } from '@types/wishList';

type StoreWithPersistedState = {
  userSettingsState: {
    userSettings: User,
  },
  wishListState: WishList,
};

export function createStoreWithPersist(
  initialState: { [string]: any },
  userSettings: User,
  wishList: WishList
): StoreWithPersistedState {
  let constructedState = { ...initialState };
  if (userSettings) constructedState.userSettingsState = { user: userSettings };
  if (wishList) constructedState.wishListState = wishList;
  return constructedState;
}
