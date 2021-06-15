//@flow
import React from 'react';
import styled from 'styled-components';
import {
  CarouselProvider,
  Slider,
  ButtonBack,
  ButtonNext,
  Dot,
  DotGroup,
} from 'pure-react-carousel';
import Grid from '@material-ui/core/Grid';

export const Thumbnail = styled(Dot)`
  && {
    padding: 0;
    outline: none;
    background: none;
    display: flex;
  }
`;

export const CarouselContainer = styled(Grid)`
  .carousel__slide {
    height: auto;
    padding-bottom: 0px !important;
  }

  .carousel__inner-slide {
    position: relative;
  }

  .carousel__dot {
    border: 1px solid #fff;

    &--selected {
      border-radius: 5px;
      overflow: hodden;
      border: 1px solid #797979;
    }
  }
`;

export const StyledCarouselProvider = styled(CarouselProvider)`
  height: 100%;
`;

export const SliderWrapper = styled(Slider)`
  height: 100%;
`;

export const CarouselButtonBack = styled(ButtonBack)`
  border: none;
  background: none;
`;

export const CarouselButtonNext = styled(ButtonNext)`
  border: none;
  background: none;
`;

export const Dots = styled.div`
  .carousel__dot-group {
    text-align: center;
    padding: 1.2rem 0.4rem;
  }
`;

export const InnerDots = styled(({ dotShape, children, ...rest }) => (
  <DotGroup {...rest}>{children}</DotGroup>
))`
  Button {
    outline: none;
    height: 10px;
    width: 10px;
    background: black;
    border-radius: ${(props) => (props.dotShape === 'circle' ? '50%' : '0px')};
    padding: 0px;
    border: 1px black solid;
    margin: 5px;

    &.carousel__dot--selected {
      background: white;
    }
  }
`;

export const ThumbNailWrapper = styled(Grid)`
  && {
    padding: 0px 0.4rem;
    max-height: 520px;
    width: 60px;

    img {
      border-radius: 5px;
      overflow: hodden;
    }
  }
`;
