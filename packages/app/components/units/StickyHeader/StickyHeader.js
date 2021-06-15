//@flow
import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { StyledCmsGrid } from '@styles/CommonStyledComponents';
import { type CmsResponsiveString } from '@types/cms';
import { shadowBottom } from '@styles/commonStyles';

type StickyHeaderProps = {
  children: any,
  background: string,
  padding: CmsResponsiveString,
};

const StickHeaderWrapper = styled.div`
  width: 100%;

  ${({ sticky, height }) =>
    sticky &&
    `    
    height: ${height}px;    
    > ${StyledCmsGrid} {      
      position: fixed;
      z-index: 99;
      width: 100%;
      top: 0px;  
      left: 0px;
      ${shadowBottom}
    }  
  `}

  ${({ background }) =>
    background &&
    `
    > div {
      background ${background};
    }
    
  `}
`;

export default function StickyHeader({ children, background, padding }: StickyHeaderProps) {
  const ref = useRef(null);
  const [sticky, setSticky] = useState(false);

  const handleScroll = (): void => {
    document.addEventListener('scroll', () => {
      if (ref?.current) {
        setSticky(ref.current.getBoundingClientRect().top < 0);
      }
    });
  };

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <StickHeaderWrapper
      height={ref.current?.clientHeight}
      background={background}
      sticky={sticky}
      ref={ref}>
      <StyledCmsGrid {...(sticky ? { padding } : {})}>{children}</StyledCmsGrid>
    </StickHeaderWrapper>
  );
}
