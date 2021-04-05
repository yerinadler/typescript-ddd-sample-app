import 'reflect-metadata';
import { IPropertyRepository } from '@domain/property/IPropertyRepository';
import { PropertyApplication } from './PropertyApplication';
import { Property } from '@domain/property/Property';
import { Address } from '@domain/application/Address';

describe('Property application service', () => {

  let propRepo: IPropertyRepository;
  let service: PropertyApplication;
  let fakedPropertyDb: any[] = [];

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

  const PropertyRepository: IPropertyRepository = jest.fn<IPropertyRepository>(() => ({
    save: jest.fn().mockImplementation((property: Property) => {
      return fakedPropertyDb.push(property);
    }),
    findOneById: jest.fn().mockImplementation((id: string) => Property.create({
      ...baseProperty,
      address: Address.create({ ...baseAddress })
    }, id)),
  }));

  beforeEach(() => {
    propRepo = new PropertyRepository();
    service = new PropertyApplication(propRepo);
  });

  afterEach(() => {
    fakedPropertyDb = [];
  });

  it('Should get property with the specified ID', async () => {
    const result = await service.getPropertyById('xxxxx');
    expect(propRepo.findOneById).toHaveBeenCalled();
    expect(result.guid).toBe('xxxxx');
  });

  it('Should create the new property', async () => {
    await service.createProperty({ ...baseProperty, address: { ...baseAddress } });
    expect(propRepo.save).toHaveBeenCalled();
    expect(fakedPropertyDb).toHaveLength(1);
  });
});