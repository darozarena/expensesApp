import expressLoader from './express';
import mongo from './mongo';
import { Config, getEnvironment } from '../config';
import { Logger } from '../utils/Logger';
import { createLogger } from './logger';
import ioc from './ioc';

export default async () => {
  Logger.setLogger(createLogger());
  Logger.setPrefix(Config.logs.prefix);
  Logger.info('Starting with environment: %s', getEnvironment());

  await mongo();
  Logger.info('✌️ MongoDB connected');

  const { container } = ioc();
  Logger.info('✌️ Dependency Injector loaded');

  let server;
  const { app } = expressLoader({ container });
  Logger.info('✌️ Express loaded');

  server = app.listen(Config.port, () => {
    Logger.info(`
          ################################################
          🛡️  Server listening on port: ${Config.port} 🛡️
          ################################################
        `);
  }).on('error', err => {
    Logger.error(err);
    process.exit(1);
  });


  async function gracefulShutdown() {
    Logger.info('🛑 Closing gracefully...');
    await server?.close();
    process.exit(0);
  }

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
};
