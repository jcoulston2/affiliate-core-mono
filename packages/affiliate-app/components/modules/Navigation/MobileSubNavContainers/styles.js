import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import bp from '@styles/breakPoints';
import MenuList from '@material-ui/core/MenuList';

export const MobileMenuItem = styled(MenuItem)`
  && {
    padding: 0 16px;
    text-transform: ${(props) => (props.capitalLetters ? 'uppercase' : 'capitalize')};
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

export const StyledMenuList = styled(MenuList)`
  && {
    padding-bottom: 0.3em;
    ${bp.min_sm} {
      display: none;
      padding-bottom: 2em;
    }
  }
`;

export const SubNavTitle = styled(Grid)`
  && {
    justify-content: center;

    * {
      text-align: left;
    }
  }
`;

export const MobileLink = styled.h3`
  font-weight: 300;
  width: 100%;

  > a {
    display: flex;
    padding: 6px 0px;
    width: 100%;
  }
`;
