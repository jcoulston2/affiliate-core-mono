//@flow
import React from 'react';
import styled from 'styled-components';
import bp from '@styles/breakPoints';
import Grid from '@material-ui/core/Grid';
import { type CmsCommonGridContainer } from '@types/cms';
import ButtonBase from '@material-ui/core/ButtonBase';
import { getImg } from '@helpers/common';

export const StyledCmsGrid = styled(
  ({
    padding,
    margin,
    bgColor,
    maxWidth,
    backgroundImage,
    children,
    ...rest
  }: CmsCommonGridContainer) => <Grid {...rest}>{children}</Grid>
)`
  && {
    box-shadow: ${(props) => props.borderShadow || 'auto'};
    max-width: ${(props) => `${props.maxWidth}` || 'auto'};
    max-height: ${(props) => `${props.maxHeight}` || 'auto'};
    background: ${(props) => props.bgColor};
    overflow: ${(props) => `${props.overflow}` || 'auto'};
    padding: ${(props) => props.padding?.desktop || '0px'};
    margin: ${(props) => props.margin?.desktop || 'auto'};
    height: ${(props) => props.height?.desktop || 'auto'};
    background-image: ${(props) =>
      props.backgroundImage ? `url(${getImg(props.backgroundImage)})` : 'initial'};
    background-position: 0px 10px;
    background-repeat: no-repeat;

    ${bp.max_sm} {
      padding: ${(props) => props.padding?.tablet || '0px'};
      margin: ${(props) => props.margin?.tablet || '0px'};
      height: ${(props) => props.height?.tablet || 'auto'};
    }

    ${bp.max_xs} {
      padding: ${(props) => props.padding?.mobile || '0px'};
      margin: ${(props) => props.margin?.mobile || '0px'};
      height: ${(props) => props.height?.mobile || 'auto'};
    }
  }
`;

export const CmsSection = styled.section`
  && {
    padding: ${(props) => props.padding?.desktop || '0px'};
    margin: ${(props) => props.margin?.desktop || 'auto'};

    ${bp.max_sm} {
      padding: ${(props) => props.padding?.tablet || '0px'};
      margin: ${(props) => props.margin?.tablet || '0px'};
    }

    ${bp.max_xs} {
      padding: ${(props) => props.padding?.mobile || '0px'};
      margin: ${(props) => props.margin?.mobile || '0px'};
    }
  }
`;

export const Actionable = styled(ButtonBase)`
  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }
`;

export const Flex = styled.div`
  display: flex;
`;

export const FullWidth = styled.div`
  && {
    > * {
      width: 100%;
    }
  }
`;

export const FullHeightGrid = styled(Grid)`
  height: ${(props) => props.height || '100vh'};
  padding: ${(props) => props.padding || 'initial'};
`;

export const Highlight = styled.span`
  font-weight: ${(props) => props.weight || 700};
`;

export const Faded = styled.span`
  opacity: ${(props) => props.opacity || 0.5};
`;

export const CenterAll = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CenterVertical = styled.div`
  display: flex;
  align-items: center;
`;

export const Spacer: string = styled.div`
  ${(props: { h: Array<{ value: number, breakPoint: string }> | number }) => {
    if (props.h) {
      if (Array.isArray(props.h)) {
        const breakpoints = props.h.map(
          ({ breakPoint, value }) => `${bp[breakPoint]} {padding: ${value}px;}`
        );

        return breakpoints.join(' ');
      } else {
        return `padding: ${props.h || 0}px;`;
      }
    }
  }}

  width: 80%;
`;
