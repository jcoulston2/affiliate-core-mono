//@flow
import React from 'react';
import TextField from '@material-ui/core/TextField';
import styled from 'styled-components';

const StyledInput = styled(TextField)`
  && {
    .MuiInputBase-root {
      border-radius: 18px;
    }
    fieldset {
      border-color: black;
    }
  }
`;

export default function Input(TextFieldProps: Object) {
  return <StyledInput {...TextFieldProps} size="small" />;
}
