import fs from 'fs';

const templateSchema = {
  extracts: {
    topLevel: {
      scrollPage: true,
      scrollPageWaitTime: 15000,
      waitForNode: null,
      delay: 0,
      productsSelector: {
        selector: '____',
      },
      data: {
        name: {
          selector: '____',
          getDataFrom: 'text',
        },
        price: {
          selector: '____',
          getDataFrom: 'text',
        },
        wasPrice: {
          selector: '____',
          getDataFrom: 'text',
          isConditional: true,
        },
        link: {
          selector: '____',
          getDataFrom: 'attr: href',
        },
        image: {
          selector: '____',
          getDataFrom: 'attr: src',
        },
      },
    },
    details: {
      data: {
        images: {
          selector: '____',
          getDataFrom: 'attr: src',
        },
        selectedColor: {
          selector: '____',
          getDataFrom: 'text',
        },
      },
    },
  },
  urlCategoryIdentifier: {
    anythingBefore: '/',
    anythingAfter: '/',
  },
  meta: {
    hasMoreVariationsText: 'More colors available',
  },
};

export function createFolder(dir) {
  return new Promise((resolve) => fs.mkdir(dir, { recursive: true }, (err) => resolve(dir)));
}

export async function writeSchemaFolder(extracts) {
  try {
    const brandName = process.argv[2];
    const outputFileDir = __dirname + `/../affiliate-data/${brandName || 'TEMPLATE'}`;
    await createFolder(outputFileDir);
    const promises = [
      {
        dir: `${outputFileDir}/categories.json`,
        text: '',
      },
      {
        dir: `${outputFileDir}/schema.json`,
        text: JSON.stringify(templateSchema, null, 2),
      },
    ].map(({ dir, text }) => {
      return new Promise((resolve) => {
        fs.writeFile(dir, text, 'utf8', () => resolve());
      });
    });

    return Promise.all(promises);
  } catch (error) {
    console.log(':: ERROR ::', error);
  }
}

async function init() {
  await writeSchemaFolder();
  console.log(':::: CREATED NEW SCHEMA TEMPLATE ::::');
}

init();
