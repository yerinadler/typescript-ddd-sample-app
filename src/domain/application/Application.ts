import { Entity } from '@core/Entity';
import { Address } from './Address';

export interface IApplicationProps {
  renterId: string;
  firstname: string;
  lastname: string;
  address: Address;
  monthlyIncome: number;
  status?: string;
}

export class Application extends Entity<IApplicationProps> {
  private _renterId: string;
  private _address: Address;
  private _firstname: string;
  private _lastname: string;
  private _monthlyIncome: number;
  private _applicationStatus: string;
  private _version: number;

  constructor({ renterId, address, monthlyIncome ,firstname, lastname, status }: IApplicationProps, guid?: string) {
    super(guid);
    this._renterId = renterId;
    this._address = address;
    this._firstname = firstname;
    this._lastname = lastname;
    this._monthlyIncome = monthlyIncome;
    this._applicationStatus = status || 'PENDING_COMPLETION';
    this._version = 1;
  }

  get renterId() {
    return this._renterId;
  }

  get address() {
    return this._address;
  }

  get monthlyIncome() {
    return this._monthlyIncome;
  }

  get firstname() {
    return this._firstname;
  }

  get lastname() {
    return this._lastname;
  }

  get applicationStatus() {
    return this._applicationStatus;
  }

  get version() {
    return this._version;
  }

  markAsSubmitted() {
    if (this._monthlyIncome < 10000) {
      throw new Error('Insufficient income');
    }
    this._applicationStatus = 'SUBMITTED';
  }

  static create(props: IApplicationProps, guid?: string) {
    return new Application(props, guid);
  }
}
