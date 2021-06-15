//@flow
import axios from 'axios';
import gql from 'graphql-tag';
import {
  searchQuery,
  navigationDataQuery,
  cmsQuery,
  brandListQuery,
} from '../../graphQL/graphqlQueries';
import { productSchema, cmsSchema } from '../../graphQL/schemas';
import { storeController, cmsController } from '../controller';
import {
  type ProductSearchApiQuery,
  type ProductApiQuery,
  type NavigationApiQuery,
  type CmsApiQuery,
  type BrandListApiQuery,
} from '@types/apiQueries';
import { type Filters } from '@types/product';
import { type PredictiveSearch } from '@types/search';

// NOTE: this utility is intended for pages making requests via "getServerSideProps"
// TODO: this should really be an axios call.
export default {
  getSearchData: (
    searchValues: PredictiveSearch,
    productCountStart: number,
    productCountEnd: number,
    filters?: Filters
  ): Promise<ProductSearchApiQuery> => {
    const query = gql`
      ${searchQuery}
    `;

    return storeController(query, productSchema, true, {
      ...searchValues,
      ...filters,
      productCountStart,
      productCountEnd,
    });
  },

  getNavigationData: (): Promise<NavigationApiQuery> => {
    const query = gql`
      ${navigationDataQuery}
    `;
    return storeController(query, productSchema, false);
  },

  getCmsContent: (bespokeSections: string): Promise<CmsApiQuery> => {
    const query = gql`
      ${cmsQuery(bespokeSections)}
    `;
    return cmsController(query, cmsSchema);
  },

  getBrandList: (): Promise<BrandListApiQuery> => {
    const query = gql`
      ${brandListQuery}
    `;
    return storeController(query, productSchema, false);
  },
};
