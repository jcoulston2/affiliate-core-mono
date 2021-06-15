export default {
  bgColor: null,
  padding: {
    mobile: '80px 0px 100px 0px',
    tablet: '120px 30px 120px 30px',
    desktop: '180px 60px',
  },
  margin: null,
  separator: {
    mobile: {
      color: 'black',
      visible: true,
    },
    tablet: {
      color: 'black',
      visible: true,
    },
    desktop: {
      color: 'black',
      visible: true,
    },
  },
  items: [
    {
      grid: {
        xs: 6,
      },
      padding: {
        mobile: '0px 5px',
        tablet: '0px 20px',
        desktop: '0px 20px',
      },

      contentItems: {
        grid: {
          xs: 12,
        },
        items: [
          {
            copy: {
              text: `
                <span style="font-weight: 500">1.</span> You choose your outfit`,
              tag: 'h4',
              mobile: { size: 17, weight: 300, textAlign: 'center', color: '#000' },
              tablet: { size: 20, weight: 300, textAlign: 'center', color: '#000' },
              desktop: {
                size: 28,
                weight: 300,
                textAlign: 'center',
                color: '#000',
                padding: '2em 1em',
              },
            },
          },
        ],
      },
    },
    {
      grid: {
        xs: 6,
      },
      padding: {
        mobile: '0px 5px',
        tablet: '0px 20px',
        desktop: '0px 20px',
      },
      contentItems: {
        grid: {
          xs: 12,
        },
        items: [
          {
            copy: {
              text: '<span style="font-weight: 500">2.</span> We send you to the store',
              tag: 'h4',
              mobile: { size: 17, weight: 300, textAlign: 'center', color: '#000' },
              tablet: { size: 20, weight: 300, textAlign: 'center', color: '#000' },
              desktop: {
                size: 28,
                weight: 300,
                textAlign: 'center',
                color: '#000',
                padding: '2em 1em',
              },
            },
          },
        ],
      },
    },
  ],
};
