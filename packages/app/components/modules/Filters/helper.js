//@flow
import { type NormalizeFiltersInput, type NormalizeFiltersOutput } from './types';
import { type NavigationData } from '@types/navigationData';
import { type Router } from '@types/next';
import { deDupeArray, urlCase } from '@helpers/common';
import { SEARCH_PATH } from '@constants';

export function addUrlPart(
  name: string,
  value: string | number,
  partsArray: Array<string>
): Array<string> {
  // remove any existing params for a given name to be overwritten
  const parts = partsArray.filter((item) => item && !item.includes(name));
  parts.push(`${name}=${value}`);
  return parts;
}

export function addExistingUrlParts(productUrl: string, productUrlParams: Object): Array<string> {
  if (!productUrl) return [];
  const query = productUrlParams?.search;
  return query?.replace(/^\?/, '').split('&') || [];
}

export function createUrlFilters(
  {
    priceSort,
    priceThresholdLow,
    priceThresholdHigh,
    keyWords,
    saleThreshold,
    brands,
    section,
    category,
  }: NormalizeFiltersOutput,
  productUrl: string,
  isSearchPage: boolean
): void {
  const origin = window.location.origin;
  const productUrlParams = new URL(`${origin}${productUrl}`);
  const productUrlPath = productUrlParams.pathname;
  const queryJoiner = isSearchPage ? '?' : '';
  let urlParts = addExistingUrlParts(productUrl, productUrlParams);

  if (priceSort) {
    urlParts = addUrlPart('price-sort', priceSort, urlParts);
  }

  if (priceThresholdLow) {
    urlParts = addUrlPart('price-threshold-low', priceThresholdLow, urlParts);
  }

  if (priceThresholdHigh) {
    urlParts = addUrlPart('price-threshold-high', priceThresholdHigh, urlParts);
  }

  if (keyWords?.length) {
    urlParts = addUrlPart('key-words', keyWords.join(','), urlParts);
  }

  if (brands?.length) {
    urlParts = addUrlPart('brands', brands.join(','), urlParts);
  }

  if (saleThreshold && parseInt(saleThreshold)) {
    urlParts = addUrlPart('sale-threshold', saleThreshold, urlParts);
  }

  if (category?.length) {
    urlParts = addUrlPart('category', category.join(','), urlParts);
  }

  if (section) {
    urlParts = addUrlPart('section', section, urlParts);
  }

  const filterPath = urlParts.length ? `${urlParts.join('&')}` : '';
  window.history.replaceState({}, null, `${productUrlPath}${queryJoiner}${filterPath}`);
}

export function normalizeFilters(
  {
    priceSort,
    priceThreshold,
    keyWords,
    saleThreshold,
    scaler,
    hasTouchedSlider,
    brands,
    section,
    category,
  }: NormalizeFiltersInput,
  isSearchPage: boolean
): NormalizeFiltersOutput {
  const [min, max] = priceThreshold;
  const isMinSetting = min === 0;
  const isMaxSetting = max === 100;
  const minPrice = hasTouchedSlider && !isMinSetting ? min * scaler : null;
  const maxPrice = hasTouchedSlider && !isMaxSetting ? max * scaler : null;
  const searchSpecificFilters = isSearchPage
    ? { section, category: category?.length ? category : null }
    : {};

  return {
    priceThresholdLow: minPrice,
    priceThresholdHigh: maxPrice,
    priceSort: priceSort === 'recommended' ? null : priceSort,
    keyWords: keyWords?.length ? keyWords : null,
    brands: brands?.length ? brands : null,
    saleThreshold: parseInt(saleThreshold),
    ...searchSpecificFilters,
  };
}

export function getNumberOfFiltersSelected(filters: NormalizeFiltersOutput): number {
  return Object.keys(filters).filter((key) => {
    const filterValue = filters[key];
    return !!filterValue && filterValue !== 'recommended';
  }).length;
}

// TODO: this helper is not fully "white labeled" given we are looking at the first item in the "subNav"
// array. For different "labels", this will have to be rewritten
export function getCategoryFilters(section: string, categoryData: NavigationData): Array<string> {
  if (!categoryData) return [];
  if (section) {
    const sectionData = categoryData.find((sec) => sec.title === section);
    return sectionData?.subNav[0]?.subNavItems.map((item) => item.title) || [];
  } else {
    const allItems: any = categoryData?.map(
      (sec) => sec?.subNav && sec?.subNav[0]?.subNavItems.map((item) => item.title)
    );
    return deDupeArray(allItems?.flat() || []);
  }
}

export function getSectionFilters(section: string, categoryData: NavigationData): Array<string> {
  return categoryData?.map((sec) => sec.title) || [];
}

export function sortSelectedCheckboxes(fullList: any, selectedList: Array<string>): Array<string> {
  return fullList.sort((item: any) => {
    if (selectedList.includes(urlCase(item))) {
      return -1;
    }
  });
}

export function isSearch(router: Router): boolean {
  return router.pathname.includes(SEARCH_PATH);
}
