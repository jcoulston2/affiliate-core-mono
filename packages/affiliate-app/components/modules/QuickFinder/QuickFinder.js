//@flow
import React, { useState } from 'react';
import { type NavigationData, type NormalizedSubNavItems } from '@types/navigationData';
import RadioButton from '@units/RadioButton';
import Checkbox from '@units/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@units/Typography';
import { keyWordsToString, urlCase } from '@helpers/common';
import { PLP_PATH, SEARCH_PATH } from '@constants';
import Input from '@units/Input';
import { useCms, useBrandList } from '@hooks';
import { useFilters } from '@modules/Filters';
import { Spacer } from '@styles/CommonStyledComponents';
import { useRouter } from 'next/router';
import { SectionTabs, LabelTabs } from './QuickFinderTabs';
import startCase from 'lodash/startCase';
import Grid from '@material-ui/core/Grid';
import {
  QuickSectionTabs,
  QuickViewSection,
  RadioItem,
  RadioItemContainer,
  QuickViewModal,
  SectionLabel,
} from './styles';

type QuickFinderProps = $Exact<{
  navigationData: NavigationData,
  onSubmitCallback?: Function,
  ...
}>;

export default function QuickFinder({
  navigationData,
  onSubmitCallback,
  ...modalProps
}: QuickFinderProps) {
  const [sectionTabValue, setSectionTabValue] = useState(0);
  const [labelTabValue, setLabelTabValue] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { productFiltersContent } = useCms('listingContent');
  const { filterMethods, filterState, normalizedFilters } = useFilters();
  const router = useRouter();
  const brandList = useBrandList();

  const selectedSection = navigationData[sectionTabValue]?.title;
  const hasMultipleLabels = navigationData[sectionTabValue]?.subNav.length > 1;

  const getCategoryList = (): NormalizedSubNavItems =>
    navigationData[sectionTabValue]?.subNav[labelTabValue].subNavItems;

  const handleCheckBoxChange = (value: string): void => {
    const { brands } = filterState;
    if (brands.includes(value)) {
      filterMethods.setBrands(brands.filter((brand) => urlCase(brand) !== value));
    } else {
      filterMethods.setBrands([...brands, value]);
    }
  };

  const submitQuickFinder = (): void => {
    let path = '';
    const { keyWords, saleThreshold, brands } = normalizedFilters;
    const urlParts = [];
    const isSearchBaseUrl = selectedCategory === 'all';
    const base = isSearchBaseUrl
      ? `/${SEARCH_PATH}?section=${selectedSection}`
      : `/${PLP_PATH}/${urlCase(selectedSection)}/${urlCase(selectedCategory)}`;

    if (keyWords?.length) urlParts.push(`key-words=${keyWords.join(',')}`);
    if (brands?.length) urlParts.push(`brands=${brands.join(',')}`);
    if (saleThreshold && parseInt(saleThreshold)) urlParts.push(`sale-threshold=${saleThreshold}`);
    if (isSearchBaseUrl && urlParts.length > 0) {
      path = `&${urlParts.join('&')}`;
    } else {
      path = urlParts.length ? `/filter/${urlParts.join('&')}` : '';
    }

    if (onSubmitCallback) onSubmitCallback();
    router.push(`${base}${path}`);
  };

  const quickFindSectionLabel = (text: string): any => (
    <SectionLabel container>
      <Typography tag="h2" weight={500} margin="10px 0px 10px 0px">
        {text}
      </Typography>
    </SectionLabel>
  );

  return (
    <QuickViewModal onSubmitModal={submitQuickFinder} {...modalProps}>
      <QuickSectionTabs container>
        <SectionTabs {...{ navigationData, sectionTabValue, setSectionTabValue }} />
      </QuickSectionTabs>

      {quickFindSectionLabel('Category')}
      {hasMultipleLabels && (
        <QuickViewSection>
          <LabelTabs {...{ navigationData, sectionTabValue, labelTabValue, setLabelTabValue }} />
        </QuickViewSection>
      )}

      <QuickViewSection>
        <RadioGroup
          aria-label="set category"
          name="set-category"
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target?.value)}>
          <RadioItemContainer container>
            <RadioItem item xs={12} sm={6}>
              <FormControlLabel
                value={'all'}
                label="I'm casually browsing"
                control={<RadioButton />}
              />
            </RadioItem>
            {getCategoryList()?.map(({ title }, catIndex) => (
              <RadioItem item xs={12} sm={6} key={`${title}-${catIndex}`}>
                <FormControlLabel
                  value={title}
                  label={startCase(title)}
                  control={<RadioButton />}
                />
              </RadioItem>
            ))}
          </RadioItemContainer>
        </RadioGroup>
      </QuickViewSection>

      {quickFindSectionLabel('Sale')}
      <QuickViewSection>
        <RadioGroup
          aria-label="sale filter"
          name="sale-filter"
          value={filterState.saleThreshold}
          onChange={(event) => filterMethods.setSaleThreshold(event.target?.value)}>
          <FormControlLabel value={'0'} control={<RadioButton />} label="All products" />
          <FormControlLabel value={'1'} control={<RadioButton />} label="All sale items" />
          <FormControlLabel value={'20'} control={<RadioButton />} label="20% and more" />
          <FormControlLabel value={'50'} control={<RadioButton />} label="50% and more" />
          <FormControlLabel value={'70'} control={<RadioButton />} label="70% and more" />
        </RadioGroup>
      </QuickViewSection>

      {quickFindSectionLabel('Brands')}
      <QuickViewSection>
        {brandList.map((brand: string) => (
          <Grid key={brand}>
            <FormControlLabel
              value={urlCase(brand)}
              control={
                <Checkbox
                  checked={filterState.brands.includes(urlCase(brand))}
                  onChange={({ target }) => handleCheckBoxChange(target.value)}
                />
              }
              label={brand}
            />
          </Grid>
        ))}
      </QuickViewSection>

      {quickFindSectionLabel('Key words')}
      <QuickViewSection>
        <Spacer h={8} />
        <Input
          fullWidth
          variant="outlined"
          label={!filterState.keyWords.length ? productFiltersContent.keyWordsInputLabel : ''}
          value={keyWordsToString(filterState.keyWords)}
          onChange={({ target }) =>
            filterMethods.setKeyWords(
              (target.value && target.value.toLowerCase().replace(',', ' ').split(' ')) || []
            )
          }
        />
      </QuickViewSection>
    </QuickViewModal>
  );
}
