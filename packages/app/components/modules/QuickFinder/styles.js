import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Modal from '@units/Modal';

export const QuickViewModal = styled(Modal)`
  .MuiTabs-root {
    width: 100%;
  }
`;

export const QuickSectionTabs = styled(Grid)`
  margin-bottom: 30px;
`;

export const QuickLabelTabs = styled(Grid)``;

export const QuickViewSection = styled(Grid)`
  margin-bottom: 30px;
`;

export const RadioItem = styled(Grid)`
  display: flex;
`;

export const RadioItemContainer = styled(Grid)`
  padding: 15px 0px;
`;

export const SectionLabel = styled(Grid)`
  && {
    border-bottom: 1px solid #ececec;
    width: 85%;
    margin-bottom: 20px;
  }
`;
