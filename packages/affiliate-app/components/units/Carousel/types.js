//@flow
export type CarouselItemProps = {
  children: any,
  index: Number,
};

export type Carouselprops = $Exact<{
  children: any,
  navButtons: boolean,
  totalSlides: number,
  dots: boolean,
  dotShape: string,
  thumbNails: Array<any>,
}>;

export type CarouselThumbnailProps = {
  index: number,
  children: any,
};
