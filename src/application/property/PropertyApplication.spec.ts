import 'reflect-metadata';
import { IPropertyRepository } from '@domain/property/IPropertyRepository';
import { PropertyApplication } from './PropertyApplication';
import { Property } from '@domain/property/Property';
import { Address } from '@domain/application/Address';

describe('Property application service', () => {
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

  it('Should get property with the specified ID', async () => {
    const propRepo: IPropertyRepository = jest.fn<IPropertyRepository>(() => ({
      findOneById: jest.fn().mockImplementation((id: string) => Property.create({
        ...baseProperty,
        address: Address.create({ ...baseAddress })
      }, id)),
    }));
    const repository = new propRepo();
    const svc = new PropertyApplication(repository);
    const result = await svc.getPropertyById('xxxxx');
    expect(repository.findOneById).toHaveBeenCalled();
    expect(result.guid).toBe('xxxxx');
  });
});