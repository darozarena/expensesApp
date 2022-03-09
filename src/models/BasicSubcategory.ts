import { Identifier } from './Base';

export interface BasicSubcategory {
  _id: Identifier;
  name: string;
  categoryId: Identifier;
  email: string;
}
