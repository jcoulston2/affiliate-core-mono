//@flow
import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import Typography from '@units/Typography';
import Copy from '@units/Copy';
import Button from '@units/Button';
import { type CmsCopy } from '@types/cms';
import { useTheme } from '@hooks';
import bp from '@styles/breakPoints';
import { Spacer } from '@styles/CommonStyledComponents';
import { isServer } from '@helpers/common';

const CookieWrapper = styled.div`
  position: fixed;
  z-index: 1;
  bottom: 0px;
  width: 100%;
  background: ${(props) => props.background};
  padding: 20px;

  ${bp.min_lg} {
    padding: 30px;
  }
`;

const CookieButton = styled.div`
  display: flex;
  justify-content: center;
  padding: 0px 40px;
`;

type CookieBannerProps = {
  cookieBannerCopy: CmsCopy,
  cookieBannerText: string,
  allowCookies: boolean,
  setCookies: Function,
};

export default function CookieBanner({
  cookieBannerCopy,
  cookieBannerText,
  allowCookies,
  setCookies,
}: CookieBannerProps) {
  const [showBanner, setShowBanner] = useState(false);
  const { brandThemeColors } = useTheme();
  const cookiesNotYetAccepted = !allowCookies;

  useEffect(() => {
    // Avoid rendering the cookie banner at build time
    if (!isServer()) {
      setShowBanner(cookiesNotYetAccepted);
    }
  }, [cookiesNotYetAccepted]);

  return (
    showBanner && (
      <CookieWrapper background={brandThemeColors.slate}>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={12} lg="auto">
            <Typography tag="p" typeStyles={cookieBannerCopy} fullwidth>
              <Copy text={cookieBannerText} />
            </Typography>
            <Spacer h={[{ value: 10, breakPoint: 'max_md' }]} />
          </Grid>
          <Grid item xs={12} lg="auto">
            <CookieButton>
              <Button
                textTransform={'capitalize'}
                primary
                padding={'0.5em 4em'}
                onClick={() => setCookies(true)}>
                Accept
              </Button>
            </CookieButton>
          </Grid>
        </Grid>
      </CookieWrapper>
    )
  );
}
