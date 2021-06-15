import { transmitExtractsToCore, getExtractsFromCore } from '../api';

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
    },
  },
];

const templateDataLevelOne = [
  {
    category: 'tops',
    label: 'clothing',
    data: templateDataLevelTwo,
  },
];

const template = {
  section: 'other',
  data: templateDataLevelOne,
};

function sizePayload(numberOfDataItems) {
  const templateData = Array(numberOfDataItems).fill(templateDataLevelTwo[0]);
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
      return sizePayload(25000);
  }
}

async function init(payloadSize = 'tiny') {
  const payload = getPayload(payloadSize);
  const resposnePOST = await transmitExtractsToCore(payload);
  console.log('POST EXTRACTS', resposnePOST);
  const responseGET = await getExtractsFromCore();
  console.log('GET EXTRACTS', responseGET);
}

init('small');
