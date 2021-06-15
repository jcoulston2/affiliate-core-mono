//@flow
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';
import Link from 'next/link';
import { DESKTOP_NAV_BAR_REF } from '@constants';
import chunk from 'lodash/chunk';
import Typography from '@units/Typography';
import Button from '@units/Button';
import Card from '@units/Card';
import usePwa from '@containers/Pwa/hook';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useThemeColor, useCms } from '@hooks';
import {
  LabelContent,
  StyledMenu,
  NavLinksContainer,
  CollapseContainer,
  MenuItemTitle,
  NavLink,
  NavLinkChunk,
  FirstLevelNavTitle,
  NavButtons,
  ThirdLevelNavContainer,
} from './styles';
import { type CmsCopy } from '@types/cms';
import { PLP_PATH } from '@constants';
import { isServer, getNode } from '@helpers/common';

type SubNavContainersProps = {
  title: string,
  desktopLinksPerColumn: number,
  desktopNavLabel: CmsCopy,
  desktopNavLink: CmsCopy,
  quickFinderCopy: string,
  subNav: Array<{
    title: string,
    subNavItems: Object,
  }>,
  setQuickFinderOpen: Function,
  resetProductFeeds: Function,
};

export default function SubNavContainers({
  title,
  subNav,
  desktopLinksPerColumn,
  desktopNavLink,
  desktopNavLabel,
  quickFinderCopy,
  setQuickFinderOpen,
  resetProductFeeds,
}: SubNavContainersProps) {
  const [subLevelNavItemExpanded, setSubLevelNavItemExpanded] = useState([]);
  const [navBarHeight, setNavBarHeight] = useState(100);
  const primaryColor = useThemeColor('primary');
  const { isPwaInitiated, initPwaPrompt } = usePwa();
  const { pwa: pwaCms } = useCms('other');

  useEffect(() => {
    if (!isServer()) {
      setNavBarHeight(getNode(DESKTOP_NAV_BAR_REF)?.clientHeight || 0);
    }
  });

  const handleSubLevelnavItemClick = (index) => () => {
    if (!subLevelNavItemExpanded.length) {
      return setSubLevelNavItemExpanded([index]);
    }

    // If a subnav is already expanded, remove it's index i.e. collapse it
    if (subLevelNavItemExpanded.includes(index)) {
      setSubLevelNavItemExpanded(
        subLevelNavItemExpanded.filter((expandedSubnavIndex) => index !== expandedSubnavIndex)
      );
    } else {
      setSubLevelNavItemExpanded([...subLevelNavItemExpanded, index]);
    }
  };

  const handleLinkItemClick = () => {
    resetProductFeeds();
  };

  // Third level - Navigation links (split into columns)
  const renderThirdLevelNav = (subNavItems) => {
    const split = subNavItems.length / desktopLinksPerColumn;
    const chunks = subNavItems.length / split;
    const subNavItemsChunks = chunk(subNavItems, chunks);
    return subNavItemsChunks.map((NavChunk, index) => {
      const fullCol = NavChunk.length > 4;
      return (
        <NavLinkChunk item xs container={fullCol} key={`NavLinkChunk-${index}`}>
          {NavChunk.map(({ title, link }, index) => (
            <NavLink item xs={12} key={`NavLink-${index}`} onClick={handleLinkItemClick}>
              <Link href={`/${PLP_PATH}/[...slug]`} as={`/${PLP_PATH}${link}`}>
                <a>
                  <Typography tag="p" typeStyles={desktopNavLink} fullwidth>
                    {title}
                  </Typography>
                </a>
              </Link>
            </NavLink>
          ))}
        </NavLinkChunk>
      );
    });
  };

  // Second level - Wrapper around label and nav links
  const renderSecondLevelNav = (subNav) =>
    subNav.map(({ title, subNavItems }, index) => (
      <Grid container item xs key={`grid${index}`}>
        <LabelContent item xs id="menu-list-Collapse" seperator>
          <MenuItemTitle onClick={handleSubLevelnavItemClick(index)}>
            <Typography tag="h4" typeStyles={desktopNavLabel}>
              {title}
            </Typography>
          </MenuItemTitle>
          <Collapse in={true}>
            <ThirdLevelNavContainer container borderColor={primaryColor}>
              {renderThirdLevelNav(subNavItems)}
            </ThirdLevelNavContainer>
          </Collapse>
        </LabelContent>
      </Grid>
    ));

  // First level (e.g. top level: Mens, Womens)
  const renderFirstLevelNav = () => (
    <StyledMenu aria-controls="menu-list-Collapse" aria-haspopup="true">
      <FirstLevelNavTitle>{title}</FirstLevelNavTitle>
    </StyledMenu>
  );

  return (
    <NavLinksContainer container item xs={12} sm hoverEffectColor={primaryColor}>
      {renderFirstLevelNav()}
      <Collapse in={true}>
        <CollapseContainer height={navBarHeight} container>
          {renderSecondLevelNav(subNav)}

          <Grid container item xs={3} lg={4}>
            <LabelContent item xs id="menu-list-Collapse" container alignItems="center">
              <NavButtons container alignItems="center">
                <Button
                  fullWidth
                  padding="0px"
                  disableHover
                  textTransform="initial"
                  onClick={() => setQuickFinderOpen(true)}>
                  <Card fullWidth>
                    <Grid container alignItems="center" justify="space-between">
                      <Typography tag="h4" weight={300}>
                        {quickFinderCopy}
                      </Typography>
                      <ChevronRightIcon />
                    </Grid>
                  </Card>
                </Button>

                {isPwaInitiated && (
                  <Button primary textTransform="initial" onClick={() => initPwaPrompt()}>
                    <Grid container alignItems="center" justify="space-between">
                      {pwaCms.pwaDownloadableBannerText}
                    </Grid>
                  </Button>
                )}
              </NavButtons>
            </LabelContent>
          </Grid>
        </CollapseContainer>
      </Collapse>
    </NavLinksContainer>
  );
}
