//@flow
import { GA_TRACKING_ID } from '@constants';
import { isServer, isDebug } from '@helpers/common';

export function sendGaPageView(): void {
  if (!isServer() && window.gtag) {
    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, { page_path: window.location.pathname });

    if (isDebug()) {
      console.log(
        `::: sending pageview event (${window.location.pathname}). GA_ID ${GA_TRACKING_ID} :::`
      );
    }
  }
}
