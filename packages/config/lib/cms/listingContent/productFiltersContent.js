export default {
  // When the 'sticky header filter bar' is not showing
  filterWrapperPadding: {
    desktop: '1rem 2rem 1rem 2rem',
    tablet: '1rem 2rem 1rem 2rem',
    mobile: '1rem 2rem 1rem 2rem',
  },

  // takes into effect when user starts to scroll down the page past the filters
  filterWrapperSticky: {
    desktop: '15px 50px',
    tablet: '15px 30px',
    mobile: '10px 30px',
  },
  filterWrappeMaxWidth: '1400px',
  useFilters: {
    priceSort: true,
    priceThresholdLow: true,
    priceThresholdHigh: true,
    keyWords: true,
    saleThreshold: true,
  },

  filterCardTitle: {
    desktop: { size: 24, weight: 400, color: 'primary' },
  },

  filterItemTitle: {
    desktop: { size: 18, weight: 500, color: 'primary', margin: '0px 7px 0px 0px' },
  },

  keyWordsTooltipText: 'E.g. longsleeve top',
  keyWordsInputLabel: 'e.g. green summer top',

  // relative to 0-100 range. For example if the max-price is £500 the scale multiplier will be 5
  sliderPriceScaleMultiplier: 5,
};
