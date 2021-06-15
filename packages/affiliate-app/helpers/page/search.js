//@flow
import { INVALID_SEARCH_PATH } from '@constants/errors';
import camelCase from 'lodash/camelCase';
import isEmpty from 'lodash/isEmpty';
import { type PredictiveSearch, type SearchUrlCase } from '@types/search';
import { type Router } from '@types/next';

const validSearchParams = ['category', 'key-term', 'product-color', 'section', 'brand'];

export function getSearchValues(searchTerms: SearchUrlCase): ?PredictiveSearch {
  if (isEmpty(searchTerms)) throw INVALID_SEARCH_PATH;
  return Object.keys(searchTerms).reduce<Object>(
    (acc, cur) =>
      validSearchParams.includes(cur) ? { ...acc, [camelCase(cur)]: searchTerms[cur] } : acc,
    {}
  );
}

export function getSearchQueryFromUrl(router: Router): string {
  const { query } = router;
  const valuesFromSearch = Object.keys(query).reduce<Object>((acc, cur) => {
    return validSearchParams.includes(cur) ? `${acc}${cur}=${query[cur]}&` : acc;
  }, '?');

  return valuesFromSearch.length > 1 ? valuesFromSearch : '';
}
