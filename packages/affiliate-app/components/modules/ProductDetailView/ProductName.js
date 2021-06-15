//@flow
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { type CmsCopy } from '@types/cms';
import Typography from '@units/Typography';

type ProductNameProps = {
  productName: CmsCopy,
  name: string,
};

function ProductName({ productName, name }: ProductNameProps) {
  return (
    <Grid item>
      <Typography tag="h3" typeStyles={productName}>
        {name}
      </Typography>
    </Grid>
  );
}

export default ProductName;
