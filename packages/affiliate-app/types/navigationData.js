//@flow
export type NormalizedSubNavItems = Array<{
  title: string,
  link: string,
}>;

export type NormalizedSubNavDataItem = {
  title: string,
  subNavItems: NormalizedSubNavItems,
};

export type NormalizedSubNavData = Array<NormalizedSubNavDataItem>;

export type NavigationData = Array<{
  title: string,
  link: string,
  subNav: NormalizedSubNavData,
}>;

export type NormalizedNavigationData = ?{
  affiliateData: NavigationData,
};
