//@flow
import React from 'react';
import serverSideRequests from '../../apiUtil/requests/serverSideRequests';
import { getNavigationProps } from '@helpers/page';
import ListingContent from '@containers/ListingContent';
import { actions } from '../../app/root-actions';
import { wrapper } from '../../app/store';
import PageSkeleton from '@layouts';
import {
  type CmsApiQuery,
  type NavigationApiQuery,
  type ProductSearchApiQuery,
  type BrandListApiQuery,
} from '../../types/apiQueries';
import { getSearchValues, getFilterValuesFromSearchUrl } from '@helpers/page';
import { type WrapperParamsServerSideProps } from '../../types/redux';
import { type PredictiveSearch } from '../../types/search';
import { type Filters } from '../../types/product';

type ReqDataPromises = [NavigationApiQuery, CmsApiQuery, ProductSearchApiQuery, BrandListApiQuery];

const SearchPage = () => {
  return (
    <PageSkeleton>
      <ListingContent />
    </PageSkeleton>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store, req, query }: WrapperParamsServerSideProps): Promise<any> => {
    const homeCmsQuery = 'listingContent, productViewContent';
    const searchValues: $Exact<PredictiveSearch> = getSearchValues(query || req.query, req);
    const searchFilters: Filters = getFilterValuesFromSearchUrl(query || req.query);
    const productCountStart = 0;
    const productCountEnd = 100;
    const [navData, cmsData, productData, brandList]: ReqDataPromises = await Promise.all([
      await serverSideRequests.getNavigationData(),
      await serverSideRequests.getCmsContent(homeCmsQuery),
      await serverSideRequests.getSearchData(
        searchValues,
        productCountStart,
        productCountEnd,
        searchFilters
      ),
      await serverSideRequests.getBrandList(),
    ]);

    const navigationProps = getNavigationProps(navData);
    store.dispatch(actions.setNavigationData(navigationProps.affiliateData));
    store.dispatch(actions.setProductData(productData.searchData, searchFilters, searchValues));
    store.dispatch(actions.setCmsData(cmsData));
    store.dispatch(actions.setBrandList(brandList));
  }
);

export default SearchPage;
