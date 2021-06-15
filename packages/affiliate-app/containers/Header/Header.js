//@flow
import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Navigation from '@modules/Navigation';
import BenefitBar from '@modules/BenefitBar';
import { connect } from 'react-redux';
import { actions as headerActions } from './actions';
import { actions as listingActions } from '@containers/ListingContent/actions';
import { useCms } from '@hooks';
import { HeaderWrapper } from './styles';
import { type GlobalState, type HeaderState } from '@types/appState';
import useMediaQuery from '@material-ui/core/useMediaQuery';

type HeaderProps = {
  togglMobileNav: Function,
  resetProductFeeds: Function,
} & HeaderState;

const Header = ({
  navigationData,
  mobileMenuOpen,
  togglMobileNav,
  resetProductFeeds,
  ...topLevelAppState
}: HeaderProps) => {
  // TODO: start to migrate CMS config further down the component instead of passing props down
  const {
    benefitBar: benefitBarConfig,
    navigation: navigationConfig,
    headerBar: headerBarConfig,
  } = useCms('header');

  const muiTheme = useTheme();
  const { headerSeparatorStyle, headerSeparatorColor } = headerBarConfig;
  const isDesktop = useMediaQuery(muiTheme.breakpoints.up('lg'));

  const renderAdaptiveNavigation = (device) => {
    let adaptiveNavigationProp: string = '';
    if (device === 'mobile') adaptiveNavigationProp = 'isMobileNavigation';
    if (device === 'desktop') adaptiveNavigationProp = 'isDesktopNavigation';

    return (
      <Navigation
        {...{ [adaptiveNavigationProp]: true }}
        {...{ navigationData, togglMobileNav, mobileMenuOpen, resetProductFeeds }}
        {...navigationConfig}
      />
    );
  };

  return (
    <HeaderWrapper {...{ headerSeparatorStyle, headerSeparatorColor }}>
      {benefitBarConfig.showBenefitbar && (
        <BenefitBar {...benefitBarConfig} {...topLevelAppState} />
      )}

      {renderAdaptiveNavigation(isDesktop ? 'desktop' : 'mobile')}
    </HeaderWrapper>
  );
};

function mapDispatchToProps(dispatch): { [string]: Function } {
  return {
    togglMobileNav: (flag?: boolean) => dispatch(headerActions.togglMobileNav(flag)),
    resetProductFeeds: () => dispatch(listingActions.clearClientFetchedProducts()),
  };
}

export default connect((state: $Shape<GlobalState>) => {
  const { globalAppState, headerState, buildTimeState } = state;
  const { clientWidth } = globalAppState;
  const { navigationData } = buildTimeState;
  const { mobileMenuOpen } = headerState;
  return {
    clientWidth,
    navigationData,
    mobileMenuOpen,
  };
}, mapDispatchToProps)(Header);
