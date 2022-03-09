import { BaseModel, Identifier } from './Base';

export interface Subcategory extends BaseModel {
  name: string;
  categoryId: Identifier;
  email: string;
}
