import { Subcategory } from '../models';
import { IdentifierDTO, Identifier } from '../models/Base';
import { toIdentifier } from '../integrations/db/utils';
import { normalizeEmail } from '../utils/stringHelper';
import { BasicSubcategory } from '../models/BasicSubcategory';

export interface SubcategoryDTO {
  _id: IdentifierDTO;
  name: string;
  categoryId: IdentifierDTO;
  email: string;
}

export const toBasicSubcategoryFromDTO = (subcategoryDTO: SubcategoryDTO): BasicSubcategory | undefined =>
  subcategoryDTO && {
      _id: toIdentifier(subcategoryDTO._id),
      categoryId: toIdentifier(subcategoryDTO.categoryId),
      email: subcategoryDTO.email,
      name: subcategoryDTO.name,
   };

   export class SubcategoryCreateRequest implements Partial<Subcategory> {
    name: string;
    categoryId: Identifier;
    email: string;

    static build(body): SubcategoryCreateRequest {
      return {
        categoryId: toIdentifier(body.categoryId),
        email: normalizeEmail(body.email),
        name: body.name,
      };
    }
  }

  export class SubcategoryUpdateRequest implements Partial<Subcategory> {
    name: string;
    categoryId: Identifier;
    email: string;

    static build(body): SubcategoryUpdateRequest {
      return {
        categoryId: toIdentifier(body.categoryId),
        email: normalizeEmail(body.email),
        name: body.name,
      };
    }
  }
