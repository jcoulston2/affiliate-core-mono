//@flow
//@flow
import React from 'react';
import Typography from '@units/Typography';
import { Spacer } from '@styles/CommonStyledComponents';
import { NoMoreProductsFlicker } from './styles';
import Image from '@units/Image';
import { useTheme } from '@hooks';

type NoMoreProductsIndicatorProps = {
  text: string,
};

export default function NoMoreProductsIndicator({ text }: NoMoreProductsIndicatorProps) {
  const { textTheme } = useTheme();
  return (
    <NoMoreProductsFlicker>
      <Spacer h={20} />
      {!!text && (
        <Typography
          tag="p"
          size={18}
          fullwidth
          textAlign="center"
          padding={'3em 2em'}
          color={textTheme.slightlyFadedTextColor}>
          {text}
        </Typography>
      )}
      <Image src="no-more-product-flicker-cards.svg" maxWidth={'400px'} />
    </NoMoreProductsFlicker>
  );
}
