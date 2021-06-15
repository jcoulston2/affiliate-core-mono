//@flow
import React, { useState } from 'react';
import { FilterItem, ReadMoreContainer } from './styles';
import Typography from '@units/Typography';
import { useTheme } from '@hooks';

type StyledFilterItemProps = { expandable?: boolean, children: any };

export default function StyledFilterItem({ children, expandable }: StyledFilterItemProps) {
  const [expanded, setExpanded] = useState(false);
  const { textTheme } = useTheme();

  return (
    <>
      <FilterItem expandable={expandable} fullHeight={expanded}>
        {children}
      </FilterItem>
      {expandable && (
        <ReadMoreContainer onClick={() => setExpanded(!expanded)}>
          <Typography tag="p" color={textTheme.slightlyFadedTextColor}>
            Show {expanded ? 'less' : 'more'}
          </Typography>
        </ReadMoreContainer>
      )}
    </>
  );
}
