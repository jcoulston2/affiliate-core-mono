//@flow
import React from 'react';
import { type User } from '@types/user';
import { Spacer } from '@styles/CommonStyledComponents';
import Input from '@units/Input';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioButton from '@units/RadioButton';
import { EditContainer, BackCopy, StyledRadioGroup } from './styles';
import upperFirst from 'lodash/upperFirst';
import Typography from '@units/Typography';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { useThemeColor } from '@hooks';

type UserEditSettingProps = {
  setting: {
    property: string,
    title: string,
    description?: string,
  },
  user: User,
  setUserSettings: Function,
  setCurrentEditSetting: Function,
};

function UserEditSetting({
  setting,
  user,
  setUserSettings,
  setCurrentEditSetting,
}: UserEditSettingProps) {
  let renderEditContent;
  const { property, title, description } = setting;
  const labelTitle = upperFirst(property);
  const { slate } = useThemeColor('all');

  switch (property) {
    case 'name':
      renderEditContent = (
        <Input
          fullWidth
          label={labelTitle}
          value={user.name}
          onChange={({ target }) => {
            setUserSettings({
              ...user,
              [property]: target.value,
            });
          }}
        />
      );
      break;

    case 'gender':
      renderEditContent = (
        <StyledRadioGroup
          direction="column"
          aria-label="gender"
          name="gender"
          value={user.gender}
          onChange={({ target }) => {
            setUserSettings({
              ...user,
              [property]: target.value,
            });
          }}>
          <FormControlLabel value="Male" control={<RadioButton color="primary" />} label="Male" />
          <Spacer h={7} />
          <FormControlLabel
            value="Female"
            control={<RadioButton color="primary" />}
            label="Female"
          />
          <Spacer h={7} />
          <FormControlLabel value="Other" control={<RadioButton color="primary" />} label="Other" />
          <Spacer h={7} />
        </StyledRadioGroup>
      );
      break;

    case 'notifications':
      renderEditContent = (
        <Switch
          color="primary"
          checked={user.notifications}
          onChange={({ target }) => {
            setUserSettings({
              ...user,
              [property]: target.checked,
            });
          }}
          name="notifications"
          inputProps={{ 'aria-label': 'notifications' }}
        />
      );
      break;

    case 'allowCookies':
      renderEditContent = (
        <Switch
          color="primary"
          checked={user.allowCookies}
          onChange={({ target }) => {
            setUserSettings({
              ...user,
              [property]: target.checked,
            });
          }}
          name="cookies"
          inputProps={{ 'aria-label': 'notifications' }}
        />
      );

      break;
  }

  return (
    <EditContainer>
      <Grid container>
        <Grid item xs={12}>
          <Typography tag="p" decoration={'underline'} padding={'10px 0 30px 0'}>
            <BackCopy onClick={() => setCurrentEditSetting(null)}>
              <ArrowBackIcon /> <span>settings</span>
            </BackCopy>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography tag="h3" padding={'10px 0 30px 0'}>
            {title}
          </Typography>
        </Grid>

        {description && (
          <Grid item xs={12}>
            <Typography tag="p" padding={'10px 0 30px 0'} fullWidth color={slate}>
              {description}
            </Typography>
          </Grid>
        )}
      </Grid>

      {renderEditContent}
    </EditContainer>
  );
}

export default UserEditSetting;
