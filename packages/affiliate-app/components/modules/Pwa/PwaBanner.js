//@flow
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Image from '@units/Image';
import styled from 'styled-components';
import Typography from '@units/Typography';
import Copy from '@units/Copy';
import { useCms } from '@hooks';
import { isInPwa } from '@helpers/common';
import bp from '@styles/breakPoints';
import { Actionable } from '@styles/CommonStyledComponents';
import ClearIcon from '@material-ui/icons/Clear';
import usePwa from '@containers/Pwa/hook';

const PwaBannerWrapper = styled(Grid)`
  padding: 20px;
  background: ${(props) => props.background || '#fff'};

  ${bp.min_sm} {
    padding: 40px;
  }

  img {
    width: 97px;

    ${bp.min_sm} {
      width: 200px;
    }

    ${bp.min_lg} {
      width: 300px;
    }
  }

  position: relative;
`;

const PwaCloseBanner = styled(ClearIcon)`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;

  ${bp.max_sm} {
    top: 5px;
    right: 5px;
  }

  &:hover {
    opacity: 0.6;
  }
`;

export default function PwaBanner() {
  if (isInPwa()) return null;
  const { isPwaInitiated, initPwaPrompt, setIsPwaInitiated } = usePwa();
  const { pwa: pwaCms } = useCms('other');

  const bannerCloseClick = (): void => {
    setIsPwaInitiated(false);
  };

  return (
    <>
      {isPwaInitiated && (
        <PwaBannerWrapper
          data-ref="pwa-banner"
          container
          justify="center"
          alignItems="center"
          background={pwaCms.pwaDownloadableBannerBgColor}>
          <PwaCloseBanner fontSize="medium" onClick={bannerCloseClick} style={{ color: '#fff' }} />
          <Grid item justify="center" alignItems="center">
            <Image src={pwaCms.pwaDownloadableBannerImage} alt="Download our web app" />
          </Grid>
          <Grid item justify="center" alignItems="center" onClick={() => initPwaPrompt()}>
            <Actionable aria-label="dowbload our app">
              <Typography tag="h6" typeStyles={pwaCms.pwaDownloadableBannerCopy}>
                <Copy text={pwaCms.pwaDownloadableBannerText} />
              </Typography>
            </Actionable>
          </Grid>
        </PwaBannerWrapper>
      )}
    </>
  );
}
