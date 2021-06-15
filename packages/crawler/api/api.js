import axios from 'axios';
import { SLACK_BOT_ENDPOINT, AFFILIATE_CORE_ENDPOINT } from '../constants';
import zippedStore from '../__store-cache__/store-cache.json';
import { chunkStore } from '../helpers';
import * as Promise from 'bluebird';
import Logger from '../logger/Logger';
import messages from '../logger/logTypes';

const auth = {
  headers: { Authorization: `Bearer ${process.env.API_SECRET}` },
};

const axiosConfig = {
  ...auth,
  maxContentLength: 10e7,
  maxBodyLength: 10e7,
};

/**
 * @Info See below regarding the current state of the 'transmitExtractsToCore' API. Using the api may potentially transfer very large amounts of data and since Vercel serverless
 * does not support streaming, we need to a steady recursive solution to transfer the data in chunks. The purpose of this call, is to tell core that the 'stream' has finished
 */

export async function endExtractsRequestStream() {
  return await axios.post(AFFILIATE_CORE_ENDPOINT, { endStream: true }, axiosConfig);
}

/**
 * @Info IMPORTANT! At the moment the 'transmitExtractsToCore' API is not currently used. Due to the limitations of Zeit Vercel's serverless architecture in production
 * during this inital phase, the transfer of information will be transferred statically and then pushed to core via git / deploy. This is not the ideal solution and we
 * would like to use this api as a more robust solution without having the need to deploy to update the affiliate store.
 */

export async function transmitExtractsToCore() {
  const zipped = zippedStore.store;
  const storeChunks = chunkStore(zipped);

  try {
    await Promise.mapSeries(storeChunks, async (chunk) => {
      return await axios.post(AFFILIATE_CORE_ENDPOINT, { chunk }, { axiosConfig });
    });

    const {
      data: { success },
    } = await endExtractsRequestStream();
    return { success };
  } catch (error) {
    return {
      success: false,
      error: `${error}`,
    };
  }
}

export async function getExtractsFromCore() {
  try {
    const response = await axios.get(AFFILIATE_CORE_ENDPOINT, axiosConfig);
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: `${error}`,
    };
  }
}

export async function transmitLogsToSlack(logs) {
  try {
    return await axios.post(SLACK_BOT_ENDPOINT, logs);
  } catch (e) {
    Logger.publicLog(messages.couldNotSendToSlack, 'blue');
  }
}
