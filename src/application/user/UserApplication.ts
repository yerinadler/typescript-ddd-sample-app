import { injectable, inject } from 'inversify';
import { TYPES } from '@constants/types';
import { ApplicationError } from '@core/ApplicationError';
import { IUserRepository } from '@domain/user/IUserRepository';
import { UserDto } from './dtos/UserDto';
import { User } from '@domain/user/User';

@injectable()
export class UserApplication {
  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async getAllUsers(): Promise<any[]> {
    const users = await this.userRepository.findAll();
    return users.map(user => new UserDto(user.guid, user.email ,user.firstname, user.lastname));
  }

  async getUserById(id: string): Promise<any | null> {
    const user = await this.userRepository.findOneById(id);
    if (!user) throw new ApplicationError('404', 404, 'The user with the requested ID does not exist');
    return new UserDto(user.guid, user.email ,user.firstname, user.lastname);
  }

  async createUser({ email, firstname, lastname }: any): Promise<void> {
    const user = User.create({ email, firstname, lastname });
    await this.userRepository.save(user);
  }
}
