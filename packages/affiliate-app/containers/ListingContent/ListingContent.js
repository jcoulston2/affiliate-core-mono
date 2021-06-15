//@flow
import React from 'react';
import { connect } from 'react-redux';
import ProductListing from '@modules/ProductListing';
import ProductDetailView from '@modules/ProductDetailView';
import ListingHero from '@modules/ListingHero';
import { useCms } from '@hooks';
import { actions } from './actions';
import { type ProductData, type ProductSection } from '@types/product';
import { type PredictiveSearch } from '@types/search';
import { type GlobalState } from '../../types/appState';
import { Spacer } from '@styles/CommonStyledComponents';
import { getProductLink } from '@helpers/page';
import { type Filters } from '@types/product';

type ListingContentProps = {
  fetchedProducts: Function,
  fetchProductsInSearch: Function,
  totalProductsInCategory: ?number,
  initialProductData: ProductSection,
  productFilters: Filters,
  productSearchValues: PredictiveSearch,
  productViewOpen: boolean,
  productViewData: ProductData,
  populateProductView: Function,
  openProductDetailView: Function,
  fetchProducts: Function,
  setClientFilterStatus: Function,
  hasFiltersSetFromClient: boolean,
  setLoading: Function,
  loading: boolean,
};

const ListingContent = ({
  initialProductData,
  fetchedProducts,
  fetchProductsInSearch,
  totalProductsInCategory,
  productViewOpen,
  productViewData,
  populateProductView,
  openProductDetailView,
  fetchProducts,
  productFilters,
  productSearchValues,
  hasFiltersSetFromClient,
  setClientFilterStatus,
  loading,
  setLoading,
}: ListingContentProps) => {
  const { section, data: sectionData } = initialProductData;
  const { productListingContent, productViewContent, productListingHeroContent } = useCms(
    'listingContent'
  );

  const {
    category,
    data: initialProducts,
    totalProductsInCategory: totalFromBuild,
    categoryLastUpdated,
  } = sectionData[0] || {};

  const productLink = getProductLink(productViewData);

  // We need to check the totalProductsInCategory property from both the static prop fetching and the client fetching
  // for the filter update/fetch functionality. This is used for the 'load more' button on the listing page.
  const totalCategoryProducts = totalProductsInCategory || totalFromBuild;

  // When we have filters selected, the product fetching will be handled via the client for SPA functionality
  // this means that we can omit the inital products given via 'getStaticProps' which was executed server-side.
  // When we clear the filters, we just do a simple page refresh and getStaticProps executes again.
  const initialProductsProps = hasFiltersSetFromClient ? [] : initialProducts || [];

  return (
    <section>
      <ListingHero {...productListingHeroContent} />
      <ProductListing
        {...productListingContent}
        {...{
          section,
          category,
          totalCategoryProducts,
          fetchedProducts,
          productSearchValues,
          fetchProductsInSearch,
          populateProductView,
          openProductDetailView,
          fetchProducts,
          setLoading,
          loading,
          productFilters,
          setClientFilterStatus,
          initialProducts: initialProductsProps,
        }}
      />

      <ProductDetailView
        {...productViewContent}
        {...{
          productViewOpen,
          productViewData,
          openProductDetailView,
          productLink,
          categoryLastUpdated,
        }}
      />
      <Spacer h={20} />
    </section>
  );
};

function mapDispatchToProps(dispatch: Function): { [string]: Function } {
  return {
    populateProductView: (productViewData) =>
      dispatch(actions.populateProductView(productViewData)),
    openProductDetailView: () => dispatch(actions.openProductDetailView()),
    fetchProducts: (...args) => dispatch(actions.fetchProducts(...args)),
    fetchProductsInSearch: (...args) => dispatch(actions.fetchProductsInSearch(...args)),
    setClientFilterStatus: (status) => dispatch(actions.setClientFilterStatus(status)),
    setLoading: (status) => dispatch(actions.setLoading(status)),
  };
}

function mapStateToProps({ buildTimeState, listingContentState }: $Shape<GlobalState>) {
  const { productData: initialProductData, productFilters, productSearchValues } = buildTimeState;
  const {
    productViewData,
    productViewOpen,
    fetchedProducts,
    totalProductsInCategory,
    hasFiltersSetFromClient,
    loading,
  } = listingContentState;

  return {
    initialProductData,
    productFilters,
    productSearchValues,
    fetchedProducts,
    totalProductsInCategory,
    productViewOpen,
    productViewData,
    hasFiltersSetFromClient,
    loading,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListingContent);
