//@flow
import React, { useEffect, useState, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@units/Button';
import Typography from '@units/Typography';
import { type CmsCopy, type CmsButton, type CmsResponsiveString } from '@types/cms';
import { type Filters as FilterType, type ProductData } from '@types/product';
import Loader from '@units/Loader';
import Card from '@units/Card';
import { Spacer } from '@styles/CommonStyledComponents';
import { getScrollTop, setScrollTop, navigateToUrl, urlContainsQuery } from '@helpers/common';
import { type PredictiveSearch } from '@types/search';
import { getFiltersFromUrl } from '@helpers/page';
import { SEARCH_PATH } from '@constants';
import { useRouter } from 'next/router';
import { getProductLink } from '@helpers/page';
import { useWishListAction, useCms } from '@hooks';
import { useFilters } from '@modules/Filters';
import { ProductListingContainer, LoadMoreProductsCopy, ListingInformation } from './styles';
import PorductGridControls from './PorductGridControls';
import { VIEW_MODE, FLICK_VIEW_QUERY } from '@constants';
import { useTheme } from '@hooks';
import NoMoreProductsIndicator from './NoMoreProductsIndicator';
import memoize from 'fast-memoize';
import ProductsView from './ProductsView';

type ProductListingProps = $Exact<{
  initialProducts: Array<ProductData>,
  fetchedProducts: Array<ProductData>,
  initialProductsPerPage: number,
  listingContentInnerMaxWidth: number,
  listingContentInnerPadding: CmsResponsiveString,
  fetchProducts: Function,
  setClientFilterStatus: Function,
  loadMoreProductsButton: CmsButton,
  productCountStart: number,
  productCountEnd: number,
  section: string,
  category: string,
  totalCategoryProducts: number,
  noMoreProductsCopyText: string,
  noSearchResultText: string,
  noMoreProductsCopy: CmsCopy,
  loadMoreProductsCopy: CmsCopy,
  hasFiltersSetFromClient: boolean,
  productFilters: FilterType,
  productSearchValues: PredictiveSearch,
  fetchProductsInSearch: Function,
  openProductDetailView: Function,
  populateProductView: Function,
  setLoading: Function,
  loading: boolean,
  productFilters: FilterType,
  flickViewTitleText: string,
  flickViewTitleCopy: CmsCopy,
}>;

export default function ProductListing({
  initialProducts,
  fetchedProducts,
  initialProductsPerPage,
  listingContentInnerMaxWidth,
  listingContentInnerPadding,
  noMoreProductsCopyText,
  noMoreProductsCopy,
  loadMoreProductsButton,
  loadMoreProductsCopy,
  fetchProducts,
  totalCategoryProducts,
  productSearchValues,
  fetchProductsInSearch,
  section,
  category,
  setLoading,
  loading,
  openProductDetailView,
  populateProductView,
  productFilters,
  setClientFilterStatus,
  noSearchResultText,
  flickViewTitleCopy,
  flickViewTitleText,
  ...listingItemProps
}: ProductListingProps) {
  const [viewMode, setViewMode] = useState(VIEW_MODE.GRID_MODE);
  const [lastScrolltop, setLastScrollTop] = useState(null);
  const { productFiltersContent } = useCms('listingContent');
  const { textTheme } = useTheme();
  const { filterState, filterMethods, normalizedFilters } = useFilters(productFilters);
  const router = useRouter();
  const wishListAction = useWishListAction('add');
  const { sliderPriceScaleMultiplier: scaler } = productFiltersContent;
  const allProducts = [...initialProducts, ...fetchedProducts];
  const numberOfProducts = allProducts.length;
  const nextFetchEndCount = numberOfProducts + initialProductsPerPage;
  const showNoMoreProducts = numberOfProducts >= totalCategoryProducts;
  const filters = getFiltersFromUrl();
  const isSearchPage = router.pathname.includes(SEARCH_PATH);
  const isFlickView = viewMode === VIEW_MODE.FLICK_MODE;
  const filterProps = {
    section,
    category,
    productFilters,
    productSearchValues,
    fetchProducts,
    fetchProductsInSearch,
    setClientFilterStatus,
    setLoading,
    productFiltersContent,
    scaler,
    normalizedFilters,
    filterMethods,
    ...filterState,
  };

  const openCardAction = (product: ProductData): void => {
    try {
      openProductDetailView();
      populateProductView(product);
    } catch (e) {
      console.warn(e);
      navigateToUrl(getProductLink(product));
    }
  };

  const openCardActionMemo = useCallback(
    memoize((product: ProductData) => () => openCardAction(product)),
    []
  );

  const setScroll = (): void => {
    if (document.scrollingElement) {
      setLastScrollTop(getScrollTop());
    }
  };

  const loadMoreProducts = (): void => {
    setLoading(true);
    setScroll();
    if (isSearchPage) {
      fetchProductsInSearch(
        productSearchValues,
        numberOfProducts,
        nextFetchEndCount,
        filters,
        true
      );
    } else {
      fetchProducts(section, category, numberOfProducts, nextFetchEndCount, filters, true);
    }
  };

  const maintainScrollTop = (): void => {
    if (document.scrollingElement && lastScrolltop !== null) {
      setScrollTop(lastScrolltop);
      setLastScrollTop(null);
    }
  };

  useEffect(() => {
    maintainScrollTop();
  }, [numberOfProducts]);

  useEffect(() => {
    if (urlContainsQuery(FLICK_VIEW_QUERY)) {
      setViewMode(VIEW_MODE.FLICK_MODE);
    }
  }, []);

  return (
    <>
      <PorductGridControls
        filterProps={filterProps}
        setViewMode={setViewMode}
        viewMode={viewMode}
      />
      <Loader active={loading} useBackdrop={true} />
      <ProductListingContainer
        padding={listingContentInnerPadding}
        maxWidth={listingContentInnerMaxWidth}>
        <ProductsView
          {...{
            isFlickView,
            setViewMode,
            flickViewTitleCopy,
            flickViewTitleText,
            wishListAction,
            openCardAction,
            allProducts,
            loadMoreProducts,
            showNoMoreProducts,
            noMoreProductsCopyText,
            openCardActionMemo,
            filterProps,
          }}
          {...listingItemProps}
        />
        {!numberOfProducts && <NoMoreProductsIndicator text={!loading && noSearchResultText} />}
        <ListingInformation container justify="center">
          {!isFlickView && (
            <Grid item lg={5}>
              <LoadMoreProductsCopy>
                <Typography tag="h3" fullwidth typeStyles={loadMoreProductsCopy}>
                  Showing {numberOfProducts} item&#40;s&#41;
                </Typography>
              </LoadMoreProductsCopy>
            </Grid>
          )}

          <Grid item xs={12} lg={8} container justify="center">
            {!isFlickView && showNoMoreProducts && (
              <Card padding="0px" margin="20px 0px 20px">
                <Typography
                  tag="p"
                  typeStyles={noMoreProductsCopy}
                  color={textTheme.slightlyFadedTextColor}>
                  {noMoreProductsCopyText}
                </Typography>
              </Card>
            )}

            {!showNoMoreProducts && !isFlickView && (
              <Button {...loadMoreProductsButton} onClick={loadMoreProducts} />
            )}
          </Grid>
          <Spacer h={[{ value: 20, breakPoint: 'max_xs' }]} />
        </ListingInformation>
      </ProductListingContainer>
    </>
  );
}
