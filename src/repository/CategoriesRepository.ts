import { injectable } from 'inversify';
import { MongoDBClient } from '../integrations/db/MongoDBClient';
import { Category } from '../models';

@injectable()
export class CategoriesRepository extends MongoDBClient<Category> {
  constructor() {
    super('categories');
  }
}
