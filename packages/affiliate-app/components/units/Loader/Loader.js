//@flow
import React from 'react';
import styled from 'styled-components';
import Backdrop from '@material-ui/core/Backdrop';
import Grid from '@material-ui/core/Grid';
import RingLoader from 'react-spinners/RingLoader';
import { useThemeColor } from '@hooks';

const LodaerBackdrop = styled(Backdrop)`
  && {
    z-index: 9999;
  }
`;

const StandardLoaderWrapper = styled(Grid)`
  padding: 30px 0px;
`;

type LoaderProps = {
  active: boolean,
  size: number,
  useBackdrop?: boolean,
};

export default function Loader({ active, useBackdrop, size = 60 }: LoaderProps) {
  const loaderColor = useThemeColor('primary');
  return useBackdrop ? (
    <LodaerBackdrop open={active}>
      <RingLoader color={loaderColor} loading={active} size={size} />
    </LodaerBackdrop>
  ) : (
    <>
      {active && (
        <StandardLoaderWrapper container justify="center" alignItems="center">
          <RingLoader color={loaderColor} loading={active} size={size} />
        </StandardLoaderWrapper>
      )}
    </>
  );
}
