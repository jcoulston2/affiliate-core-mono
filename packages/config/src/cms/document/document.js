export default {
  document: {
    //
    metaContent: {
      home: {
        pageTitle: 'Shop clothes online | A single place for high street fashion brands | Fliik',
        pageDescription:
          'Your favourite high street fashion clothing brands and shops in one place from dresses, jeans, jackets, tops and more',
      },
      // for product listing the "{}" will pull in the page section and category, for example "Womens Jeans"
      listing: {
        pageTitle: '{} | Online {} from your favourite high street brands | Fliik',
        pageDescription:
          'browse {} here at Fliik. Search hundreds of outfits online from your favourite high street fashion brands',
      },
      // for seatch the "{}" will pull in the search term
      search: {
        pageTitle: 'Your search for {} | Fliik',
        pageDescription:
          'You searched for {}. Search hundreds of outfits online from your favourite high street fashion brands',
      },

      // more bespoke pages can be defined here in the match category
      match: [
        {
          path: '/somePathToMatch',
          pageTitle: '',
          pageDescription: '',
        },
      ],

      // used as a fallback
      default: {
        pageTitle: 'Shop clothes online | A single place for high street fashion brands | Fliik',
        pageDescription:
          'Your favourite high street fashion clothing brands and shops in one place from dresses, jeans, jackets, tops and more ',
      },
    },
  },
};
