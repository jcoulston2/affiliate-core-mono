// Env
export const NEXT_PUBLIC_PORT = process.env.NEXT_PUBLIC_PORT;
export const NEXT_PUBLIC_HOST = process.env.NEXT_PUBLIC_HOST;
export const DEV_LIGHT_MODE = process.env.DEV_LIGHT_MODE;
export const NODE_ENV = process.env.NODE_ENV;
export const IS_DEV = NODE_ENV !== 'production';
export const IS_PROD = NODE_ENV === 'production';
export const IS_DEV_LIGHT_MODE = DEV_LIGHT_MODE === 'true';
export const ALLOW_GOOGLE_INDEXING = process.env.NEXT_PUBLIC_ALLOW_GOOGLE_INDEXING;
export const URL = IS_PROD ? NEXT_PUBLIC_HOST : `${NEXT_PUBLIC_HOST}:${NEXT_PUBLIC_PORT}`;

// End points constant values
export const EXTRACTS = 'extracts';
export const METRICS = `metrics`;
export const STORE = 'store';
export const PREDICTIVE_SEARCH = 'predictive-search';
export const SEARCH = 'search';
export const CMS = `cms`;

export const SLACK_BOT_ENDPOINT = `https://hooks.slack.com/services/${process.env.SLACK_BOT_WEB_HOOK}`;
export const PRODUCTS_API_END_POINT = `${URL}/api/product/${STORE}`;
export const EXTRACTS_END_POINT = `${URL}/api/product/${EXTRACTS}`;
export const METRICS_END_POINT = `${URL}/api/product/${METRICS}`;
export const CMS_API_END_POINT = `${URL}/api/${CMS}`;
export const PREDICTIVE_SEARCH_API_END_POINT = `${URL}/api/${PREDICTIVE_SEARCH}`;
export const SEARCH_API_END_POINT = `${URL}/api/${SEARCH}`;

// tracking
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

// Break points
export const BREAK_POINT_MOBILE = 'mobile';
export const BREAK_POINT_TABLET = 'tablet';
export const BREAK_POINT_DESKTOP = 'desktop';

// Other
export const USER_SETTINGS_KEY = 'user-settings';
export const WISH_LIST_KEY = 'wish-list';
export const MODALS_PREVENTED = 'modals-prevented';
