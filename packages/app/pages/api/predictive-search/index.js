//@flow
export { config } from '../../../apiUtil';
import { predictiveSearch } from '@affiliate-master/store';
import { type xhr } from '@types/other';
import { type PredictiveSearch } from '@types/search';
import { commonMultiMatch } from '@helpers/common';
import { baseMiddleware } from '@server/middleware';

function predictiveSearchFilter(terms: string): Array<PredictiveSearch> {
  const result = predictiveSearch.filter(({ brand, section, productColor, keyTerm, category }) => {
    const termsArray = terms.split(' ');
    return commonMultiMatch(
      termsArray,
      (termItem) =>
        brand?.includes(termItem) ||
        section?.includes(termItem) ||
        productColor?.includes(termItem) ||
        keyTerm?.includes(termItem) ||
        category?.includes(termItem)
    );
  });

  return result;
}

const handler = {
  error: (req: xhr, res: xhr): void => {
    res.status(404).send();
  },

  /**
   * @endpoint /predictive-search
   */
  search: async (req: xhr, res: xhr): Promise<Object> | void => {
    const terms = req.query?.terms;
    if (req.method === 'GET' && terms) {
      return res.json(predictiveSearchFilter(terms));
    } else {
      handler.error(req, res);
    }
  },
};

export default async function handle(req: xhr, res: xhr): Promise<Object | void> {
  await baseMiddleware(req, res);
  return handler.search(req, res);
}
