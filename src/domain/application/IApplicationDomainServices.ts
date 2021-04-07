import { Property } from '@domain/property/Property';
import { User } from '@domain/user/User';
import { Application } from './Application';

export interface IApplicationRegistration {
  applyUserToProperty(user: User, property: Property): Application;
}