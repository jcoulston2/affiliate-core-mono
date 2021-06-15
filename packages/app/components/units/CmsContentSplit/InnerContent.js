//@flow
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Image from '@units/Image';
import {
  type CmsCopy,
  type CmsButton,
  type CmsImg,
  type CmsGrid,
  type CmsEventMappings,
} from '@types/cms';
import isEmpty from 'lodash/isEmpty';
import Button from '@units/Button';
import Typography from '@units/Typography';
import Copy from '@units/Copy';

type InnerContentProps = {
  copy?: CmsCopy,
  cta?: CmsButton,
  img?: CmsImg,
  grid?: CmsGrid,
  cmsEventMappings?: CmsEventMappings,
};

export default function InnerContent({
  copy,
  cta,
  img,
  grid,
  cmsEventMappings,
}: InnerContentProps) {
  return (
    <Grid item container {...grid}>
      {copy && (
        <Grid item xs container justify="center" alignItems="center">
          <Typography typeStyles={copy}>{<Copy text={copy.text} />}</Typography>
        </Grid>
      )}

      {img && (
        <Grid item xs container justify="center" alignItems="center">
          <Image {...img} />
        </Grid>
      )}

      {!isEmpty(cta) && (
        <Grid item xs container>
          <Button {...cta} cmsEventMappings={cmsEventMappings}>
            <Typography tag="p" typeStyles={cta?.copy}>
              {cta?.text && <Copy text={cta.text} />}
            </Typography>
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
