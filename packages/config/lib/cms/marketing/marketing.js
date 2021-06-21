export default {
  marketing: {
    displayInstallAppBanner: true,
    banners: [
      {
        name: 'sale offers',
        endDate: null,
        startDate: null,
        visible: true,
        bgColor: '#1b1b1b',
        alignItems: 'center',
        justify: 'center',
        padding: {
          mobile: '20px 10px',
          tablet: '20px',
          desktop: '30px',
        },
        rows: [
          {
            margin: {
              desktop: '0px',
            },
            padding: {
              mobile: '0px 30px 0px 0px',
              tablet: '0px 30px',
              desktop: '0px 30px',
            },
            contentLayout: 'inline',
            grid: {
              xs: true,
              sm: true,
              md: 'auto',
            },
            img: {
              src: 'pwa-download.svg',
              alt: 'marketing',
            },
          },
          {
            justify: 'flex-start',
            margin: {
              desktop: '0px',
            },
            padding: {
              mobile: '0px 0px 0px 0px',
              tablet: '0px 30px',
              desktop: '0px 30px',
            },
            contentLayout: 'stack',
            grid: {
              xs: true,
              sm: true,
              md: 'auto',
            },
            cta: {
              maxWidth: '346px',
              href: '/search/params?section=womens&sale-threshold=50&fliik-view',
              text: 'Shop sale',
              padding: '0px',
              textTransform: 'capitalize',
              fullWidth: true,
              copy: {
                mobile: { weight: 300, color: '#fff', padding: '0.5em 0', size: 15 },
                tablet: { weight: 300, color: '#fff', padding: '0.5em 4em', size: 17 },
                desktop: { weight: 300, color: '#fff', padding: '0.5em 4em', size: 17 },
              },
              primary: true,
            },
            text: 'test',
          },
        ],
      },
    ],
  },
};
