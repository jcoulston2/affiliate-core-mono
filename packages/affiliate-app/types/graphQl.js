//@flow
import { type Filters } from './product';
import { type PredictiveSearch } from './search';

export type ProductQueryInputArguments = $Exact<
  {
    section: string,
    category: string,
    productType: string,
    productCountStart: number,
    productCountEnd: number,
    brand: string,
    keyTerm: string,
    productColor: string,
  } & Filters &
    PredictiveSearch
>;

export type GqlSchema = Object;
export type GqlQuery = Object;
export type GqlDoc = Object;
