//@flow
import { useState, useEffect } from 'react';
import { normalizeFilters } from '@modules/Filters/helper';
import { type NormalizeFiltersOutput } from './types';
import { useCms } from '@hooks';
import { type Filters as FilterType } from '@types/product';
import { toArrayNullable, stringifySafe } from '@helpers/common';
import { useRouter } from 'next/router';
import { isSearch } from './helper';

export type UseFilters = {
  filterMethods: { [string]: Function },
  filterState: {
    priceSort: string,
    keyWords: Array<string>,
    saleThreshold: number,
    priceThreshold: Array<number>,
    filterDrawOpen: boolean,
    hasTouchedSlider: boolean,
    filterRefresh: boolean,
    brands: Array<string>,
  },
  normalizedFilters: NormalizeFiltersOutput,
};

export default function useFilters(defaults: ?FilterType): UseFilters {
  const router = useRouter();
  const isSearchPage = isSearch(router);
  const { productFiltersContent } = useCms('listingContent');
  const { sliderPriceScaleMultiplier: scaler } = productFiltersContent;
  const [filterDrawOpen, setFilterDrawOpen] = useState<any>(false);
  const [priceSort, setPriceSort] = useState<any>('recommended');
  const [keyWords, setKeyWords] = useState<any>([]);
  const [saleThreshold, setSaleThreshold] = useState<any>(null);
  const [hasTouchedSlider, setHasTouchedSlider] = useState<any>(null);
  const [filterRefresh, triggerFilterRefresh] = useState<any>(false);
  const [priceThreshold, setPriceThreshold] = useState<any>([0, 100]);
  const [brands, setBrands] = useState<any>([]);
  const [category, setCategory] = useState<any>([]);
  const [section, setSection] = useState<any>(null);

  const setDefaultFilters = (): void => {
    if (!defaults) return;
    setHasTouchedSlider(!!(defaults.priceThresholdLow || defaults.priceThresholdHigh));
    setPriceSort(defaults.priceSort || 'recommended');
    setKeyWords(toArrayNullable(defaults.keyWords) || []);
    setSaleThreshold(stringifySafe(defaults.saleThreshold));
    setBrands(toArrayNullable(defaults.brands) || []);
    setCategory(toArrayNullable(defaults.category) || []);
    setSection(defaults.section || null);
    setPriceThreshold([
      parseInt(defaults.priceThresholdLow) / scaler || 0,
      parseInt(defaults.priceThresholdHigh) / scaler || 100,
    ]);
  };

  useEffect(() => {
    setDefaultFilters();
  }, [defaults]);

  const searchFilters = isSearchPage ? { category, section } : {};
  const filterMethods = {
    setPriceSort,
    setPriceThreshold,
    setKeyWords,
    setSaleThreshold,
    setFilterDrawOpen,
    setHasTouchedSlider,
    triggerFilterRefresh,
    setBrands,
    setCategory,
    setSection,
  };

  const filterState = {
    filterDrawOpen,
    priceSort,
    keyWords,
    saleThreshold,
    hasTouchedSlider,
    filterRefresh,
    priceThreshold,
    brands,
    ...searchFilters,
  };

  const normalizedFilters: NormalizeFiltersOutput = normalizeFilters(
    {
      priceSort,
      priceThreshold,
      keyWords,
      saleThreshold,
      scaler,
      hasTouchedSlider,
      brands,
      ...searchFilters,
    },
    isSearchPage
  );

  return {
    filterMethods,
    filterState,
    normalizedFilters,
  };
}
