//@flow
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { type CmsCopy } from '@types/cms';
import { type ProductCustomVariant } from '@types/product';
import Copy from '@units/Copy';
import styled from 'styled-components';
import Typography from '@units/Typography';
import { Spacer } from '@styles/CommonStyledComponents';
import { hasValidTabbedData, mapCustomDataToTabs } from './helper';
import { toArray } from '@helpers/common';
import upperFirst from 'lodash/upperFirst';
import { useTheme } from '@hooks';
import startCase from 'lodash/startCase';

type ProductDescriptionProps = {
  productDescriptionTitleCopy: string,
  productDeliveryTitleCopy: string,
  commonLabel: CmsCopy,
  description?: string | Array<string>,
  delivery?: string | Array<string>,
  moreInfoCopy: CmsCopy,
  moreInfoText: string,
  productLink: string,
  genericProductDescriptionCopy: CmsCopy,
  genericProductDescriptionText: Array<string>,
  customDescriptiveData: Array<ProductCustomVariant>,
  brand: string,
};

const DetailTab = styled(({ isActive, textAlign, markerColor, children, ...rest }) => (
  <Grid {...rest}>{children}</Grid>
))`
  && {
    cursor: pointer;
    opacity: 0.5;
    margin-bottom: 0.5em;
    text-align: ${(props) => props.textAlign};

    &:hover {
      opacity: 0.7;
    }

    ${({ isActive, markerColor }) =>
      isActive &&
      `
      opacity: 1;
      h4 {
        &::after {
          content: ' ';
          width: 38px;
          height: 2px;
          background: ${markerColor};
          display: block;
          position: relative;
          top: 9px;
        }        
      }

    `}
  }
`;

const CardList = styled.ul`
  padding-left: 0px;
  display: inline-block;
  ist-style-type: none;
  margin-top: 5px;
  width: 100%;

  li {
    display: flex;
    align-items: center;
    padding: 2px 0px;
    justify-content: flex-start;
  }
`;

function ProductDescription({
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
}: ProductDescriptionProps) {
  const [activeDescriptionTab, setActiveDescriptionTab] = useState(0);
  const { brandThemeColors } = useTheme();

  // We have two primary variants (delivery and description), there should always be a description
  // tab but it is not always encouraged for the extractor to pull in bespoke description & delivery
  // for a given product due to the different formating and cases of different brands but we include
  // it anyway. There should always be some generic description shown from the CMS which encourages
  // the user to navigate to the official store.
  const tabsInfomration = [
    {
      title: productDescriptionTitleCopy,
      data: toArray(description),
      isDefault: true,
    },
    {
      title: productDeliveryTitleCopy,
      data: toArray(delivery),
    },

    // Custom non primary data will get rendered as a tab
    ...mapCustomDataToTabs(customDescriptiveData),

    // we run a quick filter on valid variants to prevent rendering empty data
  ].filter(({ data, isDefault }: Object) => hasValidTabbedData(data, isDefault));

  const hasMultipleTabs = tabsInfomration.length > 1;

  // Tab clickable headings
  const getTabs = tabsInfomration.map(({ title }, index) => (
    <DetailTab
      markerColor={brandThemeColors.primaryColor}
      textAlign={hasMultipleTabs ? 'center' : 'left'}
      key={index}
      item
      xs
      isActive={index === activeDescriptionTab}
      onClick={() => setActiveDescriptionTab(index)}>
      <Typography tag="h4" typeStyles={commonLabel}>
        <Copy text={title} />
      </Typography>
    </DetailTab>
  ));

  // Tab inner content
  const getTabsContent = tabsInfomration.map(
    ({ data: descriptiveValues }, index) =>
      index === activeDescriptionTab && (
        <CardList key={index}>
          {descriptiveValues.map(
            (descriptiveValue, index) =>
              descriptiveValue && (
                <li key={index}>
                  <Typography tag="p" typeStyles={genericProductDescriptionCopy}>
                    <Copy text={upperFirst(descriptiveValue)} />
                  </Typography>
                </li>
              )
          )}
        </CardList>
      )
  );

  // Cms copy
  const getCmsContent = genericProductDescriptionText.map((cmsDescriptiveText, index) => (
    <Grid container xs={12} key={index}>
      <Typography tag="p">
        <Copy text={cmsDescriptiveText} replaceText={startCase(brand)} />
      </Typography>
      <Spacer h={5} />
    </Grid>
  ));

  return (
    <Grid item container>
      {getTabs}
      {getTabsContent}
      {getCmsContent}
      <Spacer h={5} />
      <Typography tag="p" typeStyles={moreInfoCopy}>
        <a href={productLink} title={moreInfoText} target="_blank" rel="nofollow">
          <Copy text={moreInfoText} />
        </a>
      </Typography>
    </Grid>
  );
}

export default ProductDescription;
