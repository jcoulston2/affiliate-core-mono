//@flow
import { type NavigationData, type CmsData } from '../types/apiQueries';
import { type ProductsData, type Filters } from '../types/product';
import { type PredictiveSearch } from '@types/search';
import { type ActionPartial } from '../types/redux';

export const actionTypes = {
  SET_CLIENT_WIDTH: 'SET_CLIENT_WIDTH',
  SET_CMS_DATA: 'SET_CMS_DATA',
  SET_NAVIGATION_DATA: 'SET_NAVIGATION_DATA',
  SET_PRODUCT_DATA: 'SET_PRODUCT_DATA',
  SET_BRAND_LIST: 'SET_BRAND_LIST',
};

export const actions = {
  setClientWidth: function (clientWidth: number): ActionPartial {
    return {
      type: actionTypes.SET_CLIENT_WIDTH,
      clientWidth,
    };
  },

  setCmsData: function (cmsData: CmsData): ActionPartial {
    return {
      type: actionTypes.SET_CMS_DATA,
      cmsData,
    };
  },

  setNavigationData: function (navigationData: NavigationData): ActionPartial {
    return {
      type: actionTypes.SET_NAVIGATION_DATA,
      navigationData,
    };
  },

  setBrandList: function (brands: { brandList: Array<string> }): ActionPartial {
    return {
      type: actionTypes.SET_BRAND_LIST,
      brands,
    };
  },

  setProductData: function (
    productData: ProductsData,
    productFilters: Filters,
    productSearchValues: PredictiveSearch
  ): ActionPartial {
    return {
      type: actionTypes.SET_PRODUCT_DATA,
      productData,
      productFilters,
      productSearchValues,
    };
  },
};
