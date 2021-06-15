export default {
  alignItems: 'center',
  justify: 'center',
  padding: {
    mobile: '10px 0px',
    tablet: '20px 0px',
    desktop: '20px 0px',
  },
  maxWidth: '1300px',
  card: {
    padding: {
      mobile: '16px',
      tablet: '35px',
      desktop: '40px',
    },
    margin: 'auto',
    grid: {
      xs: true,
    },
    heading: {
      tag: 'h2',
      text: 'Your Wish List',
      mobile: { size: 21, weight: 400, margin: '0 0 0.8em 0' },
      tablet: { size: 40, weight: 400, margin: '0 0 0.8em 0' },
      desktop: { size: 47, weight: 400, margin: '0 0 0.8em 0' },
      advancedCss: `
          &:after {
            content: '';
            width: 20%;
            border-bottom: 2px solid #32C08D;
            display: inline-block;
            position: absolute;
            left: 0px;
            bottom: -6px;
          }          
        `,
    },
    copy: {
      text:
        "We've saved your favourite products here. As you add items to your wishlist we'll learn more about your style",
      tag: 'p',
      mobile: { size: 12, weight: 300 },
      tablet: { size: 15, weight: 300 },
      desktop: { size: 16, weight: 300 },
    },
    img: {
      icon: 'FavoriteBorderIcon',
      iconSize: 'large',
      padding: '10px 0px 0px 0px',
      alt: 'Wish list',
      maxWidth: null,
      maxHeight: '150px',
    },
  },
};
