//@flow
import { actions, actionTypes } from './actions';
import { take, put, all, fork, call } from 'redux-saga/effects';
import clientRequests from '../../apiUtil/requests/clientRequests';
import { getFetchedProductsData } from './helper';
import { type Saga } from '@types/redux';

export function* watchPopulateProductView(): Saga {
  while (true) {
    const { productViewData } = yield take(actionTypes.POPULATE_PRODUCT_VIEW);
    yield put(actions.populateProductViewSuccess(productViewData));
  }
}

export function* watchOpenProductView(): Saga {
  while (true) {
    yield take(actionTypes.OPEN_PRODUCT_DETAIL_VIEW);
    yield put(actions.openProductDetailViewSuccess());
  }
}

export function* watcherClientFilterStatus(): Saga {
  while (true) {
    const { status } = yield take(actionTypes.HAS_FILTERS_SET_FROM_CLIENT);
    yield put(actions.setClientFilterStatusSuccess(status));
  }
}

export function* watcherSetLoading(): Saga {
  while (true) {
    const { status } = yield take(actionTypes.SET_LOADING);
    yield put(actions.setLoadingSuccess(status));
  }
}

export function* watchFetchProducts(): Saga {
  while (true) {
    const {
      section,
      productType,
      productCountStart,
      productCountEnd,
      filters,
      incrementExistingProducts,
    } = yield take(actionTypes.FETCH_PRODUCTS_LISTING);

    const { categoryData } = yield call(
      clientRequests.getProductData,
      section,
      productType,
      productCountStart,
      productCountEnd,
      filters
    );

    const { data: fetchedProducts, totalProductsInCategory } = getFetchedProductsData(categoryData);
    if (!fetchedProducts) return null;

    yield put(actions.setLoadingSuccess(false));
    yield put(
      actions.fetchProductsSuccess(
        fetchedProducts,
        productCountStart,
        productCountEnd,
        incrementExistingProducts,
        totalProductsInCategory
      )
    );
  }
}

export function* watchFetchProductsInSearch(): Saga {
  while (true) {
    const {
      searchValues,
      productCountStart,
      productCountEnd,
      searchFilters,
      incrementExistingProducts,
    } = yield take(actionTypes.FETCH_PRODUCTS_IN_SEARCH);

    const { searchData } = yield call(
      clientRequests.getSearchData,
      searchValues,
      productCountStart,
      productCountEnd,
      searchFilters
    );

    const { data: fetchedProducts, totalProductsInCategory } = getFetchedProductsData(searchData);
    if (!fetchedProducts) {
      return null;
    }

    yield put(actions.setLoadingSuccess(false));
    yield put(
      actions.fetchProductsSuccess(
        fetchedProducts,
        productCountStart,
        productCountEnd,
        incrementExistingProducts,
        totalProductsInCategory
      )
    );
  }
}

export function* watcherClearFetchedProducts(): Saga {
  while (true) {
    yield take(actionTypes.CLEAR_FETCHED_PRODUCTS);
    yield put(actions.clearClientFetchedProductsSuccess());
  }
}

export default function* rootSaga(): Saga {
  yield all([
    fork(watchPopulateProductView),
    fork(watchOpenProductView),
    fork(watchFetchProducts),
    fork(watcherClientFilterStatus),
    fork(watcherSetLoading),
    fork(watchFetchProductsInSearch),
    fork(watcherClearFetchedProducts),
  ]);
}
