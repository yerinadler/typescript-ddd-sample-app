import { Property } from '@domain/property/Property';
import { User } from '@domain/user/User';
import { Application } from '../Application';
import { IApplicationRegistration } from '../IApplicationDomainServices';

export class ApplicationRegistration implements IApplicationRegistration {
  applyUserToProperty(user: User, property: Property) {
    const application = Application.create({ renterId: user.guid, propertyId: property.guid });
    return application;
  }
}