//@flow
import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { getLocalStorage, setLocalStorage } from '@helpers/common';
import { MODALS_PREVENTED } from '@constants';
import Button from '@units/Button';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import ClearIcon from '@material-ui/icons/Clear';
import Typography from '@units/Typography';
import { useTheme } from '@hooks';
import { StyledCmsGrid } from '@styles/CommonStyledComponents';
import { type CmsResponsiveString } from '@types/cms';

type DialogProps = {
  children: any,
  showOnce: boolean,
  modalKey: string,
  buttonText: string,
  onSubmitModal: Function,
  modalTitle: string,
  padding: CmsResponsiveString,
  open: boolean,
  setOpen: Function,
  ...
};

export const ModalContainer = styled(Grid)`
  padding: 0px 10px;
  overflow-y: scroll;
`;

export const Close = styled(Grid)`
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

export const Title = styled.div`
  padding: 20px;
`;

export const DialogContainer = styled(Dialog)`
  .MuiPaper-root {
    padding: 20px 10px;
    overflow: hidden;
  }

  * {
    ::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 3px;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 4px;
      background-color: #dcdada;
    }
  }
`;

export default function Modal({
  children,
  padding,
  modalKey,
  showOnce,
  onSubmitModal,
  modalTitle,
  buttonText,
  open,
  setOpen,
  ...rest
}: DialogProps) {
  const modalsPrevented = getLocalStorage(MODALS_PREVENTED) || [];
  const isModalPrevented = showOnce && modalsPrevented.includes(modalKey);
  const { modalTheme } = useTheme();

  const handleModalOpenStatus = () => {
    setOpen(false);
    if (showOnce) setLocalStorage(MODALS_PREVENTED, [modalKey, ...modalsPrevented]);
    if (onSubmitModal) onSubmitModal();
  };

  return !isModalPrevented ? (
    <DialogContainer {...rest} open={open}>
      <ModalContainer>
        <Grid item xs={12} container justify="flex-end">
          <Close item onClick={() => setOpen(false)}>
            <ClearIcon fontSize="large" />
          </Close>
        </Grid>
        {modalTitle && (
          <Typography typeStyles={modalTheme.modalHeading} fullwidth>
            {modalTitle}
          </Typography>
        )}

        <StyledCmsGrid padding={modalTheme.defaultPadding || padding}>{children}</StyledCmsGrid>
        <Button primary fullWidth onClick={handleModalOpenStatus}>
          {buttonText || 'Ok'}
        </Button>
      </ModalContainer>
    </DialogContainer>
  ) : null;
}
