/* eslint-disable */
import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import bp from '@styles/breakPoints';

export const WasPriceCopy = styled.div`
  p {
    width: 100%;

    span {
      text-decoration: line-through;
    }
  }
`;

export const ProductName = styled.div`
  && {
    * {
      text-transform: capitalize;
    }
  }
`;

export const WishListActionWrapper = styled.div`
  && {
    position: absolute;
    top: 8px;
    left: 8px;
    display: flex;
    padding: 0.3em;
    border-radius: 50%;
    box-shadow: 1px 1px 10px -3px #4f4f4f;
    justify-content: center;
    align-items: center;
    background: #fff;

    ${bp.max_md} {
      top: initial;
      left: initial;
      bottom: 10px;
      right: 10px;
      padding: 0.35em;
    }

    ${bp.max_xs} {
      top: initial;
      left: initial;
      bottom: 8px;
      right: 8px;
      padding: 0.32em;
    }

    svg {
      font-size: 30px;

      ${bp.max_md} {
        font-size: 26px;
      }

      ${bp.max_xs} {
        font-size: 21px;
      }
    }
  }
`;
