import { MongoDBConnection } from '../integrations/db/MongoDBConnection';
import { Logger } from '../utils/Logger';

export default async () => {

  const promise = new Promise(function (resolve, reject) {

    try {
      MongoDBConnection.getConnection((connection => {
        resolve(connection);
      }));
    } catch (err) {
      reject(false);
      throw err;
    }

  });

  try {
    return await promise;
  } catch (err) {
    Logger.error('Something was wrong connecting to MongoDB');
  }
};
