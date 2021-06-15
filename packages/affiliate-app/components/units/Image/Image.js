//@flow
import React from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { type CmsImg } from '@types/cms';
import bp from '@styles/breakPoints';
import * as icons from '@images/icons';
import CommonImageContainer from './CommonImageContainer';
import { getImg } from '@helpers/common';

const StyledImage = styled.img`
  display: block;
  max-width: ${(props) => props.maxWidth};
  max-height: ${(props) => props.maxHeight};
  min-width: ${(props) => props.minWidth};
  min-height: ${(props) => props.minHeight};
`;

const StyledImageContainer = styled(Grid)`
  height: 100%;
  padding: ${(props) => props.padding};

  ${(props) =>
    props.advancedCss &&
    `
    && {
      ${bp.max_xs} {
        ${props.advancedCss.mobile}
      }

      ${bp.max_md} {
        ${props.advancedCss.tablet}
      }  
      
      ${bp.min_lg} {
        ${props.advancedCss.desktop}
      }      
    }
  `}
`;

const IconWrapper = styled.div`
  && {
    display: flex;
    padding: ${(props) => props.padding};
    svg,
    *:not([fill='white']) {
      ${(props) => (props.iconColor ? `fill: ${props.iconColor}` : '')}
    }
  }
`;

export default function Image({
  src,
  alt,
  className,
  padding,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
  icon,
  iconSize,
  iconColor,
  advancedCss,
  tooltip,
}: CmsImg) {
  if (icon) {
    const Icon = icons[icon];
    return (
      Icon && (
        <CommonImageContainer tooltip={tooltip}>
          <IconWrapper iconColor={iconColor} padding={padding}>
            <Icon fontSize={iconSize} alt={alt} />
          </IconWrapper>
        </CommonImageContainer>
      )
    );
  } else if (src) {
    const imageSrc = getImg(src);
    return (
      <CommonImageContainer tooltip={tooltip}>
        <StyledImageContainer
          container
          padding={padding}
          justify="center"
          alignItems="center"
          advancedCss={advancedCss}>
          {imageSrc && (
            <StyledImage
              src={imageSrc}
              alt={alt}
              {...{
                className,
                maxWidth,
                maxHeight,
                minWidth,
                minHeight,
              }}
            />
          )}
        </StyledImageContainer>
      </CommonImageContainer>
    );
  }
}
