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
        text: 'The high street has been hit hard',
        tag: 'h3',
        mobile: { size: 18, weight: 400, margin: '0 0 1.2em 0', textAlign: 'left' },
        tablet: { size: 18, weight: 400, margin: '0 0 1.2em 0', textAlign: 'left' },
        desktop: { size: 30, weight: 400, margin: '0 0 1.2em 0', textAlign: 'left' },
      },
      copy: {
        text:
          'In recent times it’s been difficult for high street retailers, as online shopping is becoming more and more common in the fashion industry, we want to give fashion brands more of an online presence - not by selling their products on our platform, but by directing you to the existing store by showcasing personalized content to you. We’re partnering with new high street brands every week to bring you more ranges and styles. Helping out you and our partners is what we’re all about.',
        tag: 'p',
        mobile: { weight: 300, size: 13, margin: '0 0 2.5em 0' },
        tablet: { weight: 300, size: 13 },
        desktop: { weight: 300, size: 16 },
      },
      img: {
        src: 'motivation.svg',
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
        text: "We're quite new",
        tag: 'h3',
        mobile: { size: 18, weight: 400, margin: '0 0 1.2em 0', textAlign: 'left' },
        tablet: { size: 18, weight: 400, margin: '0 0 1.2em 0', textAlign: 'left' },
        desktop: { size: 30, weight: 400, margin: '0 0 1.2em 0', textAlign: 'left' },
      },
      copy: {
        text:
          'We’ve just launched! Stay tuned for more app updates, more fashion, content and a growing partner list. Our goal is to become your personalized virtual shopper, as you use the app more, we want to tailor relevant content to you and we want to be your go-to place for browsing outfits.',
        tag: 'p',
        mobile: { weight: 300, size: 13, margin: '0 0 1.5em 0' },
        tablet: { weight: 300, size: 13 },
        desktop: { weight: 300, size: 16 },
      },
      img: {
        src: 'motivation2.svg',
        padding: null,
        alt: 'Your favourite fashion brands online in one place',
        maxWidth: null,
        maxHeight: null,
      },
      cta: {},
    },
  ],
};
