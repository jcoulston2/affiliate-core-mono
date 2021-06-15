//@flow
import React from 'react';
import buildRequests from '../apiUtil/requests/buildRequests';
import { getNavigationProps } from '@helpers/page';
import PageSkeleton from '@layouts';
import { actions } from '../app/root-actions';
import { wrapper } from '../app/store';
import {
  type CmsApiQuery,
  type NavigationApiQuery,
  type BrandListApiQuery,
} from '../types/apiQueries';
import { type WrapperParamsStaticProps } from '../types/redux';
import Typography from '@units/Typography';
import Grid from '@material-ui/core/Grid';
import { FullHeightGrid, Spacer } from '@styles/CommonStyledComponents';
import Button from '@units/Button';
import router from 'next/router';
import { HOME_PATH } from '@constants';

type ReqDataPromises = [NavigationApiQuery, CmsApiQuery, BrandListApiQuery];

const Oops = () => {
  return (
    <PageSkeleton>
      <FullHeightGrid container alignItems="center" height={'90vh'} padding={'40px'}>
        <Grid xs={12}>
          <Grid item xs={12} container justify="center" alignItems="center">
            <Typography
              tag="h2"
              color="secondary"
              size={80}
              weight={300}
              margin={'0 0 0.5em 0'}
              textAlign="center">
              404
            </Typography>
          </Grid>
          <Grid item xs={12} container justify="center" alignItems="center">
            <Typography tag="p" size={17} textAlign="center">
              Oops. Looks like this page could not be found
            </Typography>
          </Grid>
          <Spacer h={18} />
          <Grid item xs={12} container justify="center" alignItems="center">
            <Button
              secondary
              onClick={(): void => {
                router.push(HOME_PATH);
              }}>
              Take me home
            </Button>
          </Grid>
        </Grid>
      </FullHeightGrid>
    </PageSkeleton>
  );
};

export const getStaticProps = wrapper.getStaticProps(
  async ({ store }: WrapperParamsStaticProps): Promise<any> => {
    const oopsCmsQuery = 'listingContent';
    const [navData, cmsData, brandList]: ReqDataPromises = await Promise.all([
      await buildRequests.getNavigationData(),
      await buildRequests.getCmsContent(oopsCmsQuery),
      await buildRequests.getBrandList(),
    ]);

    const navigationProps = getNavigationProps(navData);
    store.dispatch(actions.setNavigationData(navigationProps.affiliateData));
    store.dispatch(actions.setCmsData(cmsData));
    store.dispatch(actions.setBrandList(brandList));
  }
);

export default Oops;
