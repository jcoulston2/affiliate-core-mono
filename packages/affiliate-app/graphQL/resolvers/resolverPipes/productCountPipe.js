//@flow
import { type ProductCategory } from '@types/product';

export function productCountPipe(
  productData: Array<ProductCategory>,
  productCountStart: number,
  productCountEnd: number
): Array<ProductCategory> {
  return productData.map(({ data, ...rest }) => ({
    ...rest,
    data: data.slice(productCountStart, productCountEnd),
    totalProductsInCategory: data.length,
  }));
}
