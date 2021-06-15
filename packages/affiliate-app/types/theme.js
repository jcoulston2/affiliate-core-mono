import { type CmsResponsiveString, type CmsCopy } from '@types/cms';

//@flow
export type Theme = {
  brandThemeColors: {
    primaryColor: string,
    secondaryColor: string,
    tertiaryColor: string,
    commonBlack: string,
    commonWhite: string,
  },
  buttonTheme: {
    primaryColor: string,
    primaryTextColor: string,
    secondaryColor: string,
    secondaryTextColor: string,
    borderRadius: number,
    defaultPadding: string,
  },
  textTheme: {
    primaryColor: string,
    secondaryColor: string,
    slightlyFadedTextColor: string,
    tertiary: null,
    font: string,
    textDecoratorStyleCss: string,
  },
  linkTheme: {
    color: string,
    hoverOpacity: number,
  },
  cardTheme: {
    background: string,
    shadow: string,
    borderRadius: number,
    defaultPadding: string,
  },
  modalTheme: {
    borderRadius: number,
    defaultPadding: CmsResponsiveString,
    modalHeading: CmsCopy,
  },
  commonStyles: {
    shadow: string,
  },
};
