//@flow
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import bp from '@styles/breakPoints';
import { useTheme, useDeviceBreakpoint } from '@hooks';
import Collapse from '@material-ui/core/Collapse';
import { CenterAll } from '@styles/CommonStyledComponents';
import { type CmsCard } from '@types/cms';

const StyledCard = styled.section`
  position: relative;
  overflow: ${(props) => props.overflow};
  box-shadow: ${(props) => props.cardTheme.shadow};
  border-radius: ${(props) => props.cardTheme.borderRadius}px;
  width: ${(props) => (props.fullWidth ? '100%' : 'auto')};
  bottom: ${(props) => `${props.cardOffset?.desktop || 0}px`};
  padding: ${(props) => props.padding?.desktop || props.padding || props.cardTheme.defaultPadding};
  margin: ${(props) => props.margin?.desktop || props.margin || '0px'};
  background: ${(props) => props.cardTheme.background};
  transition: transform 0.2s ease-in-out;

  ${bp.max_sm} {
    padding: ${(props) => props.padding?.tablet || props.padding || props.cardTheme.defaultPadding};
    bottom: ${(props) => `${props.cardOffset?.tablet || 0}px`};
    margin: ${(props) => props.margin?.tablet || props.margin || '0px'};
  }

  ${bp.max_xs} {
    padding: ${(props) => props.padding?.mobile || props.padding || props.cardTheme.defaultPadding};
    bottom: ${(props) => `${props.cardOffset?.mobile || 0}px`};
    margin: ${(props) => props.margin?.mobile || props.margin || '0px'};
  }

  &:hover {
    ${(props) => (props.hoverEffect === 'grow' ? 'transform: scale(1.1);' : '')}
    ${(props) => (props.hoverEffect === 'tilt' ? 'transform: rotate(6deg);' : '')}
    ${(props) => (props.hoverEffect === 'raise' ? 'translateY(-20px)' : '')}
    ${(props) => (props.hoverEffect ? 'cursor: pointer;' : '')}
  }
`;

const ShowMoreCopy = styled.div`
  position: relative;
  top: ${(props) => (props.offsetTop ? `${props.offsetTop}px` : 'auto')};

  p {
    font-size: 14px;
    color: ${(props) => props.color};
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }
`;

export default function Card({
  children,
  padding,
  margin,
  cardOffset,
  fullWidth,
  expand,
  hoverEffect,
  overflow,
}: CmsCard) {
  const { cardTheme, textTheme } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [cardCollapsedHeight, setCardCollapsedHeight] = useState(false);
  const deviceBreakpoint = useDeviceBreakpoint();
  const ref = useRef();
  const collapsedHeight = expand && expand[deviceBreakpoint]?.collapsedHeight;
  const readMoreCopyOffsetTop = expand && expand[deviceBreakpoint]?.readMoreCopyOffsetTop;

  const renderInnerCard = collapsedHeight ? (
    <Collapse in={expanded} collapsedHeight={collapsedHeight}>
      <div ref={ref}>{children}</div>
    </Collapse>
  ) : (
    <>{children}</>
  );

  const refHeight = ref.current?.clientHeight || 0;
  const revealShowMoreText = !!collapsedHeight && refHeight > collapsedHeight;

  // Required for the "show more" copy to appear on the second render.
  useEffect(() => {
    if (collapsedHeight) {
      setCardCollapsedHeight(collapsedHeight);
    }
  }, []);

  return (
    <StyledCard
      padding={padding}
      margin={margin}
      cardOffset={cardOffset}
      fullWidth={fullWidth}
      cardTheme={cardTheme}
      hoverEffect={hoverEffect}
      overflow={collapsedHeight ? 'hidden' : overflow}>
      {renderInnerCard}
      {cardCollapsedHeight && (
        <ShowMoreCopy
          offsetTop={readMoreCopyOffsetTop}
          color={textTheme.slightlyFadedTextColor}
          onClick={() => setExpanded(!expanded)}>
          {revealShowMoreText && (
            <CenterAll>
              <p>Show {expanded ? 'less' : 'more'}</p>
            </CenterAll>
          )}
        </ShowMoreCopy>
      )}
    </StyledCard>
  );
}
