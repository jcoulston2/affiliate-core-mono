//@flow
import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@units/Typography';
import Copy from '@units/Copy';
import styled from 'styled-components';
import Loader from '@units/Loader';
import { Spacer } from '@styles/CommonStyledComponents';
import { navigateToUrl, delayedCallback } from '@helpers/common';
import Button from '@units/Button';

type ProductRedirectProps = {
  brand: string,
  productLink: ?string,
  onClose: Function,
};

const ProductRedirectContainer = styled(Grid)`
  height: 100%;
`;

export default function ProductRedirect({ brand, productLink, onClose }: ProductRedirectProps) {
  const pendingPlaceholderTime = productLink ? 1500 : 3000;
  useEffect(() => {
    if (productLink) {
      delayedCallback(() => {
        navigateToUrl(productLink);
        onClose();
      }, pendingPlaceholderTime);
    }
  }, []);

  return (
    <ProductRedirectContainer container justify="center" alignItems="center">
      {productLink ? (
        <Grid item xs={12} container>
          <Grid item xs={12} container justify="center">
            <Typography
              tag="h2"
              typeStyles={{
                desktop: {
                  size: 30,
                  weight: 500,
                  textAlign: 'center',
                },
              }}>
              <Copy text={`We're taking you to ${brand}`} />
            </Typography>
          </Grid>
          <Spacer h={10} />
          <Grid item xs={12}>
            <Loader active={true} size={50} />
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12} container>
          <Grid item xs={12} container justify="center">
            <Typography tag="p">
              <Copy text={"Oh no! Looks like something went wrong, we're awfully sorry!"} />
            </Typography>
          </Grid>
          <Spacer h={15} />
          <Grid item xs={12} container justify="center">
            <Button primary onClick={onClose}>
              <Typography tag="p">
                <Copy text={'Go back'} />
              </Typography>
            </Button>
          </Grid>
        </Grid>
      )}
    </ProductRedirectContainer>
  );
}
