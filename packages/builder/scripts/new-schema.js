import fs from 'fs';
import { createOutput, Logger } from '@affiliate-master/common';
import { AFF_DATA } from '../constants/errors';

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

function commonLog(log) {
  Logger.publicLog(log, 'cyan');
}

export async function writeSchemaFolder() {
  try {
    const brandName = process.argv[2];
    const outputFileDir = `${AFF_DATA}${brandName || 'TEMPLATE'}`;
    await createOutput(outputFileDir);
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
    commonLog(':: ERROR ::', error);
  }
}

async function init() {
  await writeSchemaFolder();
  commonLog(':::: CREATED NEW SCHEMA TEMPLATE ::::');
}

init();
