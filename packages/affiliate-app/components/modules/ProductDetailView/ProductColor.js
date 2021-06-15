//@flow
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { type CmsCopy } from '@types/cms';
import Typography from '@units/Typography';
import styled from 'styled-components';
import Copy from '@units/Copy';

type ProductPriceProps = {
  commonLabel: CmsCopy,
  productSelectedColorLabelText: string,
  productSelectedColor: CmsCopy,
  selectedColor: string,
};

export const ProductLabelTitle = styled(Grid)`
  && {
    margin-right: 0.5em;
  }
`;

function ProductColor({
  commonLabel,
  productSelectedColorLabelText,
  productSelectedColor,
  selectedColor,
}: ProductPriceProps) {
  return (
    <Grid item container alignItems="center">
      <ProductLabelTitle item>
        <Typography tag="h4" typeStyles={commonLabel}>
          <Copy text={productSelectedColorLabelText} />
        </Typography>
      </ProductLabelTitle>
      <Grid item>
        <Typography tag="p" typeStyles={productSelectedColor}>
          {selectedColor}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default ProductColor;
