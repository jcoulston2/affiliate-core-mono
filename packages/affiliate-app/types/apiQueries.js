//@flow
import { type ProductsData } from './product';
import { type PredictiveSearch } from './search';

export type ProductApiQuery = {
  categoryData: ProductsData,
};
export type ProductSearchApiQuery = {
  searchData: ProductsData,
};

export type NavigationDataItem = {
  section: string,
  data: Array<{
    category: string,
    label: string,
  }>,
};

export type Search = Array<PredictiveSearch>;

export type NavigationData = Array<NavigationDataItem>;

export type NavigationApiQuery = {
  affiliateData: NavigationData,
};

export type CmsApiQuery = {
  cms: CmsData,
};

export type BrandListApiQuery = {
  brandList: Array<string>,
};

// TODO: might be an idea to have typed CMS in here once mature
export type CmsData = Object;
