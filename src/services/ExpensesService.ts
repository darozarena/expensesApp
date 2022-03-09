import { inject, injectable } from 'inversify';
import TYPES from '../utils/ioc/types';
import { ExpensesRepository } from '../repository';
import { Expense } from '../models';
import { ExpenseCreateRequest, ExpenseUpdateRequest } from '../dto/ExpenseDTO';
import { IdentifierDTO } from '../models/Base';


@injectable()
export class ExpensesService {

  constructor(
    @inject(TYPES.ExpensesRepository) private expensesRepository: ExpensesRepository,
  ) {
    this.expensesRepository = expensesRepository;
  }

  async getAll(email: string): Promise<Expense[]> {
    return await this.expensesRepository.find({ email });
  }

  async getOne(id: IdentifierDTO): Promise<Expense> {
    return await this.expensesRepository.getById(id);
  }

  async create(createRequest: ExpenseCreateRequest): Promise<Expense> {
    return await this.expensesRepository.insert(createRequest);
  }

  async update(id: IdentifierDTO, updateRequest: ExpenseUpdateRequest): Promise<Expense> {
    return await this.expensesRepository.updateOne(id, updateRequest);
  }

  async deleteOne(id: IdentifierDTO): Promise<boolean> {
    return await this.expensesRepository.deleteOne(id);
  }
}
