//@flow
import { HOME_PATH, SEARCH_PATH, PLP_PATH } from '@constants';
import { getCopy } from '@helpers/cms';
import { type Router } from '@types/next';
import startCase from 'lodash/startCase';

type MetaContent = {
  pageTitle: string,
  pageDescription: string,
};

type MetaContentCms = {
  [string]: MetaContent,
  match: Array<{
    ...MetaContent,
    path: string,
  }>,
};

export function getPageMeta(
  route: string,
  query: Router,
  metaContent: MetaContentCms
): MetaContent {
  if (route === HOME_PATH) {
    return metaContent.home;
  } else if (route.includes(PLP_PATH)) {
    const [sec, cat] = query?.slug || [];
    const secCat = `${startCase(sec)} ${startCase(cat)}`;
    return {
      pageTitle: getCopy(metaContent.listing.pageTitle, secCat),
      pageDescription: getCopy(metaContent.listing.pageDescription, secCat),
    };
  } else if (route.includes(SEARCH_PATH)) {
    const searchTerms = Object.values(query).join(' ');
    return {
      pageTitle: getCopy(metaContent.search.pageTitle, searchTerms),
      pageDescription: getCopy(metaContent.search.pageDescription, searchTerms),
    };
  } else {
    for (const meta of metaContent.match) {
      if (route.includes(meta.path)) {
        return meta;
      }
    }
  }

  // fallback
  return metaContent.default;
}
