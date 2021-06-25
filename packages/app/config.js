import { staticPaths as productListingPaths } from '@affiliate-master/store';
import { appConfig } from '@affiliate-master/config';
import cmsPaths from './staticPaths/cmsPaths';

// TODO: Will eventually be moved to the monorepo as a unified config
export default {
  productListingStaticPaths: productListingPaths,
  cmsStaticPaths: cmsPaths,
  ...appConfig,
};
