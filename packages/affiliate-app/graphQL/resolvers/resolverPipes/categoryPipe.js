//@flow
import { type ProductSection } from '@types/product';
import { type ProductsData, type ProductCategory } from '@types/product';
import { urlCaseMatches } from '@helpers/common';

export function categoryPipe(
  affiliateData: ProductsData,
  section: string,
  productType: string
): ?Array<ProductCategory> {
  const productSection: ?ProductSection = affiliateData.find((category) =>
    urlCaseMatches(category.section, section)
  );

  return productSection?.data.filter(({ category }) => urlCaseMatches(category, productType));
}
