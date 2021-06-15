//@flow
import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@units/Typography';
import { type CmsCopy, type CmsCard, type CmsCommonGridContainer } from '@types/cms';
import {
  type ProductDetailedData,
  type ProductTopLevelData,
  type ProductMetaData,
} from '@types/product';

import { WasPriceCopy } from './styles';
import Chip from '@units/Chip';
import Card from '@units/Card';
import { StyledCmsGrid, Spacer } from '@styles/CommonStyledComponents';
import { ProductWishListAction } from '@modules/ProductWishList';
import { type CmsResponsiveString, type CmsGrid } from '../../../types/cms';
import startCase from 'lodash/startCase';
import { getSingle, getCalculatedDiscount } from '@helpers/common';
import { hasMinRequiredData, hasMoreColors, getFallbackImg } from './helper';
import { WishListActionWrapper } from './styles';

type ProductListingItemProps = {
  productTileCardContainer: $Exact<{
    padding: CmsResponsiveString,
    margin: CmsResponsiveString,
    grid: CmsGrid,
  }>,
  productTitle: CmsCopy,
  productsPerRowMobile: number,
  newPriceCopy: CmsCopy,
  priceCopy: CmsCopy,
  wasPriceCopy: CmsCopy,
  productTileCard: CmsCard,
  productTileCardDetails: CmsCommonGridContainer,
  topLevelData: ProductTopLevelData,
  detailedData: ProductDetailedData,
  metaData: ProductMetaData,
  hasWishListAction: boolean,
  hoverEffect?: 'grow' | 'raise' | 'tilt',
  clickable: boolean,
  onCardClick: Function,
};

function ProductListingItem({
  topLevelData,
  detailedData,
  metaData,
  productTitle,
  productTileCard,
  productTileCardDetails,
  priceCopy,
  newPriceCopy,
  wasPriceCopy,
  productTileCardContainer,
  hasWishListAction,
  hoverEffect,
  onCardClick,
}: ProductListingItemProps) {
  const { image, name, price, wasPrice, nowPrice } = topLevelData;
  const hasReducedPrice = wasPrice && nowPrice;
  const hasSinglePrice = !wasPrice && (nowPrice || price);
  const validPrice = hasSinglePrice ? price || nowPrice : null;
  const validWasPrice = hasReducedPrice ? wasPrice : null;
  const validNowPrice = hasReducedPrice ? nowPrice : null;
  const discountPercentage = getCalculatedDiscount(validWasPrice, validNowPrice);
  const hasMoreColorVariants = hasMoreColors(detailedData);
  const validatedImageSrc = image || getFallbackImg(topLevelData?.image);

  if (!hasMinRequiredData(validatedImageSrc, name, validPrice, validNowPrice)) return null;

  return (
    <StyledCmsGrid
      container
      item
      {...productTileCardContainer}
      {...productTileCardContainer.grid}
      justify="center">
      <Card {...productTileCard} hoverEffect={hoverEffect}>
        {hasWishListAction && (
          <WishListActionWrapper>
            <ProductWishListAction product={{ topLevelData, detailedData, metaData }} />
          </WishListActionWrapper>
        )}
        <Grid container onClick={onCardClick}>
          <Grid item xs={12}>
            <img src={validatedImageSrc} alt={name} />
          </Grid>
          <StyledCmsGrid item container xs={12} {...productTileCardDetails}>
            <Grid item container xs={12}>
              {discountPercentage && (
                <Chip
                  label={`${discountPercentage}% OFF`}
                  size="small"
                  bgColor="primary"
                  color="secondary"
                />
              )}
              {hasMoreColorVariants && <Chip label="More colours" size="small" color="secondary" />}
            </Grid>
            <Grid item container xs={12}>
              <Typography tag="h4" typeStyles={productTitle}>
                {startCase(getSingle(name).toLowerCase())}
              </Typography>
            </Grid>

            <Grid container item xs={12}>
              {hasSinglePrice && (
                <Grid item xs={12}>
                  <Typography tag="p" typeStyles={priceCopy}>
                    {validPrice}
                  </Typography>
                </Grid>
              )}
              {hasReducedPrice && (
                <>
                  <Grid item xs={12}>
                    <WasPriceCopy>
                      <Typography tag="p" typeStyles={wasPriceCopy}>
                        {validWasPrice}
                      </Typography>
                    </WasPriceCopy>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography tag="p" typeStyles={newPriceCopy}>
                      {validNowPrice}
                    </Typography>
                  </Grid>
                </>
              )}
            </Grid>
          </StyledCmsGrid>
        </Grid>
        <Spacer h={4} />
      </Card>
    </StyledCmsGrid>
  );
}

export default memo<ProductListingItemProps>(ProductListingItem);
