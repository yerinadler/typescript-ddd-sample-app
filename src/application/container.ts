import { TYPES } from '@constants/types';
import { ContainerModule, interfaces } from 'inversify';
import { ApplicationApplication } from '@application/application/ApplicationApplicationService';
import { PropertyApplication } from '@application/property/PropertyApplication';
import { UserApplication } from '@application/user/UserApplication';

export const applicationContainerModule = new ContainerModule(
  (
    bind: interfaces.Bind,
  ) => {
    bind<ApplicationApplication>(TYPES.ApplicationApplication).to(ApplicationApplication);
    bind<UserApplication>(TYPES.UserApplication).to(UserApplication);
    bind<PropertyApplication>(TYPES.PropertyApplication).to(PropertyApplication);
  }
);