//@flow
import React, { useState } from 'react';
import { type CmsCopy } from '@types/cms';
import { type NavigationData } from '@types/navigationData';
import { type CmsResponsiveString } from '@types/cms';
import MobileSubNavContainers from '../MobileSubNavContainers/MobileSubNavContainers';
import Grid from '@material-ui/core/Grid';
import Logo from '@units/Logo';
import Button from '@units/Button';
import WishList from '@containers/WishList';
import Settings from '@containers/UserSettings';
import Search from '@modules/Search';
import HamburgerNavigation from '@modules/HamburgerNavigation';
import Typography from '@units/Typography';
import { Flex, CenterAll, Spacer } from '@styles/CommonStyledComponents';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Copy from '@units/Copy';
import Card from '@units/Card';
import ClearIcon from '@material-ui/icons/Clear';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useCms } from '@hooks';
import usePwa from '@containers/Pwa/hook';

import {
  MobileNavigation,
  MobileDrawer,
  MobileDrawerContainer,
  TitleIndicator,
  Back,
  NavCard,
  TopNavIcons,
} from './styles';

type NavigationProps = $Exact<{
  navigationData: NavigationData,
  mobileMenuOpen: boolean,
  mobileNavStatusBarColor: string,
  mobileNavStatusBarCopyColor: string,
  quickFinderCopy: string,
  includeQuickFinderLink: boolean,
  mobileFirstLevelNavLink: CmsCopy,
  mobileSecondLevelNavLink: CmsCopy,
  mobileNavHorizontalLayers: 2 | 3,
  mobileNavCardPadding: CmsResponsiveString,
  togglMobileNav: Function,
  mobileNavBarBackground: string,
  mobileNavBarShadow: string,
  setQuickFinderOpen: Function,
  resetProductFeeds: Function,
}>;

export default function Navigation({
  navigationData,
  togglMobileNav,
  mobileMenuOpen,
  mobileNavStatusBarColor,
  mobileNavStatusBarCopyColor,
  quickFinderCopy,
  includeQuickFinderLink,
  mobileFirstLevelNavLink,
  mobileNavCardPadding,
  mobileNavBarBackground,
  mobileNavBarShadow,
  setQuickFinderOpen,
  resetProductFeeds,
  ...rest
}: NavigationProps) {
  const { pwa: pwaCms } = useCms('other');
  const { isPwaInitiated, initPwaPrompt } = usePwa();
  const [navigationExpandedLevel, setNavigationExpandedLevel] = useState(0);
  const [mobileNavigationActiveTitleIndex, setMobileNavigationActiveTitleIndex] = useState(null);
  const [navigationBreadCrumb, setNavigationBreadCrumb] = useState({
    '1': null,
    '2': null,
  });

  const handleNavigationBack = () => {
    if (navigationExpandedLevel) {
      setNavigationExpandedLevel(navigationExpandedLevel - 1);
    } else {
      // If on the first level, reset breadcrumbs
      setNavigationBreadCrumb({ '1': null, '2': null });
    }
  };

  const onSearchSubmit = (): void => {
    togglMobileNav(false);
    resetProductFeeds();
  };

  return (
    <>
      <MobileNavigation
        container
        justify="center"
        alignItems="center"
        background={mobileNavBarBackground}
        shadow={mobileNavBarShadow}>
        <Grid item xs>
          <CenterAll>
            <HamburgerNavigation onClick={togglMobileNav} />
          </CenterAll>
        </Grid>
        <Grid item xs>
          <CenterAll>
            <Search isToggleSearch onSubmitCallback={onSearchSubmit} />
          </CenterAll>
        </Grid>
        <Grid item xs={5}>
          <CenterAll>
            <Logo />
          </CenterAll>
        </Grid>
        <Grid item xs>
          <CenterAll>
            <Settings />
          </CenterAll>
        </Grid>
        <Grid item xs>
          <CenterAll>
            <WishList />
          </CenterAll>
        </Grid>
      </MobileNavigation>

      <MobileDrawer
        anchor={'left'}
        open={mobileMenuOpen}
        onClose={() => togglMobileNav}
        iconCloseClick={togglMobileNav}>
        {navigationExpandedLevel > 0 && (
          <TitleIndicator
            container
            alignItems="center"
            justify="center"
            mobileNavStatusBarColor={mobileNavStatusBarColor}
            mobileNavStatusBarCopyColor={mobileNavStatusBarCopyColor}>
            <Back onClick={handleNavigationBack}>
              <Flex>
                <KeyboardBackspaceIcon style={{ color: mobileNavStatusBarCopyColor }} />
              </Flex>
            </Back>
            <Grid item>
              <Typography tag="p">
                <Copy text={navigationBreadCrumb[navigationExpandedLevel] || ''} />
              </Typography>
            </Grid>
          </TitleIndicator>
        )}

        {navigationExpandedLevel === 0 && (
          <TopNavIcons container justify="space-between" spacing={2}>
            <Grid item xs container spacing={4}>
              <Grid item>
                <Search isToggleSearch onSubmitCallback={onSearchSubmit} />
              </Grid>
              <Grid item>
                <WishList />
              </Grid>
            </Grid>

            <Grid item onClick={togglMobileNav}>
              <ClearIcon fontSize="large" />
            </Grid>
          </TopNavIcons>
        )}
        <MobileDrawerContainer container navigationExpandedLevel={navigationExpandedLevel}>
          {navigationData.map((navItem, index) => (
            <MobileSubNavContainers
              {...navItem}
              {...rest}
              {...{
                navigationExpandedLevel,
                setNavigationExpandedLevel,
                setMobileNavigationActiveTitleIndex,
                mobileNavigationActiveTitleIndex,
                setNavigationBreadCrumb,
                mobileFirstLevelNavLink,
                mobileNavCardPadding,
                togglMobileNav,
                resetProductFeeds,
              }}
              titleIndex={index}
              key={index}
            />
          ))}
          {includeQuickFinderLink && navigationExpandedLevel === 0 && (
            <NavCard item xs={4}>
              <Button
                fullWidth
                padding="0px"
                disableHover
                textTransform="initial"
                onClick={setQuickFinderOpen}>
                <Card padding={mobileNavCardPadding} fullWidth>
                  <Grid container alignItems="center" justify="space-between">
                    <Typography tag="h3" typeStyles={mobileFirstLevelNavLink}>
                      {quickFinderCopy}
                    </Typography>
                    <ChevronRightIcon />
                  </Grid>
                </Card>
              </Button>

              <Spacer h={20} />
              <Grid>
                {isPwaInitiated && (
                  <Button textTransform="initial" primary onClick={() => initPwaPrompt()}>
                    {pwaCms.pwaDownloadableBannerText}
                  </Button>
                )}
              </Grid>
            </NavCard>
          )}
        </MobileDrawerContainer>
      </MobileDrawer>
    </>
  );
}
