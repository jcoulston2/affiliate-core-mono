//@flow
import { type ProductData } from '@types/product';

export function getSavedPoductLinks(productData: Array<ProductData>): Array<string> {
  return productData.map(({ topLevelData }) => topLevelData?.link);
}
