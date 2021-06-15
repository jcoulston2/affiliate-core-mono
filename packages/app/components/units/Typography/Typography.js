//@flow
import * as React from 'react';
import styled from 'styled-components';
import bp from '@styles/breakPoints';
import { type CmsCopy } from '@types/cms';
import { useTheme } from '@hooks';
import isEmpty from 'lodash/isEmpty';
import CustomLink from '@units/CustomLink';

type TypographyProps = $Exact<{
  typeStyles: CmsCopy,
  tag: string,
  text: string,
  advancedCss: string,
  children: React.Node,
  size?: number,
  weight?: number,
  color?: string,
  margin?: string,
  padding?: string,
  textAlign?: 'left' | 'right' | 'center',
  decoration?: string,
  fullwidth?: boolean,
  useDecorator?: boolean,
}>;

const InnerCopy = styled.span`
  display: inline-block;
  position: relative;
  width: 100%;

  ${(props) => (props?.desktop?.size ? `font-size: ${props.desktop.size}px;` : '')}
  ${(props) => (props?.desktop?.weight ? `font-weight: ${props.desktop.weight};` : '')}
  ${(props) => (props?.desktop?.color ? `color: ${props.desktop.color};` : '')}
  ${(props) => (props?.desktop?.margin ? `margin: ${props.desktop.margin};` : '')}
  ${(props) => (props?.desktop?.padding ? `padding: ${props.desktop.padding};` : '')}
  ${(props) => (props?.desktop?.textAlign ? `text-align: ${props.desktop.textAlign};` : '')}
  ${(props) => (props?.desktop?.decoration ? `text-decoration: ${props.desktop.decoration};` : '')}
  ${(props) => (props?.desktop?.lineHeight ? `line-height: ${props.desktop.lineHeight};` : '')}
  
  ${bp.max_sm} {
    ${(props) => (props?.tablet?.size ? `font-size: ${props.tablet.size}px;` : '')}
    ${(props) => (props?.tablet?.weight ? `font-weight: ${props.tablet.weight};` : '')}
    ${(props) => (props?.tablet?.color ? `color: ${props.tablet.color};` : '')}
    ${(props) => (props?.tablet?.margin ? `margin: ${props.tablet.margin};` : '')}
    ${(props) => (props?.tablet?.padding ? `padding: ${props.tablet.padding};` : '')}
    ${(props) => (props?.tablet?.textAlign ? `text-align: ${props.tablet.textAlign};` : '')}
    ${(props) => (props?.tablet?.decoration ? `text-decoration: ${props.tablet.decoration};` : '')}
    ${(props) => (props?.tablet?.lineHeight ? `line-height: ${props.tablet.lineHeight};` : '')}
  }

  ${bp.max_xs} {
    ${(props) => (props?.mobile?.size ? `font-size: ${props.mobile.size}px;` : '')}
    ${(props) => (props?.mobile?.weight ? `font-weight: ${props.mobile.weight};` : '')}
    ${(props) => (props?.mobile?.color ? `color: ${props.mobile.color};` : '')}
    ${(props) => (props?.mobile?.margin ? `margin: ${props.mobile.margin};` : '')}
    ${(props) => (props?.mobile?.padding ? `padding: ${props.mobile.padding};` : '')}
    ${(props) => (props?.mobile?.textAlign ? `text-align: ${props.mobile.textAlign};` : '')}
    ${(props) => (props?.mobile?.decoration ? `text-decoration: ${props.mobile.decoration};` : '')}
    ${(props) => (props?.mobile?.lineHeight ? `line-height: ${props.mobile.lineHeight};` : '')}
  }

  ${(props) => props.advancedCss || ''}
  ${(props) => (props.useDecorator ? `&:after {${props.textDecorator}}` : '')}
`;

export default function Typography({
  typeStyles = {},
  tag = 'p',
  fullwidth,
  children,
  ...genericStyles
}: TypographyProps) {
  const { href, tag: typeStylesTag, text: _, advancedCss, ...responsiveTypeStyles } = typeStyles;
  const Tag = typeStylesTag || tag;
  const { textTheme } = useTheme();
  const textDecorator = textTheme.textDecoratorStyleCss;

  const getTypeColor = (color) => {
    if (color === 'primary') {
      return textTheme.primaryColor;
    } else if (color === 'secondary') {
      return textTheme.secondaryColor;
    } else if (color === 'tertiary') {
      return textTheme.tertiaryColor;
    } else if (color === 'faded') {
      return textTheme.slightlyFadedTextColor;
    } else {
      return color;
    }
  };

  const targetStyles = isEmpty(responsiveTypeStyles)
    ? { desktop: genericStyles }
    : responsiveTypeStyles;

  // We run a check on the colors to map to theme for values such as 'primary'
  const mappedResponsiveAttributes = Object.keys(targetStyles).reduce(
    (acc: Object, cur: Object) => {
      const color = targetStyles[cur]?.color;

      return {
        ...acc,
        [cur]: {
          ...targetStyles[cur],
          color: color ? getTypeColor(color) : '',
        },
      };
    },
    {}
  );

  const TypedContent = (
    <Tag style={fullwidth ? { width: '100%' } : {}}>
      <InnerCopy
        {...mappedResponsiveAttributes}
        {...{
          advancedCss,
          textDecorator,
        }}>
        {children}
      </InnerCopy>
    </Tag>
  );

  return href ? (
    <CustomLink href={href} useNativeLink={typeStyles?.useNativeLink || false}>
      {TypedContent}
    </CustomLink>
  ) : (
    TypedContent
  );
}
