//@flow
import gql from 'graphql-tag';
import { PRODUCTS_API_END_POINT, PREDICTIVE_SEARCH_API_END_POINT } from '@constants';
import { productQuery, searchQuery } from '../../graphQL/graphqlQueries';
import { type ProductApiQuery, type Search } from '@types/apiQueries';
import { type PredictiveSearch } from '@types/search';
import { type Filters } from '@types/product';
import proxy from '../proxy';

// NOTE: this utility is intended for pages making requests via any client side requests. We should never include the store
// cache in this file as it will be included inside the JS bundle
export default {
  getProductData: (
    section: string,
    productType: string,
    productCountStart: number,
    productCountEnd: number,
    filters?: Filters
  ): Promise<ProductApiQuery> => {
    const query = `${productQuery}`;
    return proxy().graphQl(PRODUCTS_API_END_POINT, query, {
      section,
      productType,
      productCountStart,
      productCountEnd,
      ...filters,
    });
  },

  getSearchData: (
    searchValues: $Exact<PredictiveSearch>,
    productCountStart: number,
    productCountEnd: number,
    filters?: Filters
  ): Promise<ProductApiQuery> => {
    const query = `${searchQuery}`;

    return proxy().graphQl(PRODUCTS_API_END_POINT, query, {
      ...searchValues,
      ...filters,
      productCountStart,
      productCountEnd,
    });
  },

  getPredictiveSearch: async (keyTerm: string): Promise<Search> => {
    const result = await proxy().get(PREDICTIVE_SEARCH_API_END_POINT, `?terms=${keyTerm}`, {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    });

    return result.data;
  },
};
