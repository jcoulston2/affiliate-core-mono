//@flow

export type Size = number;
export type Weight = number;
export type Color = string;
export type Padding = string;
export type Margin = string;
export type TextDecoration = string;
export type Tag = string;

export type CommonCmsCopy = {
  tag?: Tag,
  size?: Size,
  weight?: Weight,
  color: Color,
  margin?: Margin,
  padding?: Padding,
  textAlign: 'left' | 'right' | 'center',
  decoration: TextDecoration,
};

export type CmsResponsiveMixed = {
  mobile?: number | string,
  tablet?: number | string,
  desktop?: number | string,
};

export type CmsResponsiveInt = {
  mobile?: number,
  tablet?: number,
  desktop?: number,
};

export type CmsResponsiveString = {
  mobile?: string,
  tablet?: string,
  desktop?: string,
};

export type CmsCopy = {
  tag?: string,
  text?: string,
  mobile?: CommonCmsCopy,
  tablet?: CommonCmsCopy,
  desktop?: CommonCmsCopy,
  href?: string,
  useNativeLink?: string,
  asPath?: string,
  advancedCss?: string,
  useDecorator?: boolean,
};

export type CmsExpandResponsiveProps = {
  collapsedHeight: number,
  readMoreCopyOffsetTop?: number,
};

export type CmsEventMappings = {
  [string]: {
    [string]: Function,
  },
};

export type CmsButton = {
  textTransform?: string,
  primary?: boolean | null,
  secondary?: boolean | null,
  color?: string | null,
  bgColor?: string | null,
  noPad?: boolean,
  size?: string,
  fullWidth?: boolean,
  maxWidth?: string,
  padding?: number | string,
  copy?: CmsCopy,
  children?: any,
  text?: string,
  reference?: string,
  cmsEventMappings?: CmsEventMappings,
  disableHover?: boolean,
  square?: boolean,
  // ...MUI props (https://material-ui.com/api/button/)
};

export type CmsGridSlots = true | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type CmsGrid = $Exact<{
  xs?: CmsGridSlots,
  sm?: CmsGridSlots,
  md?: CmsGridSlots,
  lg?: CmsGridSlots,
  xl?: CmsGridSlots,
}>;
export type CmsGridAlignItems = 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
export type CmsGridJustify =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type CmsImg = {
  src: string,
  alt: string,
  padding?: string,
  className?: string,
  maxHeight?: string,
  maxWidth?: string,
  minHeight?: string,
  minWidth?: string,
  icon?: string,
  iconColor?: string,
  iconSize?: number | string,
  advancedCss: CmsResponsiveString,
  tooltip?: string,
};

export type CmsExpandCard = {
  mobile?: {
    collapsedHeight: number,
    readMoreCopyOffsetTop?: number,
  },
  tablet?: {
    collapsedHeight: number,
    readMoreCopyOffsetTop?: number,
  },
  desktop?: {
    collapsedHeight: number,
    readMoreCopyOffsetTop?: number,
  },
};

export type CmsCard = {
  children: any,
  padding?: CmsResponsiveString | string,
  margin?: CmsResponsiveString | string,
  cardOffset?: number,
  fullWidth?: boolean,
  expand?: CmsExpandCard,
  overflow?: string,
  hoverEffect?: 'grow' | 'raise' | 'tilt',
};

export type CmsGridRowItem = $Exact<{
  contentLayout?: 'stack' | 'inline',
  padding?: CmsResponsiveString,
  margin?: CmsResponsiveString,
  grid: CmsGrid,
  copy?: CmsCopy,
  cta?: CmsButton,
  img?: CmsImg,
}>;

export type CmsGridContent = $Exact<{
  bgColor: string,
  padding?: CmsResponsiveString,
  margin?: CmsResponsiveString,
  height?: CmsResponsiveString,
  spacing: number,
  alignItems?: CmsGridAlignItems,
  justify?: CmsGridJustify,
  maxWidth: string,
  rows: Array<CmsGridRowItem>,
  borderShadow: string,
  cmsEventMappings: any,
}>;

export type CmsCommonGridContainer = $Exact<{
  padding?: CmsResponsiveString,
  margin?: CmsResponsiveString,
  height?: CmsResponsiveString,
  overflow?: string,
  bgColor?: string,
  children?: any,
  maxWidth?: string,
  maxHeight?: string,
  borderShadow?: string,
  backgroundImage?: string,
}>;

export type CmsStackedCard = $Exact<{
  cardOffset?: CmsResponsiveInt,
  maxWidth?: string,
  expand?: CmsExpandCard,
  padding?: CmsResponsiveString,
  margin?: CmsResponsiveString,
  grid?: CmsGrid,
  heading?: CmsCopy,
  copy?: CmsCopy,
  cta?: CmsButton,
  img?: CmsImg,
  cmsEventMappings?: CmsEventMappings,
}>;

export type CmsSplitCard = $Exact<{
  cmsEventMappings?: CmsEventMappings,
  maxWidth?: string,
  collapsable?: CmsExpandCard,
  inverse?: boolean,
  splitSpacing?: {
    left?: CmsGrid,
    spacer?: CmsGrid,
    right?: CmsGrid,
  },
  padding?: CmsResponsiveString,
  margin?: CmsResponsiveString,
  grid?: CmsGrid,
  heading?: CmsCopy,
  copy?: CmsCopy,
  cta?: CmsButton,
  img?: CmsImg,
  expand?: {
    mobile?: CmsExpandResponsiveProps,
    tablet?: CmsExpandResponsiveProps,
    desktop?: CmsExpandResponsiveProps,
  },
}>;

export type CmsContentSplitItem = {
  grid: CmsGrid,
  items: Array<{ heading?: CmsCopy, copy?: CmsCopy, cta?: CmsButton, img?: CmsImg }>,
};
