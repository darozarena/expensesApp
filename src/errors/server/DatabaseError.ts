export class DatabaseError extends Error {
  public readonly error: any;

  constructor(error: any, message = 'Database error') {
    super(message);
    this.error = error;
  }
}
