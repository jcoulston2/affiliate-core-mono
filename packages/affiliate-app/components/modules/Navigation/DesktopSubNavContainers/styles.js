import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import bp from '@styles/breakPoints';
import { shadowBottom } from '@styles/commonStyles';

export const LabelContent = styled(Grid)`
  && {
    display: none;
    padding: 2em;
    border-right: ${(props) => (props.separator ? '1px solid black' : 'initial')};
  }
`;

export const StyledMenu = styled(MenuItem)`
  && {
    justify-content: center;
    padding: 0.5em;
    width: 100%;

    ${bp.max_xs} {
      justify-content: left;
    }
  }
`;

export const FirstLevelNavTitle = styled.span`
  margin: auto;
`;

export const NavLinksContainer = styled(Grid)`
  && {
    padding: 0px !important;
    height: 100%;
    &:hover ${StyledMenu} {
      ${FirstLevelNavTitle} {
        &::after {
          border-bottom: 1px solid ${(props) => props.hoverEffectColor};
          content: ' ';
          width: 20px;
          display: flex;
        }
      }
    }

    &:hover ${LabelContent} {
      display: block;
    }
  }
`;

export const CollapseContainer = styled(Grid)`
  position: static;
  padding-bottom: 1em;
  margin-top: 1px;
  background: #fff;

  && {
    ${shadowBottom}
  }

  ${bp.min_sm} {
    top: ${(props) => props.height || 0}px;
    margin-top: 0;
    padding-bottom: 0;
    position: absolute;
  }

  left: 0px;
`;

export const MenuItemTitle = styled(Grid)`
  && {
    padding-bottom: 0px;
    padding-top: 0px;
    min-height: 35px;
  }
`;

export const NavLinkChunk = styled(Grid)``;

export const NavLink = styled(Grid)`
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }

  a {
    width: 100%;
    display: inline-block;
  }
`;

export const NavButtons = styled(Grid)`
  height: 100%;
`;

export const ThirdLevelNavContainer = styled(Grid)`
  border-right: 1px solid ${(props) => props.borderColor || 'black'};
`;
