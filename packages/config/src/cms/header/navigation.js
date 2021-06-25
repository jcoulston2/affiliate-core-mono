export default {
  // include quick finder link in the navigation. This will open the quick finder once clicked
  // on mobile this will display in the first section of the navigation
  includeQuickFinderLink: true,
  quickFinderCopy: 'Quick find',

  // Used to delecate the onClick event for the quick finder in the navigation
  quickFinderButtonReference: 'quick-finder-nav-ref',

  mobileNavBarBackground: '#fff',
  mobileNavBarShadow: '0px 9px 20px -23px #000000',

  // Should be set to a min of 2 and a max of 3
  // example: mobileNavHorizontalLayers = 3 ===> | womens > | clothing > | tops
  // example: mobileNavHorizontalLayers = 2 ===> | womens > | clothing |
  //                                                        | tops     |
  // in the examples above, when there are many second level 'labels', setting mobileNavHorizontalLayers
  // to 3 would be better UX
  mobileNavHorizontalLayers: 2,

  // Navigation Status bar
  mobileNavStatusBarColor: 'black',
  mobileNavStatusBarCopyColor: 'white',

  // First level nav mobile
  mobileFirstLevelNavLink: {
    mobile: { size: 18, weight: 500, color: null },
    tablet: { size: 18, weight: 500, color: null },
    desktop: { size: 18, weight: 500, color: null },
  },
  // Second level nav mobile
  mobileSecondLevelNavLink: {
    mobile: { size: 21, weight: 700, color: null, padding: '0.2em 0 0.2em 0' },
  },

  mobileNavCardPadding: {
    mobile: '40px 20px',
    tablet: '40px 20px',
    desktop: '40px 20px',
  },

  desktopNavBarBackground: '#fff',
  desktopNavBarShadow: '0px 9px 20px -23px #000000',
  desktopNavigationMaxWidth: 1400,
  desktopLinksPerColumn: 7,
  desktopNavLabel: {
    tablet: { size: 20, weight: 600 },
    desktop: { size: 20, weight: 600 },
  },

  desktopNavLink: {
    tablet: { size: 14, weight: 300, padding: '0.2em,' },
    desktop: { size: 14, weight: 300, padding: '0.2em' },
  },
};
