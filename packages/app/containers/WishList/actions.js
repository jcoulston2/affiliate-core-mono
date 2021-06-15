//@flow
import { type ActionPartial } from '@types/redux';
import { type ProductData } from '@types/product';

export const actionTypes = {
  ADD_PRODUCT_TO_WISHLIST: 'ADD_PRODUCT_TO_WISHLIST',
  ADD_PRODUCT_TO_WISHLIST_SUCCESS: 'ADD_PRODUCT_TO_WISHLIST_SUCCESS',
  REMOVE_PRODUCT_FROM_WISHLIST: 'REMOVE_PRODUCT_FROM_WISHLIST',
  REMOVE_PRODUCT_FROM_WISHLIST_SUCCESS: 'REMOVE_PRODUCT_FROM_WISHLIST_SUCCESS',
};

export const actions = {
  addProductToWishList: (product: ProductData): ActionPartial => ({
    type: actionTypes.ADD_PRODUCT_TO_WISHLIST,
    product,
  }),

  addProductToWishListSuccess: (product: ProductData): ActionPartial => ({
    type: actionTypes.ADD_PRODUCT_TO_WISHLIST_SUCCESS,
    product,
  }),

  removeProductfromWishList: (productLink: string): ActionPartial => ({
    type: actionTypes.REMOVE_PRODUCT_FROM_WISHLIST,
    productLink,
  }),

  removeProductfromWishListSuccess: (productLink: string): ActionPartial => ({
    type: actionTypes.REMOVE_PRODUCT_FROM_WISHLIST_SUCCESS,
    productLink,
  }),
};
