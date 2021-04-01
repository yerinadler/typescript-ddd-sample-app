import { injectable, inject } from 'inversify';
import { TYPES } from '@constants/types';
import { ApplicationError } from '@core/ApplicationError';
import { IApplicationRepository } from '@domain/application/IApplicationRepository';
import { Application } from '@domain/application/Application';
import { ApplicationDto } from './dtos/ApplicationDto';

@injectable()
export class ApplicationApplication {
  constructor(
    @inject(TYPES.ApplicationRepository)
    private readonly applicationRepository: IApplicationRepository
  ) {}

  async getAllApplications(): Promise<ApplicationDto[]> {
    const apps = await this.applicationRepository.findAll();
    return apps.map(app => new ApplicationDto(app.guid, app.firstname, app.lastname, app.monthlyIncome, app.address));
  }

  async getApplicationById(id: string): Promise<ApplicationDto | null> {
    const app = await this.applicationRepository.findOneById(id);
    if (!app) throw new ApplicationError('404', 'The app with the requested ID does not exist');
    return new ApplicationDto(app.guid, app.firstname, app.lastname, app.monthlyIncome, app.address);
  }

  async createApplication({ firstname, lastname, address, renterId, monthlyIncome }: any): Promise<void> {
    const application = Application.create({ firstname, lastname, address, renterId, monthlyIncome });
    await this.applicationRepository.save(application);
  }
}
