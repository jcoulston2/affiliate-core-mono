import styled, { createGlobalStyle, keyframes } from 'styled-components';
import TinderCard from 'react-tinder-card';
import bp from '@styles/breakPoints';

export const flickAnimation = keyframes`
  0% { opacity: 0; top: 0px; width: 0%; }
  50% { opacity: 1 }
  100% { opacity: 0; top: -100px; width: 100%; }
 `;

export const FlickAnimationsProvider = createGlobalStyle`
  .pulse {
    animation-name: ${flickAnimation};
    animation-duration: 0.5s;    
  }

  .icon-show {
    && {
      display: block;
    }
  }
`;

export const FlickCard = styled(TinderCard)`
  && {
    display: none;
  }
`;

export const FlickCardInner = styled.div`
  > .MuiGrid-root {
    width: 100%;
    max-width: 100%;
  }
`;

export const CardContainer = styled.div`
  width: 100%;
  margin: 20px auto 15px auto;
  max-width: 430px;
  min-height: 560px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  > ${FlickCard} {
    position: absolute;
    top: 0px;
    z-index: 2;

    &[style='display: block;'] {
      z-index: 1;
    }
  }

  ${bp.max_xs} {
    width: 80%;
    min-height: 130vw;
  }
`;

export const AnimationContainer = styled.div`
  opacity: 1;
  top: 0px;
  position: relative;
  z-index: 9;
  height: 200px;
  align-items: center;
  justify-content: center;
  display: none;

  &.pulse {
    display: flex;
  }

  > svg {
    display: none;
    width: 100%;
    height: 100%;
  }
`;
