//@flow
import React, { useEffect } from 'react';
import { isServer, isIos, isInPwa, isChrome } from '@helpers/common';
import { useSelector, useDispatch } from 'react-redux';
import { type GlobalState } from '@types/appState';
import { actions } from './actions';
import appAlert from '@sweetalert/with-react';
import { PwaInstructions } from '@modules/Pwa';

type UsePwaOutput = {
  initPwaPrompt: Function,
  setIsPwaInitiated: Function,
  isPwaInitiated: boolean,
};

export default function usePwa(onPromptSuccess: Function): UsePwaOutput {
  if (isInPwa() || isServer()) return {};

  const dispatch = useDispatch();
  const isPwaInitiated = useSelector((appState: GlobalState): boolean => {
    const { pwaState } = appState;
    return pwaState.isPwaInitiated;
  });

  const setIsPwaInitiated = (flag: boolean): void => {
    dispatch(actions.setPwaInitialised(flag));
  };

  const initPwaPrompt = (): ?void => {
    // iOS does not yet support a native PWA prompt
    if (isIos()) {
      return appAlert(<PwaInstructions />);
    } else if (!window.pwaPrompt) {
      return null;
    }

    window.pwaPrompt.prompt();
    window.pwaPrompt.userChoice.then((pwaUserSelection) => {
      if (pwaUserSelection.outcome === 'accepted' && onPromptSuccess) {
        onPromptSuccess();
      }

      window.pwaPrompt = null;
      setIsPwaInitiated(false);
    });
  };

  useEffect(() => {
    if (isIos() && !isChrome()) {
      setIsPwaInitiated(true);
    }

    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      if (!window.pwaPrompt) {
        window.pwaPrompt = event;
        if (event) setIsPwaInitiated(true);
      }
    });
  }, []);

  return {
    initPwaPrompt,
    isPwaInitiated,
    setIsPwaInitiated,
  };
}
