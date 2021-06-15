//@flow

/*
value         |0px     600px    960px    1280px   1920px
key           |xs      sm       md       lg       xl
screen width  |--------|--------|--------|--------|-------->
range         |   xs   |   sm   |   md   |   lg   |   xl
*/

export type BreakPoints = {
  query: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  min: number,
  max: number,
};

export type BreakPointQueries = {
  max_xs: string,
  min_xs: string,
  max_sm: string,
  min_sm: string,
  max_md: string,
  min_md: string,
  max_lg: string,
  min_lg: string,
  max_xl: string,
  min_xl: string,
};

export const breakPoints: Array<BreakPoints> = [
  {
    query: 'xs',
    min: 0,
    max: 499,
  },
  {
    query: 'sm',
    min: 500,
    max: 768,
  },
  {
    query: 'md',
    min: 768,
    max: 1024,
  },
  {
    query: 'lg',
    min: 1024,
    max: 1400,
  },
  {
    query: 'xl',
    min: 1400,
    max: 9e4,
  },
];

const breakPointQueries: BreakPointQueries = {
  ...breakPoints.reduce<{ [string]: string }>(
    (accum, { query, min, max }) => ({
      ...accum,
      [`min_${query}`]: `@media (min-width: ${min}px)`,
      [`max_${query}`]: `@media (max-width: ${max}px)`,
    }),
    {}
  ),
};

export default breakPointQueries;
