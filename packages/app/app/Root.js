//@flow
import React, { useEffect, useState } from 'react';
import { actions } from './root-actions';
import { wrapper } from './store';
import { useDispatch } from 'react-redux';
import SiteThemeProvider from '@styles/SiteThemeProvider';
import { CmsProvider } from '../app/CmsContext';
import { IS_DEV } from '@constants';
import { injectLocalCms } from '@helpers/cms';
import { useSelector } from 'react-redux';
import { type GlobalState } from '@types/appState';

type RootProps = {
  Component: Function,
  pageProps?: { [string]: any },
};

function Root({ Component, pageProps }: RootProps) {
  const dispatch = useDispatch();
  const { cms } = useSelector((store: GlobalState) => store.buildTimeState?.cmsData || { cms: {} });
  const [appCms, setAppCms] = useState(cms);

  const setLocalCms = async (): Promise<void> => {
    const localCms = await injectLocalCms();
    setAppCms(localCms);
  };

  const handleClientWidthOnResize = (): void => {
    let timedFn;
    const initResize = () => {
      timedFn = setTimeout(() => {
        const clientWidth = document?.body?.clientWidth;
        if (clientWidth) {
          dispatch(actions.setClientWidth(clientWidth));
        }
      }, 200);
    };

    window.addEventListener('resize', () => {
      clearTimeout(timedFn);
      initResize();
    });

    initResize();
  };

  useEffect(() => {
    handleClientWidthOnResize();
    if (IS_DEV) {
      setLocalCms();
    }
  }, []);

  return (
    <CmsProvider cms={appCms}>
      <SiteThemeProvider>
        <Component {...pageProps} />
      </SiteThemeProvider>
    </CmsProvider>
  );
}

export default wrapper.withRedux(Root);
