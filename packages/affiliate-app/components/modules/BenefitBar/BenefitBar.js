//@flow
import React from 'react';
import Image from '../../units/Image';
import { CarouselItem, Carousel } from '@units/Carousel';
import Hidden from '@material-ui/core/Hidden';
import { StyledGrid, WrapperMobile, WrapperDesktop, VerticalAlign, BenefitBarCopy } from './styles';

type BenefitBarProps = {
  items: Array<{
    copy: string,
    icon: string,
  }>,
};

export default function BenefitBar({ items }: BenefitBarProps) {
  const mobileSettings = {
    totalSlides: 3,
    isPlaying: true,
    interval: 3000,
  };
  const mobileBenefitBar = (
    <WrapperMobile container direction="row">
      <Carousel {...mobileSettings}>
        {items.map(({ copy, icon }, index) => (
          <CarouselItem index={0} key={`bb${index}`}>
            <StyledGrid item xs>
              <VerticalAlign>
                <BenefitBarCopy>{copy}</BenefitBarCopy>
                <Image icon={icon} alt={`benefit-item=${index}`} />
              </VerticalAlign>
            </StyledGrid>
          </CarouselItem>
        ))}
      </Carousel>
    </WrapperMobile>
  );
  const desktopBenefitBar = (
    <WrapperDesktop container direction="row">
      {items.map(({ copy, icon }, index) => (
        <StyledGrid item xs key={`bb${index}`}>
          <VerticalAlign>
            <BenefitBarCopy>{copy}</BenefitBarCopy>
            <Image icon={icon} alt={`benefit-item=${index}`} />
          </VerticalAlign>
        </StyledGrid>
      ))}
    </WrapperDesktop>
  );

  return (
    <>
      <Hidden lgUp>{mobileBenefitBar}</Hidden>
      <Hidden mdDown>{desktopBenefitBar}</Hidden>
    </>
  );
}
