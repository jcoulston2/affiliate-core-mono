//@flow
/* eslint-disable no-console */
import { INVALID_PRICE, INVALID_IMG } from '@constants';
import { type ProductDetailedData } from '@types/product';
import { isDebug } from '@helpers/common';

export function isValidPrice(finalPrice: ?string): boolean {
  return !!finalPrice && /£\d/.test(finalPrice);
}

export function hasMoreColors(detailedData: ProductDetailedData): boolean {
  const colorVariants = detailedData?.variants?.find((variant) => variant.variantText === 'Colors');
  const numberOfVariants = colorVariants?.data?.length || 0;
  return numberOfVariants > 1;
}

export function logInvalidPrice(name: ?string): void {
  if (isDebug()) {
    console.log(`${INVALID_PRICE} name: ${name || 'null'}`);
  }
}

export function logInvalidImg(name: ?string, src: ?string): void {
  if (isDebug()) {
    console.log(`${INVALID_IMG} name: ${name || 'null'} broken src: ${src || 'null'}}`);
  }
}

export function hasMinRequiredData(
  validatedImageSrc: ?string,
  name: ?string,
  validPrice: ?string,
  validNowPrice: ?string
): boolean {
  if (!name) {
    return false;
  }

  if (!validatedImageSrc) {
    logInvalidImg(name, validatedImageSrc);
    return false;
  }

  if (!(isValidPrice(validPrice) || isValidPrice(validNowPrice))) {
    logInvalidPrice(name);
    return false;
  }

  return true;
}

export function getFallbackImg(topLevelDataImages: Array<string> | string): ?string {
  if (!topLevelDataImages?.length) return null;
  if (!Array.isArray(topLevelDataImages)) return topLevelDataImages || null;
  return topLevelDataImages[0] || null;
}
