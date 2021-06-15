//@flow
export type User = {
  name: string,
  gender: 'male' | 'female' | 'other',
  notifications: boolean,
  allowCookies: boolean,
  displayMode: 'light' | 'dark',
  hasSeenUserIntroModal: boolean,
};
