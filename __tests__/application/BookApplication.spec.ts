import "reflect-metadata";
import { IBookRepository } from "@domain/book/IBookRepository";
import { BookApplication } from "@application/book/BookApplication";
import { Book } from "@domain/book/Book";

describe("Book Application Service Test Suites", () => {

  let bookRepo: IBookRepository;
  let svc: BookApplication;
  let bookDb: Book[] = [
    {
      guid: "000000000",
      name: "Sample book",
      author: "Sample author",
      price: 100
    }
  ];

  const bookRepository = jest.fn<IBookRepository>(() => ({
    save: jest.fn().mockImplementation(
      (book: Book) => {
        const dbBook = bookDb.find(b => b.guid === book.guid);
        if (!dbBook) {
          bookDb.push(book);
        }
      }
    ),
    findAll: jest.fn().mockReturnValue(bookDb),
    findOneById: jest.fn().mockImplementation(
      (id: string) => {
        const b = bookDb.find(book => book.guid === id);
        if (!b) {
          return null;
        }
        return {
          ...b,
          setName: jest.fn(),
          setAuthor: jest.fn(),
          setPrice: jest.fn()
        }
      }
    ),
    delete: jest.fn().mockImplementation(
      (id: string) => {
        const index = bookDb.findIndex(b => b.guid === id);
        bookDb.splice(index, 1);
      }
    )
  })); 
  
  beforeEach(() => {
    bookRepo = new bookRepository();
    svc = new BookApplication(bookRepo);
  });

  it("Should successfully created the new book (Return void)", async () => {
    await svc.createBook({ guid: "11111111", name: "Sample Name", author: "Sample Author", price: 199 } as Book);
    expect(bookRepo.save).toHaveBeenCalled();
    expect(bookDb).toHaveLength(2);
  });

  it("Should return all books", async () => {
    const books = await svc.getAllBooks();
    expect(bookRepo.findAll).toHaveBeenCalled();
    expect(typeof books).toBe("object");
  });

  it("Should get one book based on given ID", async () => {
    const book = await svc.getById("000000000");
    expect(bookRepo.findOneById).toHaveBeenCalled();
    expect(book).toBeDefined();
  });

  it("Should update the book of the given ID successfully", async () => {
    await svc.updateBook("000000000", { name: "Edited book name", author: "Edited author name", price: 9999 } as Book);
    expect(bookRepo.findOneById).toHaveBeenCalled();
    expect(bookRepo.save).toHaveBeenCalled();
  });

  it("Should successfully delete the book of the given ID", async () => {
    await svc.deleteBook("000000000");
    const book = bookDb.find(book => book.guid === "000000000");
    expect(bookRepo.findOneById).toHaveBeenCalled();
    expect(bookRepo.delete).toHaveBeenCalled();
    expect(book).toBeUndefined();
  });
});