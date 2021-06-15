import dotenv from 'dotenv';
dotenv.config();

export const NODE_ENV = `${process.env.NODE_ENV}`;
export const IS_DEV = NODE_ENV === 'dev';
export const IS_PROD = NODE_ENV === 'production';
export const IS_TEST = NODE_ENV === 'test';
export const SLACK_BOT_ENDPOINT = `https://hooks.slack.com/services/${process.env.SLACK_BOT_WEB_HOOK}`;

// The below currently experimental (but working with core API)
export const AFFILIATE_CORE_ENDPOINT = `${AFFILIATE_CORE_URL}/api/product/extracts`;
export const AFFILIATE_CORE_ENDPOINT_DEV = process.env.AFFILIATE_CORE_ENDPOINT_DEV;
export const AFFILIATE_CORE_ENDPOINT_PROD = process.env.AFFILIATE_CORE_ENDPOINT_PROD;
export const AFFILIATE_CORE_URL = IS_PROD
  ? AFFILIATE_CORE_ENDPOINT_PROD
  : AFFILIATE_CORE_ENDPOINT_DEV;
