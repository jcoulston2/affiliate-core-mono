//@flow
import React from 'react';
import Grid from '@material-ui/core/Grid';
import {
  type CmsSplitCard,
  type CmsGridAlignItems,
  type CmsGridJustify,
  type CmsResponsiveInt,
  type CmsResponsiveString,
  type CmsEventMappings,
} from '@types/cms';
import Card from '@units/Card';
import { InnerCardLeft, InnerCardRight } from './InnerCardContent';
import useCurrentBreakpoint from '@hooks/useCurrentBreakpoint';
import { StyledCmsGrid } from '@styles/CommonStyledComponents';

type CmsSplitCardsProps = $Exact<{
  padding?: CmsResponsiveString,
  margin?: CmsResponsiveString,
  bgColor: string,
  alignItems?: CmsGridAlignItems,
  justifyContent?: CmsGridJustify,
  cards: Array<CmsSplitCard>,
  cardOffset?: CmsResponsiveInt,
  spacing?: number,
  cmsEventMappings?: CmsEventMappings,
}>;

export default function CmsSplitCards({
  cards,
  cardOffset,
  cmsEventMappings,
  ...gridContainerProps
}: CmsSplitCardsProps) {
  const currentBreakpoint = useCurrentBreakpoint();
  const isMobile = currentBreakpoint === 'xs';

  return (
    <StyledCmsGrid container {...gridContainerProps}>
      {cards?.map(
        (
          { inverse, heading, cta, splitSpacing, copy, img, padding, grid, expand, ...restGrid },
          index
        ) => {
          const cardContent = [
            <InnerCardLeft key={1} {...{ heading, cta, splitSpacing, copy, cmsEventMappings }} />,
            <Grid key={2} item {...(splitSpacing?.spacer || {})} />,
            <InnerCardRight key={3} {...{ img, splitSpacing }} />,
          ];

          return (
            <StyledCmsGrid item {...restGrid} {...grid} key={index}>
              <Card {...{ expand, padding, cardOffset }}>
                <Grid container item xs={12}>
                  {inverse && !isMobile ? cardContent.reverse() : cardContent}
                </Grid>
              </Card>
            </StyledCmsGrid>
          );
        }
      )}
    </StyledCmsGrid>
  );
}
