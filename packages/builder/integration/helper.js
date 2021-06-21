import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { getFullSchemaUrl } from '@affiliate-master/common';

export function validateUrl() {
  let browser;
  let page;

  return {
    setUpBrowser: async () => {
      await puppeteer.use(StealthPlugin());
      browser = await puppeteer.launch({
        headless: false,
      });
      page = await browser.newPage();
      await page.setDefaultNavigationTimeout(0);
      console.log('::::: set up browser :::::');
    },

    testSchema: async (schema) => {
      const url = getFullSchemaUrl(schema);
      const {
        delay,
        productsSelector: { selector: testNode },
      } = schema?.extracts?.topLevel;
      console.log(`::::: validating URL: ${url} :::::`);
      await page.goto(url);
      if (delay) await page.waitFor(delay);

      const hasTestNode = await page.evaluate((testNode) => {
        return !!document.querySelector(testNode);
      }, testNode);

      console.log(`::::: ${url} validated :::::`);
      return hasTestNode;
    },

    closeSession: async () => {
      await browser.close();
      console.log('::::: closed browser :::::');
    },
  };
}
