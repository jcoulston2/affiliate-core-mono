//@flow
import { type ProductCategory, type ProductsData, type ProductData } from '../../types/product';
import { urlCaseMatches } from '@helpers/common';
import { getSingle } from '@helpers/common';

export function getSection(affiliateData: ProductsData, section: string): Array<ProductCategory> {
  return affiliateData?.find((category) => urlCaseMatches(category.section, section))?.data || [];
}

export function getCategory(
  affiliateData: ProductsData,
  section: string,
  category: string
): Array<ProductData> {
  const sec = getSection(affiliateData, section);
  if (Array.isArray(category)) {
    let catDataArray = [];
    for (const categoryFilter of category) {
      const categoryFilterData =
        sec?.find((item) => urlCaseMatches(item.category, categoryFilter))?.data || [];
      catDataArray = [...catDataArray, ...categoryFilterData];
    }
    return catDataArray;
  } else {
    return sec?.find((item) => urlCaseMatches(item.category, category))?.data || [];
  }
}

export function getCategoryLastUpdated(
  affiliateData: ProductsData,
  section: string,
  category: string
): ?string {
  const sec = getSection(affiliateData, section);
  const data = sec?.find((item) => urlCaseMatches(item.category, getSingle(category)));
  return data?.categoryLastUpdated;
}

export function eachCategoryCb(affiliateData: ProductsData, section: string, cb: Function): void {
  const sec = getSection(affiliateData, section);
  for (const cat of sec) {
    cb(cat);
  }
}

export function traverseProductsByCategory(
  affiliateData: ProductsData,
  section: string,
  category: string,
  callback: Function
): void {
  const cat = getCategory(affiliateData, section, category);
  for (const product of cat) {
    callback(product);
  }
}

export function traverseProductsBySection(
  affiliateData: ProductsData,
  section: string,
  callback: Function
): void {
  const sec = getSection(affiliateData, section);
  const { level, cb } = callback;
  for (const cat of sec) {
    if (level === 'category') cb(cat);
    for (const product of cat.data) {
      if (level === 'product') cb(product);
    }
  }
}

export function traverseAllProducts(affiliateData: ProductsData, callback: Function) {
  const { level, cb } = callback;
  for (const sec of affiliateData) {
    if (level === 'section') cb(sec);
    for (const cat of sec.data) {
      if (level === 'category') cb(cat);
      for (const product of cat.data) {
        if (level === 'product') cb(product);
      }
    }
  }
}

export function simpleSearchMatcher(tags: Array<string>, keyTerm: string): boolean {
  if (!tags?.length) return false;
  const tagsRx = new RegExp(`\\b(${tags.join('|')})\\b`, 'gi');
  const keyTermMatch = keyTerm.match(tagsRx);
  const leastMatchesToQualifySearch = 2;

  return !!(keyTermMatch && keyTermMatch?.length >= leastMatchesToQualifySearch);
}
