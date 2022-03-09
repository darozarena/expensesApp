import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
const env = process.env.NODE_ENV || 'development';

const envFound = dotenv.config({ path: '.env' });
if (envFound.error) {
  console.log("⚠️  Couldn't find .env file  ⚠️ .env");
}

export type Environment = 'local' | 'production';


export const getEnvironment = (): Environment => {
  switch (env) {
    case 'production':
      return 'production';
    case 'local':
      return 'local';
    default:
      console.error('Unexpected NODE_ENV', env);
      return 'local';
  }
};

export const isCloudEnvironment = (): boolean => {
  const environment = getEnvironment();
  return environment === 'production';
};

export const isProduction = (): boolean => getEnvironment() === 'production';

export interface ConfigProps {
  allowedCors: string[];
  /**
   * Your favorite port
   */
  port: number;
  /**
   * MongoDB URI and database name
   */
  database: {
    mongoURI: string;
    mongoDBName: string;
    username?: string;
    password?: string;
    connectionsPerHost: number;
  };
  /**
   * Your secret sauce
   */
  jwtSecret: string;
  jwtAlgorithm: string;
  /**
   * Used by winston logger
   */
  logs: {
    level: string;
    token?: string;
    region?: string;
    prefix?: string;
    traceRequests?: boolean;
  };
 }

const extractAllowedCors = (): string[] => {
  return (process.env.ALLOWED_CORS || '').split(',');
};

export const Config: ConfigProps = {
  allowedCors: extractAllowedCors(),
  database: {
    connectionsPerHost: parseInt(process.env.MONGODB_CONNECTIONS || '10'),
    mongoDBName: process.env.MONGODB_DB_NAME,
    mongoURI: process.env.MONGODB_URI,
    password: undefined,
    username: undefined,
  },
  jwtAlgorithm: process.env.JWT_ALGO,
  jwtSecret: process.env.JWT_SECRET,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
    prefix: process.env.LOG_PREFIX,
    region: process.env.LOG_REGION,
    token: process.env.LOG_TOKEN,
    traceRequests: (process.env.LOG_TRACE_REQUESTS === 'true')
  },
  port: parseInt(process.env.PORT, 10),
  };
