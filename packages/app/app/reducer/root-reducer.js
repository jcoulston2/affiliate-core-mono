import { combineReducers } from 'redux';
import headerState from '@containers/Header/reducer';
import listingContentState from '@containers/ListingContent/reducer';
import userSettingsState from '@containers/UserSettings/reducer';
import wishListState from '@containers/WishList/reducer';
import pwaState from '@containers/Pwa/reducer';
import buildTimeState from './build-time-reducer';
import globalAppState from './app-reducer';

const rootReducer = combineReducers({
  buildTimeState,
  globalAppState,
  headerState,
  listingContentState,
  userSettingsState,
  wishListState,
  pwaState,
});

export default rootReducer;
