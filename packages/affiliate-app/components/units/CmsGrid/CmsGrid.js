//@flow
import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import Button from '@units/Button';
import Image from '@units/Image';
import Typography from '@units/Typography';
import Copy from '@units/Copy';
import isEmpty from 'lodash/isEmpty';
import { StyledCmsGrid } from '@styles/CommonStyledComponents';
import { type CmsGridContent } from '@types/cms';

const InnerGridContent = styled(Grid)`
  && {
    ${(props) => (props.isStacked ? 'flex-wrap: wrap; ' : '')}
    ${(props) => (props.isStacked ? 'flex-direction: column; ' : '')}
  }
`;

const CmsGridWrapper = styled.section`
  background: ${(props) => props.bgColor};
  box-shadow: ${(props) => props.borderShadow || 'auto'};
`;

export default function CmsGrid({
  rows,
  bgColor,
  borderShadow,
  cmsEventMappings,
  ...gridContainerProps
}: CmsGridContent) {
  return (
    <CmsGridWrapper bgColor={bgColor} borderShadow={borderShadow}>
      <StyledCmsGrid container {...gridContainerProps}>
        {rows?.map(({ cta = {}, copy, img, contentLayout, grid, ...restGrid }, index) => {
          return (
            <StyledCmsGrid item {...grid} {...restGrid} key={index}>
              <InnerGridContent
                container
                alignItems="flex-start"
                isStacked={contentLayout === 'stack'}>
                {copy && <Typography typeStyles={copy}>{<Copy text={copy.text} />}</Typography>}

                {img && <Image {...img} />}

                {!isEmpty(cta) && <Button {...cta} cmsEventMappings={cmsEventMappings} />}
              </InnerGridContent>
            </StyledCmsGrid>
          );
        })}
      </StyledCmsGrid>
    </CmsGridWrapper>
  );
}
