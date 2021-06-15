/**
 * @info Note we don't always need to define a container selector for our pages, it just makes our
 * mock HTML a bit lighter. If we do not define a selector, we will get the inner contents of the page
 * body HTML
 */

export default [
  {
    brand: 'TK Maxx',
    domain: 'https://www.tkmaxx.com/uk/en',
    plpExample: '/men/clothing/jeans/c/02020800',
    containerSelectorPlp: '[data-product-list-container] .container',
    pdpExample: '/men/clothing/jeans/blue-slim-fit-denim-jeans/p/29315596',
    containerSelectorPdp: '.content-wrapper',
    scrollPage: true,
  },
  {
    brand: 'nike',
    domain: 'https://www.nike.com/gb',
    plpExample: '/w/mens-shorts-38fphznik1',
    containerSelectorPlp: '.product-grid main',
    pdpExample: '/t/flex-stride-13cm-2-in-1-running-shorts-W95cKg/CJ5467-447',
    containerSelectorPdp: '#PDP',
    scrollPage: true,
  },

  // {
  //   brand: 'gap',
  //   domain: 'https://www.gap.co.uk',
  //   plpExample: '/gap/women/clothing/dresses-and-jumpsuits/',
  //   containerSelectorPlp: '.search-results-container',
  //   pdpExample: '/popover-dress/000879098.html',
  //   containerSelectorPdp: '#primary',
  //   scrollPage: true,
  // },
  // {
  //   brand: 'cos',
  //   domain: 'https://www.cosstores.com',
  //   plpExample: '/en_gbp/women/dresses/shirt-dresses.html',
  //   containerSelectorPlp: '#productContainer',
  //   pdpExample: '/en_gbp/women/womenswear/dresses/product.pleated-shirt-dress-blue.0973697001.html',
  //   containerSelectorPdp: '#pdpContainer',
  //   scrollPage: true,
  // },
  // {
  //   brand: 'river island',
  //   domain: 'https://www.riverisland.com',
  //   plpExample: '/c/women/dresses',
  //   containerSelectorPlp: '.section-1',
  //   pdpExample: '/p/pink-flora-puff-sleeve-mini-dress-787331',
  //   containerSelectorPdp: '[data-page-id="product-page"]',
  //   scrollPage: true,
  // },
  // {
  //   brand: 'new look',
  //   domain: 'https://www.newlook.com/uk',
  //   plpExample: '/womens/clothing/dresses/c/uk-womens-clothing-dresses',
  //   containerSelectorPlp: '.plp-results',
  //   pdpExample:
  //     '/womens/clothing/dresses/summer-dresses/green-floral-empire-waist-midi-dress/p/656238939',
  //   containerSelectorPdp: '.main-container',
  //   scrollPage: false,
  // },
  // {
  //   brand: 'Dorothy Perkins',
  //   domain: 'https://www.dorothyperkins.com',
  //   plpExample: '/en/dpuk/category/clothing-203535/jeans-203564',
  //   containerSelectorPlp: '.PlpContainer-resultsSection',
  //   pdpExample:
  //     '/en/dpuk/product/clothing-203535/jeans-203564/black-lyla-high-waist-skinny-denim-jeans-10414403',
  //   containerSelectorPdp: '.ProductDetail',
  //   scrollPage: true,
  // },
  // {
  //   brand: 'H&M',
  //   domain: 'https://www2.hm.com',
  //   plpExample: '/en_gb/men/shop-by-product/jackets-and-coats.html',
  //   containerSelectorPlp: '#page-content',
  //   pdpExample: '/en_gb/productpage.0944940003.html',
  //   containerSelectorPdp: '.product-description',
  //   scrollPage: true,
  // },
  // {
  //   brand: 'M&S',
  //   domain: 'https://www.marksandspencer.com',
  //   plpExample: '/l/women/jeans',
  //   containerSelectorPlp: '.container',
  //   pdpExample: '/coated-high-waisted-jeggings/p/clp60474688',
  //   containerSelectorPdp: '.container',
  //   scrollPage: true,
  // },
  // {
  //   brand: 'Ted Baker',
  //   domain: 'https://www.tedbaker.com',
  //   plpExample: '/uk/Womens/Clothing/Jeans/c/category_womens_clothing_jeans',
  //   containerSelectorPlp: '[ng-controller="plpProduct"]',
  //   pdpExample: '/uk/Womens/Clothing/Jeans/GEON-Skinny-Mid-Wash-Jean-Mid-Blue/p/250422-MID-BLUE',
  //   containerSelectorPdp: '#content',
  //   scrollPage: true,
  // },
];
