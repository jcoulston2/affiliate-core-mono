//@flow
import React from 'react';
import { connect } from 'react-redux';
import { useCms } from '@hooks';
import { type GlobalState } from '@types/appState';
import { useRouter } from 'next/router';
import CmsSplitCards from '@units/CmsSplitCards';
import Typography from '@units/Typography';
import Copy from '@units/Copy';
import Grid from '@material-ui/core/Grid';
import { Spacer } from '@styles/CommonStyledComponents';
import camelCase from 'lodash/camelCase';

const Brochureware = () => {
  const router = useRouter();
  const [page] = router.query.cms;
  const cmsContent = page && useCms(camelCase(page));

  return cmsContent?.hero ? (
    <div>
      <Grid container justify="center" alignItems="center">
        <Typography typeStyles={cmsContent.hero}>
          <Copy text={cmsContent.hero.text} />
        </Typography>
      </Grid>

      <CmsSplitCards {...cmsContent.body} />
      <Spacer h={50} />
    </div>
  ) : null;
};

export default connect(({ globalAppState }: $Shape<GlobalState>) => {
  const { clientWidth } = globalAppState;
  return {
    clientWidth,
  };
})(Brochureware);
