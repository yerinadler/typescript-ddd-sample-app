import { ApplicationError } from '@core/ApplicationError';

export class InsufficientIncomeError extends ApplicationError {
  constructor(message: string) {
    super('400', 400, message);
  }
}