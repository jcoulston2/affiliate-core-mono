//@flow
import { actionTypes } from '../root-actions';
import produce from 'immer';
import { HYDRATE } from 'next-redux-wrapper';
import { type NavigationData, type CmsData } from '../../types/apiQueries';
import { type ProductSection, type Filters } from '../../types/product';
import { type PredictiveSearch } from '../../types/search';
import { type BuildTimeState } from '../../types/appState';
import initialBuildTimeState from '../initialBuildTimeState';

type BuildTimeActions = {
  type: string,
  payload?: {
    buildTimeState: BuildTimeState,
  },
  navigationData?: NavigationData,
  productData?: ProductSection,
  productFilters?: Filters,
  productSearchValues?: PredictiveSearch,
  cmsData?: CmsData,
  brands: {
    brandList: Array<string>,
  },
};

export default function buildTimeState(
  state: BuildTimeState = initialBuildTimeState,
  action: BuildTimeActions
) {
  return produce((state: BuildTimeState), (draft: Object) => {
    switch (action.type) {
      case HYDRATE: {
        if (!action.payload) return draft;

        const {
          buildTimeState: {
            navigationData,
            cmsData,
            productData,
            productFilters,
            productSearchValues,
            brands,
          },
        } = action.payload;
        draft.navigationData = navigationData;
        draft.cmsData = cmsData;
        draft.productData = productData;
        draft.productFilters = productFilters;
        draft.productSearchValues = productSearchValues;
        draft.brands = brands;
        return draft;
      }

      case actionTypes.SET_CMS_DATA:
        draft.cmsData = action.cmsData;
        return draft;

      case actionTypes.SET_NAVIGATION_DATA:
        draft.navigationData = action.navigationData;
        return draft;

      case actionTypes.SET_PRODUCT_DATA:
        draft.productData = action.productData;
        draft.productFilters = action.productFilters;
        draft.productSearchValues = action.productSearchValues;
        return draft;

      case actionTypes.SET_BRAND_LIST:
        draft.brands = action.brands?.brandList || [];
        return draft;

      default:
        return state;
    }
  });
}
