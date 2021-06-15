//@flow
import React from 'react';
import styled from 'styled-components';
import bp from '@styles/breakPoints';
import { Actionable } from '@styles/CommonStyledComponents';
import Image from '@units/Image';
import { HOME_PATH } from '@constants';
import config from '@config';

const LogoWrapper = styled.div`
  img {
    margin: 7px 0px;
    height: 28px;
    width: auto;
    ${bp.min_sm} {
      height: 35px;
      margin: 9px 30px;
    }
  }
`;

export default function Logo() {
  const handleLogoClick = (): void => {
    // TODO: when using next/router sometimes there is a an 'unknown error' when clicking the logo triggering the home
    // redirect in production. Until we find out what this error is, we'll have to use window location for now!
    window.location.href = HOME_PATH;
  };

  return (
    <Actionable aria-label="Fliik">
      <LogoWrapper onClick={handleLogoClick}>
        <Image src="logo.svg" alt={config?.brandName} />
      </LogoWrapper>
    </Actionable>
  );
}
