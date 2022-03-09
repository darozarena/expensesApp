import morgan, { StreamOptions } from 'morgan';
import { Logger } from '../utils/Logger';
import { Config } from '../config/index';

const stream: StreamOptions = {
  write(message: string) {
    Logger.info(message);
  }
};

const skip = () =>
  !Config.logs.traceRequests;

export const withMorgan = morgan('combined', {
  skip,
  stream
});
