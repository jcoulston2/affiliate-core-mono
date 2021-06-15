import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import bp from '@styles/breakPoints';

export const MobileNavigation = styled(Grid)`
  padding: 0.5rem;
  background: ${(props) => props.background || '#fff'};
  box-shadow: ${(props) => props.shadow || 'initial'};
`;

export const MobileDrawer = styled(Drawer)`
  && {
    .MuiDrawer-paper {
      width: 90%;
    }

    .MuiDrawer-paper {
      overflow: hidden;
    }
  }
`;

export const MobileDrawerContainer = styled(({ navigationExpandedLevel, children, ...rest }) => (
  <Grid {...rest}>{children}</Grid>
))`
  && {
    overflow-y: scroll;
    transition: left 0.2s;
    max-width: initial;
    width: 300%;
    position: relative;
    background: #fff;
    left: ${({ navigationExpandedLevel }) =>
      navigationExpandedLevel ? `-${navigationExpandedLevel}00%` : '0'};

    margin-bottom: 5px;

    ${bp.max_xs} {
      .MuiGrid-root {
        margin-bottom: 1px;
      }
    }
  }
`;

export const TitleIndicator = styled(
  ({ mobileNavStatusBarColor, mobileNavStatusBarCopyColor, children, ...rest }) => (
    <Grid {...rest}>{children}</Grid>
  )
)`
  && {
    text-transform: uppercase;
    position: relative;
    background: ${(props) => props.mobileNavStatusBarColor};
    padding: 0.5em;
    p {
      color: ${(props) => props.mobileNavStatusBarCopyColor};
      margin-left: 1em;
    }
  }
`;

export const Back = styled.div`
  position: absolute;
  top: 0px;
  height: 100%;
  display: flex;
  align-items: center;
  left: 0px;
  padding-left: 10px;
  min-width: 100px;
`;

export const NavCard = styled(Grid)`
  padding: 17px 10px;
  text-transform: capitalize;

  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`;

export const TopNavIcons = styled(Grid)`
  padding: 10px 12px 10px 10px;
`;
