import storeCache from '@affiliate-master/store';
import { zipParse as parseStoreCache, lowerCase, Logger } from '@affiliate-master/common';
import { PREDICTIVE_SEARCH_OUTPUT } from '../constants/paths';
import fs from 'fs';

const colors = [
  'amber',
  'apricot',
  'aqua',
  'auburn',
  'azure',
  'beige',
  'black',
  'blue',
  'bronze',
  'brown',
  'burgundy',
  'charcoal',
  'cherry',
  'chocolate',
  'cobalt',
  'copper',
  'cream',
  'crimson',
  'cyan',
  'dandelion',
  'dark',
  'denim',
  'ecru',
  'emerald',
  'forest',
  'fuchsia',
  'gold',
  'green',
  'grey',
  'indigo',
  'ivory',
  'jade',
  'khaki',
  'lavender',
  'lemon',
  'lilac',
  'light',
  'lime',
  'magenta',
  'maroon',
  'mauve',
  'mint',
  'green',
  'mustard',
  'navy',
  'olive',
  'orange',
  'peach',
  'pink',
  'puce',
  'prussian',
  'purple',
  'quartz',
  'red',
  'rose',
  'ruby',
  'salmon',
  'sandy',
  'sapphire',
  'scarlet',
  'silver',
  'sky',
  'tan',
  'tangerine',
  'turquoise',
  'teal',
  'violet',
  'white',
  'yellow',
  'gray',
  'coral',
  'wheat',
  'olden',
  'plum',
];

const parsedStore = parseStoreCache(storeCache.store);
const categories = [];
const sections = [];
const predictiveSearch = [];
const brands = [];

function commonLog(log) {
  Logger.publicLog(log, 'cyan');
}

async function writePredictiveSearch(searchJson) {
  const searchJsonString = JSON.stringify(searchJson);
  return new Promise((resolve) =>
    fs.writeFile(
      `${PREDICTIVE_SEARCH_OUTPUT}predictive-search.json`,
      searchJsonString,
      'utf8',
      (err) => {
        if (err) throw err;
        resolve();
      }
    )
  );
}

function productSearchHelper(cb) {
  parsedStore.forEach((sectionData) => {
    sectionData.data.forEach((categoryData) => {
      categoryData.data.forEach((product) => {
        cb({ section: sectionData.section, category: categoryData.category, product });
      });
    });
  });
}

function getPopularKeyTerms(keyWords) {
  const popularKeys = keyWords.reduce((counter, key) => {
    if (categories.includes(key) || sections.includes(key) || brands.includes(key)) return counter;
    counter[key] = 1 + counter[key] || 1;
    return counter;
  }, {});

  return Object.entries(popularKeys)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 50)
    .map((x) => x[0]);
}

function getCommonKeyTerms() {
  const keyWords = {};
  productSearchHelper(({ section, category, product }) => {
    const brandCase = product?.metaData?.brand;
    if (!sections.includes(section)) sections.push(section);
    if (!categories.includes(category)) categories.push(category);
    if (brands.includes(brandCase)) brands.push(lowerCase(brandCase));

    keyWords[category] = keyWords[category] || [];
    keyWords[category].push.apply(keyWords[category], product.topLevelData?.tags || []);
  });

  return Object.keys(keyWords).reduce(
    (acc, cur) => ({
      ...acc,
      [cur]: getPopularKeyTerms(keyWords[cur]),
    }),
    {}
  );
}

function pushKeyTerm(term) {
  const hasTerm = predictiveSearch.some((item) => JSON.stringify(item) === JSON.stringify(term));
  if (!hasTerm) predictiveSearch.push(term);
}

function generatePredictiveSearchTerms(commonSearchTerms) {
  predictiveSearch.push.apply(predictiveSearch, [
    ...brands.map((brand) => ({ brand })),
    ...categories.map((category) => ({ category })),
  ]);

  productSearchHelper(({ section, category, product }) => {
    const { brand: brandValue } = product.metaData;
    const brand = lowerCase(brandValue);
    const catPopularTerms = commonSearchTerms[category];
    const productColor = colors.find((term) => product.topLevelData.tags?.includes(term));
    const keyTerm = catPopularTerms.find((term) => {
      return !colors.includes(term) && term.length > 2 && product.topLevelData.tags?.includes(term);
    });

    pushKeyTerm({ brand, section, productColor, keyTerm, category });
  });
}

async function createPredictiveSearch() {
  commonLog('::: START BUILD SEARCH ::: ');
  commonLog('::: PARSED STORE ::: ');
  const commonSearchTerms = getCommonKeyTerms();
  commonLog('::: GOT KEY TERMS ::: ');
  commonLog('::: GENERATING PREDICTIVE SEARCH (MAY TAKE A SHORT WHILE) ::: ');
  generatePredictiveSearchTerms(commonSearchTerms);
  commonLog('::: FINISHED BUILD SEARCH ::: ');
  await writePredictiveSearch(predictiveSearch);
  commonLog('::: WRITE TO FILE SUCCESS ::: ');
}

createPredictiveSearch();
