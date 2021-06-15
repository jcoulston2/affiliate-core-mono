//@flow
import React from 'react';
import { connect } from 'react-redux';
import CmsContentSplit from '@units/CmsContentSplit';
import { useCms } from '@hooks';
import usePwa from '@containers/Pwa/hook';
import { type GlobalState } from '../../types/appState';
import config from '@config';
import Typography from '@units/Typography';
import { useThemeColor } from '@hooks';
import styled from 'styled-components';
import Button from '@units/Button';
import bp from '@styles/breakPoints';

const CopyrightContainer = styled.div`
  width: 100%;
  background: ${(props) => props.background};
`;

const DonwloadAppContainer = styled.div`
  width: 100%;
  background: ${(props) => props.background};
  text-align: center;
  padding: 25px 0px 0px 0px;

  ${bp.min_sm} {
    text-align: center;
    padding: 45px 0px 10px 0px;
  }
`;

const Footer = () => {
  const { isPwaInitiated, initPwaPrompt } = usePwa();
  const footerCms = useCms('footer');
  const { pwa: pwaCms } = useCms('other');
  const year = new Date().getFullYear();
  const copyRightText = `© ${config.brandName} ${year}. All rights reserved.`;
  const { slate } = useThemeColor('all');

  return (
    <div>
      {footerCms && (
        <>
          <CmsContentSplit {...footerCms} />
          {isPwaInitiated && (
            <DonwloadAppContainer background={slate}>
              <Button textTransform="initial" primary onClick={initPwaPrompt}>
                {pwaCms.pwaDownloadableBannerText}
              </Button>
            </DonwloadAppContainer>
          )}

          <CopyrightContainer background={slate}>
            <Typography
              tag="p"
              padding={'30px'}
              textAlign="center"
              fullwidth
              color="#fff"
              size={12}>
              {copyRightText}
            </Typography>
          </CopyrightContainer>
        </>
      )}
    </div>
  );
};

export default connect(({ globalAppState }: $Shape<GlobalState>) => {
  const { clientWidth } = globalAppState;
  return {
    clientWidth,
  };
})(Footer);
