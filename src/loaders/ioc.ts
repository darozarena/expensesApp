import { Container } from 'inversify';
import { Logger } from '../utils/Logger';
import TYPES from '../utils/ioc/types';
import { ExpensesService, CategoriesService, SubcategoriesService } from '../services';
import { CategoriesRepository, ExpensesRepository, SubcategoriesRepository } from '../repository';
import { MongoDBClient } from '../integrations/db/MongoDBClient';
import { Category, Expense, Subcategory } from '../models';

export default () => {
  // set up container
  const container = new Container();

  try {
    /**
     * Repositories
     */
     container.bind<MongoDBClient<Expense>>(TYPES.ExpensesRepository).to(ExpensesRepository).whenInjectedInto(ExpensesService);
     container.bind<MongoDBClient<Category>>(TYPES.CategoriesRepository).to(CategoriesRepository).whenInjectedInto(CategoriesService);
     container.bind<MongoDBClient<Subcategory>>(TYPES.SubcategoriesRepository).to(SubcategoriesRepository).whenInjectedInto(SubcategoriesService);

    /**
     * Services
     */
    container.bind<ExpensesService>(TYPES.ExpensesService).to(ExpensesService).inSingletonScope();
    container.bind<CategoriesService>(TYPES.CategoriesService).to(CategoriesService).inSingletonScope();
    container.bind<SubcategoriesService>(TYPES.SubcategoriesService).to(SubcategoriesService).inSingletonScope();

    return { container };
  } catch (e) {
    Logger.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
