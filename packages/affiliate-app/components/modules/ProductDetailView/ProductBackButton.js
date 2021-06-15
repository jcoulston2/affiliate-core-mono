//@flow
import React from 'react';
import Button from '@units/Button';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { Flex } from '@styles/CommonStyledComponents';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import Copy from '@units/Copy';
import Typography from '@units/Typography';
import { type CmsCopy } from '@types/cms';

type ProductBackButtonProps = {
  productViewGoBackCopy: CmsCopy,
  productViewGoBackText: string,
  productViewGoBackBgColor: string,
  openProductDetailView: Function,
};

const FixedBackWrapper = styled(Grid)`
  position: fixed;
  width: 100%;
  z-index: 9;
`;

const Back = styled(({ productViewGoBackBgColor, children, ...rest }) => (
  <Grid {...rest}>{children}</Grid>
))`
  && {
    background: ${(props) => props.productViewGoBackBgColor};
    &:hover {
      opacity: 0.8;
    }
  }
`;

function ProductBackButton({
  productViewGoBackBgColor,
  productViewGoBackCopy,
  productViewGoBackText,
  openProductDetailView,
}: ProductBackButtonProps) {
  return (
    <FixedBackWrapper item xs={12}>
      <Button noPad fullWidth square textTransform="capitalize">
        <Back
          item
          xs
          container
          alignItems="center"
          justify="center"
          productViewGoBackBgColor={productViewGoBackBgColor}
          onClick={() => openProductDetailView()}>
          <Grid item>
            <Flex>
              <KeyboardBackspaceIcon style={{ color: 'white' }} />
            </Flex>
          </Grid>
          <Grid item>
            <Typography tag="p" typeStyles={productViewGoBackCopy}>
              <Copy text={productViewGoBackText} />
            </Typography>
          </Grid>
        </Back>
      </Button>
    </FixedBackWrapper>
  );
}

export default ProductBackButton;
