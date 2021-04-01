import { Entity } from '@core/Entity';

export interface IUserProps {
  email: string;
  firstname: string;
  lastname: string;
}

export class User extends Entity<IUserProps> {

  private _email: string;
  private _firstname: string;
  private _lastname: string;

  constructor({ email, firstname, lastname }: IUserProps, guid?: string) {
    super(guid);
    this._email = email;
    this._firstname = firstname;
    this._lastname = lastname;
  }

  get email() {
    return this._email;
  }

  get firstname() {
    return this._firstname;
  }

  get lastname() {
    return this._lastname;
  }

  public static create(props: IUserProps, guid?: string) {
    return new User(props, guid);
  }
}