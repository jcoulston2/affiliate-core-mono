//@flow
import produce from 'immer';
import initalState from './initalState';
import { actionTypes } from './actions';
import { type ProductData, type ProductSection } from '../../types/product';

type InitalState = {
  initialProductData: ProductSection,
  fetchedProducts: Array<ProductData>,
  productViewData: ProductData,
  productViewOpen: boolean,
  productCountStart?: number,
  productCountEnd?: number,
  hasFiltersSetFromClient?: boolean,
  totalProductsInCategory: ?number,
  loading: boolean,
};

type ListingActions = {
  type: string,
  productViewData: ProductData,
  productViewOpen: boolean,
  products: Array<ProductData>,
  productCountStart: number,
  productCountEnd: number,
  status: boolean,
  incrementExistingProducts: boolean,
  totalProductsInCategory: ?number,
};

export default function reducer(state: InitalState = initalState, action: ListingActions = {}) {
  return produce(state, (draft) => {
    switch (action.type) {
      case actionTypes.POPULATE_PRODUCT_VIEW_SUCCESS:
        draft.productViewData = action.productViewData;
        return draft;

      case actionTypes.OPEN_PRODUCT_DETAIL_VIEW_SUCCESS:
        draft.productViewOpen = !draft.productViewOpen;
        return draft;

      case actionTypes.HAS_FILTERS_SET_FROM_CLIENT_SUCCESS:
        draft.hasFiltersSetFromClient = action.status;
        return draft;

      case actionTypes.SET_LOADING_SUCCESS:
        draft.loading = action.status;
        return draft;

      case actionTypes.FETCH_PRODUCTS_LISTING_SUCCESS:
        draft.fetchedProducts = action.incrementExistingProducts
          ? [...draft.fetchedProducts, ...action.products]
          : action.products;

        draft.productCountStart = action.productCountStart;
        draft.productCountEnd = action.productCountEnd;
        draft.totalProductsInCategory = action.totalProductsInCategory;

        return draft;

      case actionTypes.CLEAR_FETCHED_PRODUCTS_SUCCESS:
        draft.fetchedProducts = [];
        draft.totalProductsInCategory = 0;
        draft.hasFiltersSetFromClient = false;
        return draft;

      default:
        return state;
    }
  });
}
