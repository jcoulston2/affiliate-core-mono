//@flow

// TODO: we need to make the redis import work
// import redis from 'redis';
import * as Promise from 'bluebird';
import { IS_PROD, IS_DEV } from '../../constants';
import storeCache from '../../__store-cache__/store-cache.json';
import { zipParse } from '../../helpers/common';
import { type ParsedStore, type SerializedStore } from '../../types/store';

/**
 * @Info The Store class acts as an in memory storage cache and talks to the database. The logic when to
 * fetch the data from the DB lives here. Where possible, the storage is all in memory and when the extractor
 * service sends a routine payload of products, this is stored here as a cache, we also update the database.
 * The only time we fetch from the database is when the server starts / rebuilds, this prevents the data from
 * being lost every time the server is rebuilt.
 */

type StoreConfig = {
  useRedis: boolean,
};

class Store {
  redisHost: string;
  redisPort: string;
  redisAuth: string;
  redisKey: string;
  redisRequireAuth: boolean;
  redisClientAuthPromise: Function;
  redisFlushPromise: Function;
  redisSetPromise: Function;
  redisGetPromise: Function;
  redisClient: Object;
  store: Array<any> | Object;

  // TODO: needs trimming
  constructor(data: any, config: StoreConfig = {}): void {
    this.store = data || null;

    // TODO: document but remove
    // REDIS_PORT=19338
    // REDIS_HOST=redis-19338.c8.us-east-1-2.ec2.cloud.redislabs.com
    // REDIS_PASS=P9bI56wmohIikUs7ym3KRCtYAVvSOo8s
    // REDIS_KEY=test
    this.redisHost = '';
    this.redisPort = '';
    this.redisAuth = '';
    this.redisKey = '';
    this.redisRequireAuth = IS_PROD;

    if (config.useRedis) {
      this.redisClient = redis.createClient({
        port: this.redisPort,
        host: this.redisHost,
        no_ready_check: true,
      });
    }
  }

  listenToConnections(): void {
    this.redisClient.on('connect', () => {
      console.log(':::REDIS CLIENT CONNECTED:::');
    });
    this.redisClient.on('error', (errpr) => {
      console.log(`:::REDIS ERROR::: ${errpr}`);
    });
  }

  promisifyRedisMethods(): void {
    const context = {
      context: this.redisClient,
    };

    this.redisClientAuthPromise = Promise.promisify(this.redisClient.auth, context);
    this.redisFlushPromise = Promise.promisify(this.redisClient.del, context);
    this.redisSetPromise = Promise.promisify(this.redisClient.set, context);
    this.redisGetPromise = Promise.promisify(this.redisClient.get, context);
  }

  serialize(data: Object): string {
    return JSON.stringify(data);
  }

  // Attempts to build from Redis cloud, if there is no redis store, fallback to
  // to pre-provided constructor value for store or else give an empty array
  async buildStoreFromRedis(): Promise<ParsedStore> {
    const redisStore = await this.redisGetPromise<Promise<any>>(this.redisKey);
    this.store = redisStore ? JSON.parse(redisStore) : this.store || [];
    return this.store;
  }

  async connectRedisClient(): Promise<ParsedStore> {
    this.listenToConnections();
    this.promisifyRedisMethods();
    if (this.redisRequireAuth) await this.redisClientAuthPromise<Promise<any>>(this.redisAuth);
    return await this.buildStoreFromRedis();
  }

  async flush(): Promise<any> {
    await this.redisFlushPromise(this.redisKey);
    const checkFlushed = await this.redisGetPromise<Promise<any>>(this.redisKey);
    if (!checkFlushed) console.log(`FLUSHED ${this.redisKey}`);
  }

  async setStore(
    affiliateData: Array<any> | Object
  ): Promise<{ success: boolean, error?: string }> {
    this.store = affiliateData;

    try {
      if (this.redisClient) {
        await this.redisSetPromise<Promise<any>>(this.redisKey, this.serialize(affiliateData));
      }
      return {
        success: true,
      };
    } catch (e) {
      return {
        success: false,
        error: `${e}`,
      };
    }
  }

  // Redis only
  async getRedisStore(): Promise<ParsedStore> {
    const store = await this.redisGetPromise<Promise<any>>(this.redisKey);
    return JSON.parse(store);
  }

  // Redis only
  getStore(): Promise<ParsedStore> {
    return this.store;
  }
}

const configuredStore = new Store(zipParse(storeCache.store), { useRedis: false });

export { configuredStore, Store };
