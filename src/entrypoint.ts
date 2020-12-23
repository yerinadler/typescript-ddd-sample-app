import { Container } from 'inversify';
import { TYPES } from '@constants/types';
import { InversifyExpressServer } from 'inversify-express-utils';
import bodyParser from 'body-parser';
import config from '@config/main';

import '@interfaces/http/controllers';
import { createMongodbConnection } from '@infrastructure/db/mongodb';
import { IBookRepository } from '@domain/book/IBookRepository';
import { BookRepository } from '@infrastructure/repositories/BookRepository';
import { BookDataMapper } from '@infrastructure/dataMapper/BookDataMapper';
import { Db } from 'mongodb';
import { BookApplication } from '@application/book/BookApplication';
import { errorHandler } from '@interfaces/http/middlewares/ErrorHandler';
import { Application } from 'express';

const initialise = async () => {
  const container = new Container();

  // Module Registration
  const db: Db = await createMongodbConnection(config.MONGODB_URI);
  container.bind<Db>(TYPES.Db).toConstantValue(db);
  container.bind<BookDataMapper>(TYPES.BookDataMapper).to(BookDataMapper);
  container.bind<IBookRepository>(TYPES.BookRepository).to(BookRepository);
  container.bind<BookApplication>(TYPES.BookApplication).to(BookApplication);
  // ======================================================

  // API Server initialisation
  const server = new InversifyExpressServer(container);

  server.setConfig((app: Application) => {
    app.use(
      bodyParser.urlencoded({
        extended: true
      })
    );
    app.use(bodyParser.json());
  });

  server.setErrorConfig((app: Application) => {
    app.use(errorHandler);
  });

  const apiServer = server.build();
  apiServer.listen(config.API_PORT, () =>
    console.log('The application is initialised on the port %s', config.API_PORT)
  );
  // ======================================================
  return container;
};

export { initialise };
