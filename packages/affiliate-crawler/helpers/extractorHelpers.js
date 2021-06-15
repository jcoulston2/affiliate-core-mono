import {
  getCurrentDateTime,
  srcToHttp,
  getSingle,
  normalizePrice,
  isValidImageSrc,
  toArray,
} from './common';

/**
 * @Info Sculpts the data into our required format structure and organizes the data between schemas
 * into the relevant section and category. This can be described as the grouping of data in a normalized format
 * that will form the api structure and be readable by core.
 */
export function assignToExtract(
  extracts,
  preAssignedSec,
  preAssignedCat,
  preAssignedLabel,
  preAssignedData
) {
  if (!preAssignedData.length) return;
  for (const sections of extracts) {
    const secData = sections.data;
    if (secData && sections.section === preAssignedSec) {
      for (const categories of secData) {
        let catData = categories.data;
        if (catData && categories.category === preAssignedCat) {
          [].push.apply(catData, preAssignedData);
          return extracts;
        }
      }

      secData.push({
        category: preAssignedCat,
        categoryLastUpdated: getCurrentDateTime(),
        label: preAssignedLabel,
        data: preAssignedData,
      });

      return extracts;
    }
  }

  extracts.push({
    section: preAssignedSec,
    data: [
      {
        category: preAssignedCat,
        categoryLastUpdated: getCurrentDateTime(),
        label: preAssignedLabel,
        data: preAssignedData,
      },
    ],
  });

  return extracts;
}

/**
 * @Info filter out any ibvalid or duplicate images for product detailed data.
 */
export function validateImages(images) {
  const httpChecked = toArray(images).map((img) => srcToHttp(img));
  const validImgChecked = httpChecked.filter((img) => isValidImageSrc(img));
  return validImgChecked.reduce((acc, cur) => {
    const includesBaseUrl = acc.some((checkedUrl) => {
      const params = new URL(cur);
      const query = params.search;
      const base = cur.replace(query, '');
      return checkedUrl.includes(base);
    });
    return includesBaseUrl ? acc : [...acc, cur];
  }, []);
}

/**
 * @Info Normalize our product top level data to ensure details are in the right format
 */
export function normalizeProductDetail(data) {
  if (data?.images) data.images = validateImages(data.images);
  return data;
}

export function toPriceFormat(raw) {
  const rawValue = getSingle(raw);
  if (!rawValue.length) return null;
  const priceFormatEx = /[^0-9.]/g;
  return parseFloat(rawValue.replace(priceFormatEx, '')).toFixed(2);
}

/**
 * @Info Normalize our product detail data to ensure details are in the right format
 */
export function normalizeProductTopLevel(data) {
  if (data.image) data.image = srcToHttp(getSingle(data.image));
  if (data.link) data.link = getSingle(data.link);
  if (data.name) data.name = getSingle(data.name);
  if (data.price) data.price = normalizePrice(toPriceFormat(data.price));
  if (data.nowPrice) data.nowPrice = normalizePrice(toPriceFormat(data.nowPrice));
  if (data.wasPrice) data.wasPrice = normalizePrice(toPriceFormat(data.wasPrice));
  return data;
}

export function separateCautiousProducts(data) {
  const cautious = [];
  const secure = [];

  for (const item of data) {
    if (item.metaData.markedCautiousTimes) {
      cautious.push(item);
    } else {
      secure.push(item);
    }
  }

  return [secure, cautious];
}
