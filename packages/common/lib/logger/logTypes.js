import chalk from 'chalk';

const logs = {
  urlNotAnArray: 'Urls needs to be an array',
  coolOff: `Entering a cool off phase`,
  multipleUrlsDefined: `You have defined multiple url params but you have defined more than one base url in your params e.g. urls: [item, item] you must have an array of only one item if you are defining multipleUrl params`,
  crawlDelay: 'Entering crawl delay - this will ony be a short while!',
  pdpHasNoImages: 'Crawler was not able to obtain images for this PDP',
  caughtEvaluateError: `An error was caught on page "goTo" / evaluation`,
  slackStartingCycle: '*Starting cycle*',
  slackExtractCoreFailure: ':broken_heart: Extracts was sent to core but failed',
  slackCleanCycleMessageBody: `:green_heart: Cycle completed successfully with no errors. `,
  slackExtractCoreSuccess: `:green_heart: Extracts was stored in core memory successfully`,
  slackCycleWarningInfo: `To see more information about the warnings, please refer to the detailed logs`,
  couldNotSendToSlack: 'Could not send to slack, check your slack keys and connection',
  writeStoreToCacheSuccess: 'extracts written to store cache',
  fullCycleEnded: 'The full cycle has ended!',
  e2eFinished:
    'e2e has finished. Note that no store cache is written since this is an e2e test. The concluded extracts have been copied to your clipboard',
  shufflingFeed: 'shuffling feed',
  cycleSuccess: chalk.green.bold('SUCCESS'),
  cycleWarning: chalk.yellow.bold('WARNING'),

  slackFinishedCycle: (numberOfcralwedProducts, totalCycleTime, warnings, errors) => `
    *Finished cycle* 
    - ${numberOfcralwedProducts} products crawled 
    - ${totalCycleTime} total time
    - ${warnings} warnings
    - ${errors} errors
  `,

  slackErrorMessageBody: (currentIterable, errors) =>
    `:broken_heart: Found ${errors.length} Errors. The Cycle finiched at at iterable ${currentIterable} - the full error(s) are attached below. If the cycle broke before finishing a full cycle, it will start at the next iterable. Refer to the logs for more detailed info about the errors`,

  slackWarningMessageBody: (evaluationWarnings) =>
    `:yellow_heart: Cycle completed with ${evaluationWarnings.length} warnings`,

  slackBatchMetrics: (metrics) => `
    *Cycle batch metrics*
    - cautiousProducts: ${metrics.cautiousProducts.length}
    - removedProducts: ${metrics.removedProducts.length}
    - cautiousCategories: ${metrics.cautiousCategories.length}
  `,

  batchProductsAnalysed: (noProducts) => `Batch pipe: ${noProducts} analysed`,
};

const termialCycleLogs = {
  writeStoreToCacheFail: (e) => `Failed to write to store cache: ERROR: ${e}`,
  cycleCompleted: (numWarnings) => `Cycle completed with ${chalk.yellow(numWarnings)} warnings`,
  evalWarning: (w) => `${w.map(({ message: m }) => ` - ${logs.cycleWarning}: ${m}`).join(' \n')}`,
  crawlSuccessPdp: (path) => `${logs.cycleSuccess} crawl PDP: ${path}`,
  crawlSuccessPdpWarning: (path) => `${logs.cycleSuccess} crawl PDP (warnings): ${path}`,
  crawlSuccessPlp: (path, domain) => `${logs.cycleSuccess} crawl PLP: ${domain} at ${path}`,
  crawlSuccessPlpWarning: (path, domain) =>
    `${logs.cycleSuccess} crawl PLP (warnings: ${domain} at ${path}`,
  batchFail: (e) => `Failed to batch extracts against current store: ERROR: ${e}`,
  batchSuccess: ({ cautiousProducts, removedProducts, cautiousCategories }) => `
  Batch succeeded with the following metrics:
  
  - cautiousProducts: 
    - ${
      cautiousProducts
        .map((prod) => `${prod.category} | ${prod.link} | ${prod.name} | ${prod.section}`)
        .join(' ::: ') || 'none'
    }

  - removedProducts: 
    - ${
      removedProducts
        .map((prod) => `${prod.category} | ${prod.link} | ${prod.name} | ${prod.section}`)
        .join(' ::: ') || 'none'
    }
  
  - cautiousCategories: 
    - ${
      cautiousCategories
        .map((prod) => `${prod.section} | ${prod.category} | ${prod.label}`)
        .join(' ::: ') || 'none'
    }
  `,
};

export const messages = {
  ...logs,
  ...termialCycleLogs,
};
