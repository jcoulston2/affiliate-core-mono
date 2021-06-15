//@flow
import * as React from 'react';
import { Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { type CarouselItemProps, type Carouselprops, type CarouselThumbnailProps } from './types';
import {
  Thumbnail,
  CarouselContainer,
  StyledCarouselProvider,
  SliderWrapper,
  CarouselButtonBack,
  CarouselButtonNext,
  Dots,
  InnerDots,
  ThumbNailWrapper,
} from './styles';

export function CarouselItem({ children, index }: CarouselItemProps) {
  return (
    <Slide index={index}>
      <div>{children}</div>
    </Slide>
  );
}

export function CarouselThumbnail({ children, index }: CarouselThumbnailProps) {
  return (
    <Thumbnail key={index} slide={index}>
      {children}
    </Thumbnail>
  );
}

export function Carousel({
  children,
  navButtons,
  totalSlides,
  dots,
  thumbNails,
  dotShape,
  ...rest
}: Carouselprops) {
  return (
    <StyledCarouselProvider
      naturalSlideWidth={100}
      naturalSlideHeight={100}
      {...{ totalSlides }}
      {...rest}>
      <CarouselContainer container>
        {thumbNails && (
          <Hidden smDown>
            <ThumbNailWrapper item container direction="column">
              {thumbNails}
            </ThumbNailWrapper>
          </Hidden>
        )}

        <Grid item xs>
          <SliderWrapper>{children}</SliderWrapper>
        </Grid>
      </CarouselContainer>

      {navButtons && (
        <>
          <CarouselButtonBack>Back</CarouselButtonBack>
          <CarouselButtonNext>Next</CarouselButtonNext>
        </>
      )}

      {dots && totalSlides > 1 && (
        <Dots>
          <InnerDots dotShape={dotShape} />
        </Dots>
      )}
    </StyledCarouselProvider>
  );
}
