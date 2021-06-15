//@flow
import { type ProductSection, type ProductData } from '../../types/product';

type FetchedProductsData = {
  data: Array<ProductData>,
  totalProductsInCategory: number,
};

export function getFetchedProductsData(categoryData: ProductSection): FetchedProductsData {
  const catData = categoryData?.data[0];
  return {
    data: catData?.data || null,
    totalProductsInCategory: catData?.totalProductsInCategory || 0,
  };
}
