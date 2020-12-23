import { Entity } from '@core/Entity';

export interface IBookProps {
  name: string;
  author: string;
  price: number;
}

export class Book extends Entity<IBookProps> {
  private name: string;
  private author: string;
  private price: number;

  constructor({ name, author, price }: IBookProps, guid?: string) {
    super(guid);
    this.name = name;
    this.author = author;
    this.price = price;
  }

  setName(name: string) {
    this.name = name;
  }

  setAuthor(authorName: string) {
    this.author = authorName;
  }

  setPrice(amount: number) {
    this.price = amount;
  }

  static create(props: IBookProps, guid?: string) {
    return new Book(props, guid);
  }
}
