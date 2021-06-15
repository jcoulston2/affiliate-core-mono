//@flow
import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Button from '@units/Button';
import Image from '@units/Image';
import { type CmsSplitCard } from '@types/cms';
import Typography from '@units/Typography';
import Copy from '@units/Copy';
import isEmpty from 'lodash/isEmpty';

const ImageWrapper = styled(Grid)`
  height: 100%;
`;

export function InnerCardLeft({
  heading,
  cta,
  splitSpacing,
  copy,
  cmsEventMappings,
}: CmsSplitCard) {
  return (
    <Grid item container {...(splitSpacing?.left || {})} direction="column">
      {heading && (
        <Grid item container justify="center">
          <Typography typeStyles={heading}>{<Copy text={heading.text} />}</Typography>
        </Grid>
      )}
      {copy && (
        <Grid item container justify="center">
          <Typography typeStyles={copy}>{<Copy text={copy.text} />}</Typography>
        </Grid>
      )}
      {!isEmpty(cta) && (
        <Grid item container justify="center">
          <Button {...cta} cmsEventMappings={cmsEventMappings} />
        </Grid>
      )}
    </Grid>
  );
}

export function InnerCardRight({ img, splitSpacing }: CmsSplitCard) {
  return (
    <Grid item {...(splitSpacing?.right || {})}>
      {img && (
        <ImageWrapper item xs={12} container alignItems="center">
          <Image {...img} />
        </ImageWrapper>
      )}
    </Grid>
  );
}
