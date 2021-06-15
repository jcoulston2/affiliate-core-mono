//@flow
export type ActionPartial = {
  type: string,
  ...
};

export type Saga = any;
export type Store = Object;
export type WrapperParamsStaticProps = { store: Object, params: Object };
export type WrapperParamsServerSideProps = {
  store: Object,
  req: Object,
  res: Object,
  query: Object,
};
