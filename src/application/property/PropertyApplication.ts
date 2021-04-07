import { TYPES } from '@constants/types';
import { ApplicationError } from '@core/ApplicationError';
import { Address } from '@domain/application/Address';
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
      throw new ApplicationError('404', 404, 'The property requested does not exist');
    }
    return new PropertyDto(
      property.guid,
      property.propertyType,
      property.name, property.floors,
      property.address.value
    );
  }

  async createProperty({ propertyType, name, floors, address: parsedAddress }: any): Promise<void> {
    const address = Address.create(parsedAddress);
    const property = Property.create({ propertyType, name, floors, address });
    await this.propertyRepository.save(property);
  }
}