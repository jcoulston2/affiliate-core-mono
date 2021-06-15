import productListingPaths from './staticPaths/productListingPaths';
import cmsPaths from './staticPaths/cmsPaths';

// TODO: Will eventually be moved to the monorepo as a unified config
export default {
  productListingStaticPaths: productListingPaths,
  cmsStaticPaths: cmsPaths,
  brandName: 'Fliik',
  host: 'https://www.fliik.co.uk/',
};
