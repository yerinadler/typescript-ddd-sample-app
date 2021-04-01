import { injectable, inject } from 'inversify';
import { Repository } from './Repository';
import { TYPES } from '@constants/types';
import { Db } from 'mongodb';
import { IDataMapper } from '@core/IDataMapper';
import { Application } from '@domain/application/Application';
import { IApplicationRepository } from '@domain/application/IApplicationRepository';

@injectable()
export class ApplicationRepository extends Repository<Application> implements IApplicationRepository {
  constructor(
    @inject(TYPES.Db) private readonly db: Db,
    @inject(TYPES.ApplicationDataMapper) private readonly applicationDataMapper: IDataMapper<Application>
  ) {
    super(db.collection('applications'), applicationDataMapper);
  }
}