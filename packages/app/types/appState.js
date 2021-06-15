//@flow
import { type NavigationData } from './navigationData';
import { type ProductSection, type ProductData, type Filters } from './product';
import { type PredictiveSearch } from './search';
import { type User } from './user';

export type BenefitBarData = {
  isVisible: boolean,
  items: Array<{
    copy: string,
    icon: string,
  }>,
};

/**
 * :::::::::::::::::::::::::::::::::::
 * @info HeaderState
 * :::::::::::::::::::::::::::::::::::
 *
 */

export type HeaderState = {
  mobileMenuOpen: boolean,
  navigationData: NavigationData,
  benefitBarData: BenefitBarData,
};

/**
 * :::::::::::::::::::::::::::::::::::
 * @info Listing content State
 * :::::::::::::::::::::::::::::::::::
 */

export type ListingContentState = {
  productViewData: ProductData,
  productViewOpen: boolean,
  fetchedProducts: Array<ProductData>,
  hasFiltersSetFromClient: boolean,
  totalProductsInCategory: ?number,
  loading: boolean,
};

/**
 * :::::::::::::::::::::::::::::::::::
 * @info User State
 * :::::::::::::::::::::::::::::::::::
 */

export type UserSettingsState = {
  user: User,
};

/**
 * :::::::::::::::::::::::::::::::::::
 * @info User State
 * :::::::::::::::::::::::::::::::::::
 */

export type WishListState = {
  savedProducts: Array<ProductData>,
  savedProductLinks: Array<string>,
};

/**
 * :::::::::::::::::::::::::::::::::::
 * @info Pwa
 * :::::::::::::::::::::::::::::::::::
 */

export type PwaState = {
  isPwaInitiated: boolean,
};

/**
 * :::::::::::::::::::::::::::::::::::
 * @info Server build time state
 * :::::::::::::::::::::::::::::::::::
 */
export type BuildTimeState = {
  navigationData: NavigationData,
  productData: ProductSection,
  cmsData: Object,
  productFilters: Filters,
  productSearchValues: PredictiveSearch,
  brands: Array<string>,
};

/**
 * :::::::::::::::::::::::::::::::::::
 * @info Global app state
 * :::::::::::::::::::::::::::::::::::
 */
export type GlobalAppState = {
  clientWidth: number,
  mobileMenuOpen: boolean,
};

/**
 * :::::::::::::::::::::::::::::::::::
 * @info All state
 * :::::::::::::::::::::::::::::::::::
 */

export type GlobalState = {
  globalAppState: GlobalAppState,
  headerState: HeaderState,
  buildTimeState: BuildTimeState,
  listingContentState: ListingContentState,
  userSettingsState: UserSettingsState,
  wishListState: WishListState,
  pwaState: PwaState,
};
