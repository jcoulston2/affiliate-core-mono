import messages from '../logger/logTypes';

/**
 * @Info Normalize into a more readable slack message
 */
export function consolidateErrors(logs) {
  const schemaLogs = logs.map((schemaLog) => {
    const { at, section, error, warning } = schemaLog;
    const logMessages = Object.keys(schemaLog)
      .reduce((acc, cur) => {
        let prop = schemaLog[cur];
        const isLog = prop.type && prop.message;
        return isLog ? [...acc, `${prop.type}: ${prop.message} at ${prop.at}`] : [...acc];
      }, [])

      // Remove duplicate logs (The crawler may throw the same log for each 'tile' on a plp)
      // if it's worth seeing those logs to help us identify what 'tile' there are errors/warnings
      // for then we can comment out this line of code
      .filter((item, index, self) => self.indexOf(item) === index)
      .join(' \n');

    return `${error || warning} - For section *${section}* at ${at} \n${logMessages}`;
  });

  return schemaLogs.join(' \n\n');
}

/**
 * @Info Handle the formatting of slack cycle notifications
 */
export function normalizeSlackNotification(extractorErrors, evaluationWarnings, currentIterable) {
  let attachments = [];
  const blocks = [];
  const hasErrors = extractorErrors && extractorErrors.length;
  const hasWarnings = evaluationWarnings && evaluationWarnings.length;
  const isCleanCycle = !hasErrors && !hasWarnings;
  const {
    slackErrorMessageBody,
    slackWarningMessageBody,
    slackCleanCycleMessageBody,
    slackCycleWarningInfo,
  } = messages;

  if (isCleanCycle) {
    blocks.push(slackCleanCycleMessageBody);
  } else {
    if (hasErrors) {
      attachments.push({
        text: `*ERRORS:* \n ${consolidateErrors(extractorErrors)}`,
      });
      blocks.push(slackErrorMessageBody(currentIterable, extractorErrors));
    }

    if (hasWarnings) {
      attachments.push({
        text: `*WARNINGS:* ${slackCycleWarningInfo}`,
      });
      blocks.push(slackWarningMessageBody(evaluationWarnings));
    }
  }

  return {
    text: 'An extract cycle finished',
    attachments,
    blocks: blocks.map((blockText) => ({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: blockText,
      },
    })),
  };
}
