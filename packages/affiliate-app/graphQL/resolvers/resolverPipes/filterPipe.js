//@flow
import { getCalculatedDiscount, getSingle, getCurrentPrice } from '@helpers/common';
import { type ProductCategory, type ProductData } from '@types/product';
import { type Filters } from '@types/product';
import { urlCase } from '@helpers/common';

export function filterDataPipe(
  data: Array<ProductData>,
  { priceSort, priceThresholdLow, priceThresholdHigh, keyWords, saleThreshold, brands }: Filters
): Array<ProductData> {
  let filteredData: Array<any> = data;

  if (priceThresholdLow) {
    filteredData = filteredData.filter(
      ({ topLevelData }) => getCurrentPrice(topLevelData) >= priceThresholdLow
    );
  }

  if (priceThresholdHigh) {
    filteredData = filteredData.filter(
      ({ topLevelData }) => getCurrentPrice(topLevelData) <= priceThresholdHigh
    );
  }

  if (saleThreshold) {
    filteredData = filteredData.filter(({ topLevelData }) => {
      const wasPrice = getSingle(topLevelData.wasPrice) || NaN;
      const nowPrice = getSingle(topLevelData.nowPrice) || NaN;
      return getCalculatedDiscount(wasPrice, nowPrice) >= saleThreshold;
    });
  }

  if (keyWords && keyWords.length) {
    filteredData = filteredData.filter(({ topLevelData }) => {
      return (
        topLevelData.tags?.filter((tag) => {
          return keyWords.includes(tag);
        }).length === keyWords.length
      );
    });
  }

  if (brands && brands.length) {
    filteredData = filteredData.filter(({ metaData }) => {
      return brands.includes(urlCase(metaData.brand));
    });
  }

  if (priceSort === 'high') {
    filteredData = filteredData.sort(
      (a, b) => getCurrentPrice(b.topLevelData) - getCurrentPrice(a.topLevelData)
    );
  }

  if (priceSort === 'low') {
    filteredData = filteredData.sort(
      (a, b) => getCurrentPrice(a.topLevelData) - getCurrentPrice(b.topLevelData)
    );
  }

  return filteredData;
}

export function filterPipe(
  productSectionData: Array<ProductCategory>,
  filters: Filters
): Array<ProductCategory> {
  const filteredData: any = productSectionData.map(
    ({ category, label, data, categoryLastUpdated }) => {
      return {
        category,
        label,
        data: filterDataPipe(data, filters),
        categoryLastUpdated,
      };
    }
  );

  return filteredData;
}
