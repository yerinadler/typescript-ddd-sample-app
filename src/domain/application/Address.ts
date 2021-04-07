import { ValueObject } from '@core/ValueObject';

interface IAddressProps {
  streetAddress: string,
  city: string,
  state: string,
  zip: string,
}

interface IAddressValueObjectProps {
  value: IAddressProps;
}

export class Address extends ValueObject<IAddressValueObjectProps> {
  private constructor(props: IAddressValueObjectProps) {
    super(props);
  }

  get value(): IAddressProps {
    return this.props.value;
  }

  public static create(props: IAddressProps) {
    return new Address({ value: props });
  }
}