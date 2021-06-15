//@flow
import produce from 'immer';
import initalState from './initalState';
import { type WishListState } from '@types/appState';
import { actionTypes } from './actions';
import { type ProductData } from '@types/product';

type WishListAction = {
  type: string,
  product: ProductData,
  productLink: string,
};

export default function reducer(
  state: WishListState = initalState,
  action: WishListAction = {}
): WishListState {
  return produce(state, (draft: WishListState) => {
    switch (action.type) {
      case actionTypes.ADD_PRODUCT_TO_WISHLIST_SUCCESS:
        draft.savedProducts = [...draft.savedProducts, action.product];
        return draft;

      case actionTypes.REMOVE_PRODUCT_FROM_WISHLIST_SUCCESS:
        draft.savedProducts = draft.savedProducts.filter(
          (product) => product.topLevelData.link !== action.productLink
        );
        return draft;

      default:
        return state;
    }
  });
}
