//@flow
import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import Image from '@units/Image';
import bp from '@styles/breakPoints';
import {
  type CmsGrid,
  type CmsResponsiveString,
  type CmsContentSplitItem,
  type CmsEventMappings,
} from '@types/cms';
import isEmpty from 'lodash/isEmpty';
import Button from '@units/Button';
import Typography from '@units/Typography';
import Copy from '@units/Copy';
import { StyledCmsGrid } from '@styles/CommonStyledComponents';
import { ContentItemSection } from './styles';
import InnerContent from './InnerContent';

type CmsContentSplitProps = {
  bgColor?: string,
  cmsEventMappings?: CmsEventMappings,
  padding?: CmsResponsiveString,
  margin?: CmsResponsiveString,
  separator?: {
    mobile: {
      color: string,
      visible: boolean,
    },
    tablet: {
      color: string,
      visible: boolean,
    },
    desktop: {
      color: string,
      visible: boolean,
    },
  },
  items: Array<{
    grid: CmsGrid,
    padding?: CmsResponsiveString,
    margin?: CmsResponsiveString,
    contentItems: CmsContentSplitItem,
  }>,
};

export default function CmsContentSplit({
  bgColor,
  padding,
  margin,
  items,
  cmsEventMappings,
  separator,
}: CmsContentSplitProps) {
  return (
    <StyledCmsGrid {...{ padding, bgColor, margin }}>
      <Grid container>
        {items.map(
          ({ contentItems, grid, padding: itemPadding, margin: itemMargin }, outerIndex) => {
            return (
              <ContentItemSection
                item
                container
                key={`outer-${outerIndex}`}
                separator={separator}
                padding={itemPadding}
                margin={itemMargin}
                {...grid}>
                {contentItems?.items?.map(({ copy, cta, img }, innerIndex) => (
                  <InnerContent
                    key={`inner-${innerIndex}`}
                    {...{ copy, cta, img, grid: contentItems.grid, cmsEventMappings }}
                  />
                ))}
              </ContentItemSection>
            );
          }
        )}
      </Grid>
    </StyledCmsGrid>
  );
}
