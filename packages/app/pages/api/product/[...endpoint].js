//@flow
import { productSchema } from '../../../graphQL/schemas';
import { STORE } from '../../../constants';
import { storeController } from '../../../apiUtil/controller';
import gql from 'graphql-tag';
export { config } from '../../../apiUtil';
import { type ProductApiQuery } from '@types/apiQueries';
import { type xhr } from '@types/other';
import { baseMiddleware } from '@server/middleware';
import Cors from 'cors';

const handler = {
  error: (req: xhr, res: xhr): void => {
    res.status(404).send();
  },

  /**
   * @endpoint /store
   */
  store: async (req: xhr, res: xhr): Promise<Object> | void => {
    if (req.method === 'POST') {
      const { query, variables } = req.body;
      const gqlQuery = gql`
        ${query}
      `;

      const productData: ProductApiQuery = await storeController(
        gqlQuery,
        productSchema,
        true,
        variables
      );
      return res.json({ data: productData });
    } else {
      handler.error(req, res);
    }
  },
};

export default async function handle(req: xhr, res: xhr): Promise<Object> | void {
  await baseMiddleware(req, res);
  const { query } = req;
  const [endpoint] = query?.endpoint;

  switch (endpoint) {
    case STORE:
      return handler.store(req, res);
    default:
      return handler.error(req, res);
  }
}
