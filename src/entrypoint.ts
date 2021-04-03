import { Container } from 'inversify';
import { TYPES } from '@constants/types';
import { InversifyExpressServer } from 'inversify-express-utils';
import bodyParser from 'body-parser';
import config from '@config/main';

import '@interfaces/http/controllers';
import { createMongodbConnection } from '@infrastructure/db/mongodb';
import { Db } from 'mongodb';
import { errorHandler } from '@interfaces/http/middlewares/ErrorHandler';
import { Application as ExpressApplication } from 'express';
import { IApplicationRepository } from '@domain/application/IApplicationRepository';
import { ApplicationRepository } from '@infrastructure/repositories/ApplicationRepository';
import { UserRepository } from '@infrastructure/repositories/UserRepository';
import { IUserRepository } from '@domain/user/IUserRepository';
import { IDataMapper } from '@core/IDataMapper';
import { User } from '@domain/user/User';
import { UserDataMapper } from '@infrastructure/dataMapper/UserDataMapper';
import { Application } from '@domain/application/Application';
import { ApplicationDataMapper } from '@infrastructure/dataMapper/ApplicationDataMapper';
import { PropertyDataMapper } from '@infrastructure/dataMapper/PropertyDataMapper';
import { Property } from '@domain/property/Property';
import { IPropertyRepository } from '@domain/property/IPropertyRepository';
import { PropertyRepository } from '@infrastructure/repositories/PropertyRepository';

// Container Module Imports
import { applicationContainerModule } from '@application/container';

const initialise = async () => {
  const container = new Container();

  const db: Db = await createMongodbConnection(config.MONGODB_URI);
  container.bind<Db>(TYPES.Db).toConstantValue(db);
  container.bind<IDataMapper<Application>>(TYPES.ApplicationDataMapper).to(ApplicationDataMapper);
  container.bind<IDataMapper<User>>(TYPES.UserDataMapper).to(UserDataMapper);
  container.bind<IDataMapper<Property>>(TYPES.PropertyDataMapper).to(PropertyDataMapper);
  container.bind<IApplicationRepository>(TYPES.ApplicationRepository).to(ApplicationRepository);
  container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
  container.bind<IPropertyRepository>(TYPES.PropertyRepository).to(PropertyRepository);
  container.load(applicationContainerModule);

  // API Server initialisation
  const server = new InversifyExpressServer(container);

  server.setConfig((app: ExpressApplication) => {
    app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );
    app.use(bodyParser.json());
  });

  server.setErrorConfig((app: ExpressApplication) => {
    app.use(errorHandler);
  });

  const apiServer = server.build();
  apiServer.listen(config.API_PORT, () =>
    console.log('The application is initialised on the port %s', config.API_PORT)
  );

  return container;
};

export { initialise };
