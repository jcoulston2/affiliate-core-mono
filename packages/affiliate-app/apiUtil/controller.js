//@flow
import { graphql } from 'graphql';
import { fastClone } from '../helpers/common';
import { configuredStore } from '../server/store';
import { productResolver, cmsResolver } from '../graphQL/resolvers';
import { type CmsApiQuery } from '../types/apiQueries';
import { type GqlQuery, type GqlSchema, type GqlDoc } from '../types/graphQl';

function getQqlString(doc: GqlDoc): string {
  return doc?.loc?.source?.body || null;
}

export async function cmsController(query: GqlQuery, schema: GqlQuery): Promise<CmsApiQuery> {
  const gqlQuery = getQqlString(query);
  const result: Object = await graphql(schema, gqlQuery, cmsResolver());
  return result.data;
}

export async function storeController(
  query: GqlQuery,
  schema: GqlSchema,
  clone: boolean = true,
  variables?: ?Object
): Promise<any> {
  const gqlQuery = getQqlString(query);
  const affiliateData = configuredStore;
  const result = await graphql(schema, gqlQuery, productResolver(affiliateData), null, variables);
  if (result.errors) console.log(result.errors[0]);
  return clone ? fastClone(result.data) : result.data;
}
