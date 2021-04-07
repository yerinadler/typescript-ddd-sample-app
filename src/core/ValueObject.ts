import { shallowEqual } from 'shallow-equal-object';

interface IValueObjectProps {
  [index: string]: any;
}

export abstract class ValueObject<T extends IValueObjectProps> {
  public readonly props: T;

  constructor(props: T) {
    this.props = Object.freeze(props);
  }

  public isEqualTo(valueObject?: ValueObject<T>): boolean {
    if (valueObject === null || valueObject === undefined || valueObject.props === undefined) {
      return false;
    }
    return shallowEqual(this.props, valueObject.props);
  }
}