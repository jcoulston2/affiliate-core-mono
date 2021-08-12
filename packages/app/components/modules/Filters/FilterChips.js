//@flow
import * as React from 'react';
import Chip from '@units/Chip';
import { type NormalizeFiltersOutput } from './types';
import { useTheme } from '@hooks';
import { Highlight } from '@styles/CommonStyledComponents';
import { FilterChipWrapper } from './styles';
import { urlReverseCase } from '@helpers/common';

type ChipsRestProps = $Exact<{
  setPriceSort: Function,
  setPriceThreshold: Function,
  setKeyWords: Function,
  setSaleThreshold: Function,
  triggerFilterRefresh: Function,
  setCategory: Function,
  setSection: Function,
  setBrands: Function,
  scaler: number,
}>;

type FilterChipsProps = {
  ...ChipsRestProps,
  ...$Exact<NormalizeFiltersOutput>,
};

export default function FilterChips({
  priceSort,
  priceThresholdLow,
  priceThresholdHigh,
  saleThreshold,
  setPriceSort,
  setPriceThreshold,
  setKeyWords,
  setSection,
  setBrands,
  setSaleThreshold,
  setCategory,
  triggerFilterRefresh,
  scaler,
  keyWords,
  brands,
  category,
  section,
}: FilterChipsProps) {
  const { brandThemeColors } = useTheme();
  const renderCommonChip = (label: React.Node, onDelete: Function, index: number) => {
    return (
      <Chip
        label={label}
        size={'small'}
        bgColor={brandThemeColors.commonWhite}
        key={index}
        color="primary"
        useShadow
        spacing={20}
        onDelete={() => {
          onDelete();
          triggerFilterRefresh(true);
        }}
      />
    );
  };

  const getChipTitle = (title: string, value: string | number) => {
    return (
      <>
        <Highlight weight={500}>{title}&#58; </Highlight>
        {urlReverseCase(value)}
      </>
    );
  };

  const createChipArrayValues = (
    arrayValues: ?Array<any>,
    label: string,
    setter: Function
  ): Array<{ [string]: any }> => {
    return (
      arrayValues?.map((arrayValue) => ({
        name: arrayValue,
        label: arrayValue && getChipTitle(label, arrayValue),
        onDelete: () => setter(() => arrayValues.filter((k) => k !== arrayValue)),
        defaultVisibility: true,
      })) || []
    );
  };

  const chipValues = [
    {
      name: 'priceSort',
      label: priceSort && getChipTitle('Price Sort', priceSort),
      onDelete: () => setPriceSort(null),
      defaultVisibility: true,
    },
    {
      name: priceThresholdLow,
      label: priceThresholdLow && getChipTitle('Price threshold low', priceThresholdLow),
      onDelete: () => setPriceThreshold([0, parseInt(priceThresholdHigh) / scaler || 100]),
      defaultVisibility: true,
    },
    {
      name: priceThresholdHigh,
      label: priceThresholdHigh && getChipTitle('Price threshold High', priceThresholdHigh),
      onDelete: () => setPriceThreshold([parseInt(priceThresholdLow) / scaler || 0, 100]),
      defaultVisibility: parseInt(priceThresholdHigh) / scaler !== 100,
    },
    {
      name: saleThreshold,
      label:
        saleThreshold &&
        getChipTitle('Sale', saleThreshold > 1 ? `${saleThreshold}% and more` : 'All sale'),
      onDelete: () => setSaleThreshold(null),
      defaultVisibility: true,
    },
    {
      name: section,
      label: section && getChipTitle('Section', section || 'all'),
      onDelete: () => setSection(null),
      defaultVisibility: true,
    },
    ...createChipArrayValues(keyWords, 'KeyWord', setKeyWords),
    ...createChipArrayValues(brands, 'Brand', setBrands),
    ...createChipArrayValues(category, 'Category', setCategory),
  ];

  return (
    <FilterChipWrapper container>
      {chipValues.map(
        ({ label, onDelete, defaultVisibility }, index) =>
          !!(defaultVisibility && label) && renderCommonChip(label, onDelete, index)
      )}
    </FilterChipWrapper>
  );
}
