//@flow
import React from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { ProductWishListAction } from '@modules/ProductWishList';
import bp from '@styles/breakPoints';

const WishListContainer = styled(Grid)`
  && {
    min-width: 46px;
    display: flex;
    justify-content: flex-end;

    ${bp.max_xs} {
      min-width: 40px;
    }
  }
`;

export default function ProductWishList() {
  return (
    <WishListContainer item>
      <ProductWishListAction iconSize={32} />
    </WishListContainer>
  );
}
