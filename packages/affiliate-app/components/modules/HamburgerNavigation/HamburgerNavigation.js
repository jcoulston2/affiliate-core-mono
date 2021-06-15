//@flow
import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { Actionable } from '@styles/CommonStyledComponents';

type HamburgerNavigationProps = {
  onClick: Function,
};

export default function HamburgerNavigation({ onClick: clickHandler }: HamburgerNavigationProps) {
  return (
    <Actionable aria-label="mobile menu">
      <MenuIcon fontSize="large" onClick={clickHandler} />
    </Actionable>
  );
}
