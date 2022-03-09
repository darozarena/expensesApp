import { ObjectId } from 'mongodb';
import { Identifier, IdentifierDTO } from '../../models/Base';

export const areObjectIdsEqual = (objectId1: ObjectId, objectId2: ObjectId): boolean =>
  objectId1.toString() === objectId2.toString();

export const toIdentifier = (value: IdentifierDTO): ObjectId =>
  new ObjectId(value);

export const toIdentifierDTO = (identifier: Identifier): IdentifierDTO =>
  identifier.toString();

export const isObjectID = (id: any): boolean =>
  id instanceof ObjectId;
