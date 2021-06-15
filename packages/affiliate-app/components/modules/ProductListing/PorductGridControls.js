//@flow
import React from 'react';
import StickyHeader from '@units/StickyHeader';
import { Filters, FilterChips } from '@modules/Filters';
import { useTheme, useCms } from '@hooks';
import { StyledCmsGrid } from '@styles/CommonStyledComponents';
import Image from '@units/Image';
import { ChipsContainer, ViewControlContainer } from './styles';
import { VIEW_MODE } from '@constants';
import {
  type FiltersData,
  type FilterMethods,
  type NormalizeFiltersOutput,
} from '@modules/Filters';

type FilterProps = {
  ...FiltersData,
  FilterMethods: FilterMethods,
  normalizedFilters: NormalizeFiltersOutput,
};

type PorductGridControlsProps = {
  setViewMode: Function,
  viewMode: 'grid-mode' | 'flick-mode',
  filterProps: FilterProps,
};

export default function PorductGridControls({
  setViewMode,
  viewMode,
  filterProps,
}: PorductGridControlsProps) {
  const { productFiltersContent } = useCms('listingContent');
  const { filterWrapperPadding, filterWrappeMaxWidth, filterWrapperSticky } = productFiltersContent;
  const { brandThemeColors: theme } = useTheme();
  const { FLICK_MODE, GRID_MODE } = VIEW_MODE;
  const isFlickMode = viewMode === FLICK_MODE;

  return (
    <StyledCmsGrid container padding={filterWrapperPadding} maxWidth={filterWrappeMaxWidth}>
      <StickyHeader background={theme.commonBackground} padding={filterWrapperSticky}>
        <StyledCmsGrid container justify="space-between" maxWidth={filterWrappeMaxWidth}>
          <ViewControlContainer alignItems="center">
            <Filters {...filterProps} {...filterProps.filterMethods} />
          </ViewControlContainer>
          <ViewControlContainer alignItems="center" onClick={() => setViewMode(FLICK_MODE)}>
            <Image
              icon="FlickIcon"
              maxWidth="40px"
              iconSize="large"
              iconColor={isFlickMode ? theme.tertiaryColor : false}
            />
          </ViewControlContainer>
          <ViewControlContainer alignItems="center" onClick={() => setViewMode(GRID_MODE)}>
            <Image
              icon="GridIcon"
              maxWidth="40px"
              iconSize="large"
              iconColor={!isFlickMode ? theme.tertiaryColor : false}
            />
          </ViewControlContainer>
        </StyledCmsGrid>
      </StickyHeader>
      <ChipsContainer>
        <FilterChips
          scaler={filterProps.scaler}
          {...filterProps.normalizedFilters}
          {...filterProps.filterMethods}
        />
      </ChipsContainer>
    </StyledCmsGrid>
  );
}
