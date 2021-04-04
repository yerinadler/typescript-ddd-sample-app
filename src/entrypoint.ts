import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import bodyParser from 'body-parser';
import config from '@config/main';
import '@interfaces/http/controllers';
import { errorHandler } from '@interfaces/http/middlewares/ErrorHandler';
import { Application as ExpressApplication } from 'express';

import { applicationContainerModule } from '@application/container';
import { infrastructureContainerModule } from '@infrastructure/container';

const initialise = async () => {
  const container = new Container();
  container.load(applicationContainerModule);
  await container.loadAsync(infrastructureContainerModule);

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
