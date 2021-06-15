import styled from 'styled-components';
import { CmsSection } from '@styles/CommonStyledComponents';
import { keyframes } from 'styled-components';
import Grid from '@material-ui/core/Grid';
import bp from '@styles/breakPoints';

export const fadeListing = keyframes`
 0% { opacity: 0 }
 100% { opacity: 1 }`;

export const ProductListingContainer = styled(CmsSection)`
  max-width: ${(props) => props.maxWidth || 'initial'};
  margin: auto;
  animation-name: ${fadeListing};
  animation-duration: 3s;
`;

export const LoadMoreProductsCopy = styled.div`
  border-top: 1px lightgray solid;
  margin-top: 25px;
  margin-bottom: 25px;
`;

export const ChipsContainer = styled.div`
  margin-top: 25px;

  ${bp.max_xs} {
    margin-top: 0px;
  }
`;

export const ViewControlContainer = styled(Grid)`
  &:hover {
    opacity: 0.5;
    cursor: pointer;
  }
`;

export const ListingInformation = styled(Grid)`
  padding: 0px 30px;
`;

export const NoMoreProductsFlicker = styled.div`
  p {
    max-width: 600px;
    width: 100%;
    text-align: center;
    margin: auto;
    display: block;
  }
`;

export const FlickerFilters = styled.div`
  position: absolute;
  top: 19px;
  left: 28px;
  width: 43px;
`;
