//@flow
import React from 'react';
import buildRequests from '../../apiUtil/requests/buildRequests';
import { getNavigationProps } from '@helpers/page';
import ListingContent from '@containers/ListingContent';
import { actions } from '../../app/root-actions';
import { wrapper } from '../../app/store';
import PageSkeleton from '@layouts';
import { type StaticPaths } from '@types/next';
import { type Filters } from '@types/product';
import { type WrapperParamsStaticProps } from '@types/redux';
import {
  type CmsApiQuery,
  type NavigationApiQuery,
  type ProductApiQuery,
  type BrandListApiQuery,
} from '../../types/apiQueries';
import { getFilterValues } from '@helpers/page';
import config from '@config';

type ReqDataPromises = [NavigationApiQuery, CmsApiQuery, ProductApiQuery, BrandListApiQuery];

const ListingPage = () => {
  return (
    <PageSkeleton>
      <ListingContent />
    </PageSkeleton>
  );
};

export async function getStaticPaths(): StaticPaths {
  return {
    paths: config.productListingStaticPaths,
    fallback: true,
  };
}

export const getStaticProps = wrapper.getStaticProps(
  async ({ store, params }: WrapperParamsStaticProps): Promise<any> => {
    const homeCmsQuery = 'listingContent, productViewContent, marketing';
    const [section, productType, filterPathKey, filterValues] = params.slug;
    const filters: Filters = getFilterValues(filterPathKey, filterValues);
    const productCountStart = 0;
    const productCountEnd = 100;
    const [navData, cmsData, productData, brandList]: ReqDataPromises = await Promise.all([
      await buildRequests.getNavigationData(),
      await buildRequests.getCmsContent(homeCmsQuery),
      await buildRequests.getProductData(
        section,
        productType,
        productCountStart,
        productCountEnd,
        filters
      ),
      await buildRequests.getBrandList(),
    ]);

    const navigationProps = getNavigationProps(navData);
    store.dispatch(actions.setNavigationData(navigationProps.affiliateData));
    store.dispatch(actions.setProductData(productData.categoryData, filters, {}));
    store.dispatch(actions.setCmsData(cmsData));
    store.dispatch(actions.setBrandList(brandList));
  }
);

export default ListingPage;
