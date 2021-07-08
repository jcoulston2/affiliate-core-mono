export default {
  bgColor: '#F9F9F9',
  padding: {
    mobile: '30px 30px 40px 30px',
    tablet: '40px 0px 70px 0px',
    desktop: '60px 50px 90px 50px',
  },
  height: {
    mobile: 'initial',
    tablet: 'initial',
    desktop: 'initial',
  },
  maxWidth: '1200px',
  maxHeight: 'initial',
  margin: 'initial',
  alignItems: 'flex-start',
  justify: 'center',
  borderShadow: null,
  rows: [
    {
      contentLayout: 'stack',
      padding: {
        mobile: '25px 5px 35px 5px',
        tablet: '20px 100px',
        desktop: '10px',
      },
      margin: {
        desktop: '5% 0 0 0',
        tablet: '5% 0 0 0',
      },
      grid: {
        xs: 12,
        sm: 12,
        md: 4,
        lg: null,
        xl: null,
      },

      copy: {
        text: `Your virtual high street for clothes
        <a
          href="/motivation"
          style="
            font-size: 15px;
            width: 100%;
            display: inline-block;
            text-decoration: underline;
            color: #32C08D;
            line-height: 0px;
            position: relative;
            top: -5px;            
        ">
          the motivation > 
        </a>`,
        tag: 'h1',
        mobile: {
          size: 40,
          weight: 500,
          textAlign: 'left',
          margin: '0 0 0.5em 0',
          lineHeight: '50px',
        },
        tablet: { size: 40, weight: 500, margin: '0 0 1em 0', lineHeight: '50px' },
        desktop: { size: 40, weight: 500, margin: '0 0 1em 0', lineHeight: '50px' },
      },
      cta: {
        // Ensures we can access this button for more advanced onClick events
        reference: 'quick-finder-hero-ref',
        text: 'Start shopping',
        textTransform: 'capitalize',
        padding: '0px',
        copy: {
          mobile: { weight: 300, color: '#fff', padding: '0.5em 4em', size: 17 },
          tablet: { weight: 300, color: '#fff', padding: '0.5em 4em', size: 17 },
          desktop: { weight: 300, color: '#fff', padding: '0.5em 5em', size: 17 },
        },
        color: null,
        secondary: true,
        maxWidth: null,
        fullWidth: true,
      },
      img: null,
    },
    {
      grid: {
        xs: 12,
        sm: 12,
        md: 1,
        lg: 1,
        xl: null,
      },
    },
    {
      contentLayout: 'stack',
      padding: {
        mobile: '20px 0px 20px 0px',
        tablet: '10px',
        desktop: '10px',
      },
      grid: {
        xs: 12,
        sm: 12,
        md: 7,
        lg: null,
        xl: null,
      },
      copy: null,
      cta: null,
      text: null,
      img: {
        src: 'landing-hero.svg',
        padding: 0,
        alt: 'your fashion journey starts here',
        maxHeight: null,
        maxWidth: null,
        minWidth: null,
        minHeight: null,
        advancedCss: {
          mobile: `
            justify-content: flex-end;
          `,
        },
      },
    },
  ],
};
