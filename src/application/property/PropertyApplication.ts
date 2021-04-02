import { TYPES } from '@constants/types';
import { ApplicationError } from '@core/ApplicationError';
import { IPropertyRepository } from '@domain/property/IPropertyRepository';
import { Property } from '@domain/property/Property';
import { inject, injectable } from 'inversify';
import { PropertyDto } from './dtos/PropertyDto';

@injectable()
export class PropertyApplication {
  constructor(
    @inject(TYPES.PropertyRepository)
    private readonly propertyRepository: IPropertyRepository
  ) {}

  async getPropertyById(id: string) {
    const property = await this.propertyRepository.findOneById(id);
    if (!property) {
      throw new ApplicationError('404', 'The property requested does not exist');
    }
    return new PropertyDto(property.guid, property.propertyType, property.name, property.floors, property.address);
  }

  async createProperty({ propertyType, name, floors, address }: any): Promise<void> {
    const property = Property.create({ propertyType, name, floors, address });
    await this.propertyRepository.save(property);
  }
}