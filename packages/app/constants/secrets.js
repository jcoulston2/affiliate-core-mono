// IMPORTANT: These secrets should not be exposed to the client. Therefore they should not be exported
// in the "index.js" file. These should only be used by a serverless function and not imported into a client
// side file
export const API_AUTH = process.env.API_SECRET;
export const API_WHITELIST = process.env.API_WHITELIST;
