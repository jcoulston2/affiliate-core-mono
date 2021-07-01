export function evaluate(params = window.scrapeData) {
  let currentProductContainer;
  let currentProductSelector;
  let currentDataProp;
  let debug;

  const validatedImages = [];
  const warnings = [];
  const logTypes = (meta) => ({
    NO_CONTAINER_NODE: `Could not find container / wrapper element in page - selector: ${meta}`,
    NO_PRODUCT_NODE: `Could not find the data prop: ${meta}`,
    COMMON: `Following error has occured: ${meta}`,
    COLON_IN_PROP: `If you are not getting data from text, we are assuming you mean a node attribute, but for this you need to define a colon in your value e.g. 'attr: <attribute>'. Your value is -> (${meta}, selector ${currentProductSelector})`,
    CANNOT_GET_TEXT: `Cannot get text: ${meta}.`,
    CANNOT_GET_ATTRIBUTE: `Cannot get attribute: ${meta}.`,
    COULD_NOT_GET_DATA: `could not get data using value in schema: "${meta}" are you sure this is a valid extraction method?`,
    PRODUCT_FILTERED_OUT: `Filtered out invalid product info => ${meta}.`,
  });

  function pushWarnings(warning) {
    warnings.push(warning);
  }

  function arrayify(arrayLike) {
    return Array.from(arrayLike);
  }

  function getNodes(selector) {
    return arrayify(document.querySelectorAll(selector));
  }

  function detectSoldOut(node, soldOutIdentifier) {
    return node.outerHTML.trim().includes(soldOutIdentifier);
  }

  function getSingle(prop) {
    return Array.isArray(prop) ? prop[0] : prop;
  }

  function srcToHttp(url) {
    if (typeof url !== 'string') return url;
    return url.startsWith('//') ? `https:${url}` : url;
  }

  function hasUndefinedProps(product) {
    return !Object.keys(product).some((item) => !!product[item]);
  }

  /**
   * @Info when an attribute is specified in the schema i.e. 'attr: dataSrc' we extract the value by running
   * a regex to obtain everything after the colon to get the attribute name
   */
  function seekPropValue(prop) {
    try {
      return prop.match(/:(.*)/)[1].trim();
    } catch (e) {
      pushWarnings({
        type: 'error',
        message: logTypes(prop).COLON_IN_PROP,
        at: 'extractFromElements',
      });
    }
  }

  /**
   * @Info extract data or give information by analysing a given node. The method to extract this data
   * is given by the method type. There are two main ways to extract information, either by text or looking
   * at a HTML attribute. We can also look at a node at return a boolean flag for certain schema properties
   */
  function extractFromElement(node, methods, isConditional) {
    const {
      getDataFrom,
      hasClass,
      hasChildSelector,
      hasAttr,
      isSoldOut: hasSoldOutIdentifier,
    } = methods;
    const commonLogMessage = `"${currentDataProp}". Selector: "${currentProductSelector}"`;

    let hasWarning;
    let data;
    let errorProfile = {
      type: 'warning',
      message: '',
      at: 'extractFromElement',
    };

    const setErrorProfile = (message) => {
      hasWarning = true;
      errorProfile.message = message;
    };

    const getDataFromText = () => {
      data = node.textContent.trim();
      if (!data && !isConditional) {
        setErrorProfile(logTypes(commonLogMessage).CANNOT_GET_TEXT);
      }
    };

    const getDataFromAttribute = () => {
      const attr = seekPropValue(getDataFrom);
      if (attr) {
        data = node.getAttribute(attr);
        if (!data && !isConditional) {
          setErrorProfile(logTypes(`${attr} for ${commonLogMessage}`).CANNOT_GET_ATTRIBUTE);
        }

        if ((attr === 'src' || attr === 'data-src') && data) {
          data = srcToHttp(data).trim();
        }
      }
    };

    const handleSoldOut = () => {
      const soldOutAttr = seekPropValue(hasSoldOutIdentifier);
      data = {
        value: data,
        soldOut: detectSoldOut(node, soldOutAttr),
      };
    };

    if (!node) return null;
    if (getDataFrom) {
      if (getDataFrom === 'text') {
        getDataFromText();
      } else {
        getDataFromAttribute();
      }
      if (hasSoldOutIdentifier) {
        handleSoldOut();
      }
    } else if (hasClass) {
      data = node.classList.contains(hasClass);
    } else if (hasChildSelector) {
      data = !!node.querySelector(hasChildSelector);
    } else if (hasAttr) {
      data = node.hasAttribute(hasAttr);
    } else if (!isConditional) {
      setErrorProfile(logTypes(getDataFrom).COULD_NOT_GET_DATA);
    }
    if (hasWarning) {
      pushWarnings(errorProfile);
    }

    return data;
  }

  /**
   * @Info For each node given extract data from that node. Returns an array extracted data or a single
   * data item if there is one node. Note for variants and custom data (given in the schema - refer to docs)
   * an isDescriptive, or isPrimary cab be specified. This value will be used as an option to decide placement
   * when rendering the values on the front end.
   */
  function extractFromElements({ selector, isConditional, ...props }) {
    currentProductSelector = selector;
    const isSelf = selector === 'self';
    const nodes = isSelf
      ? [currentProductContainer]
      : arrayify(currentProductContainer.querySelectorAll(selector));

    if (!nodes.length && !isConditional) {
      pushWarnings({
        type: 'warning',
        message: logTypes(`"${currentDataProp}" for selector: "${selector}"`).NO_PRODUCT_NODE,
        at: 'extractFromElements',
      });
    }

    let data = nodes.map((node) => extractFromElement(node, props, isConditional));

    if (data.length < 2) data = data[0];
    if (props.isDescriptive) {
      data = {
        value: data,
        isDescriptive: true,
      };
    }
    if (props.isPrimary) {
      data = {
        value: data,
        isPrimary: true,
      };
    }
    return data;
  }

  /**
   * @Info For variant data and custom data we extract the same way, but we also give a label which will be
   * rendered on the front end. E.g. colours, or sizes
   */
  function getDataFromVariants(variants) {
    return variants.map((variantItem) => {
      currentDataProp = `variant > ${variantItem.variantText}`;
      const { variantText, ...props } = variantItem;
      return {
        variantText,
        data: extractFromElements(props),
      };
    });
  }

  /**
   * @Info Custom data is used to define other attributes in the schema for collecting data that is a little
   * more bespoke or optional, this may very between different brands and so does not count as a key schema
   * property
   */
  function getDataFromCustomProps(customData) {
    return customData.map((customDataItem) => {
      currentDataProp = `customData > ${customDataItem.customText}`;
      const { customText, ...props } = customDataItem;
      return {
        customText,
        data: extractFromElements(props),
      };
    });
  }

  /**
   * @Info Obtain 'tags' from the product name, this will be used as a means to search for that product using
   * the key words defined here
   */
  function getProductTags(productName) {
    if (!productName || typeof productName !== 'string') return null;
    const specialCharEx = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;
    const tagsArray = productName.trim().toLowerCase().split(' ');
    const validTags = tagsArray.filter((tag) => tag && tag.length > 2 && !specialCharEx.test(tag));
    return {
      tags: validTags,
    };
  }

  /**
   * @Info Validates image source
   */
  function isValidImageSrc(src) {
    if (!src) return false;
    try {
      new URL(srcToHttp(src));
      return !/^data|image\/svg;base64|\[gif\]|gif;|\.svg|base64|data:image/.test(src);
    } catch (e) {
      return false;
    }
  }

  /**
   * @Info We check to see if there are duplicate images. Sometimes multiple images are picked up with different resolutions
   * this strips out the query and checks if the image is a duplicate as well
   */
  function isDuplicateImg(src, omitDuplicateImgByBase) {
    let isDuplicate;
    if (!src) return false;

    // Filter out images by same base path only E.g. https://cdn.img?quality=200, https://cdn.img?quality=100
    // will count as the same base path
    if (omitDuplicateImgByBase) {
      const params = new URL(src);
      const query = params.search;
      const base = src.replace(query, '');
      isDuplicate = validatedImages.includes(base);
      if (!isDuplicate) validatedImages.push(base);

      // Filter out images with the same full path
    } else {
      isDuplicate = validatedImages.includes(src);
      if (!isDuplicate) validatedImages.push(src);
    }

    return isDuplicate;
  }

  /**
   * @Info There are cases where we might pick up 'invalid' products. We would hope the selectors defined in the schema do pick up the right elements
   * but there might be some cases where the images have not rendered yet, or we pick up a loading gif instead of the product image. We need to filter out
   * these products so they do not render on the front end
   */

  function catchInvalidProducts(product, omitDuplicateImgByBase) {
    if (hasUndefinedProps(product)) return false;

    // filter out products with invalid prices
    if (product && (product.nowPrice || product.price)) {
      const validPrices = [product.nowPrice, product.price].some((price) => /\d/.test(price));
      if (!validPrices) {
        pushWarnings({
          type: 'warning',
          message: logTypes(
            `invalid price for product: Name: ${product.name},  nowPrice ${product.nowPrice}, price: ${product.price}`
          ).PRODUCT_FILTERED_OUT,
          at: 'filterValidProducts',
        });

        return false;
      }
    }

    // filter out invalid 'toplevel data' images
    if (product && product.image) {
      const imageSrc = getSingle(product.image);
      const isValidImage = isValidImageSrc(imageSrc);
      const isDuplicateImage = isValidImage && isDuplicateImg(imageSrc, omitDuplicateImgByBase);
      const isValidProduct = isValidImage && !isDuplicateImage;

      if (!isValidProduct) {
        pushWarnings({
          type: 'warning',
          message: logTypes(
            `img src ${imageSrc}, isValidImage: ${isValidImage}, isDuplicateImage: ${isDuplicateImage}`
          ).PRODUCT_FILTERED_OUT,
          at: 'filterValidProducts',
        });
      }

      return isValidProduct;
    } else {
      return true;
    }
  }

  /**
   * @Info Read our schema and build out our extracts. Each key in the schema is used to assign the relevant data
   * e.g. price: value. Note the object data used to build our extract will be either in top level data or detailed
   * data. Top level data will exist on a PLP crawl and detailed data will exist on a PDP crawl
   */
  function getProductData({ variants, custom, ...coreData }) {
    const variantData = variants ? { variants: getDataFromVariants(variants) } : {};
    const customData = custom ? { custom: getDataFromCustomProps(custom) } : {};
    const mainData = Object.keys(coreData).reduce((accum, key) => {
      const dataItem = coreData[key];
      currentDataProp = key;
      return {
        ...accum,
        [key]: extractFromElements(dataItem),
      };
    }, {});

    const tags = getProductTags(mainData.name);
    return {
      ...mainData,
      ...variantData,
      ...customData,
      ...(tags ? tags : {}),
    };
  }

  /**
   * @Info Kick off our extraction process, using a parent / container selector to find the relevant nodes using
   * the selectors given in the schema. The data argument will be attributed to either a top level crawl (PLP) or
   * a detailed level cralw (PDP). The data extracted from the node selectors given in the schema are returned. Any
   * warnings relating to the extraction are also returned e.g. if we are unable to identify a particular node
   * on the page
   */
  function getExtractData({
    productsSelector = {
      selector: 'body',
    },
    data,
    omitDuplicateImgByBase,
  }) {
    try {
      const { selector } = productsSelector;
      const products = getNodes(selector);

      if (!products.length) {
        pushWarnings({
          type: 'warning',
          message: logTypes(selector).NO_CONTAINER_NODE,
          at: 'getExtractData',
        });
      }

      const productData = products
        .map((productContainer) => {
          currentProductContainer = productContainer;
          return getProductData(data);
        })

        .filter((product) => catchInvalidProducts(product, omitDuplicateImgByBase));

      return {
        data: productData,
        warnings,
        debug,
      };
    } catch (error) {
      pushWarnings({
        type: 'error',
        message: logTypes(error).COMMON,
        at: 'getExtractData',
      });

      return {
        data: [],
        warnings,
      };
    }
  }

  return getExtractData(params);
}

var data = {
  delay: 2000,
  data: {
    images: {
      selector:
        '.product-details-container #gallery .gallery__main-image[data-src]:not(.slick-cloned)',
      getDataFrom: 'attr: data-src',
    },
  },
};
// evaluate(data);
