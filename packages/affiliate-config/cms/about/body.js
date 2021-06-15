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
        text: "We’re just some geeks that want to make people's life a little easier!",
        tag: 'h3',
        mobile: { size: 19, weight: 400, margin: '0 0 1.2em 0', textAlign: 'left' },
        tablet: { size: 20, weight: 400, margin: '0 0 1.2em 0', textAlign: 'left' },
        desktop: { size: 30, weight: 400, margin: '0 0 1.2em 0', textAlign: 'left' },
      },
      copy: {
        text:
          'We’re a tiny team based in the UK. Our mission is to help you and our high street partners connect and we do this through a shared passion for technology, software, and clean user experience. We’re futurists, and we want to bring more capabilities to your fingertips, whether you’re at home casually browsing on your sofa or taking a scroll. The platform we have built enables us to scale quickly and is the basis for helping you connect with our partners.',

        tag: 'p',
        mobile: { weight: 300, size: 13, margin: '0 0 1.5em 0' },
        tablet: { weight: 300, size: 13 },
        desktop: { weight: 300, size: 16 },
      },
      img: {
        src: 'about-us.svg',
        padding: null,
        alt: 'About us',
        maxWidth: null,
        maxHeight: null,
      },
      cta: {},
    },
  ],
};
