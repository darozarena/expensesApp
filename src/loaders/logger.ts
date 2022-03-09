import winston from 'winston';
import { Config } from '../config';

const baseLogger = (extraTransports = []) => ({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.simple(),
    winston.format.cli()
  ),
  level: Config.logs.level,
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.simple(),
        winston.format.cli()
      ),
      level: Config.logs.level
    }),
    ...extraTransports
  ]
});

const productionLogger = () =>
  winston.createLogger(
    baseLogger());

const defaultLogger = () =>
  winston.createLogger(
    baseLogger());

export const createLogger = (): winston.Logger => {
  const environment = process.env.NODE_ENV || 'development';
  if (environment === 'production') {
    return productionLogger();
  }

  return defaultLogger();
};
