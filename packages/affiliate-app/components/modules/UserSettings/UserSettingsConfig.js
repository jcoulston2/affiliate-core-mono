//@flow
import React, { useState, Fragment } from 'react';
import { type User } from '@types/user';
import PersonIcon from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider';
import Typography from '@units/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import upperFirst from 'lodash/upperFirst';
import UserEditSetting from './UserEditSetting';
import WcIcon from '@material-ui/icons/Wc';
import LabelIcon from '@material-ui/icons/Label';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Drawer from '@units/Drawer';
import { StyledList, StyledListItem, StyledListIcon, CleasrSettings } from './styles';
import { Actionable } from '@styles/CommonStyledComponents';
import { useCms } from '@hooks';

type UserSettingsConfigProps = {
  user: User,
  setUserSettings: Function,
  avatarIconColor: string,
};

export default function UserSettingsConfig({
  user,
  setUserSettings,
  avatarIconColor,
}: UserSettingsConfigProps) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [currentEditSetting, setCurrentEditSetting] = useState(null);
  const { persuasiveCookieText } = useCms('other');

  const closeSettings = () => setSettingsOpen(false);
  const settingsList = [
    {
      icon: <LabelIcon color="primary" />,
      property: 'name',
      title: 'name',
      value: user.name,
      description: '',
    },

    {
      icon: <WcIcon color="primary" />,
      property: 'gender',
      title: 'gender',
      value: user.gender,
      description: '',
    },
    {
      icon: <NotificationsIcon color="primary" />,
      property: 'notifications',
      title: 'notifications',
      value: user.notifications ? 'on' : 'off',
      description: '',
    },
    {
      icon: <DataUsageIcon color="primary" />,
      property: 'allowCookies',
      title: 'cookies',
      value: user.allowCookies ? 'on' : 'off',
      description: persuasiveCookieText,
    },
  ];

  return (
    <>
      <Actionable aria-label="user settings">
        <PersonIcon
          fontSize="large"
          color={avatarIconColor}
          onClick={() => setSettingsOpen(true)}
        />
      </Actionable>

      <Drawer
        open={settingsOpen}
        anchor={'right'}
        iconCloseClick={closeSettings}
        onClose={closeSettings}>
        {!currentEditSetting ? (
          <>
            <StyledList>
              <Divider light />
              {settingsList.map(({ icon, property, value, title, description }, index) => (
                <Fragment key={index}>
                  <StyledListItem
                    onClick={() => setCurrentEditSetting({ property, title, description })}>
                    <StyledListIcon>{icon}</StyledListIcon>
                    <ListItemText primary={upperFirst(title)} secondary={value} />
                    <ChevronRightIcon />
                  </StyledListItem>
                  <Divider light />
                </Fragment>
              ))}
            </StyledList>
            <CleasrSettings onClick={() => setUserSettings({})}>
              <Typography tag="p" decoration={'underline'} padding={'30px'}>
                Clear all settings
              </Typography>
            </CleasrSettings>
          </>
        ) : (
          <UserEditSetting
            setting={currentEditSetting}
            user={user}
            setUserSettings={setUserSettings}
            setCurrentEditSetting={setCurrentEditSetting}
          />
        )}
      </Drawer>
    </>
  );
}
