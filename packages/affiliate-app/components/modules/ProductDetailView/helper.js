//@flow
import {
  type ProductDetailedData,
  type ProductTopLevelData,
  type ProductCustomVariant,
  type ProductData,
} from '@types/product';
import { srcToHttp, getSingle, toArray } from '@helpers/common';
import { formatDistance } from 'date-fns';

export function hasValidTabbedData(data: Array<string>, isDefault: ?boolean): boolean {
  return !!isDefault || data.filter((isNull) => !isNull).length !== data.length;
}

export function mapCustomDataToTabs(
  customDescriptiveData: Array<ProductCustomVariant>
): Array<{ title: string, data: any }> {
  return customDescriptiveData.map((item) => ({
    title: item.customText,
    data: item.data.map((notNull) => notNull),
  }));
}

export function normalizeSingleImage(src: string, domain: string): string {
  const toHttp = srcToHttp(src);
  return toHttp.startsWith('/') ? domain + src : toHttp;
}

export function reduceDuplicateUrls(urls: Array<string>): Array<string> {
  return urls.reduce((acc, cur) => {
    const includesBaseUrl = acc.some((checkedUrl) => {
      const params = new URL(cur);
      const query = params.search;
      const base = cur.replace(query, '');
      return checkedUrl.includes(base);
    });
    return includesBaseUrl ? acc : [...acc, cur];
  }, []);
}

export function hasRequiredProductInformation({
  detailedData,
  topLevelData,
  metaData,
}: ProductData): boolean {
  return !!(detailedData && topLevelData && metaData);
}

export function normalizeTopLevelProductData(data: ProductTopLevelData): ProductTopLevelData {
  const normalized = Object.keys(data).reduce((accum: Object, cur: Object) => {
    return {
      ...accum,
      [cur]: Array.isArray(data[cur]) ? data[cur][0] : data[cur],
    };
  }, {});

  return normalized;
}

// Although rare, there may be some cases where we always want to return a single value
// instead of an array of values. This helper function just provides an extra security layer
// incase we have accidentally defined a selector which picks up multiple values
export function normalizeDetailProductData(
  data: ProductDetailedData
): {
  ...ProductDetailedData,
  selectedColor: string,
} {
  let normalized = {};
  Object.keys(data).forEach((detailDataKey) => {
    const detailDataValue: any = data[detailDataKey];
    switch (detailDataKey) {
      case 'selectedColor':
        normalized[detailDataKey] = getSingle(detailDataValue);
        break;

      // we can skip custom and variants as they are special cases
      case 'variants':
      case 'custom':
        normalized[detailDataKey] = detailDataValue;
        break;

      default:
        normalized[detailDataKey] = toArray(detailDataValue);
        break;
    }
  });

  return normalized;
}

export function getCustomDescriptiveData(
  customData: ?Array<ProductCustomVariant>
): Array<ProductCustomVariant> {
  return (
    customData?.filter((customDataItem) =>
      customDataItem.data.some((dataItem) => dataItem.isDescriptive)
    ) || []
  );
}

export function getCustomPrimaryData(
  customData: ?Array<ProductCustomVariant>
): Array<{ variantText: string, data: Array<Object> }> {
  return (
    customData
      ?.filter((customDataItem) => customDataItem.data.some((dataItem) => dataItem.isPrimary))
      .map((item) => ({
        ...item,
        variantText: item.customText,
      })) || []
  );
}

export function getPriceLastUpdated(categoryLastUpdated?: string): ?string {
  const lastUpdated = categoryLastUpdated
    ? formatDistance(new Date(categoryLastUpdated), new Date(), {
        addSuffix: true,
      })
    : null;
  const tooLongThreshold = lastUpdated && /year|month/.test(lastUpdated);
  return tooLongThreshold ? null : lastUpdated;
}

// TODO: the below logic should really be removed from core, since the logic exists in the extractor service,
// we just need to remember to add the "omitDuplicateImgByBase" when defening schemas for brands that pick up
// multiple differing quality params! Or we should set omitDuplicateImgByBase to true by default. See the
// extractor service for more details
let validatedImages = [];
export function isDuplicateImg(src: string, omitDuplicateImgByBase: boolean): boolean {
  let isDuplicate;
  if (!src) return false;
  if (omitDuplicateImgByBase) {
    const params = new URL(src);
    const query = params.search;
    const base = src.replace(query, '');
    isDuplicate = validatedImages.includes(base);
    if (!isDuplicate) validatedImages.push(base);
  } else {
    isDuplicate = validatedImages.includes(src);
    if (!isDuplicate) validatedImages.push(src);
  }

  return isDuplicate;
}

// TODO: see above comment
export function getValidImages(images: Array<string>): Array<string> {
  validatedImages = [];
  return images.filter((img) => !isDuplicateImg(img, true));
}
