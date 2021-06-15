import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import bp from '@styles/breakPoints';
import { scrollBar } from '@styles/commonStyles';

export const TooltopContent = styled.p`
  color: black;
`;

export const FilterItem = styled.div`
  margin-top: 20px;
  margin-bottom: ${(props) => (!props.isLast ? '40px' : '')};
  overflow: ${(props) => (props.expandable ? 'hidden' : 'initial')};
  max-height: ${(props) => (props.fullHeight ? 'initial' : '276px')};
  ${scrollBar}
`;

export const ClearFilters = styled.div`
  margin: 10px 0px 10px 0px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export const FilterChipWrapper = styled(Grid)`
  && {
    ${bp.max_md} {
      margin-top: 20px;
    }
  }
`;

export const ReadMoreContainer = styled.div`
  position: relative;
  top: -13px;
  left: 1px;
  margin-bottom: 24px;
  cursor: pointer;
`;

export const FilterNotification = styled.div`
  position: absolute;
  background: #65cdf9;
  color: white;
  padding: 1px 4px;
  border-radius: 30px;
  top: -7px;
  right: -15px;
  font-size: 10px;
`;
