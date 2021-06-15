//@flow
import { type CmsGrid } from './cms';

export type MarketingBanner = {
  name: string,
  endDate: ?Date,
  startDate: ?Date,
  visible: boolean,
  displayInstallAppBanner: boolean,
  ...CmsGrid,
};
