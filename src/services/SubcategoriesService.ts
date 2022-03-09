import { inject, injectable } from 'inversify';
import TYPES from '../utils/ioc/types';
import { SubcategoriesRepository } from '../repository';
import { Subcategory } from '../models/Subcategory';
import { IdentifierDTO } from '../models/Base';
import { SubcategoryCreateRequest, SubcategoryUpdateRequest } from '../dto/SubcategoryDTO';


@injectable()
export class SubcategoriesService {

  constructor(
    @inject(TYPES.SubcategoriesRepository) private subcategoriesRepository: SubcategoriesRepository,
  ) {
    this.subcategoriesRepository = subcategoriesRepository;
  }

  async getAll(email: string): Promise<Subcategory[]> {
    return await this.subcategoriesRepository.find({ email });
  }

  async getOne(id: IdentifierDTO): Promise<Subcategory> {
    return await this.subcategoriesRepository.getById(id);
  }

  async create(createRequest: SubcategoryCreateRequest): Promise<Subcategory> {
    return await this.subcategoriesRepository.insert(createRequest);
  }

  async update(id: IdentifierDTO, updateRequest: SubcategoryUpdateRequest): Promise<Subcategory> {
    return await this.subcategoriesRepository.updateOne(id, updateRequest);
  }

  async deleteOne(id: IdentifierDTO): Promise<boolean> {
    return await this.subcategoriesRepository.deleteOne(id);
  }
}
