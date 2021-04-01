import { ValueObject } from '@core/ValueObject';

export class Address extends ValueObject {
  private _streetAddress: string;
  private _city: string;
  private _state: string;
  private _zip: string;

  constructor(
    streetAddress: string,
    city: string,
    state: string,
    zip: string,
  ) {
    super();
    this._streetAddress = streetAddress;
    this._city = city;
    this._state = state;
    this._zip = zip;
  }

  get streetAddress() {
    return this._streetAddress;
  }

  get city() {
    return this._city;
  }

  get state() {
    return this._state;
  }

  get zip() {
    return this._zip;
  }
}