import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book'
import { bookDto } from './dto';

@Injectable()
export class AppService {
  private books: Book[] = [];

  getAll(): Book[] {
    return this.books;
  }

  getOne(bookId: string): Book {
    const book = this.books.find(book => book.id === +bookId);
    if(!book) {
        throw new NotFoundException(`Book with ID: ${bookId} not found.`)
    }
    return book;
  }

  create(bookData: bookDto) {
    this.books.push({
        id: this.books.length + 1,
        ...bookData
    })
  }

  remove(bookId: string) : boolean {
    this.getOne(bookId);
    this.books = this.books.filter(book => book.id !== +bookId);
    return true;
  }

}
