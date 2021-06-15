//@flow
import { type ActionPartial } from '@types/redux';
import { type ProductData, type Filters } from '@types/product';
import { type PredictiveSearch } from '@types/search';

export const actionTypes = {
  POPULATE_PRODUCT_VIEW: 'POPULATE_PRODUCT_VIEW',
  POPULATE_PRODUCT_VIEW_SUCCESS: 'POPULATE_PRODUCT_VIEW_SUCCESS',
  OPEN_PRODUCT_DETAIL_VIEW: 'OPEN_PRODUCT_DETAIL_VIEW',
  OPEN_PRODUCT_DETAIL_VIEW_SUCCESS: 'OPEN_PRODUCT_DETAIL_VIEW_SUCCESS',
  FETCH_PRODUCTS_LISTING: 'FETCH_PRODUCTS_LISTING',
  FETCH_PRODUCTS_LISTING_SUCCESS: 'FETCH_PRODUCTS_LISTING_SUCCESS',
  FETCH_PRODUCTS_IN_SEARCH: 'FETCH_PRODUCTS_IN_SEARCH',
  HAS_FILTERS_SET_FROM_CLIENT: 'HAS_FILTERS_SET_FROM_CLIENT',
  HAS_FILTERS_SET_FROM_CLIENT_SUCCESS: 'HAS_FILTERS_SET_FROM_CLIENT_SUCCESS',
  SET_LOADING: 'SET_LOADING',
  SET_LOADING_SUCCESS: 'SET_LOADING_SUCCESS',
  CLEAR_FETCHED_PRODUCTS: 'CLEAR_FETCHED_PRODUCTS',
  CLEAR_FETCHED_PRODUCTS_SUCCESS: 'CLEAR_FETCHED_PRODUCTS_SUCCESS',
};

export const actions = {
  populateProductView: (productViewData: ProductData): ActionPartial => ({
    type: actionTypes.POPULATE_PRODUCT_VIEW,
    productViewData,
  }),
  populateProductViewSuccess: (productViewData: ProductData): ActionPartial => ({
    type: actionTypes.POPULATE_PRODUCT_VIEW_SUCCESS,
    productViewData,
  }),

  openProductDetailView: (): ActionPartial => ({
    type: actionTypes.OPEN_PRODUCT_DETAIL_VIEW,
  }),

  openProductDetailViewSuccess: (): ActionPartial => ({
    type: actionTypes.OPEN_PRODUCT_DETAIL_VIEW_SUCCESS,
  }),

  setLoading: (status: boolean): ActionPartial => ({
    type: actionTypes.SET_LOADING,
    status,
  }),

  setLoadingSuccess: (status: boolean): ActionPartial => ({
    type: actionTypes.SET_LOADING_SUCCESS,
    status,
  }),

  setClientFilterStatus: (status: boolean): ActionPartial => ({
    type: actionTypes.HAS_FILTERS_SET_FROM_CLIENT,
    status,
  }),

  setClientFilterStatusSuccess: (status: boolean): ActionPartial => ({
    type: actionTypes.HAS_FILTERS_SET_FROM_CLIENT_SUCCESS,
    status,
  }),

  clearClientFetchedProducts: () => ({ type: actionTypes.CLEAR_FETCHED_PRODUCTS }),

  clearClientFetchedProductsSuccess: () => ({ type: actionTypes.CLEAR_FETCHED_PRODUCTS_SUCCESS }),

  fetchProducts: (
    section: string,
    productType: string,
    productCountStart: number,
    productCountEnd: number,
    filters: Filters,
    incrementExistingProducts: boolean = false
  ): ActionPartial => ({
    type: actionTypes.FETCH_PRODUCTS_LISTING,
    section,
    productType,
    productCountStart,
    productCountEnd,
    filters,
    incrementExistingProducts,
  }),

  fetchProductsSuccess: (
    products: Array<ProductData>,
    productCountStart: number,
    productCountEnd: number,
    incrementExistingProducts: boolean,
    totalProductsInCategory: number
  ): ActionPartial => ({
    type: actionTypes.FETCH_PRODUCTS_LISTING_SUCCESS,
    products,
    productCountStart,
    productCountEnd,
    incrementExistingProducts,
    totalProductsInCategory,
  }),

  fetchProductsInSearch: (
    searchValues: PredictiveSearch,
    productCountStart: number,
    productCountEnd: number,
    searchFilters: Filters,
    incrementExistingProducts: boolean = false
  ): ActionPartial => ({
    type: actionTypes.FETCH_PRODUCTS_IN_SEARCH,
    searchValues,
    productCountStart,
    productCountEnd,
    searchFilters,
    incrementExistingProducts,
  }),
};
