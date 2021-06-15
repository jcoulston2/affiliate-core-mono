//@flow
import { type ProductData } from '@types/Product';
import { getSingle } from '@helpers/common';

export function getProductLink(productViewData: ProductData): ?string {
  const link = productViewData?.topLevelData?.link;
  const validatedLink = getSingle(link);
  const domain = productViewData?.metaData?.domain;

  if (validatedLink && domain) {
    if (link.startsWith('//')) {
      return `https:${link}`;
    } else {
      return validatedLink?.includes(domain) ? validatedLink : domain + validatedLink;
    }
  } else {
    return '';
  }
}
