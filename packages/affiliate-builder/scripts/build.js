import { getAffiliateSchema, prettyJson } from '../helpers';
import { mapSeries } from 'bluebird';
import affiliateCategoryList from '../affiliate-categories';
import { INCORRECT_CATEGORY_SCHEMA, INCORRECT_SECTION_SCHEMA } from '../constants/errors';
import { writeFileToOutput, cleanOutput, createOutput } from '../helpers/common';

function getCategoryLists() {
  const affiliateSections = [];
  const affiliateCategories = [];
  Object.keys(affiliateCategoryList).forEach((section) => {
    affiliateSections.push(section);
    for (const category of affiliateCategoryList[section]) {
      affiliateCategories.push(category);
    }
  });

  return { affiliateSections, affiliateCategories };
}

async function outputSchema(brandSchema, output) {
  return mapSeries(brandSchema, async (schema) => {
    const brandName = schema.brand.replace(/\s/, '-');
    const section = schema.section;
    const brandDir = `${output}/${brandName}/${section}`;
    const brandFolder = await createOutput(brandDir);
    const brandSubFolder = await createOutput(`${brandFolder}/${schema.category}`);
    await writeFileToOutput(`${brandSubFolder}/schema.json`, schema);
  });
}

function chunkCategoriesAndSchema(affilaiteSchemas) {
  const chunkedData = [];
  let currentChunk = {};
  affilaiteSchemas.forEach((item) => {
    if (item.categories) {
      currentChunk.categories = item;
    } else if (item.extracts) {
      currentChunk.schema = item;
    }

    if (currentChunk.categories && currentChunk.schema) {
      chunkedData.push(currentChunk);
      currentChunk = {};
    }
  });

  return chunkedData;
}

function constructBrandSchemas({ categories, schema }) {
  const { categories: brandCategories, meta } = categories;
  const { affiliateSections, affiliateCategories } = getCategoryLists();
  return brandCategories.map((category) => {
    const { category: categoryName, section } = category;

    if (!affiliateSections.includes(section)) {
      throw `${INCORRECT_SECTION_SCHEMA} for ${section} in ${prettyJson(category)} \n`;
    }

    if (!affiliateCategories.includes(categoryName)) {
      throw `${INCORRECT_CATEGORY_SCHEMA} for ${categoryName} in ${prettyJson(category)} \n`;
    }

    return {
      ...category,
      ...meta,
      ...schema,
    };
  });
}

async function outputSchemaFiles(chunkedDataByBrand) {
  const outputFileDir = __dirname + '/../output/affiliate-data-output/';

  await cleanOutput(outputFileDir);
  await createOutput(outputFileDir);

  chunkedDataByBrand.forEach(async (brand) => {
    try {
      const brandSchemas = constructBrandSchemas(brand);
      await outputSchema(brandSchemas, outputFileDir);
      console.log(`Schema output built for: \n${prettyJson(brand.categories.meta)}\n`);
    } catch (error) {
      console.log(error);
    }
  });
}

async function init() {
  const affilaiteSchemas = await getAffiliateSchema('affiliate-data', 'json');
  const chunkedDataByBrand = chunkCategoriesAndSchema(affilaiteSchemas);
  outputSchemaFiles(chunkedDataByBrand);
}

init();
