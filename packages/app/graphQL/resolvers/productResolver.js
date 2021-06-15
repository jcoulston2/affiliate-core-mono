//@flow
import { MultiString } from '../customScalars';
import { type ProductsData, type ProductData, type ProductCategory } from '@types/product';
import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import { type ProductQueryInputArguments } from '../../types/graphQl';
import { getCategoryLastUpdated, traverseAllProducts } from './helper';
import {
  searchPipe,
  productCountPipe,
  searchResultShapePipe,
  categoryPipe,
  filterPipe,
} from './resolverPipes';

type ProductResolver = {
  categoryData: Function,
  JSON: Object,
  MultiString: Object,
  JSONObject: Object,
};

export default function productResolver(affiliateData: ProductsData): ProductResolver {
  const scalars = {
    MultiString,
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
  };

  return {
    ...scalars,

    searchData: ({
      productCountStart,
      productCountEnd,
      category,
      keyTerm,
      productColor,
      section,
      brand,
      ...filters
    }: ProductQueryInputArguments) => {
      let productData;
      const lastUpdated = getCategoryLastUpdated(affiliateData, section, category) || null;

      productData = searchPipe<Array<ProductData>>(affiliateData, {
        category,
        keyTerm,
        productColor,
        section,
        brand,
      });

      productData = searchResultShapePipe<Array<ProductCategory>>(productData, lastUpdated);
      productData = filterPipe<Array<ProductCategory>>(productData, filters);
      productData = productCountPipe<Array<ProductCategory>>(
        productData,
        productCountStart,
        productCountEnd
      );

      return { section: 'Search', data: productData };
    },

    categoryData: ({
      section,
      productCountStart,
      productCountEnd,
      productType,
      ...filters
    }: ProductQueryInputArguments) => {
      let productData;
      productData = categoryPipe<Array<ProductCategory>>(affiliateData, section, productType);
      productData = filterPipe<Array<ProductCategory>>(productData, filters);

      productData = productCountPipe<Array<ProductCategory>>(
        productData,
        productCountStart,
        productCountEnd
      );

      return { section, data: productData };
    },

    affiliateData: (): ProductsData => {
      return affiliateData;
    },

    brandList: (): Array<string> => {
      const brands = [];
      traverseAllProducts(affiliateData, {
        level: 'product',
        cb: (product: ProductData) => {
          const { brand } = product.metaData;
          if (!brands.includes(brand)) brands.push(brand);
        },
      });

      return brands;
    },
  };
}
