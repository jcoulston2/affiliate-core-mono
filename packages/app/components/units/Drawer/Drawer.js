//@flow
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import bp from '@styles/breakPoints';
import ClearIcon from '@material-ui/icons/Clear';

type CustomDrawerProps = $Exact<{
  open: boolean,
  children: any,
  width: number,
  fullHeight: boolean,
  iconCloseClick: Function,
  ...
}>;

export const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    min-width: ${({ width }) => (width ? `${width}%` : '385px')};
    ${({ fullHeight }) => (fullHeight ? 'height: 100%;' : '')};

    ${bp.max_xs} {
      width: 95%;
    }
  }
`;

export const DrawerContent = styled(Grid)`
  && {
    padding: 20px;

    ${bp.max_xs} {
      min-width: initial;
    }
  }
`;

export const CloseDraw = styled(Grid)`
  position: relative;
  top: -8px;
  > * {
    &:hover {
      cursor: pointer;
      opacity: 0.6;
    }
  }
`;

export default function CustomDrawer({
  open,
  children,
  width,
  iconCloseClick,
  fullHeight,
  ...rest
}: CustomDrawerProps) {
  const [drawOpen, setDrawOpen] = useState(false);
  useEffect(() => {
    setDrawOpen(open);
  }, [open]);

  return (
    <StyledDrawer width={width} anchor={'right'} open={drawOpen} {...rest} fullHeight={fullHeight}>
      <DrawerContent>
        <CloseDraw container justify="flex-end">
          <Grid onClick={iconCloseClick}>
            <ClearIcon fontSize="large" />
          </Grid>
        </CloseDraw>
        {children}
      </DrawerContent>
    </StyledDrawer>
  );
}
