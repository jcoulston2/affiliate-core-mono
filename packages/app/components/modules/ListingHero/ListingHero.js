//@flow
import React from 'react';
import CmsStackedCards from '@units/CmsStackedCards';
import { type CmsResponsiveString, type CmsGrid, type CmsCopy } from '@types/cms';
import { useRouter } from 'next/router';
import { getHeroCopy } from './helper';

// TODO: need more prop types? check cms
type ListingHeroProps = {
  padding?: CmsResponsiveString,
  maxWidth?: string,
  expandableAfterHeight?: number,
  card: {
    padding?: CmsResponsiveString,
    margin?: CmsResponsiveString,
    grid: CmsGrid,
    heading: CmsCopy,
    copy: CmsCopy,
  },
  descriptions: {
    [string]: {
      [string]: string,
    },
  },
  defaultDescription: string,
};

export default function ListingHero(props: ListingHeroProps) {
  const router = useRouter();
  const { heroDescription, heroHeading } = getHeroCopy(
    router,
    props.descriptions,
    props.defaultDescription
  );
  const mapToCmsStackedCards = {
    padding: props.padding,
    maxWidth: props.maxWidth,
    margin: 'auto',
    alignItems: 'center',
    justify: 'center',
    cards: [
      {
        ...props.card,
        grid: {
          xs: true,
        },

        heading: {
          text: heroHeading,
          ...props.card.heading,
        },
        copy: {
          text: heroDescription,
          ...props.card.copy,
        },
      },
    ],
  };

  return <CmsStackedCards {...mapToCmsStackedCards} />;
}
