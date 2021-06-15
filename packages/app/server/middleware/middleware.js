//@flow
import Cors from 'cors';
import { API_WHITELIST } from '@constants/secrets';

const whitelist: Array<string> = JSON.parse(API_WHITELIST);
const corsConfig: Object = {
  origin: (origin, cb) => {
    if (!whitelist.length || whitelist.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error('Accessing this API is not allowed'));
    }
  },
};

export function createMiddleware(middleware: Function): Function {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

export const baseMiddleware: Function = createMiddleware(Cors(corsConfig));
