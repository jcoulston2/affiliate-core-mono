import initPageEvaluation, { scrollPageBeforeExtract } from '../evaluation/evaluation';
import * as Promise from 'bluebird';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import Logger from '../logger/Logger';
import messages from '../logger/logTypes';
import randomUA from 'modern-random-ua';
import 'regenerator-runtime/runtime';
import { assignToExtract, normalizeProductDetail, normalizeProductTopLevel } from '../helpers';

/**
 * @Info The Extractor takes an array of affiliate schemas and generates a new full scrape cycle
 * based off the requirements of the schema. The cycle is an asynchronous promise based chain
 * and Extracts are then returnd once the cycle has finished, or has broken in which case only
 * the successful extracts are returned and the given iterable at which it the extractor broke.
 */
export default class Extractor {
  constructor(schemas, currentIterable, headless = true) {
    this.browser;
    this.page;
    this.logger;
    this.extracts = [];
    this.evaluationWarnings = [];
    this.extractorErrors = [];
    this.schemas = schemas;
    this.numberOfcrawledProducts = 0;
    this.initPageEvaluation = initPageEvaluation;
    this.currentIterable = currentIterable;
    this.maxPlpPageTimeout = 500000;
    this.maxPdpPageTimeout = 8000;
    this.pupeteerConfig = {
      headless,
      args: [
        '--enable-features=NetworkService',
        '~/Library/Application Support/Google/Default',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.146 Safari/537.36"',
      ],
      ignoreHTTPSErrors: true,
      slowMo: 10,
    };
  }

  /**
   * @Info If there are warnings for a given page crawl, keep a trace of the warnings, these will be
   * returned as meta data by the extractor for a given crawl
   */
  pushCrawlWarnings(warnings, url, meta, pageType) {
    if (warnings && warnings.length) {
      const evalWarning = messages.evalWarning(warnings);
      this.logger.warning(evalWarning);
      this.evaluationWarnings.push({
        ...warnings,
        at: meta.domain + url,
        section: `${meta.section} | ${meta.label} | ${meta.category} | ${meta.brand} | pageType: ${pageType}`,
      });
    }
  }

  /**
   * @Info Push and hold the current error for logging
   */
  pushCrawlError(error, url, meta) {
    const logInfo = meta
      ? {
          at: meta.domain + meta.url,
          section: `${meta.section} | ${meta.label} | ${meta.category} | ${meta.brand}`,
        }
      : {};

    this.logger.error(`${messages.caughtEvaluateError}: ${error}`);
    this.extractorErrors.push({
      error,
      ...logInfo,
    });
  }

  /**
   * @Info Puppeteer provides a goto method, however we can't set a timeout to a page and have it resolve a promise cleanly without an error
   * so we also define a timeout as a separate promise and race them, if the page resolves first, then great! If the timeout resolves first we
   * can assume that the page has still rendered.
   */
  async gotoPage(url, pageTimeout) {
    const gotoPromsie = async () => await this.page.goto(url);
    const delayFallbackPromsie = async () => await Promise.delay(pageTimeout);
    await Promise.race([gotoPromsie(), delayFallbackPromsie()]);
  }

  /**
   * @Info Our main worker function that directs our headless chrome instance to a page to extract the information
   * from that page. The data is evaluated, obtainied and returned
   */

  async crawler(url, param, pageTimeout) {
    if (!url) return;
    await this.gotoPage(url, pageTimeout);
    if (param.waitForCookies) await this.page.cookies();
    if (param.waitForNode) await this.page.waitForSelector(param.waitForNode);
    if (param.delay) await this.page.waitFor(param.delay);
    if (param.scrollPage) {
      await this.page.evaluate(scrollPageBeforeExtract);
      await Promise.delay(param.scrollPageWaitTime || 5000);
    }
    return await this.page.evaluate(initPageEvaluation, param);
  }

  /**
   * @Info Crawl a PLP. Returns 'top level data' for all products on a page. The links are also given
   * which in turn are used as references to crawl a PDP
   */
  async crawlPlp(plpDataSchema, domain, plpUrl, param) {
    const plpCrawlUrl = domain + plpUrl;
    let productData;

    try {
      productData = await this.crawler(plpCrawlUrl, plpDataSchema, this.maxPlpPageTimeout);
    } catch (error) {
      this.pushCrawlError(error, plpUrl, param);
    }

    if (!productData) return null;
    const { warnings: plpWarnings, data: plpData } = productData;
    if (!plpWarnings.length) {
      this.logger.prompt(messages.crawlSuccessPlp(domain, plpUrl), true);
    } else {
      this.logger.prompt(messages.crawlSuccessPlpWarning(domain, plpUrl, plpWarnings));
    }

    this.pushCrawlWarnings(plpWarnings, plpUrl, param, 'plp');
    return plpData;
  }

  /**
   * @Info Crawl a PDP. The top level data returned from a PLP crawl includes a PDP link which is used to
   * crawl a given PDP. Returns further information about that product including images and any variants
   */
  async crawlPdp(pdpDataSchema, topLevelData, domain, param) {
    let { link: crawledLink } = topLevelData;
    const link = Array.isArray(crawledLink) ? crawledLink[0] : crawledLink;
    const pdpCrawlUrl = link.includes(domain) ? link : domain + link;
    let productData;

    if (!link || !topLevelData) return null;

    try {
      productData = await this.crawler(pdpCrawlUrl, pdpDataSchema, this.maxPdpPageTimeout);
    } catch (error) {
      this.pushCrawlError(error, link, param);
    }

    if (!productData) return null;
    const { warnings: pdpWarnings, data: pdpData } = productData;

    if (!pdpWarnings.length) {
      this.logger.prompt(messages.crawlSuccessPdp(link));
    } else {
      this.logger.prompt(messages.crawlSuccessPdpWarning(link));
    }

    this.pushCrawlWarnings(pdpWarnings, link, param, 'pdp');
    this.numberOfcrawledProducts++;
    return pdpData;
  }

  /**
   * @Info Handles the crawl of a single whole page right from all the listing data through to the last product
   * tile / PDP given on a listing page. The order of execution is as follows: the listing page is crawled first
   * and top level is gathered for all products listed, this includes data such as listing img, price and
   * a PDP / detail link. The crawler then asynchronously crawls each PDP link through to the last link giving a
   * full set of product information
   */
  async crawlUrl(plpUrl, param) {
    const { extracts, domain, brand } = param;
    const plpData = await this.crawlPlp(extracts.topLevel, domain, plpUrl, param);

    if (!plpData) return null;

    // Get detailed data
    const productsDetailedLevelData = await Promise.mapSeries(plpData, async (topLevelData) => {
      const [pdpData] = (await this.crawlPdp(extracts.details, topLevelData, domain, param)) || [];
      return {
        topLevelData: normalizeProductTopLevel(topLevelData),
        detailedData: normalizeProductDetail(pdpData),
        metaData: {
          domain,
          brand,
        },
      };
    });

    return productsDetailedLevelData;
  }

  /**
   * @Info Handles the crawling logic for a given URL in a schema. The crawl is promise based per URL
   * and the returned single crawl is then pushed to this.extracts
   */
  async crawlUrls(urls, param) {
    const { section, category, label } = param;
    const extractByParam = Promise.mapSeries(urls, async (url) => {
      const extractsByUrl = await this.crawlUrl(url, param);
      const validatedExtracts = this.validateExtracts(extractsByUrl);
      assignToExtract(this.extracts, section, category, label, validatedExtracts);
      return extractsByUrl;
    });

    return extractByParam;
  }

  /**
   * @Info This is a delay that is triggered in between crawls. This just allows the extractor
   * to have a cool off btime efore starting another crawl for a schema.
   */
  async crawlInterval() {
    this.logger.log(messages.crawlDelay);
    await this.browser.close();
    await Promise.delay(8000);
    return await this.setUpBrowser();
  }

  /**
   * @Info Helper to flatten / normalize our data ready for scultping
   */
  validateExtracts(arrays) {
    if (!arrays) return null;

    const flattenedData = [].concat.apply([], arrays);
    return flattenedData.filter((item) => {
      if (!item) return false;
      const { detailedData, topLevelData, metaData } = item;
      const invalidRequiredTopLevel =
        !topLevelData?.image || !topLevelData?.link || !topLevelData?.name || !topLevelData?.price;
      const invalidDetailLevel = !detailedData?.images?.length;
      const invalidMeta = !metaData?.brand || !metaData?.domain;
      return !(invalidRequiredTopLevel || invalidDetailLevel || invalidMeta);
    });
  }

  /**
   * @Info Reads the schema URL definitions including any query strings (e.g. page numbers, multiple URLs)
   * and constructs them into valid URL links ready for scraping
   */
  getUrls(initialUrls, multipleUrls) {
    if (!Array.isArray(initialUrls)) {
      throw this.logger.error(messages.urlNotAnArray, 'getUrls');
    }

    if (multipleUrls && initialUrls.length > 1) {
      throw this.logger.error(messages.multipleUrlsDefined, 'getUrls');
    }

    if (multipleUrls) {
      const { queryString, interval, start, end } = multipleUrls;
      let urlPageNumbers = [];
      let currentInterval = start;

      (function createUrls() {
        if (currentInterval <= end) {
          urlPageNumbers.push(currentInterval);
          currentInterval += interval;
          createUrls();
        }
      })();

      const initialUrl = initialUrls[0].replace(`${queryString}${start}`, '');
      return urlPageNumbers.map((intervalN) => `${initialUrl}${queryString}${intervalN}`);
    }
    return initialUrls;
  }

  /**
   * @Info prepare the new page and set the user agent
   */
  async preparePage() {
    this.page = await this.browser.newPage();
    await this.page.setDefaultNavigationTimeout(0);
    // await this.page.setUserAgent(randomUA.generate());
  }

  /**
   * @Info set up a logger state on every crawl to give info about the current crawl
   */
  bindLogger(urls, param) {
    this.logger.setLoggerState({
      url: urls[0],
      domain: param.domain,
      section: param.section,
      category: param.category,
    });
  }

  /**
   * @Info Promise based - works at a schema level and invokes a crawl for a schema, once a schema is
   * cralwed the iterable is incremented to give an indication of the current schema in processing.
   */
  async initializeExtractor() {
    try {
      return await Promise.each(
        this.schemas,
        async ({ urls: initialUrls, multipleUrls, ...param }) => {
          await this.preparePage();
          const urls = this.getUrls(initialUrls, multipleUrls);
          this.bindLogger(urls, param);
          await this.crawlUrls(urls, param);
          this.currentIterable++;
          return await this.crawlInterval();
        }
      );
    } catch (error) {
      this.pushCrawlError(error);
      this.logger.error(`${error}`);
      this.browser.close();
    }
  }

  /**
   * @Info Set up the Puppeteer instance with the relevant plugins and initiate a new page ready
   *  for the cralwing to take place.
   */
  async setUpBrowser() {
    puppeteer.use(StealthPlugin());
    this.browser = await puppeteer.launch(this.pupeteerConfig);
  }

  /**
   * @Info Assign a logger instance to the current cycle. Setting a different color per cycle is a BIG help
   * to keep track of logs between multiple cycles!
   */
  setLogger() {
    this.logger = new Logger({ logColor: Logger.getLogHex() });
  }

  /**
   * @Info Business logic - initialize the extractor and return the extracts once a full cycle has completed.
   * Additional meta data about the scrape is also returned which will be logged in slack. If a cycle threw an
   * error, then all the previous successful extracts are returned and the iterable of the broken schema will help
   * identify where the extractor broke.
   */
  async init() {
    this.setLogger();
    await this.setUpBrowser();
    await this.initializeExtractor();
    await this.browser.close();

    return {
      extracts: this.extracts,
      evaluationWarnings: this.evaluationWarnings,
      extractorErrors: this.extractorErrors,
      currentIterable: this.currentIterable,
      numberOfcrawledProducts: this.numberOfcrawledProducts,
    };
  }
}
