export default {
  // Generic
  includeWishList: true,

  productViewGoBackCopy: {
    mobile: { size: 15, weight: 300, color: 'white', padding: '0.5em' },
    tablet: { size: 15, weight: 300, color: 'white', padding: '0.5em' },
    desktop: { size: 15, weight: 300, color: 'white', padding: '0.5em' },
  },

  productViewGoBackText: 'Back',
  productViewGoBackBgColor: 'black',

  // images
  includeImageDots: true,
  imageDotsShape: 'circle' /** circle or square */,

  // Common label
  commonLabel: {
    mobile: { size: null, weight: 400 },
    tablet: { size: null, weight: 500 },
    desktop: { size: null, weight: 500 },
  },

  // Product Card
  productCardPadding: {
    mobile: '20px',
    tablet: '30px',
    desktop: '30px',
  },

  // Product name
  productName: {
    mobile: { size: null, weight: 500 },
    tablet: { size: null, weight: 500 },
    desktop: { size: null, weight: 500 },
  },

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

  // Selected Color
  productSelectedColorLabelText: 'Color',
  productSelectedColor: {
    mobile: { size: 15 },
    tablet: { size: 15 },
    desktop: { size: 15 },
  },

  // Product variants data
  productVariantDataCopy: {
    mobile: { size: 15 },
    tablet: { size: 15 },
    desktop: { size: 15 },
  },

  productVariantImageDimensions: {
    mobile: { w: 20, h: 20 },
    tablet: { w: 20, h: 20 },
    desktop: { w: 20, h: 20 },
  },

  primaryCta: {
    primary: true,
    secondary: false,
    color: null /* reverts to theme settings unless color specifieid*/,
    bgColor: null,
    text: 'buy now from {}',
    padding: 10,
    copy: {
      mobile: { size: 13, weight: 500, color: '#fff', padding: '0px' },
      tablet: { size: 14, weight: 500, color: '#fff', padding: '0px' },
      desktop: { size: 14, weight: 500, color: '#fff', padding: '0px' },
    },
  },

  // Description
  productDescriptionTitleCopy: 'Information',

  // Delivery
  productDeliveryTitleCopy: 'Delivery',

  // More information link
  moreInfoText: 'More information about this product >',
  moreInfoCopy: {
    mobile: { weight: 300, size: 14 },
    tablet: { weight: 300, size: 14 },
    desktop: { weight: 300, size: 14, decoration: 'underline' },
  },

  // If there are variants that return undefined
  moreInfoAtStoreCopy: {
    mobile: { size: 13 },
    desktop: { weight: 300, size: 14, margin: '0.7em 0px 0.2em 0px', decoration: 'underline' },
  },

  moreInfoAtStoreText: 'Visit the official store for more >',

  genericProductDescriptionCopy: {
    mobile: { weight: 200, size: 13 },
    tablet: { weight: 200, size: 13 },
    desktop: { weight: 300, size: 14 },
  },

  // Generic description text that will appear on all product info cards
  genericProductDescriptionText: [
    'For more information about this product, including colors, sizes, availability (including size guides) and materials please be sure to visit the {} official store.',
    "Additional information such as delivery and returns can also be found at {}. You can see this information either by clicking out to the store above or by using the link below. You're just a click away.",
    // 'We try our best to keep prices updated with our partners, which is why we display a "last checked" indicator nest to the price.',
  ],
};
