export class ApplicationError extends Error {
  public readonly statusCode: string;
  public readonly httpStatusCode: number;
  constructor(statusCode: string, httpStatusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.httpStatusCode = httpStatusCode;
  }
}