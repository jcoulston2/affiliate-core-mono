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
        text: 'Partner with us',
        tag: 'h3',
        mobile: { size: 18, weight: 400, margin: '0 0 1.2em 0', textAlign: 'left' },
        tablet: { size: 18, weight: 400, margin: '0 0 1.2em 0', textAlign: 'left' },
        desktop: { size: 30, weight: 400, margin: '0 0 1.2em 0', textAlign: 'left' },
      },
      copy: {
        text:
          "Fliik is a growing online platform aiming to connect our high street partners with users in one place online. if you are an independent high street, store or brand and you would to like to partner with us, please contact us stating information about your brand and we'll get back in touch shortly.",
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
  ],
};
