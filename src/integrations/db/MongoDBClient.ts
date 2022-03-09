import { Collection, Cursor, Db, ObjectID } from 'mongodb';
import { injectable, unmanaged } from 'inversify';
import { MongoDBConnection } from './MongoDBConnection';
import { DatabaseError } from '../../errors/server/DatabaseError';
import { IdentifierDTO } from '../../models/Base';
import { getToday } from '../../utils/dateHelper';
import { ModelNotFound } from '../../errors/internal/models/ModelNotFound';
import { toIdentifier } from './utils';

export type ModelToInsert<T> = Omit<T, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'isDeleted'>;

export const safeQuery = (originalQuery: object): object => ({
  ...originalQuery,
  isDeleted: { $ne: true }
});

@injectable()
export class MongoDBClient<T> {
  public db: Db;
  public readonly collectionName: string;

  constructor(@unmanaged() collectionName: string) {
    MongoDBConnection.getConnection(connection => {
      this.db = connection;
    });
    this.collectionName = collectionName;
  }

  async count(filter = {}) {
    return this.safeCount(filter);
  }

  // async find(filter = {}, sortBy = {}, pagination?: Pagination, limit = 50) {
  async find(filter = {}, sortBy = {}) {
    // const query = await this.findRaw(filter, sortBy, pagination, limit);
    const query = await this.findRaw(filter, sortBy);
    return query.toArray();
  }

  async unsafeFind(filter = {}) {
    return await this.findWithoutSafeQuery(filter);
  }

  // async findRaw(filter = {}, sortBy = {}, pagination?: Pagination, limit = 50) {
  async findRaw(filter = {}, sortBy = {}) {
    // // Pagination using the > approach (more effective, use always you can)
    // if (pagination?.last) {
    //   //FIXME: I think this is not working... at least in a quick check with Postman
    //   return this.safeFind({ ...filter, '_id': { '$gt': ObjectID(pagination.last) } })
    //     .sort(sortBy)
    //     .limit(pagination.size);
    // }

    // // Pagination using the skip cursor
    // if (pagination?.page) {
    //   return this.safeFind(filter)
    //     .sort(sortBy)
    //     .limit(pagination.size)
    //     // Base 1 to base 0 pagination.page
    //     .skip((pagination.page - 1) * pagination.size);
    // }

    // return this.safeFind(filter)
    //   .sort(sortBy)
    //   .limit(limit);
      return this.safeFind(filter)
      .sort(sortBy);
  }

  async findOneById(objectId: string): Promise<T | null> {
    return this.safeFindOne({ _id: new ObjectID(objectId) });
  }

  async unsafe_findOneById(objectId: string) {
    return this.getCollection().findOne({ _id: new ObjectID(objectId) } as any);
  }

  async findOne(filter: Object = {}): Promise<T | null> {
    return this.safeFindOne<T>(filter);
  }

  async distinct<R>(field: string, filter: Object = {}): Promise<R | null> {
    return this.getCollection().distinct<R>(field, filter);
  }

  async getById(id: IdentifierDTO): Promise<T> {
    const result = await this.safeFindOne<T>({ _id: toIdentifier(id) });
    if (!result) {
      throw new ModelNotFound(this.collectionName);
    }
    return result;
  }

  async getByFilter(filter: Object = {}): Promise<T> {
    const result = await this.safeFindOne<T>(filter);
    if (!result) {
      throw new ModelNotFound(this.collectionName);
    }
    return result;
  }

  async insert(model: ModelToInsert<T>): Promise<T> {
    const result = await this.getCollection().insertOne({
      ...model,
      createdAt: getToday(),
      updatedAt: null
    } as any);

    if (result && result.ops.length === 1) {
      return result.ops[0] as T;
    }

    throw new DatabaseError('Insert operation');
  }

  async updateOne(objectId: string, set: any): Promise<T> {
    const result = await this.getCollection()
      .findOneAndUpdate(
        { _id: new ObjectID(objectId) } as any,
        { $set: { ...set, updatedAt: getToday() } },
        { returnOriginal: false });

    if (result && result.ok === 1) {
      return result.value;
    }
    throw new DatabaseError('Update operation');
  }

  async updateManyNestedFields(filter: Object = {}, set: any) {
    return this.getCollection()
      .updateMany(
        filter as any,
        { $set: { ...set, updatedAt: getToday() } });
  }

  async updateMany(filter: Object = {}, model: Partial<T>) {
    return this.getCollection()
      .updateMany(
        filter as any,
        { $set: { ...model, updatedAt: getToday() } });
  }

  async updateOneWithOp(objectId: string, op: any): Promise<T> {
    const result = await this.getCollection()
      .findOneAndUpdate(
        { _id: new ObjectID(objectId) } as any,
        op,
        { returnOriginal: false });

    if (result && result.ok === 1) {
      return result.value;
    }
    throw new DatabaseError('Update operation');
  }

  async updateOneWithFiltersAndOp(filters: any, op: any): Promise<T> {
    const result = await this.getCollection()
      .findOneAndUpdate(
        filters,
        op,
        { returnOriginal: false });

    if (result && result.ok === 1) {
      return result.value;
    }
    throw new DatabaseError('Update operation');
  }

  async deleteOne(id: IdentifierDTO): Promise<boolean> {
    const result = await this.getCollection()
      .findOneAndUpdate(
        { _id: toIdentifier(id) } as any,
        {
          $set: {
            deletedAt: getToday(),
            isDeleted: true,
          } as any
        },
        { returnOriginal: false }
      );

    if (result && result.ok === 1 && result.value) {
      return true;
    }
    return false;
  }

  protected getCollection(): Collection<T> {
    if (!this.db) {
      console.error('HERE!', this);
    }
    return this.db.collection(this.collectionName);
  }

  private safeFind(filter = {}): Cursor<T> {
    return this.getCollection().find(safeQuery(filter));
  }

  // Be careful with this method. It is not for common use.
  private findWithoutSafeQuery(filter = {}): Cursor<T> {
    return this.getCollection().find(filter);
  }

  private safeCount(filter = {}): Promise<number> {
    return this.getCollection().countDocuments(safeQuery(filter));
  }

  private safeFindOne<T>(filter = {}): Promise<T | null> {
    return this.getCollection().findOne<T>(safeQuery(filter));
  }
}
