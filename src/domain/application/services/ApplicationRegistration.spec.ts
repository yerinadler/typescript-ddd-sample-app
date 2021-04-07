import { Property } from '@domain/property/Property';
import { User } from '@domain/user/User';
import { Address } from '@domain/application/Address';
import { Application } from '../Application';
import { ApplicationRegistration } from './ApplicationRegistration';

describe('User application to the property domain service', () => {
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

  const baseUser = {
    email: 'sample@gmail.com',
    firstname: 'Firstname',
    lastname: 'Lastname'
  };

  it('Should successfully apply for the property with the correct information', () => {
    const property = Property.create({ ...baseProperty, address: Address.create({ ...baseAddress }) });
    const user = User.create({ ...baseUser });
    const application: Application = new ApplicationRegistration().applyUserToProperty(user, property);
    expect(application.renterId).toBe(user.guid);
    expect(application.propertyId).toBe(property.guid);
  });

});