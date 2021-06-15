//@flow
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import MobileNavigation from './MobileNavigation/MobileNavigation';
import DesktopNavigation from './DesktopNavigation/DesktopNavigation';
import { type CmsCopy, type CmsResponsiveString } from '../../../types/cms';
import { type NavigationData } from '../../../types/navigationData';
import QuickFinder from '@modules/QuickFinder';

export type NavigationProps = $Exact<{
  desktopLinksPerColumn: number,
  desktopNavLabel: CmsCopy,
  desktopNavLink: CmsCopy,
  desktopNavigationMaxWidth: number,
  includeQuickFinderLink: boolean,
  isDesktopNavigation: ?boolean,
  isMobileNavigation: ?boolean,
  mobileFirstLevelNavLink: CmsCopy,
  mobileMenuOpen: boolean,
  mobileNavHorizontalLayers: 2 | 3,
  mobileNavStatusBarColor: string,
  mobileNavStatusBarCopyColor: string,
  mobileSecondLevelNavLink: CmsCopy,
  mobileNavCardPadding: CmsResponsiveString,
  navigationData: NavigationData,
  quickFinderCopy: string,
  togglMobileNav: Function,
  resetProductFeeds: Function,
  desktopNavBarBackground: string,
  desktopNavBarShadow: string,
  mobileNavBarBackground: string,
  mobileNavBarShadow: string,
}>;

export default function Navigation({
  navigationData,
  isMobileNavigation,
  isDesktopNavigation,
  togglMobileNav,
  mobileMenuOpen,
  desktopLinksPerColumn,
  desktopNavLabel,
  desktopNavLink,
  desktopNavigationMaxWidth,
  desktopNavBarBackground,
  desktopNavBarShadow,
  quickFinderCopy,
  resetProductFeeds,
  ...restMobileCms
}: NavigationProps) {
  const [quickFinderOpen, setQuickFinderOpen] = useState(false);
  return (
    <Grid container justify="center">
      {(isDesktopNavigation || !isMobileNavigation) && (
        <DesktopNavigation
          navigationData={navigationData}
          {...{
            desktopLinksPerColumn,
            desktopNavLabel,
            desktopNavLink,
            desktopNavigationMaxWidth,
            desktopNavBarBackground,
            desktopNavBarShadow,
            setQuickFinderOpen,
            quickFinderCopy,
            resetProductFeeds,
          }}
        />
      )}

      {isMobileNavigation && (
        <MobileNavigation
          {...{
            togglMobileNav,
            resetProductFeeds,
            mobileMenuOpen,
            navigationData,
            setQuickFinderOpen,
            quickFinderCopy,
          }}
          {...restMobileCms}
        />
      )}
      <QuickFinder
        onSubmitCallback={() => {
          togglMobileNav(false);
          resetProductFeeds();
        }}
        onClose={() => setQuickFinderOpen(false)}
        navigationData={navigationData}
        open={quickFinderOpen}
        setOpen={setQuickFinderOpen}
      />
    </Grid>
  );
}
