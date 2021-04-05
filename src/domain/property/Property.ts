import { Entity } from '@core/Entity';
import { IAggregateRoot } from '@core/IAggregateRoot';
import { Address } from '@domain/application/Address';

interface IPropertyProps {
  name: string;
  propertyType: string;
  floors: number;
  address: Address
}

export class Property extends Entity<IPropertyProps> implements IAggregateRoot {

  private _name: string;
  private _propertyType: string;
  private _floors: number;
  private _address: Address;

  private constructor({
    name,
    propertyType,
    floors,
    address,
  }: IPropertyProps, guid?: string) {
    super(guid);
    this._name = name;
    this._propertyType = propertyType;
    this._floors = floors;
    this._address = address;
  }

  get name() {
    return this._name;
  }

  get propertyType() {
    return this._propertyType;
  }

  get floors() {
    return this._floors;
  }

  get address() {
    return this._address;
  }

  public static create(props: IPropertyProps, guid?: string) {
    if (!props.name || !props.propertyType || !props.floors || !props.address) {
      throw new Error('Unable to create the property');
    }
    return new Property(props, guid);
  }
}