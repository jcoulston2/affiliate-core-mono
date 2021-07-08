//@flow
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useCms } from '@hooks';
import CmsGrid from '@units/CmsGrid';
import CmsStackedCards from '@units/CmsStackedCards';
import CmsSplitCards from '@units/CmsSplitCards';
import CmsContentSplit from '@units/CmsContentSplit';
import { Spacer } from '@styles/CommonStyledComponents';
import { type GlobalState } from '../../types/appState';
import QuickFinder from '@modules/QuickFinder';
import { type NavigationData } from '@types/navigationData';

type LandingContentProps = {
  navigationData: NavigationData,
};

const LandingContent = ({ navigationData }: LandingContentProps) => {
  const { landingHeroBanner, landingActionCards, landingInfoCards, landingSplitContentInfo } =
    useCms('landingContent');

  const [quickFinderOpen, setQuickFinderOpen] = useState(false);
  const cmsEventMappings = {
    'quick-finder-hero-ref': {
      onClick: (): void => setQuickFinderOpen(true),
    },
  };

  return (
    <main>
      <CmsGrid {...landingHeroBanner} cmsEventMappings={cmsEventMappings} />
      <CmsStackedCards {...landingActionCards} />
      <CmsContentSplit {...landingSplitContentInfo} />
      <CmsSplitCards {...landingInfoCards} />
      <QuickFinder
        onClose={() => setQuickFinderOpen(false)}
        navigationData={navigationData}
        open={quickFinderOpen}
        setOpen={setQuickFinderOpen}
      />
      <Spacer h={50} />
    </main>
  );
};

export default connect(({ globalAppState, buildTimeState }: $Shape<GlobalState>) => {
  const { clientWidth } = globalAppState;
  const { navigationData } = buildTimeState;
  return {
    clientWidth,
    navigationData,
  };
})(LandingContent);
