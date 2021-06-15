import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

export const NavigationContainerOuter = styled(Grid)`
  && {
    background: ${(props) => props.background || 'white'};
    box-shadow: ${(props) => props.shadow || 'initial'};
  }
`;

export const NavigationContainerInner = styled(
  ({ desktopNavigationMaxWidth, children, ...rest }) => <Grid {...rest}>{children}</Grid>
)`
  && {
    max-width: ${({ desktopNavigationMaxWidth }) =>
      desktopNavigationMaxWidth ? `${desktopNavigationMaxWidth}px` : 'initial'};
    position: relative;
    margin: 0;
    z-index: 9;

    * {
      text-transform: capitalize;
    }
  }
`;

export const LogoContainer = styled(Grid)`
  && {
    width: auto;
    margin-right: 10px;
  }
`;
