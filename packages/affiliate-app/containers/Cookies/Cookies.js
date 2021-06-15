//@flow
import React from 'react';
import { connect } from 'react-redux';
import { useCms } from '@hooks';
import { type GlobalState } from '@types/appState';
import CookieBanner from '@modules/CookieBanner';
import { actions as userActions } from '@containers/UserSettings/actions';

type CookiesProps = {
  allowCookies: boolean,
  setCookies: Function,
};

function Cookies({ allowCookies, setCookies }: CookiesProps) {
  const { cookies: cookiesCms } = useCms('other');
  return <CookieBanner {...cookiesCms} setCookies={setCookies} allowCookies={allowCookies} />;
}

function mapDispatchToProps(dispatch: Function): { [string]: any } {
  return {
    setCookies: (allowCookies: boolean) => {
      dispatch(userActions.setUserCookiePolicy(allowCookies));
    },
  };
}

function mapStateToProps({ userSettingsState }: $Shape<GlobalState>) {
  return { allowCookies: userSettingsState.user.allowCookies };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cookies);
