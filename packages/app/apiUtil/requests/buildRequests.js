//@flow
import gql from 'graphql-tag';
import {
  navigationDataQuery,
  cmsQuery,
  productQuery,
  brandListQuery,
} from '../../graphQL/graphqlQueries';
import { productSchema, cmsSchema } from '../../graphQL/schemas';
import { storeController, cmsController } from '../controller';
import {
  type ProductApiQuery,
  type NavigationApiQuery,
  type CmsApiQuery,
  type BrandListApiQuery,
} from '@types/apiQueries';
import { type Filters } from '@types/product';

// NOTE: this utility is intended for pages making requests via any "getStaticProps" / build time requests
export default {
  getProductData: (
    section: string,
    productType: string,
    productCountStart: number,
    productCountEnd: number,
    filters?: Filters
  ): Promise<ProductApiQuery> => {
    const query = gql`
      ${productQuery}
    `;

    return storeController(query, productSchema, true, {
      section,
      productType,
      productCountStart,
      productCountEnd,
      ...filters,
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
