//@flow
import { SEARCH_PATH, PLP_PATH, INVALID_FILTER_PATH } from '@constants';
import { isStringInt, navigateToPageRefresh } from '@helpers/common';
import { getSearchQueryFromUrl } from '@helpers/page';
import { type Filters } from '@types/product';
import { type SearchUrlCase } from '@types/search';
import camelCase from 'lodash/camelCase';
import { type Router } from '@types/next';

type SearchAndFilters = {
  ...$Exact<SearchUrlCase>,
  ...Filters,
};

const validFilters = [
  'price-sort',
  'price-threshold-low',
  'price-threshold-high',
  'key-words',
  'sale-threshold',
  'brands',
  'section',
  'category',
];

export function toFilterArray(str: string): Array<string> {
  return str.replace(/\s/g, '').split('&');
}

export function normalizeFilterValue(value: string): string | Array<string> | number {
  if (value.includes(',')) {
    return value.split(',');
  } else if (isStringInt(value)) {
    return parseInt(value);
  } else {
    return value;
  }
}

export function getFilterValues(filterkey: ?'filter', filterValues: ?string): Object {
  if (filterkey === 'filter' && filterValues) {
    return toFilterArray(filterValues).reduce((acc, cur) => {
      let [key, value] = cur.split('=');
      return validFilters.includes(key)
        ? { ...acc, [camelCase(key)]: normalizeFilterValue(value) }
        : acc;
    }, {});
  } else if (!filterkey) {
    return {};
  } else {
    throw INVALID_FILTER_PATH;
  }
}

export function getFilterValuesFromSearchUrl(searchTerms: SearchAndFilters): ?Filters {
  return Object.keys(searchTerms).reduce<Object>((acc, cur: any) => {
    const value = normalizeFilterValue(searchTerms[cur]);
    return validFilters.includes(cur) ? { ...acc, [camelCase(cur)]: value } : acc;
  }, {});
}

export function getFiltersFromUrl(): ?Filters {
  if (typeof window === 'undefined') return null;
  const [filterMatch] = window.location.href.match(/\/filter\/(.*)|\/params?(.*)/g) || [];
  const urlFilterValues = filterMatch && filterMatch.replace(/\/filter\/|\/params\?/, '');
  return urlFilterValues ? getFilterValues('filter', urlFilterValues) : null;
}

export function getFilterPlpBasePath(router: Router): string {
  const isSearchPage = router.pathname.includes(SEARCH_PATH);
  if (isSearchPage) {
    return `/${SEARCH_PATH}${getSearchQueryFromUrl(router)}`;
  } else {
    const [section, productType] = router.query.slug;
    return `/${PLP_PATH}/${section}/${productType}/filter/`;
  }
}

export function pushFilterPlpBasePath(router: Router): void {
  const basePath = getFilterPlpBasePath(router);
  navigateToPageRefresh(basePath);
}
