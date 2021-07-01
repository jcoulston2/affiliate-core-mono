import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Logger } from '@affiliate-master/common';
import { evaluate } from '../helpers';

function commonLog(msg, c) {
  Logger.publicLog(msg, c || 'cyan');
}

// This is just a light version of the crawler that we can use for integration tests
export function validateUrl() {
  let browser;
  let page;

  return {
    setUpBrowser: async () => {
      await puppeteer.use(StealthPlugin());
      browser = await puppeteer.launch({
        headless: true,
      });
      page = await browser.newPage();
      await page.setDefaultNavigationTimeout(0);
      commonLog('::::: set up browser :::::');
    },

    testSchema: async (param, url, brand) => {
      const { delay } = param;

      commonLog(`validating URL: ${url}`);
      await page.goto(url);
      if (delay) await page.waitFor(delay);

      const extractedData = await page.evaluate(evaluate, param);
      const [extractedDataItem] = extractedData.data;

      // Print outputs
      commonLog(
        `
        ${Object.keys(extractedDataItem).reduce(
          (acc, cur) => {
            const value = extractedDataItem[cur];
            return `
        ${acc}         
        ${cur.toUpperCase()}: ${Array.isArray(value) ? `[${value[0]}, ....]` : value}
        `;
          },
          `
        BRAND: ${brand}

        
        URL: ${url} | validated
        `
        )}
            
      `,
        'green'
      );

      return { extractedDataItem };
    },

    closeSession: async () => {
      await browser.close();
      commonLog('::::: closed browser :::::');
    },
  };
}
