import { injectable } from 'inversify';
import { IDataMapper } from '@core/IDataMapper';
import { Application } from '@domain/application/Application';

@injectable()
export class ApplicationDataMapper implements IDataMapper<Application> {
  toDomain(application: any) {
    const {
      guid,
      renterId,
      propertyId,
      status,
    } = application;
    return Application.create({ renterId, propertyId, status }, guid);
  }

  toDalEntity(applicationEntity: Application) {
    return {
      guid: applicationEntity.guid,
      status: applicationEntity.applicationStatus,
      renterId: applicationEntity.renterId,
      propertyId: applicationEntity.propertyId,
      __v: applicationEntity.version,
    };
  }
}
