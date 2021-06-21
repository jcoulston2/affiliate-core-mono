export default {
  padding: {
    mobile: '0px 20px 20px 20px',
    tablet: '0px 20px 20px 20px',
    desktop: '40px',
  },
  margin: null,
  alignItems: 'center',
  justify: 'center',
  cardOffset: {
    mobile: 0,
    tablet: 0,
    desktop: 0,
  },
  cards: [
    {
      maxWidth: '1200px',
      inverse: false,
      splitSpacing: {
        left: {
          xs: 12,
          sm: 6,
        },
        spacer: {
          xs: null,
          sm: 1,
        },
        right: {
          xs: 12,
          sm: 5,
        },
      },
      padding: {
        mobile: '35px 30px',
        tablet: '60px',
        desktop: '80px',
      },
      margin: {
        mobile: '0px',
        tablet: '0px',
        desktop: '0px',
      },
      grid: {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
      },
      heading: {
        text: 'We’re adding high street clothing brands every day',
        tag: 'h3',
        mobile: { size: 18, weight: 400, margin: '0 0 1.2em 0', textAlign: 'left' },
        tablet: { size: 18, weight: 400, margin: '0 0 1.2em 0', textAlign: 'left' },
        desktop: { size: 30, weight: 400, margin: '0 0 1.2em 0', textAlign: 'left' },
      },
      copy: {
        text:
          'The high street has taken a hit and brands have suffered. We want to connect these brands to you right now online. We’re always adding new brands and clothing items every week for you to browse. Consider us your online personal shopper - you choose your outfit and we’ll send you to the official store.',
        tag: 'p',
        mobile: { weight: 300, size: 13, margin: '0 0 1.5em 0' },
        tablet: { weight: 300, size: 13 },
        desktop: { weight: 300, size: 16 },
      },
      img: {
        src: 'landing-info-womens.svg',
        padding: null,
        alt: 'making it easy for you to find what you are looking for',
        maxWidth: null,
        maxHeight: null,
      },
      cta: {},
    },
    {
      maxWidth: '1200px',
      inverse: true,
      splitSpacing: {
        left: {
          xs: 12,
          sm: 6,
        },
        spacer: {
          xs: null,
          sm: 1,
        },
        right: {
          xs: 12,
          sm: 5,
        },
      },
      padding: {
        mobile: '35px 30px',
        tablet: '60px',
        desktop: '80px',
      },
      margin: {
        mobile: '60px 0px 0px 0px',
        tablet: '80px 0px 0px 0px',
        desktop: '120px 0px 0px 0px',
      },
      grid: {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
      },
      heading: {
        text: 'A single place for all your favourite fashion brands',
        tag: 'h3',
        mobile: { size: 18, weight: 400, margin: '0 0 1.2em 0', textAlign: 'left' },
        tablet: { size: 18, weight: 400, margin: '0 0 1.2em 0', textAlign: 'left' },
        desktop: { size: 30, weight: 400, margin: '0 0 1.2em 0', textAlign: 'left' },
      },
      copy: {
        text:
          'We make it easy to search and compare thousands of your favourite outfits from all of your favourite clothing shops. Plus, keep up to date with all the latest fashion trends. We strictly only showcase high street brands.',
        tag: 'p',
        mobile: { weight: 300, size: 13, margin: '0 0 1.5em 0' },
        tablet: { weight: 300, size: 13 },
        desktop: { weight: 300, size: 16 },
      },
      img: {
        src: 'landing-info-mens.svg',
        padding: null,
        alt: 'Your favourite fashion brands online in one place',
        maxWidth: null,
        maxHeight: null,
      },
      cta: {},
    },
  ],
};
