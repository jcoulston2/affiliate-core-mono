import axios from 'axios';
import { SLACK_BOT_ENDPOINT } from '../constants';
import { Logger, messages } from '@affiliate-master/common';

export async function transmitLogsToSlack(logs) {
  try {
    return await axios.post(SLACK_BOT_ENDPOINT, logs);
  } catch (e) {
    Logger.publicLog(messages.couldNotSendToSlack, 'blue');
  }
}
