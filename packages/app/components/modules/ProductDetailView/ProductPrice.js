//@flow
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { type CmsCopy } from '@types/cms';
import Typography from '@units/Typography';
import styled from 'styled-components';
import bp from '@styles/breakPoints';
import { useTheme } from '@hooks';
import { getPriceLastUpdated } from './helper';

type ProductPriceProps = {
  newPriceCopy: CmsCopy,
  wasPriceCopy: CmsCopy,
  priceCopy: CmsCopy,
  price: ?string,
  wasPrice: ?string,
  nowPrice: ?string,
  categoryLastUpdated?: string,
};

const PriceCopyContainer = styled(Grid)`
  && {
    margin: 0.5rem 0rem;
    ${bp.min_xs} {
      margin-top: 1rem;
    }
  }
`;

export const WasPriceCopy = styled.div`
  p {
    margin-right: 0.5em;
    span {
      text-decoration: line-through;
      font-weight: 300;
    }
  }
`;

function ProductPrice({
  price,
  wasPrice,
  nowPrice,
  priceCopy,
  newPriceCopy,
  wasPriceCopy,
  categoryLastUpdated,
}: ProductPriceProps) {
  const hasReducedPrice = wasPrice && nowPrice;
  const hasSinglePrice = !wasPrice && (nowPrice || price);
  const validPrice = hasSinglePrice ? price || nowPrice : null;
  const validWasPrice = hasReducedPrice ? wasPrice : null;
  const validNowPrice = hasReducedPrice ? nowPrice : null;
  const { textTheme } = useTheme();
  const priceLastChecked = getPriceLastUpdated(categoryLastUpdated);

  return (
    <PriceCopyContainer container item>
      {hasSinglePrice && (
        <Grid item>
          <Typography tag="p" typeStyles={priceCopy}>
            {validPrice}
          </Typography>
        </Grid>
      )}
      {hasReducedPrice && (
        <>
          <Grid item>
            <WasPriceCopy>
              <Typography tag="p" typeStyles={wasPriceCopy}>
                {validWasPrice}
              </Typography>
            </WasPriceCopy>
          </Grid>
          <Grid item>
            <Typography tag="p" typeStyles={newPriceCopy}>
              {validNowPrice}
            </Typography>
          </Grid>
        </>
      )}
      {priceLastChecked && (
        <Grid item>
          <Typography
            tag="p"
            margin="0.1em 0px 0px 1em"
            size={12}
            color={textTheme.slightlyFadedTextColor}>
            Last checked {priceLastChecked}
          </Typography>
        </Grid>
      )}
    </PriceCopyContainer>
  );
}

export default ProductPrice;
