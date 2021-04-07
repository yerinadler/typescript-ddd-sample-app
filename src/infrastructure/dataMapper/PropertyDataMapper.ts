import { injectable } from 'inversify';
import { IDataMapper } from '@core/IDataMapper';
import { Property } from '@domain/property/Property';
import { Address } from '@domain/application/Address';

@injectable()
export class PropertyDataMapper implements IDataMapper<Property> {
  toDomain(property: any) {
    const {
      guid,
      propertyType,
      name,
      floors,
      address: dbAddress,
    } = property;
    const address = Address.create(dbAddress);
    return Property.create({ name, propertyType, floors, address }, guid);
  }

  toDalEntity(propertyEntity: Property) {
    return {
      guid: propertyEntity.guid,
      propertyType: propertyEntity.propertyType,
      name: propertyEntity.name,
      floors: propertyEntity.floors,
      address: propertyEntity.address.value,
    };
  }
}
