import { injectable, inject } from 'inversify';
import { TYPES } from '@constants/types';
import { ApplicationError } from '@core/ApplicationError';
import { IApplicationRepository } from '@domain/application/IApplicationRepository';
import { ApplicationDto } from './dtos/ApplicationDto';
import { IPropertyRepository } from '@domain/property/IPropertyRepository';
import { IUserRepository } from '@domain/user/IUserRepository';
import { ApplicationRegistration } from '@domain/application/services/ApplicationRegistration';

@injectable()
export class ApplicationApplication {
  constructor(
    @inject(TYPES.ApplicationRepository) private readonly applicationRepository: IApplicationRepository,
    @inject(TYPES.PropertyRepository) private readonly propertyRepository: IPropertyRepository,
    @inject(TYPES.UserRepository) private readonly userRepository: IUserRepository,
  ) {}

  async getAllApplications(): Promise<ApplicationDto[]> {
    const apps = await this.applicationRepository.findAll();
    return apps.map(app => new ApplicationDto(app.guid, app.renterId, app.propertyId, app.applicationStatus));
  }

  async getApplicationById(id: string): Promise<ApplicationDto | null> {
    const app = await this.applicationRepository.findOneById(id);
    if (!app) throw new ApplicationError('404', 404, 'The app with the requested ID does not exist');
    return new ApplicationDto(app.guid, app.renterId, app.propertyId, app.applicationStatus);
  }

  async createApplication({ renterId, propertyId }: any): Promise<void> {
    const user = await this.userRepository.findOneById(renterId);
    if (!user) {
      throw new ApplicationError('400', 400, 'The user is invalid');
    }
    const property = await this.propertyRepository.findOneById(propertyId);
    if (!property) {
      throw new ApplicationError('400', 400, 'The property is invalid');
    }
    const application = new ApplicationRegistration().applyUserToProperty(user, property);
    await this.applicationRepository.save(application);
  }
}
