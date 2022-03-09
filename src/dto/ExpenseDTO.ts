import { Expense } from '../models';
import { NumberCents, IdentifierDTO } from '../models/Base';
import { CategoryDTO, toBasicCategoryFromDTO } from './CategoryDTO';
import { SubcategoryDTO, toBasicSubcategoryFromDTO } from './SubcategoryDTO';
import { toDate } from '../utils/dateHelper';
import { normalizeEmail } from '../utils/stringHelper';
import { BasicCategory } from '../models/BasicCategory';
import { BasicSubcategory } from '../models/BasicSubcategory';

export class ExpenseDTO {
  _id: IdentifierDTO;
  name: string;
  price: NumberCents;
  category: CategoryDTO;
  subcategory?: SubcategoryDTO;
  date: Date;
  email: string;
}

export class ExpenseCreateRequest implements Partial<Expense> {
  name: string;
  price: NumberCents;
  category: BasicCategory;
  subcategory?: BasicSubcategory;
  date: Date;
  email: string;

  static build(body): ExpenseCreateRequest {
    return {
      category: toBasicCategoryFromDTO(body.category),
      date: toDate(body.date),
      email: normalizeEmail(body.email),
      name: body.name,
      price: Number(body.price),
      subcategory: toBasicSubcategoryFromDTO(body.subcategory),
    };
  }
}

export class ExpenseUpdateRequest implements Partial<Expense> {
  name: string;
  price: NumberCents;
  category: BasicCategory;
  subcategory?: BasicSubcategory;
  date: Date;
  email: string;

  static build(body): ExpenseUpdateRequest {
    return {
      category: toBasicCategoryFromDTO(body.category),
      date: toDate(body.date),
      email: normalizeEmail(body.email),
      name: body.name,
      price: Number(body.price),
      subcategory: toBasicSubcategoryFromDTO(body.subcategory),
    };
  }
}
