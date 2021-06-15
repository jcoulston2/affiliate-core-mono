//@flow
import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Image from '@units/Image';
import { type Filters as FilterType } from '@types/product';
import { type FiltersComponentProps } from './types';
import Card from '@units/Card';
import Input from '@units/Input';
import Checkbox from '@units/Checkbox';
import Typography from '@units/Typography';
import RadioButton from '@units/RadioButton';
import { Spacer } from '@styles/CommonStyledComponents';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Slider from '@units/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import HelpIcon from '@material-ui/icons/Info';
import { CenterVertical } from '@styles/CommonStyledComponents';
import Button from '@units/Button';
import { useRouter } from 'next/router';
import { PLP_PATH, SEARCH_PATH } from '@constants';
import {
  createUrlFilters,
  normalizeFilters,
  getNumberOfFiltersSelected,
  getCategoryFilters,
  getSectionFilters,
  sortSelectedCheckboxes,
  isSearch,
} from './helper';
import { stringifySafe, toArrayNullable, keyWordsToString, urlCase } from '@helpers/common';
import { getFilterPlpBasePath, pushFilterPlpBasePath, getFiltersFromUrl } from '@helpers/page';
import ClearIcon from '@material-ui/icons/Clear';
import Drawer from '@units/Drawer';
import { TooltopContent, ClearFilters, FilterNotification } from './styles';
import { useBrandList, useCategoryData } from '@hooks';
import FilterItem from './FilterItem';
import isEmpty from 'lodash/isEmpty';
import capitalize from 'lodash/capitalize';

export default function Filters({
  section,
  category,
  productSearchValues,
  fetchProducts,
  fetchProductsInSearch,
  setClientFilterStatus,
  scaler,
  setLoading,
  setPriceSort,
  setPriceThreshold,
  setKeyWords,
  setBrands,
  setCategory,
  setSection,
  setSaleThreshold,
  setFilterDrawOpen,
  setHasTouchedSlider,
  hasSetDefaultFilters,
  triggerFilterRefresh,
  filterDrawOpen,
  priceSort,
  keyWords,
  brands,
  saleThreshold,
  hasTouchedSlider,
  filterRefresh,
  priceThreshold,
  normalizedFilters,
  useFilterSelectedNotifcation,
  productFiltersContent: cms,
}: FiltersComponentProps) {
  const router = useRouter();
  const brandList = useBrandList();
  const categoryData = useCategoryData();
  const categoryFilters = getCategoryFilters(section, categoryData);
  const sectionFilters = getSectionFilters(section, categoryData);
  const isSearchPage = isSearch(router);
  const numberOfFiltersSelected = getNumberOfFiltersSelected(normalizedFilters);
  const sliderMarks = [
    { label: '£0', value: 0 },
    { label: hasTouchedSlider ? `£${100 * scaler}` : 'no max', value: 100 },
  ];

  const closeFilters = () => setFilterDrawOpen(false);
  const handleInputChange = (cb: Function) => (event: Object) => {
    cb(event.target.value);
  };

  const handleCheckBoxChange = (stateVale: Array<any>, stateSetter: Function) => (
    value: string
  ): void => {
    if (stateVale.includes(value)) {
      stateSetter(stateVale.filter((item) => urlCase(item) !== value));
    } else {
      stateSetter([...stateVale, value]);
    }
  };

  const restoreDefaultFilters = (): void => {
    setFilterDrawOpen(false);
    pushFilterPlpBasePath(router);
  };

  const applyFilters = (): void => {
    setClientFilterStatus(true);
    setFilterDrawOpen(false);
    setLoading(true);
    createUrlFilters(normalizedFilters, getFilterPlpBasePath(router), isSearchPage);

    if (isSearchPage) {
      fetchProductsInSearch(productSearchValues, 0, 100, normalizedFilters);
    } else {
      fetchProducts(section, category, 0, 100, normalizedFilters);
    }
  };

  useEffect(() => {
    if (filterRefresh) {
      triggerFilterRefresh(false);
      applyFilters();
    }
  }, [filterRefresh]);

  return (
    <>
      <Grid item onClick={() => setFilterDrawOpen(!filterDrawOpen)}>
        {!!numberOfFiltersSelected && (
          <FilterNotification>{numberOfFiltersSelected}</FilterNotification>
        )}
        <Image src="filter-icon.svg" alt="Select productFilters" />
      </Grid>

      <Drawer
        anchor={'right'}
        open={filterDrawOpen}
        iconCloseClick={closeFilters}
        onClose={closeFilters}>
        <Card padding={'28px'}>
          <FormControl component="fieldset">
            <FormLabel component="legend">
              <Typography tag="h3" typeStyles={cms.filterCardTitle}>
                Sort
              </Typography>
            </FormLabel>
            <FilterItem isLast>
              <RadioGroup
                aria-label="price sort"
                name="price-sort"
                value={priceSort}
                onChange={handleInputChange(setPriceSort)}>
                <FormControlLabel value="low" control={<RadioButton />} label="Price low to high" />
                <FormControlLabel
                  value="high"
                  control={<RadioButton />}
                  label="Price high to low"
                />
                <FormControlLabel
                  value={'recommended'}
                  control={<RadioButton />}
                  label="Recommended"
                />
              </RadioGroup>
            </FilterItem>
          </FormControl>
        </Card>

        {isSearchPage && (
          <>
            <Spacer h={20} />
            <Card>
              {!!sectionFilters.length && (
                <>
                  <Typography tag="h3" typeStyles={cms.filterItemTitle}>
                    Section
                  </Typography>
                  <FilterItem>
                    <RadioGroup
                      aria-label="section"
                      name="section"
                      value={section}
                      onChange={handleInputChange(setSection)}>
                      {sectionFilters.map((sectionFilter: string) => (
                        <FormControlLabel
                          value={sectionFilter}
                          control={<RadioButton />}
                          label={capitalize(sectionFilter)}
                        />
                      ))}
                      <FormControlLabel value={null} control={<RadioButton />} label="All" />
                    </RadioGroup>
                  </FilterItem>
                </>
              )}

              <Typography tag="h3" typeStyles={cms.filterItemTitle}>
                Categories
              </Typography>
              <FilterItem expandable>
                {sortSelectedCheckboxes(categoryFilters, category).map((catItem: string) => (
                  <Grid key={catItem}>
                    <FormControlLabel
                      value={urlCase(catItem)}
                      control={
                        <Checkbox
                          checked={category.includes(urlCase(catItem))}
                          onChange={handleInputChange(handleCheckBoxChange(category, setCategory))}
                        />
                      }
                      label={capitalize(catItem)}
                    />
                  </Grid>
                ))}
              </FilterItem>
            </Card>
          </>
        )}

        <Spacer h={20} />
        <Card padding={'28px'}>
          <Typography tag="h3" typeStyles={cms.filterCardTitle}>
            Filters
          </Typography>
          <Spacer h={20} />

          <Typography tag="h3" typeStyles={cms.filterItemTitle}>
            Price Range
          </Typography>
          <FilterItem>
            <Slider
              scale={(scale) => scale * scaler}
              value={priceThreshold}
              onChange={(__, value) => {
                setHasTouchedSlider(true);
                setPriceThreshold(value);
              }}
              valueLabelDisplay="auto"
              aria-labelledby="set-price"
              marks={sliderMarks}
              valueLabelFormat={(value) => `£${value}`}
            />
          </FilterItem>

          <CenterVertical>
            <Typography tag="h3" typeStyles={cms.filterItemTitle}>
              Key Words
            </Typography>
            <Tooltip title={<TooltopContent>{cms.keyWordsTooltipText}</TooltopContent>}>
              <HelpIcon size="small" />
            </Tooltip>
          </CenterVertical>

          <FilterItem>
            <Input
              fullWidth
              variant="outlined"
              label={!keyWords.length ? cms.keyWordsInputLabel : ''}
              value={keyWordsToString(keyWords)}
              onChange={({ target }) =>
                setKeyWords(
                  (target.value && target.value.toLowerCase().replace(',', ' ').split(' ')) || []
                )
              }
            />
          </FilterItem>

          <Typography tag="h3" typeStyles={cms.filterItemTitle}>
            Brands
          </Typography>
          <FilterItem expandable>
            {brandList.map((brand: string) => (
              <Grid key={brand}>
                <FormControlLabel
                  value={urlCase(brand)}
                  control={
                    <Checkbox
                      checked={brands.includes(urlCase(brand))}
                      onChange={handleInputChange(handleCheckBoxChange(brands, setBrands))}
                    />
                  }
                  label={brand}
                />
              </Grid>
            ))}
          </FilterItem>

          <Typography tag="h3" typeStyles={cms.filterItemTitle}>
            Sale
          </Typography>
          <FilterItem>
            <RadioGroup
              aria-label="sale filter"
              name="sale-filter"
              value={saleThreshold}
              onChange={handleInputChange(setSaleThreshold)}>
              <FormControlLabel value={'0'} control={<RadioButton />} label="All products" />
              <FormControlLabel value={'1'} control={<RadioButton />} label="All sale items" />
              <FormControlLabel value={'20'} control={<RadioButton />} label="20% and more" />
              <FormControlLabel value={'50'} control={<RadioButton />} label="50% and more" />
              <FormControlLabel value={'70'} control={<RadioButton />} label="70% and more" />
            </RadioGroup>
          </FilterItem>
        </Card>

        <Spacer h={7} />

        <ClearFilters onClick={restoreDefaultFilters}>
          <Typography tag="p" size={15} decoration="underline" margin="0px 0px 10px 0px">
            Clear filters
          </Typography>
        </ClearFilters>

        <Button primary fullWidth onClick={applyFilters}>
          Apply filters
        </Button>
      </Drawer>
    </>
  );
}
