import { injectable, inject } from 'inversify';
import { IBookRepository } from '@domain/book/IBookRepository';
import { TYPES } from '@constants/types';
import { Book } from '@domain/book/Book';
import { ApplicationError } from '@core/ApplicationError';

@injectable()
export class BookApplication {
  constructor(
    @inject(TYPES.BookRepository)
    private readonly bookRepository: IBookRepository
  ) {}

  async getAllBooks(): Promise<Book[]> {
    const books = await this.bookRepository.findAll();
    return books;
  }

  async getById(id: string): Promise<Book | null> {
    const book = await this.bookRepository.findOneById(id);
    if (!book) throw new ApplicationError('404', 'The book with the requested ID does not exist');
    return book;
  }

  async createBook({ name, author, price }: any): Promise<void> {
    const book = Book.create({ name, author, price });
    await this.bookRepository.save(book);
  }

  async updateBook(id: string, { name, author, price }: any): Promise<void> {
    const book = await this.bookRepository.findOneById(id);
    if (!book) throw new ApplicationError('404', 'The book with the requested ID does not exist');
    book.setName(name);
    book.setAuthor(author);
    book.setPrice(price);
    await this.bookRepository.save(book);
  }

  async deleteBook(id: string) {
    const book = await this.bookRepository.findOneById(id);
    if (!book) throw new ApplicationError('404', 'The book with the requested ID does not exist');
    await this.bookRepository.delete(id);
  }
}
