import { BaseModel, NumberCents } from './Base';
import { BasicCategory } from './BasicCategory';
import { BasicSubcategory } from './BasicSubcategory';

export interface Expense extends BaseModel {
  name: string;
  price: NumberCents;
  category: BasicCategory;
  subcategory?: BasicSubcategory;
  date: Date;
  email: string;
}
