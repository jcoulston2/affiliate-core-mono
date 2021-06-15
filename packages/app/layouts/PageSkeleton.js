//@flow
import React, { useState, useEffect } from 'react';
import Header from '@containers/Header/Header';
import Footer from '@containers/Footer/Footer';
import Cookies from '@containers/Cookies/Cookies';
import PageHead from '@document/Head';
import Router, { useRouter } from 'next/router';
import Loader from '@units/Loader';
import { sendGaPageView } from '@helpers/tracking';
import { isServer, getLocalStorage } from '@helpers/common';
import { type User } from '@types/user';
import MarketingSpace from '@modules/MarketingSpace';

type PageSkeletonProps = {
  children: any,
};

export default function PageSkeleton({ children }: PageSkeletonProps) {
  const [routerProgress, setRouterProgress] = useState(false);
  const routerHook = useRouter();

  Router.events.on('routeChangeStart', () => setRouterProgress(true));
  Router.events.on('routeChangeComplete', () => setRouterProgress(false));
  Router.events.on('routeChangeError', () => setRouterProgress(false));

  const userSettings: User | false = !isServer() && getLocalStorage('user-settings');
  const hasTrackingCookiesEnabled = userSettings && userSettings.allowCookies;

  useEffect(() => {
    if (hasTrackingCookiesEnabled) {
      sendGaPageView();
    }
  }, [routerHook.asPath]);

  return (
    <>
      <Loader active={routerProgress} useBackdrop />
      <section>
        <PageHead />
        <Header />
        <MarketingSpace />
        {children}
        <Footer />
        <Cookies />
      </section>
    </>
  );
}
