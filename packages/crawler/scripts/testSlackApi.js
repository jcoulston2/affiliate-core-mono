import { normalizeSlackNotification } from '../helpers';
import { transmitLogsToSlack } from '../api';

const dummyMessage = [
  [
    {
      error: 'some error',
      at: 'some URL',
      section: 'womens | clothing | sportswear | new look | pageType: pdp',
    },
    {
      error: 'some error',
      at: 'some URL',
      section: 'womens | clothing | sportswear | new look | pageType: pdp',
    },
    {
      error: 'some error',
      at: 'some URL',
      section: 'womens | clothing | sportswear | new look | pageType: pdp',
    },
  ],
  [
    {
      '0': {
        type: 'warning',
        message:
          'Cannot get text: no text for "description". Selector: ".product-details-wrapper--mobile .product-details--description p"',
        at: 'extractFromElement',
      },
      at: 'some URL',
      section: 'womens | clothing | sportswear | new look | pageType: pdp',
    },
    {
      '1': {
        type: 'warning',
        message:
          'Cannot get text: no text for "description". Selector: ".product-details-wrapper--mobile .product-details--description p"',
        at: 'extractFromElement',
      },
      at: 'some URL',
      section: 'womens | clothing | sportswear | new look | pageType: pdp',
    },
  ],
  3,
];

async function init() {
  const response = await normalizeSlackNotification(...dummyMessage);
  transmitLogsToSlack(response);
}

init();
