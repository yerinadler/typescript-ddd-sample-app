import { TYPES } from '@constants/types';
import { IDataMapper } from '@core/IDataMapper';
import { IPropertyRepository } from '@domain/property/IPropertyRepository';
import { Property } from '@domain/property/Property';
import { inject, injectable } from 'inversify';
import { Db } from 'mongodb';
import { Repository } from './Repository';

@injectable()
export class PropertyRepository extends Repository<Property> implements IPropertyRepository {
  constructor(
    @inject(TYPES.Db) private readonly db: Db,
    @inject(TYPES.PropertyDataMapper) private readonly propertyDataMapper: IDataMapper<Property>
  ) {
    super(db.collection('properties'), propertyDataMapper);
  }
}