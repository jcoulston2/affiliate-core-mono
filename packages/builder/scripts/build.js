import { mapSeries } from 'bluebird';
import {
  getAffiliateSchema,
  prettyJson,
  writeFileToOutput,
  cleanOutput,
  createOutput,
  urlCase,
} from '@affiliate-master/common';
import { affiliateCategories as affiliateCategoryList } from '@affiliate-master/config';
import { INCORRECT_CATEGORY_SCHEMA, INCORRECT_SECTION_SCHEMA } from '../constants/errors';
import { BUILD_DATA_INPUT, BUILD_DATA_OUTPUT, BUILD_STATIC_PATHS_OUTPUT } from '../constants/paths';

function getStaticListingPaths() {
  const paths = [];
  for (const section of Object.keys(affiliateCategoryList)) {
    for (const category of affiliateCategoryList[section]) {
      paths.push({ params: { slug: [urlCase(section), urlCase(category)] } });
    }
  }

  return paths;
}

async function generateStaticListingPaths() {
  await cleanOutput(BUILD_STATIC_PATHS_OUTPUT);
  await createOutput(BUILD_STATIC_PATHS_OUTPUT);
  const pathsJson = getStaticListingPaths();
  await writeFileToOutput(`${BUILD_STATIC_PATHS_OUTPUT}static-paths.json`, pathsJson);
  console.log('::: Built static paths :::');
}

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
  await cleanOutput(BUILD_DATA_OUTPUT);
  await createOutput(BUILD_DATA_OUTPUT);

  chunkedDataByBrand.forEach(async (brand) => {
    try {
      const brandSchemas = constructBrandSchemas(brand);
      await outputSchema(brandSchemas, BUILD_DATA_OUTPUT);
      console.log(`Schema output built for: \n${prettyJson(brand.categories.meta)}\n`);
    } catch (error) {
      console.log(error);
    }
  });
}

async function init() {
  const affilaiteSchemas = await getAffiliateSchema(BUILD_DATA_INPUT, 'json');
  const chunkedDataByBrand = chunkCategoriesAndSchema(affilaiteSchemas);
  await outputSchemaFiles(chunkedDataByBrand);
  await generateStaticListingPaths();
  console.log(
    'Built affiliate definitions in packages/store. We will now need a package reboot to update dependencies'
  );
}

init();
