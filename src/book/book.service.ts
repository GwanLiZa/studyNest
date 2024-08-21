import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { BookDto } from '../dto/book.dto';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Book[]> {
    return this.prisma.book.findMany();
  }

  async getOne(bookId: string): Promise<Book> {
    const book = await this.prisma.book.findUnique({
      where: {id: +bookId}
    });
    if(!book) {
        throw new NotFoundException(`Book with ID: ${bookId} not found.`)
    }
    return book;
  }

  async create(bookData: BookDto): Promise<Book> {
    const newBook = await this.prisma.book.create({
      data:{
        title: bookData.title,
        year: bookData.year,
        genres: {
          create: bookData.genres.map(g => ({
            genre: {
              connectOrCreate: { where: { genre: g }, create: { genre: g}}
            }
          }))
        }
      }
    });
    return newBook
  }

  async remove(bookId: string) : Promise<boolean> {
    await this.getOne(bookId);
    await this.prisma.book.delete({
      where: {id: +bookId},
    });
    return true;
  }

}
