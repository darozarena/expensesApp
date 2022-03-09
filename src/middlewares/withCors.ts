import cors from 'cors';
import { Config } from '../config/index';

const origin = (origin, callback) => {
  if (Config.allowedCors.includes('*')) {
    return callback(null, true);
  }

  if (Config.allowedCors.indexOf(origin) !== -1) {
    return callback(null, true);
  }

  if (!origin) {
    return callback(null, true);
  }

  callback(new Error('Not allowed by CORS'));
};

export const withCors = cors({
  credentials: true,
  origin
});
