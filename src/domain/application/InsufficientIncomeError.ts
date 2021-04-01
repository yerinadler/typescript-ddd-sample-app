import { ApplicationError } from '@core/ApplicationError';

export class InsufficientIncomeError extends ApplicationError {
  constructor(httpStatus: string, message: string) {
    super(httpStatus, message);
  }
}