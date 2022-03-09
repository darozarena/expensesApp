import { Db, MongoClient } from 'mongodb';
import { DatabaseError } from '../../errors/server/DatabaseError';
import { Config } from '../../config/index';

type GetConnectionResponse = (connection) => void;

export class MongoDBConnection {
  private static isConnected: boolean = false;
  private static db: Db;
  private static client: any;

  public static getConnection(result: GetConnectionResponse) {
    if (this.isConnected) {
      return result(this.db);
    }
    this.connect(() => result(this.db));
  }

  public static async close() {
    if (!this.isConnected) {
      return;
    }
    return new Promise((resolve, reject) => {
      this.client.close((err) => {
        if (err) {
          reject(err);
        } else {
          this.client = undefined;
          this.db = undefined;
          this.isConnected = false;
          resolve(true);
        }
      });
    });
  }

  private static connect(callback) {
    const options = {
      poolSize: Config.database.connectionsPerHost,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    console.log({ MONGOURI: Config.database.mongoURI });

    MongoClient.connect(Config.database.mongoURI, options, (err, client) => {
      if (err) {
        console.error(err);
        throw new DatabaseError(err);
      }

      this.client = client;
      this.db = client.db(Config.database.mongoDBName);
      this.isConnected = true;
      return callback();
    });
  }
}
