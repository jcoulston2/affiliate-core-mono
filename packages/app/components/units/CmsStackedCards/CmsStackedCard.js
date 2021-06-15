//@flow
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@units/Button';
import Image from '@units/Image';
import Typography from '@units/Typography';
import Copy from '@units/Copy';
import isEmpty from 'lodash/isEmpty';
import Card from '@units/Card';
import { type CmsStackedCard as CmsStackedCardProps } from '@types/cms';

export default function CmsStackedCard({
  cardOffset,
  cmsEventMappings,
  padding,
  expand,
  heading,
  copy,
  img,
  cta,
}: CmsStackedCardProps) {
  return (
    <Card {...{ cardOffset, padding, expand }}>
      {heading && (
        <Grid item xs={12} container justify="center">
          <Typography typeStyles={heading}>{<Copy text={heading.text} />}</Typography>
        </Grid>
      )}

      {copy && (
        <Grid item xs={12} container justify="center">
          <Typography typeStyles={copy}>{<Copy text={copy.text} />}</Typography>
        </Grid>
      )}

      {img && (
        <Grid item xs={12} container alignItems="center" justify="center">
          <Image {...img} />
        </Grid>
      )}

      {!isEmpty(cta) && (
        <Grid item xs={12} container justify="center">
          <Button {...cta} cmsEventMappings={cmsEventMappings} />
        </Grid>
      )}
    </Card>
  );
}
