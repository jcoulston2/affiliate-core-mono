//@flow
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { CarouselItem, Carousel, CarouselThumbnail } from '@units/Carousel';
import styled from 'styled-components';
import bp from '@styles/breakPoints';
import Skeleton from '@material-ui/lab/Skeleton';
import { getValidImages } from './helper';

type ProductImageCarouselProps = {
  images: Array<string>,
  includeImageDots: boolean,
  imageDotsShape: 'circle' | 'square',
};

const Thumbnails = styled(Grid)`
  padding: 0.2rem;
`;

const CarouselImageContainer = styled.div`
  && {
    display: flex;
    justify-content: center;
    height: 100%;

    img {
      border-radius: 17px;
      overflow: hidden;
      width: ${(props) => (props.hasSingleImg ? 'auto' : '100%')};
      max-height: ${(props) => (props.hasSingleImg ? '585px' : 'auto')};
      align-self: flex-start;

      ${bp.max_xs} {
        width: 100%;
      }
    }
  }
`;

function getCarouselThumbnails(images) {
  return images.map((src, index) => (
    <Thumbnails item key={index}>
      <CarouselThumbnail index={index}>
        <Skeleton animation="wave" />
        <img src={src} alt={'product image'} />
      </CarouselThumbnail>
    </Thumbnails>
  ));
}

function ProductImageCarousel({
  images,
  includeImageDots,
  imageDotsShape,
}: ProductImageCarouselProps) {
  const validImages = getValidImages(images);
  const imageThumbnails = getCarouselThumbnails(validImages);
  const hasSingleImg = validImages.length === 1;
  const imageCarouselSettings = {
    totalSlides: validImages.length,
    dots: includeImageDots,
    dotShape: imageDotsShape,
    thumbNails: imageThumbnails,
  };

  return (
    <Carousel {...imageCarouselSettings}>
      {validImages.map((imageSrc, index) => (
        <CarouselItem index={index} key={index}>
          <CarouselImageContainer hasSingleImg={hasSingleImg}>
            <img src={imageSrc} alt={'product image'} />
          </CarouselImageContainer>
        </CarouselItem>
      ))}
    </Carousel>
  );
}

export default ProductImageCarousel;
