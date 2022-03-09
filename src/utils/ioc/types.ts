/* eslint-disable sort-keys */
const TYPES = {
  /** Core */
  MongoDBClient: Symbol.for('MongoDBClient'),
  // AMQPChannel: Symbol.for('AMQPChannel'),

  /** Services */
  ExpensesService: Symbol.for('ExpensesService'),
  CategoriesService: Symbol.for('CategoriesService'),
  SubcategoriesService: Symbol.for('SubcategoriesService'),

  /** Repositories */
  ExpensesRepository: Symbol.for('ExpensesRepository'),
  CategoriesRepository: Symbol.for('CategoriesRepository'),
  SubcategoriesRepository: Symbol.for('SubcategoriesRepository'),
};

export default TYPES;
export type InjectableClassTypes = keyof typeof TYPES;
