//@flow
import React from 'react';
import styled from 'styled-components';
import bp from '@styles/breakPoints';
import { StyledCmsGrid } from '@styles/CommonStyledComponents';

export const ContentItemSection = styled(({ separator, children, ...rest }) => (
  <StyledCmsGrid {...rest}>{children}</StyledCmsGrid>
))`
  ${({ separator }) => {
    return separator
      ? `border-right ${separator.desktop.visible ? '1px' : '0px'} solid ${
          separator?.desktop.color
        }`
      : 'none';
  }}}

  ${bp.max_sm} {
    ${({ separator }) => {
      return separator
        ? `border-right ${separator.tablet.visible ? '1px' : '0px'} solid ${
            separator?.tablet.color
          }`
        : 'none';
    }}}

  }
  
  ${bp.max_xs} {
    ${({ separator }) => {
      return separator
        ? `border-right ${separator.mobile.visible ? '1px' : '0px'} solid ${
            separator?.mobile.color
          }`
        : 'none';
    }}}
  }
  

  &:last-child {
    border: none;
  }
`;
