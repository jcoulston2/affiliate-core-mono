//@flow
import { type PredictiveSearch } from '@types/search';
import { crossIncludes } from '@helpers/common';

export function getTermString(predictiveTerms: PredictiveSearch, useSplitter?: boolean): string {
  if (typeof predictiveTerms === 'string') {
    return predictiveTerms;
  } else {
    const values = Object.values(predictiveTerms).filter((notNull) => !!notNull);
    return values.join(useSplitter ? ' | ' : ' ');
  }
}

export function getPredictiveTermsList(
  predictiveTermsResponse: Array<PredictiveSearch>,
  value: string
): Array<PredictiveSearch> {
  const suggestions = [];
  const pushedTerms = [];

  const valueMatch = (p1, p2): boolean => (p1 && p2 ? p1?.includes(p2) || p2?.includes(p1) : false);
  const pushSuggestion = (term) => {
    const termStr = JSON.stringify(term);
    if (!pushedTerms.includes(termStr)) {
      pushedTerms.push(termStr);
      suggestions.push(term);
    }
  };

  for (const term of predictiveTermsResponse) {
    const { brand, section, productColor, keyTerm, category } = term;

    if (valueMatch(section, value) && category) {
      pushSuggestion({ section });
      pushSuggestion({ section, category });
    }

    if (valueMatch(brand, value)) {
      pushSuggestion({ brand });
      if (section) pushSuggestion({ section, brand });
      if (category) pushSuggestion({ section, brand, category });
    }

    if (valueMatch(productColor, value)) {
      if (category) pushSuggestion({ section, productColor, category });
      if (category && keyTerm && !crossIncludes(category, keyTerm)) {
        pushSuggestion({ section, productColor, keyTerm, category });
      }
    }

    if (valueMatch(keyTerm, value) && category && !crossIncludes(category, keyTerm)) {
      pushSuggestion({ section, keyTerm, category });
    }

    if (valueMatch(category, value)) {
      if (section) pushSuggestion({ section, category });
    }
  }

  return suggestions;
}
