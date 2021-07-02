import mockSettings from './integration/setUpMocks';
import puppeteer from 'puppeteer-extra';
import * as Promise from 'bluebird';
import fs from 'fs-extra';
import randomUA from 'modern-random-ua';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

const outputFilePromise = Promise.promisify(fs.outputFile);
const realMocksDir = __dirname + `/mocks/page-mocks/real-mocks`;

async function writeMocks(pageMocks) {
  return await Promise.mapSeries(pageMocks, async ({ brand, plp, pdp }) => {
    const mockedPlpDir = `${realMocksDir}/${brand}/plp/mock.txt`;
    const mockedPdpDir = `${realMocksDir}/${brand}/pdp/mock.txt`;

    await outputFilePromise(mockedPlpDir, plp);
    await outputFilePromise(mockedPdpDir, pdp);

    return;
  });
}

function scrollPageBeforeExtract() {
  const documentHeight = document.body.scrollHeight;
  const scrollBy = 300;
  const scrollIntervals = documentHeight / scrollBy;
  let nextScroll = 0;
  const initScroll = (counter) => {
    if (counter >= scrollIntervals) return;
    setTimeout(() => {
      nextScroll += scrollBy;
      counter++;
      document.scrollingElement.scrollTop = nextScroll;
      initScroll(counter);
    }, 2);
  };

  initScroll(0);
}

async function pullPageMocks() {
  await puppeteer.use(StealthPlugin());
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.setUserAgent(randomUA.generate());

  async function getPageContent(url, containerSelector, pageDelay, scrollPage) {
    await page.goto(url);
    await page.cookies();
    if (pageDelay) await Promise.delay(pageDelay);
    if (scrollPage) {
      console.log(`Scrolling page: ${url}`);
      await page.evaluate(scrollPageBeforeExtract);
      await Promise.delay(5000);
    }

    const mockHtml = await page.evaluate((containerSelector) => {
      return document.querySelector(containerSelector).outerHTML;
    }, containerSelector);
    return mockHtml.replace(/\s\s\s+/g, '');
  }

  async function getBrandMocks({
    domain,
    plpExample,
    containerSelectorPlp,
    pdpExample,
    containerSelectorPdp,
    pageDelay,
    scrollPage,
  }) {
    const plpUrl = domain + plpExample;
    const pdpUrl = domain + pdpExample;

    const [plp, pdp] = await Promise.mapSeries(
      [
        {
          url: plpUrl,
          container: containerSelectorPlp,
        },
        {
          url: pdpUrl,
          container: containerSelectorPdp,
        },
      ],
      async ({ url, container }) => {
        return getPageContent(url, container, pageDelay, scrollPage);
      }
    );

    return {
      plp,
      pdp,
    };
  }

  async function getAllMocks() {
    const mocks = await Promise.mapSeries(mockSettings, async (mockSetting) => {
      const { brand, ...instructionsToPullMocks } = mockSetting;
      const mocks = await getBrandMocks(instructionsToPullMocks);
      console.log(`::::::: pulled PLP and PDP mocks for ${brand} :::::::`);
      return {
        ...mocks,
        brand,
      };
    });

    return mocks;
  }

  const mocks = await getAllMocks();
  await browser.close();

  return mocks;
}

async function init() {
  const pageMocks = await pullPageMocks(mockSettings);
  await writeMocks(pageMocks);
  console.log(`::::::: Updated all mocks :::::::`);
}

init();
