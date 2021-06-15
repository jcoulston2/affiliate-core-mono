import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { Flex } from '@styles/CommonStyledComponents';
import Grid from '@material-ui/core/Grid';
import RadioGroup from '@material-ui/core/RadioGroup';
import bp from '@styles/breakPoints';

export const StyledList = styled(List)`
  && {
    width: 100%;
  }
`;

export const StyledListItem = styled(ListItem)`
  && {
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
`;

export const StyledListIcon = styled(ListItemAvatar)`
  && {
    min-width: 50px;
  }
`;

export const EditContainer = styled(ListItemAvatar)`
  padding: 10px 50px;
  max-width: 345px;
`;

export const BackCopy = styled(Flex)`
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }

  span {
    margin-left: 5px;
  }
`;

export const ModalContainer = styled(Grid)`
  padding: 20px;
`;

export const ModalGridItem = styled(Grid)`
  padding: 15px;
`;

export const StyledRadioGroup = styled(RadioGroup)`
  && {
    display: flex;
    flex-direction: ${(props) => props.direction || 'row'};
    flex-wrap: nowrap;

    ${bp.max_xs} {
      flex-wrap: wrap;
    }

    > * {
      width: 100%;
      margin-right: 0px;
    }
  }
`;

export const Skip = styled(Grid)`
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;

export const CleasrSettings = styled.div`
  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
`;
