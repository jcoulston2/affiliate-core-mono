import productListingHeroDescriptions from './productListingHeroDescriptions';

export default {
  padding: {
    mobile: '10px 0px',
    tablet: '20px 0px',
    desktop: '50px 0px 30px 0px',
  },
  maxWidth: '1300px',
  card: {
    expand: {
      mobile: {
        collapsedHeight: 90,
        readMoreCopyOffsetTop: 8,
      },
      tablet: {
        collapsedHeight: 124,
        readMoreCopyOffsetTop: 10,
      },
    },
    padding: {
      mobile: '16px',
      tablet: '35px',
      desktop: '40px',
    },
    margin: {
      mobile: '15px',
      tablet: '20px',
      desktop: '20px',
    },
    grid: {
      xs: true,
      sm: true,
      md: null,
      lg: null,
      xl: null,
    },
    heading: {
      tag: 'h1',
      mobile: { size: 21, weight: 400, margin: '0 0 1.2em 0' },
      tablet: { size: 40, weight: 400, margin: '0 0 0.8em 0' },
      desktop: { size: 47, weight: 400, margin: '0 0 0.8em 0' },
      useDecorator: true,
    },
    copy: {
      tag: 'p',
      mobile: { size: 12, weight: 300 },
      tablet: { size: 15, weight: 300 },
      desktop: { size: 16, weight: 300, textAlign: 'center' },
    },
  },
  descriptions: productListingHeroDescriptions,
  defaultDescription:
    "Check out our chosen collection of {} from your favourite high street brands. From the latest fashion trends to retro styles we've got you covered with hundreds of outfits from our partners waiting to be discovered. You choose your outfit and we'll send you directly to the official store. Fliik learns more about you as you shop, so we can personalize and prioritize your favourite styles.",
};
