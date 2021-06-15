//@flow
/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import Grid from '@material-ui/core/Grid';
import { type CmsCopy } from '@types/cms';
import Typography from '@units/Typography';
import styled from 'styled-components';
import Copy from '@units/Copy';
import Chip from '@units/Chip';
import { useTheme } from '@hooks';
import { type ProductVariant as ProductVariantType } from '../../../types/product';

type ProductVariantsProps = {
  productVariantDataCopy: CmsCopy,
  commonLabel: CmsCopy,
  productVariantImageDimensions: {
    mobile: { w: number, h: number },
    tablet: { w: number, h: number },
    desktop: { w: number, h: number },
  },
  variants: Array<ProductVariantType>,
  productLink: string,
  domain: string,
  moreInfoAtStoreCopy: CmsCopy,
  moreInfoAtStoreText: string,
};

export const VariantImg = styled(Grid)`
  && {
    width: ${({ dimensions }) => dimensions?.w || '20'}px;
    height: ${({ dimensions }) => dimensions?.h || '20'}px;
    margin: 0 5px;
    border-radius: 50%;
    overflow: hidden;
    background: #f3f3f3;
  }
`;

export const VariantDataItem = styled.span`
  margin: 0 5px;
  opacity: ${({ isSoldOut }) => (isSoldOut ? '0.2' : '1')};
  margin-left: ${({ index }) => (index === 0 ? '0px' : '5px')};
`;

export const ProductLabelTitle = styled(Grid)`
  && {
    margin-right: 0.5em;
  }
`;

export default function ProductVariant({
  commonLabel,
  variants,
  productLink,
  moreInfoAtStoreCopy,
  moreInfoAtStoreText,
}: ProductVariantsProps) {
  const {
    brandThemeColors: { tertiaryColor, secondaryColor },
  } = useTheme();

  const hasVariantData = variants.some(({ data }) => data?.length);

  return (
    <Grid item>
      <Grid container alignItems="center">
        <ProductLabelTitle item>
          <Typography tag="h4" typeStyles={commonLabel}>
            <Copy text={'More from the store'} />
          </Typography>
        </ProductLabelTitle>

        {variants.map(
          ({ variantText, data }, index) =>
            data?.length && (
              <Chip
                key={index}
                label={variantText}
                size="small"
                bgColor={tertiaryColor || secondaryColor}
              />
            )
        )}

        {!hasVariantData &&
          ['sizes', 'colours'].map((variantText, index) => (
            <Chip
              key={index}
              label={variantText}
              size="small"
              bgColor={tertiaryColor || secondaryColor}
            />
          ))}
      </Grid>

      <Grid container alignItems="center">
        <Typography tag="p" typeStyles={moreInfoAtStoreCopy}>
          <a href={productLink} target="_blank" without rel="nofollow" prefetch={false}>
            <Copy text={moreInfoAtStoreText}></Copy>
          </a>
        </Typography>
      </Grid>
    </Grid>
  );
}
