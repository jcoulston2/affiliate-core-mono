//@flow
import {
  traverseProductsBySection,
  traverseProductsByCategory,
  traverseAllProducts,
  eachCategoryCb,
  simpleSearchMatcher,
} from '../helper';
import { type ProductsData, type ProductData, type ProductCategory } from '@types/product';
import { type PredictiveSearch } from '@types/search';
import { urlCaseMatches } from '@helpers/common';

function productsByBrandAndSection(
  affiliateData: ProductsData,
  brand: string,
  section: string
): Array<ProductData> {
  const products = [];
  traverseProductsBySection(affiliateData, section, {
    level: 'product',
    cb: (product) => {
      if (urlCaseMatches(product?.metaData?.brand, brand, false)) {
        products.push(product);
      }
    },
  });

  return products;
}

function productsByTermAndSec(
  affiliateData: ProductsData,
  section: string,
  keyTerm: string
): Array<ProductData> {
  const products = [];
  traverseProductsBySection(affiliateData, section, {
    level: 'product',
    cb: (product) => {
      const { topLevelData } = product;
      if (simpleSearchMatcher(topLevelData?.tags, keyTerm)) {
        products.push(product);
      }
    },
  });

  return products;
}

function productsByBrandAndCat(
  affiliateData: ProductsData,
  brand: string,
  section: string,
  category: string
): Array<ProductData> {
  const products = [];
  traverseProductsByCategory(affiliateData, section, category, (product) => {
    if (urlCaseMatches(product?.metaData?.brand, brand, false)) {
      products.push(product);
    }
  });
  return products;
}

function productsByColorAndCat(
  affiliateData: ProductsData,
  section: string,
  category: string,
  productColor: string
): Array<ProductData> {
  const products = [];
  traverseProductsByCategory(affiliateData, section, category, (product) => {
    if (product.topLevelData.tags?.includes(productColor)) products.push(product);
  });
  return products;
}

function productsByColorAndCatAndTerm(
  affiliateData: ProductsData,
  section: string,
  category: string,
  keyTerm: string,
  productColor: string
): Array<ProductData> {
  const products = [];
  traverseProductsByCategory(affiliateData, section, category, (product) => {
    const { topLevelData } = product;
    if (
      topLevelData.tags?.includes(productColor) &&
      simpleSearchMatcher(topLevelData?.tags, keyTerm)
    ) {
      products.push(product);
    }
  });
  return products;
}

function productsByTermAndCat(
  affiliateData: ProductsData,
  section: string,
  category: string,
  keyTerm: string
): Array<ProductData> {
  const products = [];
  traverseProductsByCategory(affiliateData, section, category, (product) => {
    const { topLevelData } = product;
    if (simpleSearchMatcher(topLevelData?.tags, keyTerm)) {
      products.push(product);
    }
  });
  return products;
}

function productsByCat(
  affiliateData: ProductsData,
  section: string,
  category: string
): Array<ProductData> {
  const products = [];

  eachCategoryCb(affiliateData, section, (cat) => {
    if (Array.isArray(category)) {
      if (category.some((catItem) => urlCaseMatches(catItem, cat.category))) {
        products.push.apply(products, cat.data);
      }
    } else {
      if (urlCaseMatches(category, cat.category)) {
        products.push.apply(products, cat.data);
      }
    }
  });
  return products;
}

function productsBySection(affiliateData: ProductsData, section: string): Array<ProductData> {
  const products = [];

  eachCategoryCb(affiliateData, section, (cat) => {
    products.push.apply(products, cat.data);
  });
  return products;
}

function getAllproducts(affiliateData: ProductsData): Array<ProductData> {
  let products = [];
  traverseAllProducts(affiliateData, {
    level: 'category',
    cb: (cat) => {
      products.push.apply(products, cat.data);
    },
  });

  return products;
}

function productsByTermOnly(affiliateData: ProductsData, keyTerm: string): Array<ProductData> {
  const priorityProducts = [];
  const secondaryProducts = [];
  const tertiaryProducts = [];

  traverseAllProducts(affiliateData, {
    level: 'product',
    cb: (product) => {
      const { tags } = product.topLevelData;
      if (!tags) return;
      // This is sensitive code in that we are looping through all products, so we should avoid
      // extra logic and expensive operations! This is why we are using a standard for loop below.
      // Note the tertiary condition will be activated only if we fail to match a primary condition
      // and serves as a last attempt to match a search term. Will match if the key term itself
      // includes a given tag. For example if a tag is "sock" and the term is "socks123"
      // a match will be presented. However, if there is too much difference in the terms (by length)
      // then the match will be disgarded for the tertiary condition
      for (let i = 0; i < tags.length; i++) {
        if (tags[i] === keyTerm) {
          priorityProducts.push(product);
          return;
        } else if (tags[i].includes(keyTerm)) {
          secondaryProducts.push(product);
          return;
        } else if (keyTerm.includes(tags[i])) {
          if (keyTerm.length - tags[i].length < 3) {
            tertiaryProducts.push(product);
          }
          break;
        }
      }

      if (simpleSearchMatcher(tags, keyTerm)) {
        secondaryProducts.push(product);
      }
    },
  });

  return [...priorityProducts, ...secondaryProducts, ...tertiaryProducts];
}

export function searchPipe(
  affiliateData: ProductsData,
  { category, keyTerm, productColor, section, brand }: PredictiveSearch
): Array<ProductData> {
  if (brand && section && category) {
    return productsByBrandAndCat(affiliateData, brand, section, category);
  } else if (brand && section) {
    return productsByBrandAndSection(affiliateData, brand, section);
  } else if (productColor && section && category && keyTerm) {
    return productsByColorAndCatAndTerm(affiliateData, section, category, keyTerm, productColor);
  } else if (productColor && section && category) {
    return productsByColorAndCat(affiliateData, section, category, productColor);
  } else if (keyTerm && section && category) {
    return productsByTermAndCat(affiliateData, section, category, keyTerm);
  } else if (keyTerm && section) {
    return productsByTermAndSec(affiliateData, section, keyTerm);
  } else if (section && category) {
    return productsByCat(affiliateData, section, category);
  } else if (brand) {
    return productsByBrandAndSection(affiliateData, brand, 'womens');
  } else if (section) {
    return productsBySection(affiliateData, section);
  } else if (keyTerm) {
    return productsByTermOnly(affiliateData, keyTerm);
  } else {
    return getAllproducts(affiliateData);
  }
}

export function searchResultShapePipe(
  products: Array<ProductData>,
  categoryLastUpdated: string
): Array<ProductCategory> {
  return [
    {
      category: 'Search Results',
      label: 'clothing',
      data: products,
      categoryLastUpdated,
    },
  ];
}
