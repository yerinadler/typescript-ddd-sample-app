import { injectable, inject } from 'inversify';
import { Repository } from './Repository';
import { Book } from '@domain/book/Book';
import { IBookRepository } from '@domain/book/IBookRepository';
import { TYPES } from '@constants/types';
import { Db } from 'mongodb';
import { IDataMapper } from '@core/IDataMapper';

@injectable()
export class BookRepository extends Repository<Book> implements IBookRepository {
  constructor(
    @inject(TYPES.Db) private readonly db: Db,
    @inject(TYPES.BookDataMapper) private readonly bookDataMapper: IDataMapper<Book>
  ) {
    super(db.collection('books'), bookDataMapper);
  }
}