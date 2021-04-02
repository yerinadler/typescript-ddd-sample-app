import { Address } from '@domain/application/Address';

export class PropertyDto {
  constructor(
    public guid: string,
    public propertyType: string,
    public name: string,
    public floors: number,
    public address: Address
  ) {}
}