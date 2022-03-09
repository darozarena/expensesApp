import { Category } from '../models';
import { IdentifierDTO } from '../models/Base';
import { normalizeEmail } from '../utils/stringHelper';
import { BasicCategory } from '../models/BasicCategory';
import { toIdentifier } from '../integrations/db/utils';

export interface CategoryDTO {
  _id: IdentifierDTO;
  name: string;
  email: string;
}

export const toBasicCategoryFromDTO = (categoryDTO: CategoryDTO): BasicCategory => ({
    _id: toIdentifier(categoryDTO._id),
    email: categoryDTO.email,
    name: categoryDTO.name,
  });

  export class CategoryCreateRequest implements Partial<Category> {
    name: string;
    email: string;

    static build(body): CategoryCreateRequest {
      return {
        email: normalizeEmail(body.email),
        name: body.name,
      };
    }
  }

export class CategoryUpdateRequest implements Partial<Category> {
  name: string;
  email: string;

  static build(body): CategoryUpdateRequest {
    return {
      email: normalizeEmail(body.email),
      name: body.name,
    };
  }
}
