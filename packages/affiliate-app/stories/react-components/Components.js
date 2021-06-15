import React from 'react';
import { CarouselItem, Carousel } from '@units/Carousel';
import styled from 'styled-components';
import SiteThemeProvider from '@styles/SiteThemeProvider';

/**
 * This is the components page - this page will display all the shared components
 * TODO: Might be worth putting this into storybook eventually
 */

const ComponentContainer = styled.div`
  padding: 20px 10px;
  background: #e8ebff;
  margin: 20px 0px;
`;

const ComponentItem = styled.div`
  background: #cfd5fb;
  position: relative;
  padding: 41px;
`;

const ComponentContainerTitle = styled.h3`
  margin: 10px 10px 20px 10px;
`;

const ComponentCode = styled.pre`
  color: black;
  page-break-inside: avoid;
  font-family: monospace;
  font-size: 15px;
  line-height: 1.6;
  overflow: auto;
  display: inline-block;
  word-wrap: break-word;
  margin: 0px;
  width: auto;
  vertical-align: top;
`;
/**
 * Carousel Component
 * ================================================================================================
 * ================================================================================================
 * ================================================================================================
 * ================================================================================================
 * ================================================================================================
 * @Props https://www.npmjs.com/package/pure-react-carousel
 */

const renderCarousel = () => {
  const settings = {
    totalSlides: 3,
    navButtons: true,
    isPlaying: true,
    dots: true,
  };

  const InnerSlide = styled.div`
    background: black;
    padding: 20px;
    color: #fff;
    margin: 0px 10px;
  `;

  return (
    <>
      <ComponentItem style={{ height: 80 }}>
        <Carousel {...settings}>
          <CarouselItem index={0}>
            <InnerSlide>Slide 1</InnerSlide>
          </CarouselItem>
          <CarouselItem index={1}>
            <InnerSlide>Slide 2</InnerSlide>
          </CarouselItem>
          <CarouselItem index={2}>
            <InnerSlide>Slide 3</InnerSlide>
          </CarouselItem>
        </Carousel>
      </ComponentItem>

      <ComponentCode>
        <code>
          {`
              const settings = {
                totalSlides: 3,
                navButtons: true,
                isPlaying: true,
              };
            `}
        </code>
      </ComponentCode>
      <ComponentCode>
        {`
          <ComponentItem style={{ height: 80 }}>
            <Carousel {...settings}>
              <CarouselItem index={0}>
                <InnerSlide>Slide 1</InnerSlide>
              </CarouselItem>
              <CarouselItem index={1}>
                <InnerSlide>Slide 2</InnerSlide>
              </CarouselItem>
              <CarouselItem index={2}>
                <InnerSlide>Slide 3</InnerSlide>
              </CarouselItem>
            </Carousel>
          </ComponentItem>
          `}
      </ComponentCode>
    </>
  );
};

/**
 * END
 * ================================================================================================
 * ================================================================================================
 * ================================================================================================
 * ================================================================================================
 * ================================================================================================
 */

const Components = () => {
  return (
    <>
      <SiteThemeProvider />
      <ComponentContainer>
        <ComponentContainerTitle>Carousel Component (Basic)</ComponentContainerTitle>
        {renderCarousel()}
      </ComponentContainer>
    </>
  );
};

export default Components;
