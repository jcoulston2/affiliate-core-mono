//@flow
import React from 'react';
import { connect } from 'react-redux';
import { type ProductData } from '@types/product';
import { ProductWishList } from '@modules/ProductWishList';
import { type GlobalState } from '../../types/appState';

type WishListProps = {
  savedProducts: Array<ProductData>,
};

const WishList = ({ savedProducts }: WishListProps) => {
  return <ProductWishList savedProducts={savedProducts} />;
};

export default connect((state: $Shape<GlobalState>) => {
  return {
    savedProducts: state.wishListState.savedProducts,
  };
})(WishList);
