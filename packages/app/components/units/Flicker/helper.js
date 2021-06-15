//@flow
export const selectors = {
  animationContainer: (): string => '[data-ref="animation-container"]',
  animationIcon: (direction: string): string =>
    `[data-ref="animation-container"] [data-ref="${direction}"]`,
  cardNode: (index: number): string => `[data-ref="card-container"] > *:nth-child(${index})`,
};
