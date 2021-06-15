//@flow
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import styled from 'styled-components';
import bp from '@styles/breakPoints';
import { Spacer } from '@styles/CommonStyledComponents';

export const StyledDrawer = styled(Drawer)`
  && {
    .MuiDrawer-paper {
      width: ${(props) => (props.open ? '100%' : '')};
      height: ${(props) => (props.open ? '100%' : '')};

      ${bp.max_md} {
        width: 100%;
      }
    }

    h4 {
      padding: 6px 0px;
    }
  }
`;

export const CarouselContainer = styled(Grid)`
  && {
    max-width: 700px;
    .carousel__slider {
      ${bp.min_sm} {
        min-height: 520px;
      }
    }
  }
`;

export const DrawerContent = styled(Grid)`
  ${bp.min_xs} {
    padding: 0rem 1rem;
  }

  ${bp.min_lg} {
    padding: 0 2.5rem;
  }
`;

export const StickyContainer = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0px;
`;

export const ProductShowCase = styled(Grid)`
  max-width: 1400px;
  height: 100%;
`;

export const ProductCards = styled.div`
  max-width: 520px;
  margin-top: 15px;
  width: 100%;

  ${bp.min_md} {
    display: flex;
    max-width: 100%;
    align-items: flex-start;
    justify-content: center;

    > section {
      margin: 10px;
      &:first-child {
        flex-shrink: 0;
        width: 55%;
      }
    }

    > ${Spacer} {
      display: none;
    }
  }

  ${bp.min_lg} {
    display: block;

    > section {
      &:first-child {
        width: 100%;
      }
      margin: 0px;
      width: auto;
    }

    > ${Spacer} {
      display: block;
    }
  }
`;

export const ProductCtaWrapper = styled(Grid)`
  ${bp.min_xs} {
    && {
      margin-top: 1rem;
    }
  }
`;

export const WishListContainer = styled(Grid)`
  && {
    min-width: 46px;
    display: flex;
    justify-content: flex-end;

    ${bp.max_xs} {
      min-width: 40px;
    }
  }
`;
