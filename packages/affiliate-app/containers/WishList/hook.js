//@flow
import { actions } from './actions';
import { useDispatch } from 'react-redux';
import { type ProductData } from '@types/product';

export default function useWishListAction(action: 'add' | 'remove'): function {
  const dispatch = useDispatch();
  const { addProductToWishList, removeProductfromWishList } = actions;
  switch (action) {
    case 'add':
      return (product: ProductData) => dispatch(addProductToWishList(product));

    case 'remove':
      return (product: ProductData) =>
        dispatch(removeProductfromWishList(product.topLevelData.link));
  }
}
