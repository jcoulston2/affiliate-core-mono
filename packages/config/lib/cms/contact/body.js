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
        },
        spacer: {
          xs: 12,
          sm: 1,
        },
        right: {
          xs: 12,
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
        text: 'Getting in touch',
        tag: 'h3',
        mobile: { size: 19, weight: 400, margin: '0 0 1.2em 0', textAlign: 'left' },
        tablet: { size: 20, weight: 400, margin: '0 0 1.2em 0', textAlign: 'left' },
        desktop: { size: 30, weight: 400, margin: '0 0 1.2em 0', textAlign: 'left' },
      },
      copy: {
        text:
          'For customer or business-related inquiries, please get in touch at <span style="font-weight: 400;">inquiries@fliik.co.uk</span>. Thank you for using Fliik.',
        tag: 'p',
        mobile: { weight: 300, size: 14, margin: '0 0 1.5em 0' },
        tablet: { weight: 300, size: 15 },
        desktop: { weight: 300, size: 17, textAlign: 'center' },
      },
      cta: {},
    },
  ],
};
