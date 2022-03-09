import { injectable } from 'inversify';
import { MongoDBClient } from '../integrations/db/MongoDBClient';
import { Expense } from '../models';

@injectable()
export class ExpensesRepository extends MongoDBClient<Expense> {
  constructor() {
    super('expenses');
  }
}
