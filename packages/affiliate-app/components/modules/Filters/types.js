//@flow
import { type Filters as FilterType } from '@types/product';
import { type PredictiveSearch } from '@types/search';
import { type CmsCopy, type CmsResponsiveString } from '@types/Cms';

export type NormalizeFiltersInput = {
  priceSort?: 'high' | 'low' | 'recommended',
  priceThreshold: [number, number],
  keyWords?: Array<string>,
  brands?: Array<string>,
  category?: Array<string>,
  section?: string,
  saleThreshold?: ?number,
  scaler: number,
  hasTouchedSlider: ?boolean,
};

export type NormalizeFiltersOutput = {
  priceSort?: ?'high' | 'low' | 'recommended',
  priceThresholdLow?: ?number,
  priceThresholdHigh?: ?number,
  keyWords?: ?Array<string>,
  brands?: ?Array<string>,
  category?: ?Array<string>,
  section?: ?string,
  saleThreshold?: ?number,
};

export type FilterMethods = {
  setPriceSort: Function,
  setPriceThreshold: Function,
  setKeyWords: Function,
  setBrands: Function,
  setSaleThreshold: Function,
  setFilterDrawOpen: Function,
  setHasTouchedSlider: Function,
  triggerFilterRefresh: Function,
  setCategoryData: Function,
};

export type FilterCms = {
  productFiltersContent: {
    filterWrapperPadding: CmsResponsiveString,
    filterWrappeMaxWidth: number,
    filterCardTitle: CmsCopy,
    filterItemTitle: CmsCopy,
    sliderPriceScaleMultiplier: number,
    keyWordsTooltipText: string,
    keyWordsInputLabel: string,
  },
};

export type FiltersData = {
  section?: string,
  category?: string | Array<string>,
  productFilters: FilterType,
  productSearchValues: PredictiveSearch,
  fetchProducts: Function,
  fetchProductsInSearch: Function,
  setClientFilterStatus: Function,
  setLoading: Function,
  scaler: number,
  normalizedFilters: NormalizeFiltersOutput,
  filterDrawOpen: boolean,
  hasTouchedSlider: boolean,
  filterRefresh: boolean,
  priceThreshold: Array<number>,
  priceSort: string,
  keyWords: Array<string>,
  brands: Array<string>,
  saleThreshold: number,
  useFilterSelectedNotifcation: boolean,
};

export type FiltersComponentProps = {
  ...FiltersData,
  ...FilterMethods,
  ...FilterCms,
};
