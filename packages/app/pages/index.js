//@flow
import React from 'react';
import buildRequests from '../apiUtil/requests/buildRequests';
import { getNavigationProps } from '@helpers/page';
import PageSkeleton from '@layouts';
import LandingContent from '@containers/LandingContent';
import { actions } from '../app/root-actions';
import { wrapper } from '../app/store';
import {
  type CmsApiQuery,
  type NavigationApiQuery,
  type BrandListApiQuery,
} from '../types/apiQueries';
import { type WrapperParamsStaticProps } from '../types/redux';

type ReqDataPromises = [NavigationApiQuery, CmsApiQuery, BrandListApiQuery];

const Home = () => {
  return (
    <PageSkeleton>
      <LandingContent />
    </PageSkeleton>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  async ({ store }: WrapperParamsStaticProps): Promise<any> => {
    const homeCmsQuery = 'listingContent, landingContent, marketing';
    const [navData, cmsData, brandList]: ReqDataPromises = await Promise.all([
      await buildRequests.getNavigationData(),
      await buildRequests.getCmsContent(homeCmsQuery),
      await buildRequests.getBrandList(),
    ]);

    const navigationProps = getNavigationProps(navData);
    store.dispatch(actions.setNavigationData(navigationProps.affiliateData));
    store.dispatch(actions.setCmsData(cmsData));
    store.dispatch(actions.setBrandList(brandList));
  }
);

export default Home;
