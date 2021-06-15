import affiliateCategories from '../affiliate-categories';
import { writeFileToOutput, cleanOutput, createOutput, urlCase } from '../helpers/common';

function generateStaticListingPaths() {
  const paths = [];
  for (const section of Object.keys(affiliateCategories)) {
    for (const category of affiliateCategories[section]) {
      paths.push({ params: { slug: [urlCase(section), urlCase(category)] } });
    }
  }

  return paths;
}

async function init() {
  const outputFileDir = __dirname + '/../output/static-paths/';
  await cleanOutput(outputFileDir);
  await createOutput(outputFileDir);
  const pathsJson = generateStaticListingPaths();
  await writeFileToOutput(`${outputFileDir}static-paths.json`, pathsJson);
  console.log('::: Built static paths :::');
}

init();
