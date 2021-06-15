//@flow
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Link from 'next/link';
import Typography from '@units/Typography';
import { type CmsCopy } from '@types/cms';
import Card from '@units/Card';
import { SubNavTitle, MobileMenuItem, MobileLink } from './styles';
import { NavCard } from '../MobileNavigation/styles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { type NormalizedSubNavDataItem } from '@types/navigationData';
import { type CmsResponsiveString } from '@types/cms';
import { PLP_PATH } from '@constants';

type SubNavContainersProps = {
  title: string,
  titleIndex: number,
  subNav: Array<NormalizedSubNavDataItem>,
  navigationExpandedLevel: number,
  setMobileNavigationActiveTitleIndex: Function,
  mobileNavigationActiveTitleIndex: Function,
  setNavigationExpandedLevel: Function,
  navigationExpandedLevel: number,
  setNavigationBreadCrumb: Function,
  mobileFirstLevelNavLink: CmsCopy,
  mobileSecondLevelNavLink: CmsCopy,
  mobileNavCardPadding: CmsResponsiveString,
  mobileNavHorizontalLayers: 2 | 3,
  togglMobileNav: Function,
  resetProductFeeds: Function,
};

export default function SubNavContainers({
  title,
  titleIndex,
  subNav,
  setNavigationExpandedLevel,
  setMobileNavigationActiveTitleIndex,
  mobileNavigationActiveTitleIndex,
  navigationExpandedLevel,
  setNavigationBreadCrumb,
  mobileFirstLevelNavLink,
  mobileSecondLevelNavLink,
  mobileNavHorizontalLayers,
  mobileNavCardPadding,
  togglMobileNav,
  resetProductFeeds,
}: SubNavContainersProps) {
  const handleNavExpanded = (activeIndex, level, title) => {
    setNavigationBreadCrumb((state) => ({ ...state, [level]: title }));
    setNavigationExpandedLevel(level);
    setMobileNavigationActiveTitleIndex(activeIndex);
  };

  const isThirdLevel = navigationExpandedLevel === 2;
  const isSecondLevel = navigationExpandedLevel === 1;
  const isActive = mobileNavigationActiveTitleIndex === titleIndex;
  const isThreeLayeredMobileNav = mobileNavHorizontalLayers === 3;
  const isLastLayerActive = isThreeLayeredMobileNav ? isThirdLevel : isSecondLevel;

  const handleNavItemClick = (): void => {
    togglMobileNav(false);
    resetProductFeeds();
  };

  // First / top level
  const renderFirstLevelNav = () => (
    <NavCard item xs={4} onClick={() => handleNavExpanded(titleIndex, 1, title)}>
      <Card padding={mobileNavCardPadding}>
        <Grid container alignItems="center" justify="space-between">
          <Typography tag="h3" typeStyles={mobileFirstLevelNavLink}>
            {title}
          </Typography>
          <ChevronRightIcon />
        </Grid>
      </Card>
    </NavCard>
  );

  // Labels
  const renderLabels = (title) => (
    <Grid item xs>
      <NavCard onClick={() => handleNavExpanded(titleIndex, 2, title)}>
        {isSecondLevel && (
          <Card padding={mobileNavCardPadding}>
            <Grid container alignItems="center" justify="space-between">
              <Typography tag="h3" typeStyles={mobileSecondLevelNavLink}>
                {title}
              </Typography>
              <ChevronRightIcon />
            </Grid>
          </Card>
        )}
      </NavCard>
    </Grid>
  );

  // Nav links
  const renderNavLinks = (subNavItems, title) => (
    <Grid item xs>
      {!isThreeLayeredMobileNav && (
        <MobileMenuItem>
          <Typography tag="h3" typeStyles={mobileSecondLevelNavLink}>
            {title}
          </Typography>
        </MobileMenuItem>
      )}
      {isLastLayerActive &&
        subNavItems.map(({ title, link }, index) => (
          <>
            <MobileMenuItem key={`StyledMenuItem${index}`}>
              <MobileLink onClick={handleNavItemClick}>
                <Link href={`/${PLP_PATH}/[...slug]`} as={`/${PLP_PATH}${link}`}>
                  {title}
                </Link>
              </MobileLink>
            </MobileMenuItem>
            <Divider />
          </>
        ))}
    </Grid>
  );

  return (
    <>
      {(!navigationExpandedLevel || isActive) && (
        <SubNavTitle container item>
          {renderFirstLevelNav()}
          <Grid container item xs={8} direction="column">
            {subNav.map(({ title, subNavItems }, index) => (
              <Grid item xs container key={index}>
                {isThreeLayeredMobileNav && renderLabels(title)}
                {renderNavLinks(subNavItems, title)}
              </Grid>
            ))}
          </Grid>
        </SubNavTitle>
      )}
    </>
  );
}

SubNavContainers.propTypes = {};
