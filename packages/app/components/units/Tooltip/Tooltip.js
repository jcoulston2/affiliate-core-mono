//@flow
import React from 'react';
import MuiTooltip from '@material-ui/core/Tooltip';
import { createGlobalStyle } from 'styled-components';
import Typography from '@units/Typography';
import Grid from '@material-ui/core/Grid';
import Copy from '@units/Copy';

export const ToolTipStyle = createGlobalStyle`
  .MuiTooltip-tooltip {
    && {
      padding: 20px;
      background: #fff;
      font-size: 20px;
      border-radius: 15px;
      box-shadow: -1px 1px 19px -7px #707070;
    }
  }
`;

type TooltipProps = {
  children: any,
  content: {
    title?: string,
    copy?: string,
  },
};

export default function Tooltip({ children, content }: TooltipProps) {
  const { title, copy } = content;
  const renderTooltipContent = (
    <Grid container>
      {title && (
        <Grid item xs={12}>
          <Typography tag="h2" weight={400} padding={'0 0 1em 0'} size={23}>
            <Copy text={title} />
          </Typography>
        </Grid>
      )}

      {copy && (
        <Grid item xs={12}>
          <Typography tag="p" size={16}>
            <Copy text={copy} />
          </Typography>
        </Grid>
      )}
    </Grid>
  );

  return (
    <>
      <ToolTipStyle />
      <MuiTooltip
        placement="top"
        title={renderTooltipContent}
        enterTouchDelay={0}
        leaveTouchDelay={5000}>
        {children}
      </MuiTooltip>
    </>
  );
}
