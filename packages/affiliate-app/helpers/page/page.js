//@flow
import { type NavigationApiQuery, type NavigationDataItem } from '../../types/apiQueries';
import {
  type NormalizedNavigationData,
  type NormalizedSubNavData,
} from '../../types/navigationData';
import { urlCase, isServer } from '@helpers/common';

export function structureNavigationData(sectionItem: NavigationDataItem): NormalizedSubNavData {
  return sectionItem.data.map(({ label }) => {
    return {
      title: label,
      subNavItems: sectionItem.data
        .filter((catlevel) => catlevel.label === label)
        .map(({ category }) => ({
          title: category,
          link: urlCase(`/${sectionItem.section}/${category}`),
        })),
    };
  });
}

export function normalizeNavigationData(
  structuredCatLevelData: NormalizedSubNavData
): NormalizedSubNavData {
  return structuredCatLevelData
    .reduce((acc, current): any => {
      return [...acc, acc && acc.some((has) => has.title === current.title) ? null : current];
    }, [])
    .filter((notNull) => notNull);
}

export function getNavigationProps(rawApiResponse: NavigationApiQuery): NormalizedNavigationData {
  if (!rawApiResponse) return null;

  const { affiliateData } = rawApiResponse;
  const normalizedNavData = affiliateData.map((sectionItem) => {
    const structuredCatLevelData = structureNavigationData(sectionItem);
    const normalizedCatLevelData = normalizeNavigationData(structuredCatLevelData);

    return {
      title: sectionItem.section,
      link: `/${sectionItem.section}`,
      subNav: normalizedCatLevelData,
    };
  });

  return {
    affiliateData: normalizedNavData,
  };
}

export function pushState(state: { [string]: any }, title: string, url: string): void {
  if (window.history?.pushState) {
    window.history.pushState(state, state, url);
  }
}

const pushDefault = !isServer() && window.onpopstate;
export function defatulPopState(): void {
  if (!isServer() && window.onpopstate) {
    window.onpopstate = pushDefault;
  }
}

export function fixPopState(): void {
  if (!isServer() && window.history && window.onpopstate) {
    window.history.pushState(null, null, location.href);
    window.history.back();
    window.history.forward();
    window.onpopstate = function () {
      history.go(1);
    };
  }
}
