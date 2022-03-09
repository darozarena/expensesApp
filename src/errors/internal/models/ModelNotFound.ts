export class ModelNotFound extends Error {

  constructor(model = 'Model') {
    super(`${model} not found`);
  }
}
