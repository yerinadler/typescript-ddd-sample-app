import { Address } from '@domain/application/Address';

export class ApplicationDto {
  constructor(
    public guid: string,
    public renterId: string,
    public propertyId: string,
    public status: string,
  ) {}
}