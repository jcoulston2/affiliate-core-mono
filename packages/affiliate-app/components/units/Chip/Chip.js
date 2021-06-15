//@flow
import * as React from 'react';
import styled from 'styled-components';
import Chip from '@material-ui/core/Chip';
import bp from '@styles/breakPoints';
import { useThemeColor } from '@hooks';

type ChipProps = $Exact<{
  children: React.Node,
  bgColor: string,
  useShadow: boolean,
  spacing: number,
  ...
}>;

const StyledChip = styled(Chip)`
  && {
    margin: ${(props) => `5px ${props.spacing || 5}px 5px 0px`};
    border-radius: 7px;
    font-weight: 300;
    color: ${(props) => props.color || '#fff'};
    background: ${(props) => props.bgColor};
    box-shadow: ${(props) => (props.useShadow ? '0px 1px 4px 0px rgba(0, 0, 0, 0.3)' : '')};

    &:last-child {
      margin-right: 0px;
    }

    ${bp.max_md} {
      font-size: 14px;
    }

    ${bp.max_xs} {
      font-size: 12px;
    }
  }
`;

export default function CustomChip({ bgColor, children, spacing, useShadow, ...rest }: ChipProps) {
  const themedColor = useThemeColor(bgColor);
  return (
    <StyledChip bgColor={themedColor} useShadow={useShadow} spacing={spacing} {...rest}>
      {children}
    </StyledChip>
  );
}
