//@flow
import { createGlobalStyle } from 'styled-components';
import * as React from 'react';
import { useTheme } from '@hooks';
import { breakPoints } from './breakPoints';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

type SiteThemeProps = {
  children: React.Node,
};

const SiteThemeProvider = createGlobalStyle`
  body {
    margin: 0px;
    overflow-x: hidden;
    width: 100%;
  }


  p, h1, h2, h3, h4, h5, h6 {
    display: inline-block;
    font-family: ${(props) => `${props.textTheme?.font},` || ''} "Helvetica", "Arial", sans-serif;
    white-space: initial;
    margin: 0px;
    color: ${(props) => props.textTheme?.primaryColor};
  }

  p {
    font-weight: 300;
    font-size: 14px;
    letter-spacing: 0.00938em;
    line-height: 1.5;
  }


  a {
    text-decoration: none;
    &:hover {
      opacity: ${(props) => props.linkTheme?.hoverOpacity};
      color: ${(props) => props.linkTheme?.hoverColor};
    }
    color: ${(props) => props.linkTheme?.color};    
  }

  img {
    width: 100%;
  }

  * {
    box-sizing: border-box;
  }

  .MuiPaper-root.MuiDialog-paper {
    border-radius: ${(props) => props.modalTheme?.borderRadius}px;
  }

  p.cms-html {
    width: 100%; 
    padding: 0.8em 0;
  }
`;

function SiteTheme({ children }: SiteThemeProps) {
  const cmsContentTheme = useTheme();
  if (!cmsContentTheme) return null;
  const { textTheme, linkTheme, brandThemeColors, modalTheme } = cmsContentTheme || {};
  const commonThemes = createMuiTheme({
    breakpoints: {
      values: breakPoints.reduce((accum, { query, min }: { [string]: any }) => {
        return {
          ...accum,
          [query]: min,
        };
      }, {}),
    },
    palette: {
      primary: {
        main: brandThemeColors.primaryColor,
      },
      secondary: {
        main: brandThemeColors.secondaryColor,
      },
      neutral: {
        main: '#5c6ac4',
      },
    },
  });

  return (
    <>
      <SiteThemeProvider textTheme={textTheme} linkTheme={linkTheme} modalTheme={modalTheme} />
      <MuiThemeProvider theme={commonThemes}>{children}</MuiThemeProvider>
    </>
  );
}

export default SiteTheme;
