import 'reflect-metadata';
import { PropertyDataMapper } from './PropertyDataMapper';
import { IDataMapper } from '../../core/IDataMapper';
import { Property } from '../../domain/property/Property';
import { Address } from '../../domain/application/Address';

describe('Property Data Mapper', () => {

  let dataMapper: IDataMapper<Property>;

  const propertyDbObject = {
    guid: '3e08ab26-04ae-4dca-911d-80f7082911c2',
    name: 'Sample Property',
    floors: 2,
    propertyType: 'SINGLE_FAMILY_HOME',
    address: {
      streetAddress: 'Palmer Street',
      zip: '99999',
      city: 'Scramento',
      state: 'CA',
    }
  };

  beforeEach(() => {
    dataMapper = new PropertyDataMapper();
  });

  it('Should transform db data into the domain entity', () => {
    const entity: Property = dataMapper.toDomain(propertyDbObject);
    expect(entity).toBeInstanceOf(Property);
  });

  it('Should transfrom domain entity into the db information', () => {
    const entity: Property = Property.create({
      ...propertyDbObject,
      address: Address.create({ ...propertyDbObject.address })
    }, propertyDbObject.guid);
    const dbData = dataMapper.toDalEntity(entity);
    expect(dbData).toEqual(propertyDbObject);
  });
});