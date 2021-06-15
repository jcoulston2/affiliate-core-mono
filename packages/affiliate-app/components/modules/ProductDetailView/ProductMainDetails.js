//@flow
import React from 'react';
import { Spacer } from '@styles/CommonStyledComponents';
import Card from '@units/Card';
import {
  normalizeDetailProductData,
  normalizeTopLevelProductData,
  getCustomDescriptiveData,
  getCustomPrimaryData,
} from './helper';
import ProductName from './ProductName';
import ProductPrice from './ProductPrice';
import ProductColor from './ProductColor';
import ProductVariants from './ProductVariants';
import ProductCta from './ProductCta';
import ProductDescription from './ProductDescription';
import { ProductWishListAction } from '@modules/ProductWishList';
import { type CmsCopy, type CmsButton, type CmsResponsiveString } from '../../../types/cms';
import { setCommonCmsAttr } from '@helpers/cms';
import { ProductCards, ProductCtaWrapper, WishListContainer } from './styles';
import {
  type ProductTopLevelData,
  type ProductDetailedData,
  type ProductMetaData,
} from '../../../types/product';

type ProductMainDetailsProps = {
  productLink: string,
  detailedData: ProductDetailedData,
  topLevelData: ProductTopLevelData,
  metaData: ProductMetaData,
  productDescriptionTitleCopy: string,
  productDeliveryTitleCopy: string,
  productSelectedColor: CmsCopy,
  productSelectedColorLabelText: string,
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
  moreInfoAtStoreCopy: CmsCopy,
  moreInfoAtStoreText: string,
  genericProductDescriptionCopy: CmsCopy,
  genericProductDescriptionText: Array<string>,
  categoryLastUpdated?: string,
};

export default function ProductMainDetails({
  productLink,
  detailedData,
  topLevelData,
  metaData,
  newPriceCopy,
  priceCopy,
  productDescriptionTitleCopy,
  productDeliveryTitleCopy,
  productSelectedColorLabelText,
  productSelectedColor,
  productName,
  commonLabel,
  productVariantImageDimensions,
  productVariantDataCopy,
  primaryCta,
  moreInfoCopy,
  moreInfoText,
  moreInfoAtStoreCopy,
  moreInfoAtStoreText,
  genericProductDescriptionText,
  genericProductDescriptionCopy,
  productCardPadding,
  wasPriceCopy,
  categoryLastUpdated,
}: ProductMainDetailsProps) {
  const { description, variants, selectedColor, delivery, custom } = normalizeDetailProductData(
    detailedData
  );

  const customDescriptiveData = getCustomDescriptiveData(custom);
  const customPrimaryData = getCustomPrimaryData(custom);
  const { name, price, wasPrice, nowPrice } = normalizeTopLevelProductData(topLevelData);
  const { brand, domain } = metaData;
  const allVariants = [...(variants || []), ...(customPrimaryData || [])];

  return (
    <ProductCards item>
      <Card padding={productCardPadding}>
        <ProductName {...{ productName, name }} />
        <ProductPrice
          {...{
            wasPrice,
            nowPrice,
            price,
            priceCopy,
            newPriceCopy,
            wasPriceCopy,
            categoryLastUpdated,
          }}
        />
        {selectedColor && (
          <ProductColor
            {...{
              commonLabel,
              productSelectedColorLabelText,
              productSelectedColor,
              selectedColor,
            }}
          />
        )}

        <ProductVariants
          {...{
            productVariantImageDimensions,
            commonLabel,
            variants: allVariants,
            productVariantDataCopy,
            productLink,
            moreInfoAtStoreCopy,
            moreInfoAtStoreText,
            domain,
          }}
        />

        <ProductCtaWrapper item container alignItems="center" justify="space-between" wrap="nowrap">
          <ProductCta
            {...{
              primaryCta,
              brand,
              productLink,
            }}
          />
          <WishListContainer item>
            <ProductWishListAction product={{ detailedData, topLevelData, metaData }} />
          </WishListContainer>
        </ProductCtaWrapper>
      </Card>
      <Spacer
        h={[
          { value: 15, breakPoint: 'min_xs' },
          { value: 15, breakPoint: 'min_lg' },
        ]}
      />
      <Card
        padding={productCardPadding}
        expand={setCommonCmsAttr({
          collapsedHeight: 250,
          readMoreCopyOffsetTop: 15,
        })}>
        <ProductDescription
          {...{
            productDescriptionTitleCopy,
            productDeliveryTitleCopy,
            commonLabel,
            description,
            delivery,
            moreInfoCopy,
            moreInfoText,
            productLink,
            genericProductDescriptionText,
            genericProductDescriptionCopy,
            customDescriptiveData,
            brand,
          }}
        />
      </Card>
      <Spacer h={10} />
    </ProductCards>
  );
}
