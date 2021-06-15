//@flow
import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Image from '@units/Image';

const PwaInstructionsWrapper = styled(Grid)`
  position: relative;

  h2 {
    margin-bottom: 30px;
    font-weight: 400;
    font-size: 30px;
  }

  h4 {
    margin-top: 30px;
    font-weight: 400;
    font-size: 25px;
  }
`;

const Pointer = styled.div`
  width: 20px;
  height: 20px;
  background: #fff;
  position: absolute;
`;

export default function PwaInstructions() {
  return (
    <PwaInstructionsWrapper container>
      <Grid item xs={12}>
        <h2>Getting our web app is easy&#46;&#46;&#46;</h2>
      </Grid>
      <Grid item xs={12}>
        <Image src={'pwa-instructions.png'} />
      </Grid>
      <Grid item xs={12}>
        <h4>You&apos;re done&#33;</h4>
      </Grid>
      <Pointer />
    </PwaInstructionsWrapper>
  );
}
