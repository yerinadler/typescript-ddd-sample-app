import 'reflect-metadata';
import { Collection, Db } from 'mongodb';
import { IDataMapper } from '@core/IDataMapper';
import { Property } from '@domain/property/Property';
import { IPropertyRepository } from '@domain/property/IPropertyRepository';
import { Address } from '@domain/application/Address';
import { PropertyDataMapper } from '@infrastructure/dataMapper/PropertyDataMapper';
import { PropertyRepository } from '@infrastructure/repositories/PropertyRepository';

describe('Property Repository', () => {

  let dataMapper: IDataMapper<Property>;
  let db: Db;
  let repo: IPropertyRepository;
  let spyToDomain: any;
  let spyToDalEntity: any;
  let spyDoesExist: any;

  const baseProperty = {
    name: 'Sample Property',
    floors: 2,
    propertyType: 'SINGLE_FAMILY_HOME',
  };

  const baseAddress = {
    streetAddress: 'Palmer Street',
    zip: '99999',
    city: 'Scramento',
    state: 'CA',
  };

  const propertyDbObject = {
    guid: '3ea35785-0c81-4c40-9057-92b56c908922',
    ...baseProperty,
    address: {
      ...baseAddress
    }
  };

  const FakedDbCollection = jest.fn<Db>(() => ({
    collection: jest.fn<Collection>(() => ({
      findOne: jest.fn().mockReturnValue(propertyDbObject),
      replaceOne: jest.fn(),
      insertOne: jest.fn(),
    }))
  }));

  beforeEach(() => {
    dataMapper = new PropertyDataMapper();
    db = new FakedDbCollection();

    spyToDomain = jest.spyOn(dataMapper, 'toDomain');
    spyToDalEntity = jest.spyOn(dataMapper, 'toDalEntity');
    
    repo = new PropertyRepository(db, dataMapper);
    spyDoesExist = jest.spyOn(repo, 'doesExists');
  });

  afterEach(() => {
    spyToDomain.mockRestore();
    spyToDalEntity.mockRestore();
    spyDoesExist.mockRestore();
  });

  it('Should get the property entity with the specified ID (Get one by ID)', async () => {
    const result = await repo.findOneById(propertyDbObject.guid);
    expect(result).toBeInstanceOf(Property);
    expect(result.guid).toBe(propertyDbObject.guid);
    expect(dataMapper.toDomain).toBeCalled();
  });

  it('Should successfully save the property for non-existing property', async () => {
    spyDoesExist.mockReturnValue(false);
    const property = Property.create({
      ...propertyDbObject,
      address: Address.create({ ...propertyDbObject.address })
    });
    await repo.save(property);
    expect(spyToDalEntity).toBeCalled();
  });

  it('Should successfully save the property for existing property', async () => {
    spyDoesExist.mockReturnValue(true);
    const property = Property.create({
      ...propertyDbObject,
      address: Address.create({ ...propertyDbObject.address })
    }, propertyDbObject.guid);
    await repo.save(property);
    expect(spyToDalEntity).toBeCalled();
  });
});