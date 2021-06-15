//@flow
import startCase from 'lodash/startCase';
import { SEARCH_PATH } from '@constants';
import { type Router } from '@types/next';
import { getCopy } from '@helpers/cms';

type HeroCopy = {
  heroHeading: string,
  heroDescription: string,
};

export function getSearchCopy(query: { [string]: any }): string {
  return `Your search result for "${Object.values(query).join(' ').replace(/-/g, ' ')}"`;
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
