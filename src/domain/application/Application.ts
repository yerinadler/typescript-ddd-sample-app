import { Entity } from '@core/Entity';
import { IAggregateRoot } from '@core/IAggregateRoot';

export interface IApplicationProps {
  renterId: string;
  propertyId: string;
  status?: string;
}

export class Application extends Entity<IApplicationProps> implements IAggregateRoot {
  private _renterId: string;
  private _propertyId: string;
  private _applicationStatus: string;
  private _version: number;

  constructor({ renterId, propertyId, status }: IApplicationProps, guid?: string) {
    super(guid);
    this._renterId = renterId;
    this._propertyId = propertyId;
    this._applicationStatus = status || 'PENDING_COMPLETION';
    this._version = 1;
  }

  get renterId() {
    return this._renterId;
  }

  get propertyId() {
    return this._propertyId;
  }

  get applicationStatus() {
    return this._applicationStatus;
  }

  get version() {
    return this._version;
  }

  static create(props: IApplicationProps, guid?: string) {
    return new Application(props, guid);
  }
}
