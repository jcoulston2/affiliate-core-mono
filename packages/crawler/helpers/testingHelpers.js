import { getAffiliateSchema } from '@affiliate-master/common';
import brandsList from '../integration/setUpMocks';
import 'regenerator-runtime/runtime';
import { MOCKS } from '../constants';

async function getFiles({ brand, ...rest }) {
  const pdp = await getAffiliateSchema(`${MOCKS}page-mocks/real-mocks/${brand}/pdp`, 'txt');
  const plp = await getAffiliateSchema(`${MOCKS}page-mocks/real-mocks/${brand}/plp`, 'txt');

  return {
    ...rest,
    brand,
    pdp,
    plp,
  };
}

async function buildPages() {
  const pageData = brandsList.map((brandData) => getFiles(brandData));
  return Promise.all(pageData);
}

export async function constructMockPages() {
  const pages = await buildPages();
  const pageData = pages.reduce((accum, { domain, ...rest }) => {
    return {
      ...accum,
      [domain]: {
        ...rest,
      },
    };
  }, {});

  return pageData;
}

export function testUrl(url, expression) {
  return typeof expression === 'string' ? url.includes(expression) : expression.test(url);
}

export function getPageHtml(mockPages, url, param) {
  const mockPagesKeys = Object.keys(mockPages);
  if (!param) return;

  for (const key of mockPagesKeys) {
    if (url.includes(key)) {
      const page = mockPages[key];
      if (param.data.link) {
        return page.plp;
      } else {
        return page.pdp;
      }
    }
  }
}

export function getSampleSchemas(allSchemas, realPageMocks) {
  const matchedDomains = [];

  return allSchemas
    .filter((schema) =>
      Object.keys(realPageMocks).some((domain) => {
        const matchesDomain =
          schema.domain === domain ||
          domain.includes(schema.domain) ||
          schema.domain.includes(domain);

        // We don't want to cycle through every single schema in a brand so let's refine to only one set of schemas
        // to make our tests more robust
        if (matchesDomain && !matchedDomains.includes(domain)) {
          matchedDomains.push(domain);
          return true;
        }

        return false;
      })
    )
    .map((schema) => ({
      multipleUrls: null,
      ...schema,
    }));
}
