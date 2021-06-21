import { writeStoreCache, zipParse as parseStoreCache } from '@affiliate-master/common';
import { storeCache } from '@affiliate-master/store';
import BatchPipe from '../batching/BatchPipe';
import moment from 'moment';

const genId = () => Math.random() + '';
const templateDataLevelTwo = [
  {
    topLevelData: {
      name: 'test prod',
      price: '£32.00 (60% OFF)',
      wasPrice: '£80.00',
      link: '/products/utility-jumpsuit-dark-green-jla008210',
      image: ['https//img'],
      tags: ['khaki', 'utility', 'jumpsuit'],
    },
    detailedData: {
      images: ['https//img'],
      description: ['des'],
      selectedColor: 'Green',
      delivery: ['UK'],
      variants: [
        {
          variantText: 'Colors',
          data: ['data'],
        },
        {
          variantText: 'Sizes',
          data: [{ value: '6', soldOut: true }],
        },
      ],
      custom: [
        {
          customText: 'Product Code',
          data: {
            value: ['PRODUCT-SKU AW19-1000066857-DEN-14'],
            isDescriptive: true,
          },
        },
      ],
    },
    metaData: {
      domain: 'https://www.isawitfirst.com',
      brand: 'isawitfirst',
      markedCautiousTimes: 1,
    },
  },
];

const templateDataLevelOne = [
  {
    category: 'tops',
    label: 'clothing',
    data: templateDataLevelTwo,
    categoryLastUpdated: moment().format(),
  },
];

const template = {
  section: 'other',
  data: templateDataLevelOne,
};

function sizePayload(numberOfDataItems) {
  const templateData = Array(numberOfDataItems)
    .fill(templateDataLevelTwo[0])
    .map((info) => ({
      ...info,
      topLevelData: {
        // Randomize some properties for testing the compression
        name: genId(),
        price: genId(),
        wasPrice: genId(),
        link: genId(),
        image: [genId(), genId(), genId(), genId()],
        tags: [genId(), genId(), genId(), genId(), genId()],
      },
    }));
  const newTemplate = {
    ...template,
    data: [
      {
        ...templateDataLevelOne[0],
        data: templateData,
      },
    ],
  };

  const schemas = ['other', 'mens', 'womens', 'new'];

  return schemas.map((section) => ({ ...newTemplate, section }));
}

function getPayload(payloadSize) {
  switch (payloadSize) {
    case 'one':
      return [template];

    case 'tiny':
      return sizePayload(1);

    case 'small':
      return sizePayload(10);

    case 'medium':
      return sizePayload(500);

    case 'large':
      return sizePayload(1500);

    case 'extra large':
      return sizePayload(10000);

    case 'super large':
      // current max size on the free plan is roughly 25,000 (100,000)
      return sizePayload(25000);
  }
}

async function init(payloadSize = 'one') {
  const copyToClipBoard = false;
  console.log(':: WRITING TO STORE CACHE ::');
  const payload = getPayload(payloadSize);
  await writeStoreCache(payload);
  console.log(':: EXTRACTS WRITE TO CACHE SUCCESS ::');
  console.log(`:: STORE CACHE :: ${payload}`);
  console.log(':::::::::::::::::::::');
  console.log(':: TESTING BATCH PIPE (THIS MAY TAKE A WHILE FOR A LARGE STORE...) ::');
  const Batch = new BatchPipe({
    currentBatch: payload,
    incomingBatch: parseStoreCache(storeCache.store),
    persistOldProductsUntilRound: 5,
  });
  const { metrics } = Batch.processBatch();
  console.log(':: BATCH PIPE DONE ::');
  console.log(`:: BATCH PIPE METRICS :: ${metrics}`);

  if (copyToClipBoard) {
    const proc = require('child_process').spawn('pbcopy');
    proc.stdin.write(JSON.stringify(payload));
    proc.stdin.end();
    console.log(`:: STORE HAS BEEN COPIED TO CLIPBOARD ::`);
  }
}

init('one');
