//@flow
import React, { useState, useEffect } from 'react';
import ProductListingItem from '@units/ProductListingItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@units/Typography';
import { type ProductData } from '@types/product';
import { type CmsCopy } from '@types/cms';
import Flicker from '@units/Flicker';
import { NoMoreProductsFlicker, FlickerFilters } from './styles';
import { VIEW_MODE } from '@constants';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ClearIcon from '@material-ui/icons/Clear';
import Image from '@units/Image';
import Modal from '@units/Modal';
import NoMoreProductsIndicator from './NoMoreProductsIndicator';
import Drawer from '@units/Drawer';
import { Filters } from '@modules/Filters';
import { Actionable } from '@styles/CommonStyledComponents';
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

type ProductFlickViewProps = {
  isFlickView: boolean,
  setViewMode: Function,
  flickViewTitleCopy: CmsCopy,
  flickViewTitleText: string,
  wishListAction: Function,
  openCardAction: Function,
  allProducts: Array<ProductData>,
  showNoMoreProducts: boolean,
  noMoreProductsCopyText: string,
  openCardActionMemo: Function,
  loadMoreProducts: Function,
  filterProps: FilterProps,
};

export default function ProductFlickView({
  isFlickView,
  setViewMode,
  flickViewTitleCopy,
  flickViewTitleText,
  wishListAction,
  openCardAction,
  allProducts,
  showNoMoreProducts,
  noMoreProductsCopyText,
  openCardActionMemo,
  loadMoreProducts,
  filterProps,
  ...listingItemProps
}: ProductFlickViewProps) {
  const [flickModalOpen, setFlickModalOpen] = useState(true);
  const [noMoreFlickerCards, setNoMoreFlickerCards] = useState(false);
  const flickerEndCallback = (): void => {
    if (showNoMoreProducts) {
      setNoMoreFlickerCards(true);
    } else {
      loadMoreProducts();
    }
  };

  useEffect(() => {
    setNoMoreFlickerCards(false);
  }, [allProducts.length]);

  return (
    <>
      <Drawer
        anchor={'bottom'}
        open={isFlickView}
        fullHeight
        width={100}
        iconCloseClick={() => setViewMode(VIEW_MODE.GRID_MODE)}
        onClose={() => setViewMode(VIEW_MODE.GRID_MODE)}>
        <FlickerFilters>
          <Actionable aria-label="filters">
            <Filters {...filterProps} {...filterProps.filterMethods} />
          </Actionable>
        </FlickerFilters>

        <Grid container justify="center">
          <Typography tag="h3" typeStyles={flickViewTitleCopy}>
            {flickViewTitleText}
          </Typography>
        </Grid>

        <Modal
          showOnce
          open={flickModalOpen}
          setOpen={setFlickModalOpen}
          modalKey="flick-modal"
          modalTitle="Fliik view">
          <Image src="flick-instructions.png" maxWidth="434px" />
        </Modal>
        {!noMoreFlickerCards ? (
          <Flicker
            preventSwipe={['down']}
            SwipeIconRight={<FavoriteIcon color="primary" />}
            SwipeIconLeft={<ClearIcon color="primary" />}
            onSwipeCallback={(direction: string, product: ProductData) => {
              if (direction === 'right') wishListAction(product);
              if (direction === 'up') openCardAction(product);
            }}
            onEndCallback={() => flickerEndCallback()}
            dataMap={allProducts}
            isLastDataMap={showNoMoreProducts}
            Component={<ProductListingItem {...listingItemProps} />}
          />
        ) : (
          <NoMoreProductsFlicker>
            <NoMoreProductsIndicator text={noMoreProductsCopyText} />
          </NoMoreProductsFlicker>
        )}
      </Drawer>

      <Grid container justify="center">
        {allProducts.map((product: ProductData, index: number) => (
          <ProductListingItem
            hasWishListAction
            onCardClick={openCardActionMemo(product)}
            //$FlowFixMe
            {...product}
            {...listingItemProps}
            key={index}
          />
        ))}
      </Grid>
    </>
  );
}
