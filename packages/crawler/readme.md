# Affiliate Crawler

The crawler package takes a schema config and runs a crawl on the sites defined. It will cycle through and collection information. It will then write to a store cache ready for the app to use statically.

## A schema definition is as follows:

- To extract our affiliate data, we need to define a following object structure:

```javascript
{
  // @example:
  // e.g. "https://www.example.com"
  "domain": String,

  // @example:
  // e.g. "womens"
  "section": String,

  "brand": String,

  // @example:
  // e.g. "clothing"
  // The label is for navigation purposes so categories can be grouped toegther on the Front End
  // e.g. womens --> clothing --> tops, jeans, dresses
  "label": "clothing",

  // @example:
  // e.g. "tops"
  "category": String,

  // The PLP urls we want to crawl for this category, Note, this a path,
  // do not include the full domain
  // @example:
  // e.g.["/search?term=green%2Bcotton"]
  "urls": Array,

  // The multiple URL's param allows us to continue scraping for a url that has
  // more pages as given by a URL, NOTE: if you are going to define this property
  // then the 'urls' property must only contain an Array of one item as this will
  // be the 'base' path to be used.
  // @example:
  // e.g. null
  // or
  // e.g. {
  //  "queryString": "?page=",
  //  "interval": 1,
  //  "start": 1,
  //  "end": 5
  // }
  "multipleUrls": {
    "queryString": String,
    "interval": Number,
    "start": Number,
    "end": Number
  },

  "extracts": {


    "topLevel": {

      // Some sites have conditional JavaScript rendering whereby certain products are only rendered in view.
      // When this occurs we should use this flag to true to render the whole page beforehand so we can expose
      // the relevant infomration. Note - this paramater is optional and should only be used for conditional
      // rendering pages.
      "scrollPage": Boolean,

      // If scrollPage is set to true, the default scroll page wait time is 5000ms, we can override this with
      // this paramater, if pages are particularly long and scrolling may take a bit more time than expected
      // then it may be a good idea to set this paramater, otherwise normally we don't have to specift this.
      "scrollPageWaitTime": Number,

      // If an image on a PLP is has the same base path as another, this will be classed as a duplicate image.
      // in most cases this can be set to true, and can be quite useful if the extractor has picked up multiple
      // images with different quality params such as https://www.cdn.imge?quality=100, https://www.cdn.imge?quality=200
      // obviously we don't want to pick up these images if they are the same and only differ in picture quality. Note
      // that even if this setting is set to false, the extractor will remove duplicate images if the full path is identical.
      // Example, if set to true. https://www.cdn.imge?quality=100, https://www.cdn.imge?quality=200 => this is classed as duplicate
      // and will be removed. If set to false, the above will count (default should be set to false).
      "omitDuplicateImgByBase": false,

      // e.g. null
      // or
      // e.g '.selector'
      "waitForNode": String | null,


      // Sometimes sites will require cookies to be set or else pupeteer will be blocked
      // for these sites, setting this to true should help
      "waitForCookies": Boolean,

      // Can sometimes be good for high security sites that tend to block
      "delay":  Number,

      // This should be a wrapper selector for each 'tile' containing
      // our top level information on the PLP
      // e.g '.selector'.
      "productsSelector": {
        "selector": String
      },

      "data": {

        // The below properties define what data we should get from the page PLP
        // and how we should do it, data can be extracted in a few ways
        // 1) "getDataFrom": "text" -> will get the selectors text content
        // 2) "getDataFrom": "attr: data-example-attribute" -> Will get the value from the given attrivute
        // 3) "hasClass": ".example-class" -> returns a boolean value (can be useful for things like identifying sale items that have a unique class)
        // 4) "hasChildSelector": ".example-class" -> retuens a boolean if a child has the defined class
        // 5) "hasAttr:": "example-attribute" exactly the same as the above but with an attribute
        // These below values are just example values, but you may add you own with any or the 4 methods to extract the data.

        // required values:
        "name": {
          // Note any valid selector can be used. There is also there is a special value called 'self' - when self is used the element node will be the product container
          "selector": String,
          "getDataFrom": "text" | "attr: <attributeValue>"
        },
        "price": {
          "selector": String,
          "getDataFrom": "text" | "attr: <attributeValue>"
        },
        "link": {
          "selector": String,
          "getDataFrom": "text" | "attr: <attributeValue>"
        },
        "image": {
          "selector": String,
          "getDataFrom": "text" | "attr: <attributeValue>"
        },

        // optional values:
        // Note, the nowPrice is just an optional way to obtain price if the selectors or structure are
        // very different for regular prices and sale prices. In most cases defining a price and a was price should
        // be ok.
        // isConditional isn't required but it's just a way of telling the extractor if we don't find a selector
        // then we don't have to give a warning in the response
        "nowPrice": {
          "selector": String,
          "getDataFrom": "text" | "attr: <attributeValue>",
          "isConditional": Boolean
        },
        "wasPrice": {
          "selector": String,
          "getDataFrom": "text" | "attr: <attributeValue>",
          "isConditional": Boolean
        },
      }
    },

    "details": {

      // These are the properties for extracting our detailed data (PDP)
      // As with our top level data, the same applies to the following properties in that
      // any one of the 4 methods can be used to extract data. For our detailed data there
      // is one further 'special' property, the 'isSoldOut' property; for this, either an attribute
      // or a class should be passed for the crawler to check against for the selector. The cralwer just
      // looks at the HTML as a string and looks for this value, it then returns true or false
      "data": {
        "images": {
          "selector": String,
          "getDataFrom": "text" | "attr: <attributeValue>"
        },

        // Variants tell use more info about the product. For Variants we will hard code a special
        // property called 'variantText', this just acts as a label for our variant data.
        // It is optional, if no variants are specified, then front end will render some placeholder text
        // important to note variants can sometimes be a bit more difficult to obtain
        "variants": [
          {
            "selector": String,
            "getDataFrom": "text" | "attr: <attributeValue>"
            "variantText": String,
          },
          {
            "selector": String,
            "getDataFrom": "text" | "attr: <attributeValue>"
            "variantText": String,

            // An example where we can use this special 'isSoldOut' porperty
            // @example:
            // "isSoldOut": "matches: data-quantity=\"0\""
            // or
            // "isSoldOut": "matches: someClass"
            "isSoldOut": String
          }
        ],
        "selectedColor": {
          "selector": ".colour-swatches-title [data-handle='colour-title']",
          "getDataFrom": "text"
        },

        // Description is optional
        "description": {
          "selector": String,
          "getDataFrom": "text" | "attr: <attributeValue>"
        },

        // Delivery is optional
        "delivery": {
          "selector": ".product-item-collapsable-div .delivery__table .table__rightcol div",
          "getDataFrom": "text"
        }

        // The properties above are special fields that have a set place in the product view.
        // We can define custom properties on the schema, as long as we define one of two properties
        // to go with it 'isDescriptive' or 'isPrimary'
        // isDescriptive will put the information inside the description card below the description and
        // isPrimary will place the information in the key details card along with the price and colors etc
        "custom": [
          {
            "customText": String,
            "selector": String,
            "getDataFrom": "text" | "attr: <attributeValue>",
            "isDescriptive": Boolean
          }
        ]
      }
    }
  },

  // TODO: Currently this is not being used, but keep this anyway as could
  // be useful for tags
  "urlCategoryIdentifier": {
    "anythingBefore": "/",
    "anythingAfter": "/"
  },

  // TODO: Currently this is not being used, but keep this anyway as could
  // be useful
  "meta": {
    "hasMoreVariationsText": "More colors available"
  }
}
```

## Example payload output from the crawler

```javascript
[
  {
    section: 'other',
    data: [
      {
        category: 'tops',
        categoryLastUpdated: '2021-01-29T19:31:19+00:00',
        label: 'clothing',
        data: [
          {
            topLevelData: {
              name: 'test prod',
              price: '£32.00 (60% OFF)',
              wasPrice: '£80.00',
              link: '/products/utility-jumpsuit-dark-green-jla008210',
              image: ['https//img'],
              tags: ['khaki', 'utility', 'jumpsuit'],
            },
            detailedData: {
              images: ['https//img'],
              description: ['des'],
              selectedColor: 'Green',
              delivery: ['UK'],
              variants: [
                { variantText: 'Colors', data: ['data'] },
                { variantText: 'Sizes', data: [{ value: '6', soldOut: true }] },
              ],
              custom: [
                {
                  customText: 'Product Code',
                  data: { value: ['PRODUCT-SKU AW19-1000066857-DEN-14'], isDescriptive: true },
                },
              ],
            },
            metaData: {
              domain: 'https://www.isawitfirst.com',
              brand: 'isawitfirst',
              markedCautiousTimes: 1,
            },
          },
        ],
      },
    ],
  },
];
```
