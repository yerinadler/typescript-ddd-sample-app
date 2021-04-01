import { injectable } from 'inversify';
import { IDataMapper } from '@core/IDataMapper';
import { Application } from '@domain/application/Application';

@injectable()
export class ApplicationDataMapper implements IDataMapper<Application> {
  toDomain(application: any) {
    const {
      firstname,
      lastname,
      renterId,
      address,
      status,
      monthlyIncome,
      guid,
    } = application;
    return Application.create({ firstname, lastname, renterId, address, status, monthlyIncome }, guid);
  }

  toDalEntity(applicationEntity: Application) {
    return {
      guid: applicationEntity.guid,
      firstname: applicationEntity.firstname,
      lastname: applicationEntity.lastname,
      monthlyIncome: applicationEntity.monthlyIncome,
      status: applicationEntity.applicationStatus,
      renterId: applicationEntity.renterId,
      address: {
        city: applicationEntity.address.city,
        streetAddress: applicationEntity.address.streetAddress,
        state: applicationEntity.address.state,
        zip: applicationEntity.address.zip,
      },
      __v: applicationEntity.version,
    };
  }
}
