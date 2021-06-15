//@flow
import React from 'react';
import buildRequests from '../apiUtil/requests/buildRequests';
import { getNavigationProps } from '@helpers/page';
import Brochureware from '@containers/Brochureware';
import { actions } from '../app/root-actions';
import { wrapper } from '../app/store';
import PageSkeleton from '@layouts';
import { type StaticPaths } from '@types/next';
import {
  type CmsApiQuery,
  type NavigationApiQuery,
  type BrandListApiQuery,
} from '@types/apiQueries';
import { type WrapperParamsStaticProps } from '@types/redux';
import config from '@config';
import camelCase from 'lodash/camelCase';

type ReqDataPromises = [NavigationApiQuery, CmsApiQuery, BrandListApiQuery];

const ListingPage = () => {
  return (
    <PageSkeleton>
      <Brochureware />
    </PageSkeleton>
  );
};

export async function getStaticPaths(): StaticPaths {
  return {
    paths: config.cmsStaticPaths,
    fallback: false,
  };
}

export const getStaticProps = wrapper.getStaticProps(
  async ({ store, params }: WrapperParamsStaticProps): Promise<any> => {
    const cmsQuery = `listingContent ${camelCase(params.cms)}`;
    const [navData, cmsData, brandList]: ReqDataPromises = await Promise.all([
      await buildRequests.getNavigationData(),
      await buildRequests.getCmsContent(cmsQuery),
      await buildRequests.getBrandList(),
    ]);

    const navigationProps = getNavigationProps(navData);
    store.dispatch(actions.setNavigationData(navigationProps.affiliateData));
    store.dispatch(actions.setCmsData(cmsData));
    store.dispatch(actions.setBrandList(brandList));
  }
);

export default ListingPage;
