import { Db } from 'mongodb';
import { TYPES } from '@constants/types';
import config from '@config/main';
import { IDataMapper } from '@core/IDataMapper';
import { Application } from '@domain/application/Application';
import { IApplicationRepository } from '@domain/application/IApplicationRepository';
import { IPropertyRepository } from '@domain/property/IPropertyRepository';
import { Property } from '@domain/property/Property';
import { IUserRepository } from '@domain/user/IUserRepository';
import { User } from '@domain/user/User';
import { AsyncContainerModule, interfaces } from 'inversify';
import { ApplicationDataMapper } from '@infrastructure/dataMapper/ApplicationDataMapper';
import { PropertyDataMapper } from '@infrastructure/dataMapper/PropertyDataMapper';
import { UserDataMapper } from '@infrastructure/dataMapper/UserDataMapper';
import { createMongodbConnection } from '@infrastructure/db/mongodb';
import { ApplicationRepository } from '@infrastructure/repositories/ApplicationRepository';
import { PropertyRepository } from '@infrastructure/repositories/PropertyRepository';
import { UserRepository } from '@infrastructure/repositories/UserRepository';

export const infrastructureContainerModule = new AsyncContainerModule(async(bind: interfaces.Bind) => {
  const db: Db = await createMongodbConnection(config.MONGODB_URI);
  bind<Db>(TYPES.Db).toConstantValue(db);
  bind<IDataMapper<Application>>(TYPES.ApplicationDataMapper).to(ApplicationDataMapper);
  bind<IDataMapper<User>>(TYPES.UserDataMapper).to(UserDataMapper);
  bind<IDataMapper<Property>>(TYPES.PropertyDataMapper).to(PropertyDataMapper);
  bind<IApplicationRepository>(TYPES.ApplicationRepository).to(ApplicationRepository);
  bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
  bind<IPropertyRepository>(TYPES.PropertyRepository).to(PropertyRepository);
});