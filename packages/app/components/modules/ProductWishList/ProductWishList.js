//@flow
import React, { useState } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Drawer from '@units/Drawer';
import { type ProductData } from '@types/product';
import ProductListingItem from '@units/ProductListingItem';
import CmsStackedCards from '@units/CmsStackedCards';
import { useCms } from '@hooks';
import Grid from '@material-ui/core/Grid';
import Image from '@units/Image';
import Typography from '@units/Typography';
import { Spacer, Actionable } from '@styles/CommonStyledComponents';
import styled from 'styled-components';
import { useThemeColor } from '@hooks';
import { getProductLink } from '@helpers/page';
import { navigateToUrl } from '@helpers/common';

type WishListProps = {
  savedProducts: Array<ProductData>,
};

const WishListWrapper = styled.div`
  position: relative;
`;

const WishListNotification = styled.div`
  position: absolute;
  background: ${(props) => props.background || 'red'};
  color: white;
  font-size: 9px;
  padding: 1px 4px;
  border-radius: 30px;
  top: 0px;
  left: -4px;

  span {
    position: relative;
    left: -0.5px;
  }
`;

export default function WishList({ savedProducts }: WishListProps) {
  const [open, setWishListOpen] = useState(false);
  const {
    productListingContent: {
      productTileCard,
      productTileCardDetails,
      productTileCardContainer,
      productTitle,
      priceCopy,
      newPriceCopy,
      wasPriceCopy,
    },
  } = useCms('listingContent');
  const { wishListHero } = useCms('wishList');
  const hasSavedProducts = !!savedProducts.length;
  const notificationColor = useThemeColor('tertiary');
  const toggleDrawer = (status) => () => {
    setWishListOpen(status);
  };
  const wishListCardClick = (product: ProductData): void => {
    const productLink = getProductLink(product);
    if (productLink) {
      navigateToUrl(productLink);
    }
  };

  return (
    <>
      <Drawer
        width={100}
        open={open}
        anchor={'right'}
        iconCloseClick={toggleDrawer(false)}
        onClose={toggleDrawer(false)}>
        <CmsStackedCards
          {...{
            ...wishListHero,
            cards: [wishListHero.card],
          }}
        />

        <Grid container justify="center">
          {savedProducts?.map((product: ProductData, index: number) => (
            <ProductListingItem
              hasWishListAction
              onCardClick={() => wishListCardClick(product)}
              key={index}
              //$FlowFixMe
              {...product}
              {...{
                productTileCardDetails,
                productTileCard,
                productTileCardContainer,
                productTitle,
                priceCopy,
                newPriceCopy,
                wasPriceCopy,
              }}
            />
          ))}
        </Grid>
        {!hasSavedProducts && (
          <Grid container>
            <Grid item xs>
              <Typography
                tag="h2"
                typeStyles={{
                  desktop: {
                    size: 20,
                    textAlign: 'center',
                    padding: '4em 2em 3em 2em',
                    weight: 300,
                    color: 'faded',
                  },
                  mobile: {
                    size: 16,
                  },
                }}
                fullwidth>
                You have no saved products&#46;&#46;&#46;
              </Typography>
            </Grid>
            <Image src={'no-wishlist.svg'} maxWidth={'500px'} />
            <Spacer h={30} />
          </Grid>
        )}
      </Drawer>
      <Actionable aria-label="wish list">
        <WishListWrapper>
          {hasSavedProducts && (
            <WishListNotification background={notificationColor}>
              <span>{savedProducts.length}</span>
            </WishListNotification>
          )}
          <FavoriteIcon onClick={toggleDrawer(true)} fontSize="large" />
        </WishListWrapper>
      </Actionable>
    </>
  );
}
