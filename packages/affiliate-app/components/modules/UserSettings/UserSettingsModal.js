//@flow
import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Typography from '@units/Typography';
import Image from '@units/Image';
import Input from '@units/Input';
import RadioButton from '@units/RadioButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useForm } from '@hooks';
import Button from '@units/Button';
import Form from '@units/Form';
import { getLocalStorage } from '@helpers/common';
import { USER_SETTINGS_KEY } from '@constants';
import { type CmsCopy } from '@types/cms';
import { ModalContainer, Skip, ModalGridItem, StyledRadioGroup } from './styles';
import { type User } from '@types/user';

type UserSettingsModalProps = {
  setUserSettings: Function,
  useModal: boolean,
  userSettingsModalHeadingText: string,
  userSettingsModalBlurbText: string,
  userSettingsModalHeading: CmsCopy,
  userSettingsModalBlurb: CmsCopy,
  modalDelay: number,
};

export default function UserSettingsModal({
  setUserSettings,
  useModal,
  userSettingsModalHeadingText,
  userSettingsModalBlurbText,
  userSettingsModalHeading,
  userSettingsModalBlurb,
  modalDelay,
}: UserSettingsModalProps) {
  const [open, setOpen] = useState(false);
  const userSettingsConfig = getLocalStorage<User>(USER_SETTINGS_KEY);
  const hasSeenModal = userSettingsConfig?.hasSeenUserIntroModal;

  const initialFormValues = {
    name: null,
    gender: null,
  };
  const validationSchema = {
    name: (value) => {
      if (!value?.length) {
        return 'required';
      }
    },
  };

  const handleCloseModal = (): void => {
    setUserSettings({
      ...userSettingsConfig,
      hasSeenUserIntroModal: true,
    });
    setOpen(false);
  };

  const submitCallback = (formValues: User): void => {
    setUserSettings({
      ...formValues,
      hasSeenUserIntroModal: true,
    });
    setOpen(false);
  };

  const { formValues, onChangeHandler, submitForm, errors } = useForm(
    initialFormValues,
    validationSchema
  );

  useEffect(() => {
    if (useModal && !hasSeenModal) {
      setTimeout(() => setOpen(true), modalDelay);
    }
  }, []);

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={() => handleCloseModal()}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description">
      <ModalContainer container>
        <Grid item xs={12} container justify="flex-end">
          <Skip item onClick={() => handleCloseModal()}>
            <Typography
              tag="p"
              weight={200}
              size={15}
              padding={'0px 0px 10px 0px'}
              decoration={'underline'}>
              skip &gt;
            </Typography>
          </Skip>
        </Grid>
        <Form
          onSubmit={(event) => {
            event.preventDefault();
            submitForm(submitCallback);
          }}>
          <ModalGridItem item xs={12}>
            <Typography typeStyles={userSettingsModalHeading}>
              {userSettingsModalHeadingText}
            </Typography>
          </ModalGridItem>
          <ModalGridItem item xs={12}>
            <Image src="shoe-and-bag.svg" alt="welcome to fliik" maxWidth="180px" />
          </ModalGridItem>
          <ModalGridItem item xs={12}>
            <Typography tag="p" typeStyles={userSettingsModalBlurb}>
              {userSettingsModalBlurbText}
            </Typography>
          </ModalGridItem>
          <ModalGridItem item xs={12}>
            <Typography padding={'0.5em 0em'} tag={'h3'} weight={500}>
              What’s your name?
            </Typography>
            <Input
              error={!!errors.name}
              helperText={errors?.name}
              value={formValues.name}
              fullWidth
              onChange={onChangeHandler('name')}
            />
          </ModalGridItem>
          <ModalGridItem item xs={12}>
            <Typography padding={'0.5em 0em 1em 0em'} tag={'h3'} weight={500}>
              What’s your gender?
            </Typography>
            <StyledRadioGroup
              aria-label="gender"
              name="gender"
              value={formValues.gender}
              onChange={onChangeHandler('gender')}>
              <FormControlLabel value="Female" control={<RadioButton />} label="Female" />
              <FormControlLabel value="Male" control={<RadioButton />} label="Male" />
              <FormControlLabel value="Other" control={<RadioButton />} label="Other" />
            </StyledRadioGroup>
          </ModalGridItem>
          <ModalGridItem item xs={12}>
            <Button secondary fullWidth type="submit">
              Done
            </Button>
          </ModalGridItem>
        </Form>
      </ModalContainer>
    </Dialog>
  );
}
