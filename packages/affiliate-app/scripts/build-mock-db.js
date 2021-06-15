import dummyData from './dummyData/batchOne';
import dotenv from 'dotenv';
import Store from '../server/store';
dotenv.config();

// TODO: beware, we should only run this script when building the database locally. Running this with the
// redis lab URI will wip the DB clean for the configured key.
async function buildDB() {
  const AffiliateStore = new Store();
  await AffiliateStore.connectRedisClient();
  await AffiliateStore.flush();
  console.log('::: POPULATING DB WITH DUMMY DATA... :::');
  await AffiliateStore.setStore(dummyData);
  console.log('::: DB BUILT WITH MOCK DATA... :::');
  const store = await AffiliateStore.getRedisStore(dummyData);
  console.log(store);
}

buildDB();
