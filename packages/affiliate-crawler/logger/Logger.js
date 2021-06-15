/*eslint-disable no-console */
import chalk from 'chalk';
import fs from 'fs';
import util from 'util';
import ansiRegex from 'ansi-regex';
import { IS_TEST } from '../constants';

const showWarnings = !IS_TEST;
const preventLogs = process.env.PREVENT_LOGS;

export default class Logger {
  constructor({ logColor, url, domain, section, category }) {
    this.loggingEnabled = !preventLogs;
    this.loggerState = {
      url: url || null,
      domain: domain || null,
      section: section || null,
      category: category || null,
      logColor: logColor || null,
    };
  }

  static setWritableLogs(outputDirectory) {
    const logDir = outputDirectory || `${__dirname}/../__log__/logs.log`;
    const logFile = fs.createWriteStream(logDir, {
      flags: 'w',
    });

    console._writeExtOutput = function () {
      logFile.write(util.format.apply(null, arguments) + '\n');
    };
  }

  static getLogHex() {
    return '#000000'.replace(/0/g, () => (~~(Math.random() * 16)).toString(16));
  }

  static publicLog(message, color, writeLog) {
    console.log(chalk[color] ? chalk[color](message) : message);
    if (writeLog) console._writeExtOutput(message.replace(ansiRegex(), ''));
  }

  setLoggerState(state) {
    this.loggerState = {
      ...this.loggerState,
      ...state,
    };
  }

  output(message) {
    if (this.loggingEnabled) {
      console.log(message);
      this.writeOutput(message);
    }
  }

  writeOutput(message) {
    if (console._writeExtOutput) {
      console._writeExtOutput(message.replace(ansiRegex(), ''));
    }
  }

  common(message) {
    this.output(chalk.whiteBright(`${message}`));
  }

  error(message) {
    const { logColor = '#cb3837' } = this.loggerState;
    const { domain, url, section, category } = this.loggerState;
    const infoMessage = `${domain}${url[0]}, ${section}, ${category}`;
    this.output(chalk.hex(logColor)(`${chalk.redBright.bold('ERROR')}: ${infoMessage}`));
    this.output(chalk.red(message));
  }

  prompt(message, isDetailed) {
    const { logColor = '#DEADED' } = this.loggerState;
    const { domain, url, section, category } = this.loggerState;
    const infoMessage = `${domain}${url[0]}, ${section}, ${category}`;
    if (isDetailed) {
      this.output(chalk.hex(logColor)(`FOR: ${infoMessage}`));
    }

    this.output(chalk.hex(logColor)(message));
  }

  warning(message) {
    const { logColor = '#c8be32' } = this.loggerState;
    if (showWarnings) {
      this.output(chalk.hex(logColor)(message));
    }
  }

  log(message) {
    const { logColor = '#FFFFFF' } = this.loggerState;
    this.output(chalk.hex(logColor)(message));
  }
}
