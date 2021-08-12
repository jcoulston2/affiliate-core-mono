//@flow
/*eslint no-unused-vars:*/
import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { useTheme } from '@hooks';
import Typography from '@units/Typography';
import Copy from '@units/Copy';
import { type CmsButton } from '@types/cms';

const StyledButton = styled(
  ({
    color,
    maxWidth,
    bgColor,
    padding,
    borderRadius,
    textTransform,
    disableHover,
    style,
    children,
    ...rest
  }) => <Button {...rest}>{children}</Button>
)`
  && {
    max-width: ${({ maxWidth }) => (maxWidth ? `${maxWidth}` : 'auto')};
    background-color: ${(props) => props.bgColor};
    padding: ${({ padding }) => (Number.isInteger(padding) ? `${padding}px` : padding)};
    border-radius: ${(props) => (props.square ? '0px' : `${props.borderRadius || 20}px`)};
    text-transform: ${(props) => props.textTransform};
    color: ${(props) => props.color};
    font-weight: ${(props) => props.defaultFontWeight};
    &:hover {
      background-color: ${(props) => (!props.disableHover ? '#cecece' : 'initial')};
    }

    p > span {
      white-space: nowrap;
    }
  }
`;

export default function BrandButton({
  color: propColor,
  bgColor: propBgColor,
  primary,
  secondary,
  padding,
  maxWidth,
  textTransform,
  copy,
  text,
  noPad,
  children,
  cmsEventMappings,
  reference,
  disableHover,
  square,
  ...rest
}: CmsButton) {
  const { buttonTheme } = useTheme();
  const calculatedPadding = noPad ? 0 : padding || buttonTheme.defaultPadding;
  const eventMap = (reference && cmsEventMappings && cmsEventMappings[reference]) || {};

  let color, bgColor;

  if (primary) {
    bgColor = buttonTheme.primaryColor;
    color = buttonTheme.primaryTextColor;
  } else if (secondary) {
    bgColor = buttonTheme.secondaryColor;
    color = buttonTheme.secondaryTextColor;
  } else {
    color = propColor;
    bgColor = propBgColor;
  }

  return (
    <StyledButton
      color={color}
      bgColor={bgColor}
      maxWidth={maxWidth}
      borderRadius={buttonTheme.borderRadius}
      padding={calculatedPadding}
      textTransform={textTransform}
      defaultFontWeight={buttonTheme.defaultFontWeight}
      disableHover={disableHover}
      square={square}
      // $FlowFixMe
      {...rest}
      {...eventMap}>
      {(copy && (
        <Typography tag="p" typeStyles={copy}>
          {text && <Copy text={text} />}
        </Typography>
      )) ||
        children}
    </StyledButton>
  );
}
