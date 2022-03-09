import { format, inspect } from 'util';

const processArgs = (args: any[]) => {
  let hasErrorArgument = false;
  const result = args.map(arg => {
    if (arg instanceof Error) {
      hasErrorArgument = true;
      return inspect(arg);
    }
    return arg;
  });

  if (hasErrorArgument) {
    if (result[0].indexOf('%j') > 0) {
      result[0] = result[0].replace(/%j$/, '%s');
    } else if (args.length > 1) {
      result[0] += '%s';
    }
  }

  return result;
};

export class Logger {
  protected static instance: Logger;
  protected prefix?: string;
  protected logger?: any;

  static setLogger(logger: any) {
    this.getInstance().logger = logger;
  }

  static setPrefix(prefix: string) {
    this.getInstance().prefix = prefix;
  }

  static debug(...args) {
    Logger.log('debug', ...args);
  }

  static info(...args) {
    Logger.log('info', ...args);
  }

  static error(...args) {
    Logger.log('error', ...args);
  }

  static warn(...args) {
    Logger.log('warn', ...args);
  }

  static getStream(): NodeJS.WritableStream {
    return this.getInstance().logger.stream;
  }

  protected static getInstance(): Logger {
    if (!this.instance) {
      this.instance = new Logger();
    }
    return this.instance;
  }

  private static log(level, ...args) {
    const newArgs = processArgs(args);

    const { logger, prefix } = this.getInstance();
    if (!logger) {
      const consoleArgs = prefix ? [prefix, ...newArgs] : newArgs;
      console[level]?.(...consoleArgs);
      return;
    }

    if (prefix) {
      if (isMessageToFormat(newArgs[0])) {
        const logMessage = format(`${prefix} ${newArgs[0]}`, ...newArgs.slice(1));
        logger.log(level, logMessage);
        return;
      }

      logger.log(level, prefix + ' ' + newArgs.join(' '));
      return;
    }

    logger.log(level, ...newArgs);
  }
}

const isMessageToFormat = (message: string): boolean => {
  /**
   * Captures the number of format (i.e. %s strings) in a given string.
   * Based on `util.format`, see Node.js source:
   * https://github.com/nodejs/node/blob/b1c8f15c5f169e021f7c46eb7b219de95fe97603/lib/util.js#L201-L230
   * @type {RegExp}
   */
  const formatRegExp = /%[scdjifoO%]/g;
  return Boolean(message?.match?.(formatRegExp));
};
