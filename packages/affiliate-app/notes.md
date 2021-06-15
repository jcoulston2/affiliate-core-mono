# Depricated extracts method

```javaScript

// Depreicated middleware used for the depreicatd extracts post
import { ERROR_INAVILD_TOKEN, ERROR_ACCESS, ERROR_EXTRACT_FORMAT } from '../constants';

export function verifyToken(req) {
  return new Promise((resolve, reject) => {
    const header = req.headers.authorization;
    const token = header && header.split(' ')[1];
    const secret = process.env.API_SECRET;

    if (!token) {
      reject({
        error: ERROR_ACCESS,
        status: 401,
      });
    } else if (token !== secret) {
      reject({
        error: ERROR_INAVILD_TOKEN,
        status: 401,
      });
    } else {
      resolve(req);
    }
  });
}

export function validateExtract(req, newStore) {
  return new Promise((resolve, reject) => {
    const sample = newStore[0];
    const { section, newStore: sectionData } = sample;
    const hasRequiredProps = !!(section && sectionData);

    if (!newStore.length || !Array.isArray(newStore) || !hasRequiredProps) {
      reject({
        error: ERROR_EXTRACT_FORMAT,
        status: 500,
      });
    } else {
      resolve(req);
    }
  });
}


// The was previously used to post extracts through an endpoint from the extractor to core
import { verifyToken } from '../../../middleware';
import { zipParseIncrements } from '../../../helpers/core';

let zippedStoreChunks = [];
const controller = {
  /**
   * @endpoint /store
   * @post
   * @description update the store
   */
  extracts: async (req, res) => {
    if (req.method === 'POST') {
      const { body } = req;
      const { chunk, endStream } = body;

      if (chunk) zippedStoreChunks.push(chunk);
      if (!endStream) res.status(200).send();

      const newStore = zipParseIncrements(zippedStoreChunks);
      zippedStoreChunks = [];

      try {
        await verifyToken(req);
        await AffiliateStore.setStore(newStore);
        res.status(200).json({
          success: true,
        });
      } catch ({ error, status }) {
        res.status(status).send(error);
      }
    } else if (req.method === 'GET') {
      const affiliateData = AffiliateStore.getStore();
      res.status(200).json(affiliateData);
    } else {
      this.error();
    }
  },
};

export default function handle(req, res) {
  const { query } = req;
  const [endpoint] = query?.endpoint;

  switch (endpoint) {
    case EXTRACTS:
      return controller.extracts(req, res);

    case STORE:
      return controller.store(req, res);

    case METRICS:
      return controller.metrics(req, res);

    default:
      return controller.error(req, res);
  }
}

```
