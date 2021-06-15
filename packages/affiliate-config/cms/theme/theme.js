export default {
  theme: {
    brandThemeColors: {
      primaryColor: '#32C08D',
      secondaryColor: '#000000',
      tertiaryColor: '#65cdf9',
      commonBackground: '#fff',
      commonBlack: '#000000',
      commonWhite: '#fff',
      slate: '#272626',
    },
    buttonTheme: {
      primaryColor: '#32C08D',
      primaryTextColor: '#fff',
      secondaryColor: '#000000',
      secondaryTextColor: '#fff',
      borderRadius: 11,
      defaultPadding: '10px 55px',
      defaultFontWeight: 400,
    },
    textTheme: {
      primaryColor: '#000000',
      secondaryColor: '#32C08D',
      tertiaryColor: '#fff',
      slightlyFadedTextColor: '#979797',
      tertiary: null,
      font: 'Roboto',

      // Optional unless specified in CMS for text - an advanced "decorator" to be used with text
      // e.g. applying a small border under the text
      textDecoratorStyleCss: `
        content: '';
        width: 20%;
        border-bottom: 2px solid #32C08D;
        display: inline-block;
        position: absolute;
        left: 0px;
        bottom: -6px;
        max-width: 50px;
      `,
    },
    linkTheme: {
      color: '#000000',
      hoverOpacity: 0.6,
    },
    cardTheme: {
      background: '#fff',
      shadow: '1px 1px 12px 1px lightgrey',
      borderRadius: 20,
      defaultPadding: '20px',
    },

    modalTheme: {
      borderRadius: 26,
      defaultPadding: {
        mobile: '10px 0px 30px 0px',
        tablet: '10px 0px 30px 0px',
        desktop: '10px 0px 30px 0px',
      },
      modalHeading: {
        mobile: {
          tag: 'h2',
          size: 25,
          padding: '0 0 1em 0em',
          weight: 400,
          textAlign: 'center',
        },
        tablet: {
          tag: 'h2',
          size: 30,
          padding: '0 0 1em 0em',
          weight: 400,
          textAlign: 'center',
        },
        desktop: {
          tag: 'h2',
          size: 30,
          padding: '0 0 1em 0em',
          weight: 400,
          textAlign: 'center',
        },
      },
    },
    commonStyles: {
      shadow: '1px 1px 12px 1px lightgrey',
    },
  },
};
