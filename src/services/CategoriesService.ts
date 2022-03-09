import { inject, injectable } from 'inversify';
import TYPES from '../utils/ioc/types';
import { CategoriesRepository } from '../repository';
import { Category } from '../models/Category';
import { IdentifierDTO } from '../models/Base';
import { CategoryCreateRequest, CategoryUpdateRequest } from '../dto/CategoryDTO';


@injectable()
export class CategoriesService {

  constructor(
    @inject(TYPES.CategoriesRepository) private categoriesRepository: CategoriesRepository,
  ) {
    this.categoriesRepository = categoriesRepository;
  }

  async getAll(email: string): Promise<Category[]> {
    return await this.categoriesRepository.find({ email });
  }

  async getOne(id: IdentifierDTO): Promise<Category> {
    return await this.categoriesRepository.getById(id);
  }

  async create(createRequest: CategoryCreateRequest): Promise<Category> {
    return await this.categoriesRepository.insert(createRequest);
  }

  async update(id: IdentifierDTO, updateRequest: CategoryUpdateRequest): Promise<Category> {
    return await this.categoriesRepository.updateOne(id, updateRequest);
  }

  async deleteOne(id: IdentifierDTO): Promise<boolean> {
    return await this.categoriesRepository.deleteOne(id);
  }
}
