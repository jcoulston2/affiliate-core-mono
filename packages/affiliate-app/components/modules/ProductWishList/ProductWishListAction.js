//@flow
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { type ProductData } from '@types/product';
import styled, { keyframes } from 'styled-components';
import { useWishListAction } from '@hooks';
import { isServer } from '@helpers/common';
import { getSavedPoductLinks } from './helper';

export const wishListAnimation = keyframes`
  0% { transform: scale(0); }
  50% { transform: scale(2.2); }
  100% { transform: scale(0); }
 `;

const WishListButton = styled(FavoriteIcon)`
  && {
    font-size: ${(props) => props.fontSize};
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
  }
`;

const WishListAnimation = styled(FavoriteIcon)`
  position: absolute;
  animation-name: ${wishListAnimation};
  animation-duration: 0.5s;
`;

type ProductWishListActionProps = {
  product: ProductData,
  iconSize?: string,
};

export default function ProductWishListAction({ product, iconSize }: ProductWishListActionProps) {
  const [wishListAnimate, setWishListAnimate] = useState(false);
  const [wishListAdded, setWishListAdded] = useState(false);
  const { link } = product.topLevelData;
  const savedProducts = useSelector((store) => store.wishListState?.savedProducts);
  const savedProductLinks = getSavedPoductLinks(savedProducts);
  const isSaved = savedProductLinks?.includes(link);
  const wishListAction = useWishListAction(isSaved ? 'remove' : 'add');
  const isClient = !isServer();
  const wishListOnClick = (): void => {
    if (!wishListAnimate) setWishListAnimate(true);
    wishListAction(product);
    setTimeout(() => {
      setWishListAnimate(false);
    }, 500);
  };

  // The wishlist or "saved products" is persisted in browser local storage. This will not be accessible during build time, this
  // means we'll have to rely on client side logic to detect whether a product has already been added to the wishlist. We do this
  // in the following useEffect, ensuring these checks are invoked on the client only
  useEffect(() => {
    if (isClient) setWishListAdded(isSaved);
  }, [isSaved]);

  return (
    <>
      {wishListAnimate && <WishListAnimation />}
      <WishListButton
        isSaved={isSaved}
        fontSize={iconSize || '32px'}
        onClick={wishListOnClick}
        color={wishListAdded ? 'primary' : 'inherit'}
      />
    </>
  );
}
