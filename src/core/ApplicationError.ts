export class ApplicationError extends Error {
  public readonly statusCode: string;
  constructor(statusCode: string, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}