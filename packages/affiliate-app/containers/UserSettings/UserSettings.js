//@flow
import React from 'react';
import { connect } from 'react-redux';
import { actions } from './actions';
import { type GlobalState } from '../../types/appState';
import { type User } from '../../types/user';
import { UserSettingsModal, UserSettingsConfig } from '@modules/UserSettings';
import { useCms } from '@hooks';

type UserSettingsProps = {
  setUserSettings: Function,
  user: User,
};

function UserSettings({ user, setUserSettings }: UserSettingsProps) {
  const { userSettingsModal, settingsAvatarIconColor } = useCms('userSettings');
  return (
    <div>
      <UserSettingsModal setUserSettings={setUserSettings} {...userSettingsModal} />
      <UserSettingsConfig
        setUserSettings={setUserSettings}
        user={user}
        avatarIconColor={settingsAvatarIconColor}
      />
    </div>
  );
}

function mapDispatchToProps(dispatch: Function): { [string]: Function } {
  return {
    setUserSettings: (settings: User) => dispatch(actions.setUserSettings(settings)),
  };
}

function mapStateToProps(state: $Shape<GlobalState>) {
  return {
    user: state.userSettingsState?.user,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings);
