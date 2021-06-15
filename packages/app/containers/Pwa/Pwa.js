//@flow
import React from 'react';
import { connect } from 'react-redux';
import { type GlobalState } from '../../types/appState';

type PwaProps = {
  isPwaInitiated: boolean,
  Component: any,
};

const Pwa = ({ isPwaInitiated, Component }: PwaProps) => {
  return <Component.type {...Component.props} isPwaInitiated={isPwaInitiated} />;
};

export default connect((state: $Shape<GlobalState>) => {
  return {
    isPwaInitiated: state.pwaState.isPwaInitiated,
  };
})(Pwa);
