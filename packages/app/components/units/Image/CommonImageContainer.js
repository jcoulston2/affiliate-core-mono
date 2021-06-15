//@flow
import React from 'react';
import Tooltip from '@units/Tooltip';

type CommonImageContainerProps = {
  tooltip?: string,
  children: any,
};

// NOTE: currently only used for tooltips, but this container can be reserved for other "wrapped" img logic
// as we don't want to pollute the main Image component. We may even want to bring this into it's own unit
// in the future if there are components that take advantage a common wrapper for things like tooltips etc
export default function CommonImageContainer({ tooltip, children }: CommonImageContainerProps) {
  return tooltip ? <Tooltip content={tooltip}>{children}</Tooltip> : <>{children}</>;
}
