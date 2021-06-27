//@flow
import startCase from 'lodash/startCase';
import capitalize from 'lodash/capitalize';
import { SEARCH_PATH } from '@constants';
import { type Router } from '@types/next';
import { getCopy } from '@helpers/cms';

type HeroCopy = {
  heroHeading: string,
  heroDescription: string,
};

export function getSearchCopy(query: { [string]: any }): string {
  const readableQuery = Object.keys(query).reduce((acc, cur) => {
    const key = cur.replace(/-/g, ' ');
    let keyValue = query[cur].replace(/-/g, ' ');

    if (cur === 'sale-threshold') keyValue += '%';
    if (cur === 'fliik-view') return acc;

    return `${acc}${acc ? ' ' : ''} <span class="highlight">${capitalize(
      key
    )}</span>: "${keyValue}"`;
  }, '');

  return `Your search result for ${readableQuery}`;
}

export function getHeroCopy(
  router: Router,
  descriptions: { [string]: { [string]: string } },
  defaultDescription: string
): HeroCopy {
  const isSearchUrl = router.route.includes(SEARCH_PATH);
  const [sec, cat] = router.query?.slug || [];
  const heroHeading = isSearchUrl ? 'Search Results' : startCase(`${sec} ${cat}`);
  const heroDescription = isSearchUrl
    ? getSearchCopy(router.query)
    : (sec && cat && descriptions[sec][cat]) ||
      getCopy(defaultDescription, cat && cat.replace(/-/g, ' '));

  return {
    heroHeading,
    heroDescription,
  };
}
