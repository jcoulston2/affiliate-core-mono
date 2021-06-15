//@flow
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Spacer } from '@styles/CommonStyledComponents';
import { hasRequiredProductInformation } from './helper';
import ProductBackButton from './ProductBackButton';
import ProductImageCarousel from './ProductImageCarousel';
import { type CmsCopy, type CmsButton, type CmsResponsiveString } from '../../../types/cms';
import { type ProductData } from '../../../types/product';
import { toArray, getSingle } from '@helpers/common';
import ProductMainDetails from './ProductMainDetails';
import { StyledDrawer, CarouselContainer, DrawerContent, ProductShowCase } from './styles';
import ProductRedirect from './ProductRedirect';
import { fixPopState, defatulPopState } from '@helpers/page';

type ProductDetailViewProps = $Exact<{
  productLink: string,
  openProductDetailView: Function,
  currentBreakpoint: string,
  productViewOpen: boolean,
  productViewData: ProductData,
  productViewGoBackCopy: CmsCopy,
  productViewGoBackText: string,
  productViewGoBackBgColor: string,
  productDescriptionTitleCopy: string,
  productDeliveryTitleCopy: string,
  productSelectedColor: CmsCopy,
  productSelectedColorLabelText: string,
  includeImageDots: boolean,
  imageDotsShape: 'circle' | 'square',
  productName: CmsCopy,
  commonLabel: CmsCopy,
  productCardPadding: CmsResponsiveString,
  productVariantImageDimensions: {
    desktop: { w: number, h: number },
    mobile: { w: number, h: number },
    tablet: { w: number, h: number },
  },
  productVariantDataCopy: CmsCopy,
  newPriceCopy: CmsCopy,
  wasPriceCopy: CmsCopy,
  priceCopy: CmsCopy,
  primaryCta: CmsButton,
  moreInfoCopy: CmsCopy,
  moreInfoText: string,
  fallbackPrimaryText: string,
  moreInfoAtStoreCopy: CmsCopy,
  moreInfoAtStoreText: string,
  genericProductDescriptionCopy: CmsCopy,
  genericProductDescriptionText: Array<string>,
  categoryLastUpdated?: string,
}>;

export default function ProductDetailView({
  productLink,
  openProductDetailView,
  productViewOpen,
  productViewData,
  productViewGoBackCopy,
  productViewGoBackText,
  productViewGoBackBgColor,
  includeImageDots,
  imageDotsShape,
  ...productMainInformation
}: ProductDetailViewProps) {
  const [ProductViewEligiblity, setProductViewEligiblity] = useState(true);

  if (!hasRequiredProductInformation(productViewData)) {
    setProductViewEligiblity(false);
  }

  const { detailedData, topLevelData, metaData } = productViewData;
  const images = toArray(detailedData.images);
  const validImages = [...images, getSingle(topLevelData.image)];

  useEffect(() => {
    if (productViewOpen) {
      fixPopState();
    } else {
      defatulPopState();
    }
  }, [productViewOpen]);

  return (
    <div>
      <StyledDrawer anchor={'right'} open={productViewOpen}>
        {ProductViewEligiblity && (
          <Grid container justify="center">
            <ProductBackButton
              {...{
                productViewGoBackText,
                productViewGoBackBgColor,
                openProductDetailView,
                productViewGoBackCopy,
              }}
            />
            <Spacer
              h={[
                { value: 20, breakPoint: 'min_xs' },
                { value: 60, breakPoint: 'min_md' },
                { value: 68, breakPoint: 'min_lg' },
              ]}
            />
            <ProductShowCase container justify="center">
              <CarouselContainer item xs={12} lg={7}>
                <ProductImageCarousel
                  {...{ images: validImages, includeImageDots, imageDotsShape }}
                />
              </CarouselContainer>

              <DrawerContent item container xs={12} lg={5} justify="center">
                <ProductMainDetails
                  {...{ detailedData, topLevelData, metaData, productLink }}
                  {...productMainInformation}
                />
              </DrawerContent>
            </ProductShowCase>
          </Grid>
        )}
        {!ProductViewEligiblity && (
          <ProductRedirect
            brand={metaData.brand}
            productLink={productLink}
            onClose={openProductDetailView}
          />
        )}
      </StyledDrawer>
    </div>
  );
}
