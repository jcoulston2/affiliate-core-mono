export default {
  initialProductsPerPage: 70,
  listingContentInnerPadding: {
    desktop: '0.2rem 0.2rem 2rem 0.2rem',
    tablet: '0.2rem 0.2rem 2rem 0.2rem',
  },
  listingContentInnerMaxWidth: '1400px',
  productTileCardContainer: {
    padding: {
      mobile: '15px 5px',
      tablet: '20px 10px',
      desktop: '20px 20px',
    },
    margin: {
      mobile: 'initial',
      tablet: 'initial',
      desktop: 'initial',
    },
    grid: {
      xs: 6,
      sm: 6,
      md: 4,
      lg: 4,
      xl: 3,
    },
  },

  productTileCard: {
    overflow: 'hidden',
    padding: {
      mobile: '0px',
      tablet: '0px',
      desktop: '0px',
    },
  },

  // This is the inner wrapper around product name and price etc.
  // This should be set to null if we have defined padding for the
  // card above.
  productTileCardDetails: {
    padding: {
      mobile: '10px',
      tablet: '12px',
      desktop: '12px',
    },
  },

  productTitle: {
    mobile: { size: 15, weight: 400, margin: '0.5em 0 1.5em 0' },
    tablet: { size: 15, weight: 400, margin: '0.5em 0 1.5em 0' },
    desktop: { size: 16, weight: 400, margin: '0.5em 0 1.5em 0' },
  },
  productsPerRowMobile: 2 /** 1 or 2 allowed */,
  tileSidePadding: '0.4rem',

  // Price
  priceCopy: {
    mobile: { size: 14, weight: 500, color: 'primary' },
    tablet: { size: 15, weight: 500, color: 'primary' },
    desktop: { size: 16, weight: 500, color: 'primary' },
  },

  // new Price
  newPriceCopy: {
    mobile: { weight: 500, size: 14, color: '#32C08D' },
    tablet: { weight: 500, size: 15, color: '#32C08D' },
    desktop: { weight: 500, size: 16, color: '#32C08D' },
  },

  // was Price
  wasPriceCopy: {
    mobile: { weight: 400, size: 13, color: '#C5C5C5', margin: '0em 0 0.5em 0' },
    tablet: { weight: 400, size: 14, color: '#C5C5C5', margin: '0em 0 0.5em 0' },
    desktop: { weight: 400, size: 15, color: '#C5C5C5', margin: '0em 0 0.5em 0' },
  },

  loadMoreProductsButton: {
    primary: true,
    secondary: false,
    color: null /* reverts to theme settings unless color specifieid*/,
    bgColor: null,
    fullWidth: true,
    size: 'large',
    maxWidth: '500px',
    text: 'Load more',
    copy: {
      mobile: { size: null, weight: 400, color: '#fff' },
      tablet: { size: null, weight: 400, color: '#fff' },
      desktop: { size: null, weight: 400, color: '#fff' },
    },
  },

  loadMoreProductsCopy: {
    desktop: { weight: 400, color: 'primary', margin: '30px 0 0 0', textAlign: 'center' },
  },

  noMoreProductsCopy: {
    mobile: {
      size: 17,
      weight: 300,
      color: '#797777',
      padding: '47px',
      textAlign: 'center',
      lineHeight: '27px',
    },
    tablet: {
      size: 17,
      weight: 300,
      color: '#797777',
      padding: '60px',
      textAlign: 'center',
      lineHeight: '27px',
    },
    desktop: {
      size: 18,
      weight: 300,
      color: '#797777',
      padding: '60px 120px',
      textAlign: 'center',
      lineHeight: '34px',
    },
  },

  flickViewTitleText: 'Fliik view',
  flickViewTitleCopy: {
    mobile: { size: 30, textAlign: 'center', weight: 400, margin: '0px 0px 1em 0px' },
    desktop: { size: 40, textAlign: 'center', weight: 400, margin: '0px 0px 1em 0px' },
    useDecorator: true,
  },

  noMoreProductsCopyText:
    "It looks like there are no more products to show right now but we're always updating our product listings with additional new content every week! ",

  noSearchResultText:
    "Oh no! It looks there are no products to show right now. Sit tight though, we're always adding more content.",
};
