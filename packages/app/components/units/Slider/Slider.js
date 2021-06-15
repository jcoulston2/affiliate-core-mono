//@flow
import React from 'react';
import Slider from '@material-ui/core/Slider';
import styled from 'styled-components';
import { useTheme } from '@hooks';

const StyledSlider = styled(Slider)`
  && {
    .MuiSlider-thumb {
      transform: scale(1.2);

      span {
        font-size: 9px;
      }
    }

    .MuiSlider-markLabel {
      &[data-index='0'] {
        margin: 0px 4px;
      }

      &[data-index='1'] {
        margin: 0px -4px;
      }
    }

    .MuiSlider-thumbColorPrimary {
      span > span > span {
        color: ${(props) => props.labelColor};
      }
    }
  }
`;
export default function CustomSlider(SliderProps: Object) {
  const {
    textTheme: { tertiaryColor },
  } = useTheme();
  return <StyledSlider {...SliderProps} labelColor={tertiaryColor} />;
}
