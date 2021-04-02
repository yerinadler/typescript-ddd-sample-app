export class PropertyDto {
  constructor(
    public guid: string,
    public propertyType: string,
    public name: string,
    public floors: number,
    public address: any
  ) {}
}