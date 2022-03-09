import { injectable } from 'inversify';
import { MongoDBClient } from '../integrations/db/MongoDBClient';
import { Subcategory } from '../models';

@injectable()
export class SubcategoriesRepository extends MongoDBClient<Subcategory> {
  constructor() {
    super('subcategories');
  }
}
