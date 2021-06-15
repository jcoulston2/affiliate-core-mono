import dotenv from 'dotenv';
import Store from '../server/store';
dotenv.config();

// TODO: beware, we should only run this script when building the database locally. Running this with the
// redis lab URI will wip the DB clean for the configured key.
async function flushDB() {
  const AffiliateStore = new Store();
  await AffiliateStore.connectRedisClient();
  await AffiliateStore.flush();
}

flushDB();
