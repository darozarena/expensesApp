import { ObjectID } from 'mongodb';

export type Identifier = ObjectID;

export type IdentifierDTO = string;

export type NumberCents = number;

export class SoftDeleteModel {
  deletedAt?: Date;
  isDeleted?: boolean;
}

export class BaseModel extends SoftDeleteModel {
  _id: Identifier;
  createdAt: Date;
  updatedAt: Date;
}

// export interface Pagination {
//   page?: number;
//   last?: IdentifierDTO;
//   size: number;
// }

