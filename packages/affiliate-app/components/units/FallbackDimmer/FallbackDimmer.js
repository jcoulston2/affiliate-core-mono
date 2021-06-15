//@flow
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import { delayedCallback } from '@helpers/common';

type FallbackDimmerProps = {
  children: any,
  isDimming: boolean,
};

const fadeBounce = keyframes`
  to { opacity: 0; }
`;

const DimmerWrapper = styled.div`
  position: relative;
`;

const Dimmer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 5%;
  display: flex;
  z-index: -1;
`;

const FallbackAnimation = styled.div`
  background: black;
  border-radius: 20px;
  min-height: 500px;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  animation: ${fadeBounce} 2s cubic-bezier(0.5, 0, 1, 1) infinite alternate;
`;

export default function FallbackDimmer({ children, isDimming = true }: FallbackDimmerProps) {
  const [dimming, setDimming] = useState(true);

  useEffect(() => {
    delayedCallback(() => setDimming(false), 6000);
  }, [isDimming]);

  return (
    <DimmerWrapper>
      {dimming && (
        <Dimmer>
          <FallbackAnimation />
        </Dimmer>
      )}
      {children}
    </DimmerWrapper>
  );
}
