//@flow
import { shadowBottom } from '@styles/commonStyles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import styled, { createGlobalStyle } from 'styled-components';
import Grid from '@material-ui/core/Grid';
import bp from '@styles/breakPoints';

const toggleContainerSidePadding = '12px';

export const SearchAutoCompleteBoxStyle = createGlobalStyle`
  .MuiAutocomplete-popper {
    && {      
      transform: translate3d(0px, 110px, 0px) !important;
      padding: 10px 40px;

      ${bp.max_xs} {
        min-width: 100%;
        padding: 0px 20px;
      }      

      * {
        box-shadow: none;        
      }

      ul {
        max-height: 80vh;


      }

      .MuiAutocomplete-option {
        padding-top: 13px;

        &:first-child {
          color: ${(props) => props.theme.secondaryColor};
        }

      }
    }
  }
`;

export const SearchInput = styled(Autocomplete)`
  && {
    fieldset {
      border: none;
    }

    input {
      padding: 9px !important;
    }

    * {
      border: none;
      padding: 0px !important;
      margin: 0px;
    }
  }
`;

export const DekstopSearchAction = styled(TextField)`
  && {
    fieldset {
      border: none;
    }

    input {
      margin: 9px;
    }

    * {
      border: none;
      padding: 0px !important;
      margin: 0px;
    }
  }
`;

export const SearchContainer = styled(Grid)`
  padding: 0px 30px;
  width: 100%;

  ${bp.max_xs} {
    padding: 0px 12px;
  }
`;

export const SearchContainerInner = styled(Grid)`
  background: ${(props) => props.background || '#fff'};
  box-shadow: -1px 1px 19px -7px #707070;
  border-radius: 17px;
  padding: 0px ${toggleContainerSidePadding};

  svg {
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
`;

export const ToogledSearchContainer = styled.div`
  position: absolute;
  top: 0px;
  width: 100%;
  z-index: 999;
  height: 100%;
  left: 0px;
  background: white;
  ${shadowBottom}
`;

export const ClearIconContainer = styled.div`
  width: 100%;
  padding: 10px ${toggleContainerSidePadding};
  display: flex;
  justify-content: flex-end;
`;

export const SuggestedText = styled.div`
  width: 100%;
  height: 100%;
`;

export const LoaderContainer = styled.div`
  display: flex;
  height: 70%;
`;
