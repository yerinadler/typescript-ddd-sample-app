import { Property } from '@domain/property/Property';
import { Address } from '@domain/application/Address';

describe('Property domain model', () => {

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


  it('Should be instantiated without error', () => {
    expect(() => Property.create({ ...baseProperty, address: Address.create({ ...baseAddress })})).not.toThrow();
  });

  it('Should contains address as a value object', () => {
    const prop = Property.create({ ...baseProperty, address: Address.create({ ...baseAddress }) });
    expect(prop.address instanceof Address).toBe(true);
  });
});