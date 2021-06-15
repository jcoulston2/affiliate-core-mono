//@flow
import React from 'react';
import {
  type CmsStackedCard as CmsStackedCardProps,
  type CmsGridAlignItems,
  type CmsGridJustify,
  type CmsResponsiveInt,
  type CmsResponsiveString,
} from '@types/cms';
import CmsStackedCard from './CmsStackedCard';
import { StyledCmsGrid } from '@styles/CommonStyledComponents';

type CmsStackedCardsProps = $Exact<{
  backgroundImage: string,
  padding?: {
    mobile: string,
    tablet: string,
    desktop: string,
  },
  margin?: {
    mobile: string,
    tablet: string,
    desktop: string,
  },
  bgColor: string,
  alignItems?: CmsGridAlignItems,
  justifyContent?: CmsGridJustify,
  cards: Array<CmsStackedCardProps>,
  cardOffset?: CmsResponsiveInt,
  borderShadow?: string,
  spacing?: number,
  maxWidth?: string,
  cmsEventMappings: any,
}>;

export default function CmsStackedCards({
  cards,
  cardOffset,
  cmsEventMappings,
  ...gridContainerProps
}: CmsStackedCardsProps) {
  return (
    <StyledCmsGrid container {...gridContainerProps}>
      {cards?.map(({ cta = {}, heading, copy, img, padding, grid, expand, ...restGrid }, index) => {
        return (
          <StyledCmsGrid item {...restGrid} {...grid} key={index}>
            <CmsStackedCard
              {...{ cardOffset, expand, padding, heading, copy, img, cta, cmsEventMappings }}
            />
          </StyledCmsGrid>
        );
      })}
    </StyledCmsGrid>
  );
}
