//@flow
import React, { useEffect } from 'react';
import { type ReactComponent } from '@types/react';
import { getNode } from '@helpers/common';
import {
  FlickAnimationsProvider,
  FlickCard,
  FlickCardInner,
  CardContainer,
  AnimationContainer,
} from './styles';
import { selectors } from './helper';

type FlickerProps = $Exact<{
  onEndCallback: Function,
  onSwipeCallback: Function,
  SwipeIconUp?: ReactComponent,
  SwipeIconDown?: ReactComponent,
  SwipeIconLeft?: ReactComponent,
  SwipeIconRight?: ReactComponent,
  Component: ReactComponent,
  dataMap: Array<Object>,
  ...
}>;

type FlickerDirection = 'up' | 'down' | 'left' | 'right';

// IMPORTANT NOTE: normally handling logic via query selectors with React components does not sit well in most cases,
// often this can lead to re-rendering confusion as well as convoluted logic. In the below, there are examples of using query
// selectors - the reason for this is to make transitions as smooth as possible and to avoid 'glitching / jerking' caused by
// component re-renders. The card animations are handled via an external library. Becasue we have so many product cards stacked
// on top of each other with all their held product information, passing through a large data map of products causes some
// performance issues as well as UX / UI issues. The library does not handle these performance issues and only works on a
// card by card basis. Rather than rendering all the products, we only 'show' the relevant product when it's next in the list.
// We do this via query selectors and CSS to make the transitions as smooth as possible.
let lastCardIndexSwiped = null;
let flickUrlTracker = null;
export default function Flicker({
  dataMap,
  Component,
  onEndCallback,
  onSwipeCallback,
  SwipeIconUp,
  SwipeIconDown,
  SwipeIconLeft,
  SwipeIconRight,
  ...rest
}: FlickerProps) {
  const handleAnimationEffect = (direction: FlickerDirection): void => {
    const animationContainerSelector = selectors.animationContainer();
    const animationIcon = selectors.animationIcon(direction);
    getNode(animationIcon)?.classList.add('icon-show');
    getNode(animationContainerSelector)?.classList.add('pulse');
    setTimeout(() => {
      getNode(animationIcon)?.classList.remove('icon-show');
      getNode(animationContainerSelector)?.classList.remove('pulse');
    }, 501);
  };

  const setLastCardIndexSwiped = (index: number): void => {
    lastCardIndexSwiped = index;
  };

  const getNodeByIndex = (index: number): any => {
    const selector = selectors.cardNode(index);
    return getNode(selector);
  };

  const handleRevealCards = (index: number): any => {
    const revealCardNodes = getNodeByIndex(index);
    if (revealCardNodes) revealCardNodes.style.display = 'block';
  };

  const resetCardIndex = (): void => {
    lastCardIndexSwiped = null;
  };

  const setUrlTracker = (plpUrl: string): void => {
    flickUrlTracker = plpUrl;
  };

  const handleCardsReset = (): void => {
    const plpUrl = window.location.href;
    if (!flickUrlTracker) {
      setUrlTracker(plpUrl);
    } else if (plpUrl !== flickUrlTracker) {
      resetCardIndex();
      setUrlTracker(plpUrl);
    }
  };

  const swiped = (direction: FlickerDirection, dataItem: Array<Object>, index: number): void => {
    const nextCard = index + 1;
    if (index >= dataMap.length && onEndCallback) {
      return onEndCallback();
    } else {
      handleAnimationEffect(direction);
      handleRevealCards(nextCard);
      setLastCardIndexSwiped(nextCard);
      onSwipeCallback(direction, dataItem);
    }
  };

  useEffect(() => {
    const nextCard = lastCardIndexSwiped + 1;
    handleRevealCards(nextCard);
  }, [dataMap.length]);

  handleCardsReset();

  return (
    <CardContainer data-ref="card-container">
      {dataMap.map((dataItem, index) => {
        const nodeIndex = index + 1;
        return (
          <FlickCard
            key={index}
            onSwipe={(dir) => swiped(dir, dataItem, nodeIndex)}
            preventSwipe={['down']}
            {...rest}>
            <FlickCardInner>
              <Component.type {...Component.props} {...dataItem} />
            </FlickCardInner>
          </FlickCard>
        );
      })}
      <FlickAnimationsProvider />
      <AnimationContainer data-ref="animation-container">
        {SwipeIconUp && <SwipeIconUp.type {...SwipeIconUp.props} data-ref="up" />}
        {SwipeIconDown && <SwipeIconDown.type {...SwipeIconDown.props} data-ref="down" />}
        {SwipeIconLeft && <SwipeIconLeft.type {...SwipeIconLeft.props} data-ref="left" />}
        {SwipeIconRight && <SwipeIconRight.type {...SwipeIconRight.props} data-ref="right" />}
      </AnimationContainer>
    </CardContainer>
  );
}
