//@flow
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import bp from '@styles/breakPoints';

export const StyledGrid = styled(Grid)`
  && {
    padding: 0.3em;
    padding-left: 0;
    width: 100%;
    background: black;

    -webkit-transition: opacity 0.9s;
    transition: opacity 0.9s;

    ${bp.min_sm} {
      max-width: 100%;
      position: static;
    }
  }
`;

export const WrapperMobile = styled.div`
  && {
    background: black;
    color: #fff;
    position: relative;
    height: 35px;
  }
`;

export const WrapperDesktop = styled(Grid)`
  && {
    background: black;
    color: #fff;
    position: relative;
    height: 35px;
  }
`;

export const VerticalAlign = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const BenefitBarCopy = styled.p`
  padding: 0 1em;
  color: #fff;
`;
