//@flow
import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  ${(props) => {
    const { headerSeparatorStyle, headerSeparatorColor } = props;
    if (headerSeparatorStyle === 'shadow') {
      return `box-shadow: 1px 1px 12px -2px ${headerSeparatorColor};`;
    } else if (headerSeparatorStyle === 'border') {
      return `border-bottom: 1px solid ${headerSeparatorColor};`;
    }
  }}
`;
