import { Address } from '@domain/application/Address';

export class ApplicationDto {
  constructor(
    public guid: string,
    public firstname: string,
    public lastname: string,
    public monthlyIncome: number,
    public address: Address
  ) {}
}