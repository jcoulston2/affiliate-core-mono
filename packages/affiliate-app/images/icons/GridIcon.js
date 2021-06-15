import SvgIcon from '@material-ui/core/SvgIcon';
import React from 'react';

export default function GridIcon(props) {
  return (
    <SvgIcon viewBox="0 0 34 34" {...props}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 34 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect x="0.000488281" y="0.000488281" width="16" height="16" rx="3" fill="black" />
        <rect x="18" width="16" height="16" rx="3" fill="black" />
        <rect y="18" width="16" height="16" rx="3" fill="black" />
        <rect x="18" y="18" width="16" height="16" rx="3" fill="black" />
      </svg>
    </SvgIcon>
  );
}
