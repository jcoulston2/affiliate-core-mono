//@flow
import React from 'react';
import { PwaBanner } from '@modules/Pwa';
import MarketingBanner from '@units/MarketingBanner';
import styled from 'styled-components';
import { isAfter, isBefore } from 'date-fns';
import { type MarketingBanner as MarketingBannerType } from '@types/marketing';
import { useCms } from '@hooks';

const MarketingSpaceContainer = styled.div`
  && {
    [data-ref='pwa-banner'] + * {
      display: none;
    }
  }
`;

export default function MarketingSpace() {
  const { banners: bannersCms, displayInstallAppBanner } =
    useCms<MarketingBannerType>('marketing') || {};
  const now = new Date();
  const sortedBanners = bannersCms?.filter((banner) => {
    const startDateOk = !banner.startDate || isAfter(banner.startDate, now);
    const endDateOk = !banner.endDate || isBefore(banner.endDate, now);
    return banner.visible && startDateOk && endDateOk;
  });

  return (
    <MarketingSpaceContainer>
      {displayInstallAppBanner && <PwaBanner />}
      {sortedBanners?.map((item, index) => (
        <MarketingBanner {...item} key={index} />
      ))}
    </MarketingSpaceContainer>
  );
}
