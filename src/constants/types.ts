export const TYPES = {
  // Dependencies
  Db: Symbol('Db'),

  // Repositories
  ApplicationRepository: Symbol('ApplicationRepository'),
  UserRepository: Symbol('UserRepository'),
  PropertyRepository: Symbol('PropertyRepository'),

  // Data Mappers
  ApplicationDataMapper: Symbol('ApplicationDataMapper'),
  UserDataMapper: Symbol('UserDataMapper'),
  PropertyDataMapper: Symbol('PropertyDataMapper'),

  // Application Services
  ApplicationApplication: Symbol('ApplicationApplication'),
  UserApplication: Symbol('UserApplication'),
  PropertyApplication: Symbol('PropertyApplication'),
};
