//@flow
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { type CmsButton } from '@types/cms';
import Button from '@units/Button';
import { navigateToUrl } from '@helpers/common';

type ProductCtaProps = {
  primaryCta: CmsButton,
  brand: string,
  productLink: string,
};

export default function ProductCta({ primaryCta, brand, productLink }: ProductCtaProps) {
  const buttonBrandedText = primaryCta?.text && `${primaryCta.text} ${brand}`;
  return (
    <Grid item xs>
      <Button
        {...primaryCta}
        text={buttonBrandedText}
        fullWidth
        onClick={() => navigateToUrl(productLink)}
      />
    </Grid>
  );
}
