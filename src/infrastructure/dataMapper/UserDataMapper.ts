import { injectable } from 'inversify';
import { IDataMapper } from '@core/IDataMapper';
import { User } from '@domain/user/User';

@injectable()
export class UserDataMapper implements IDataMapper<User> {
  toDomain(user: any) {
    const {
      guid,
      email,
      firstname,
      lastname
    } = user;
    return User.create({ email, firstname, lastname }, guid);
  }

  toDalEntity(userEntity: User) {
    return {
      guid: userEntity.guid,
      email: userEntity.email,
      firstname: userEntity.firstname,
      lastname: userEntity.lastname,
    };
  }
}
