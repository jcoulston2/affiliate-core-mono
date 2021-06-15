//@flow
import { getLocalStorage } from '@helpers/common';
import { WISH_LIST_KEY } from '@constants';
import { type WishList } from '@types/wishList';

export function getWishListCache(): WishList {
  return getLocalStorage(WISH_LIST_KEY);
}
