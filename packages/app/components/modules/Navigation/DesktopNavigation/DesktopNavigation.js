//@flow
import React from 'react';
import DesktopSubNavContainers from '../DesktopSubNavContainers/DesktopSubNavContainers';
import Grid from '@material-ui/core/Grid';
import Logo from '@units/Logo';
import Search from '@modules/Search';
import { NavigationContainerInner, LogoContainer, NavigationContainerOuter } from './styles';
import WishList from '@containers/WishList';
import Settings from '@containers/UserSettings';
import { CenterAll } from '@styles/CommonStyledComponents';
import { type NavigationData } from '@types/navigationData';
import { type CmsCopy } from '@types/cms';

type NavigationProps = {
  navigationData: NavigationData,
  desktopNavigationMaxWidth: number,
  desktopLinksPerColumn: number,
  desktopNavLabel: CmsCopy,
  desktopNavLink: CmsCopy,
  desktopNavigationMaxWidth: number,
  desktopNavBarBackground: string,
  desktopNavBarShadow: string,
  quickFinderCopy: string,
  setQuickFinderOpen: Function,
  resetProductFeeds: Function,
};

export default function Navigation({
  navigationData,
  desktopNavigationMaxWidth,
  desktopLinksPerColumn,
  desktopNavLabel,
  desktopNavLink,
  desktopNavBarBackground,
  desktopNavBarShadow,
  quickFinderCopy,
  setQuickFinderOpen,
  resetProductFeeds,
}: NavigationProps) {
  return (
    <NavigationContainerOuter
      container
      justify="center"
      data-ref="desktop-navigation-bar"
      background={desktopNavBarBackground}
      shadow={desktopNavBarShadow}>
      <NavigationContainerInner
        container
        spacing={2}
        alignItems="center"
        desktopNavigationMaxWidth={desktopNavigationMaxWidth}>
        <LogoContainer item container justify="flex-start">
          <Logo />
        </LogoContainer>

        {navigationData.map((navItem, index) => (
          <DesktopSubNavContainers
            {...navItem}
            {...{
              desktopLinksPerColumn,
              desktopNavLabel,
              desktopNavLink,
              quickFinderCopy,
              setQuickFinderOpen,
              resetProductFeeds,
            }}
            key={index}
          />
        ))}

        <Grid item xs={5} container justify="flex-end">
          <Search onSubmitCallback={resetProductFeeds} />
        </Grid>
        <Grid item xs={2} container justify="center" alignItems="center">
          <Grid item>
            <CenterAll>
              <WishList />
            </CenterAll>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item>
            <CenterAll>
              <Settings />
            </CenterAll>
          </Grid>
        </Grid>
      </NavigationContainerInner>
    </NavigationContainerOuter>
  );
}
