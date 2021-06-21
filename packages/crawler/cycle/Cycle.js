import Extractor from '../extractor';
import { normalizeSlackNotification } from '../helpers';
import { transmitLogsToSlack } from '../api';
import Logger from '../logger/Logger';
import messages from '../logger/logTypes';

export default class ExtractorCycle {
  constructor(affilaiteSchemas, headless = true) {
    this.extractorBrokeAtIterable = null;
    this.heldExtracts = [];
    this.numberOfSchemas;
    this.currentIterable;
    this.numberOfcrawledProducts = 0;
    this.errors = [];
    this.warnings = [];
    this.affilaiteSchemas = affilaiteSchemas;
    this.headless = headless;
  }

  get brokeAtIterable() {
    return this.extractorBrokeAtIterable;
  }

  get extracts() {
    return this.heldExtracts;
  }

  get cycleWarnings() {
    return this.errors;
  }

  get cycleErrors() {
    return this.warnings;
  }

  setNumberOfSchemas(numberOfSchemas) {
    this.numberOfSchemas = numberOfSchemas;
  }

  setCurrentIterable(currentIterable) {
    this.currentIterable = currentIterable;
  }

  setCralwedProducts(currentnumberOfcrawledProducts) {
    this.numberOfcrawledProducts = this.numberOfcrawledProducts + currentnumberOfcrawledProducts;
  }

  handleCycleNotifications(...args) {
    const normalizedNotification = normalizeSlackNotification(...args);
    transmitLogsToSlack(normalizedNotification);
  }

  validateExtractor(extractorErrors) {
    if (extractorErrors && extractorErrors.length) {
      this.extractorBrokeAtIterable = this.currentIterable;
    } else {
      this.extractorBrokeAtIterable = null;
    }
  }

  validateSchemas(schemas) {
    if (!schemas) return;
    const filteredSchemas = this.extractorBrokeAtIterable
      ? schemas.filter((_, index) => index > this.extractorBrokeAtIterable)
      : schemas;

    return filteredSchemas.length ? filteredSchemas : schemas;
  }

  willStartAtIterable() {
    const brokeAtIterable = this.extractorBrokeAtIterable;
    return (brokeAtIterable || brokeAtIterable === 0) && brokeAtIterable !== this.numberOfSchemas
      ? brokeAtIterable + 1
      : 0;
  }

  hasFinishedFullCyle() {
    return this.currentIterable >= this.numberOfSchemas; //&& !this.extractorBrokeAtIterable
  }

  holdExtracts(extracts) {
    this.heldExtracts = [...this.heldExtracts, ...extracts];
  }

  clearHeldExtracts() {
    this.heldExtracts = [];
  }

  clearNumberOfCrawledProducts() {
    this.numberOfcrawledProducts = 0;
  }

  clearWarnignsAndErrors() {
    this.warnings = [];
    this.errors = [];
  }

  clearBrokeAtIterable() {
    this.extractorBrokeAtIterable = null;
  }

  setWarnings(warnings) {
    this.warnings.push(...warnings);
  }

  setErrors(errors) {
    this.errors.push(...errors);
  }

  async startExtractor(...args) {
    const Ext = new Extractor(...args);
    return await Ext.init();
  }

  async coolOff() {
    Logger.publicLog(messages.coolOff, 'blue');
    return new Promise((resolve) => setTimeout(() => resolve(), 10000));
  }

  async init() {
    const affilaiteSchemas = this.affilaiteSchemas;
    this.setNumberOfSchemas(affilaiteSchemas && affilaiteSchemas.length);

    // If the extractor broke previously, we don't want to give back the schemas the extractor
    // has already crawled, so let's filter and give back the 'remaining schemas' schedule
    const validatedSchemas = this.validateSchemas(affilaiteSchemas);

    // If the schema previously broke, or failed a scrape we also need to tell the extractor what shema index
    // or iterable it broke at. This doesn't really play a part in the logic of the extractor but the extractor
    // will give us back the iterable if it breaks so we can detect what schema caused the issue.
    const startAtIterable = this.willStartAtIterable();

    // start the extractor, passing through our schemas and the current schema index
    const {
      extracts,
      evaluationWarnings,
      extractorErrors,
      currentIterable,
      numberOfcrawledProducts,
    } = await this.startExtractor(validatedSchemas, startAtIterable, this.headless);

    this.setWarnings(evaluationWarnings);
    this.setErrors(extractorErrors);

    // set the iterable the extractor gave us, this will normally be equal to the length of the schema if there
    // has been a full cycle
    this.setCurrentIterable(currentIterable);
    this.setCralwedProducts(numberOfcrawledProducts);

    // When the extractor is done, it will have either run to it's end or stop becasue of an error. If there's
    // an error, this is where we set a 'broke at index / iterable', otherwise if there's a clean scrape, we set the
    // broke at iterable to null (this means next time the extractor will start, it will start from the begining again)
    this.validateExtractor(extractorErrors);
    this.holdExtracts(extracts);
    this.handleCycleNotifications(extractorErrors, evaluationWarnings, this.currentIterable);

    if (this.hasFinishedFullCyle()) {
      const cycleResult = {
        extracts: this.heldExtracts,
        numberOfcrawledProducts: this.numberOfcrawledProducts,
        warnings: this.warnings,
        errors: this.errors,
      };
      this.clearHeldExtracts();
      this.clearNumberOfCrawledProducts();
      this.clearWarnignsAndErrors();
      this.clearBrokeAtIterable();
      return cycleResult;
    } else {
      await this.coolOff();
      return await this.init();
    }
  }
}
