const mockSchemaTemplate = {
  brand: 'someBrand',
  domain: 'https://www.isawitfirst.com',
  section: 'womens',
  label: 'clothing',
  category: 'tops',
  multipleUrls: null,
  urls: ['/collections/dresses?page=1'],
  extracts: {
    topLevel: {
      waitForNode: null,
      delay: 0,
      omitDuplicateImgByBase: true,
      productsSelector: {
        selector: '.product-card',
      },
      data: {
        name: {
          selector: '[data-product-title]',
          getDataFrom: 'text',
        },
        price: {
          selector: '.price--sale',
          getDataFrom: 'text',
        },
        wasPrice: {
          selector: '.price--was',
          getDataFrom: 'text',
        },
        link: {
          selector: '.product-card__image > a[data-product-link]',
          getDataFrom: 'attr: href',
        },
        image: {
          selector: '[data-img]',
          getDataFrom: 'attr: data-src',
        },
      },
    },
    details: {
      data: {
        images: {
          selector: 'img.product-carousel__img',
          getDataFrom: 'attr: src',
        },
        variants: [
          {
            selector: '.colour-swatch-img',
            variantText: 'Colors',
            getDataFrom: 'attr: src',
          },
          {
            selector: ".size-list [data-handle='size-select-option']",
            variantText: 'Sizes',
            getDataFrom: 'attr: data-value',
            isSoldOut: 'matches: data-quantity="0"',
          },
        ],
        description: {
          selector: '.product-description p',
          getDataFrom: 'text',
        },
        selectedColor: {
          selector: ".colour-swatches-title [data-handle='colour-title']",
          getDataFrom: 'text',
        },
        delivery: {
          selector: '.product-item-collapsable-div .delivery__table .table__rightcol div',
          getDataFrom: 'text',
        },
        custom: [
          {
            customText: 'Product Code',
            selector: '.product-info-block .product-sku',
            getDataFrom: 'text',
            isDescriptive: true,
          },
        ],
      },
    },
  },
  meta: {
    hasMoreVariationsText: 'More colors available',
  },
};

export default mockSchemaTemplate;
