import { Injectable, NotFoundException } from '@nestjs/common';
// import { Book } from './entity/book.entity'
import { Book } from '@prisma/client';
import { PrismaService } from './prisma/prisma.service';
import { BookDto } from './dto/book.dto';

@Injectable()
export class AppService {
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
    const lastBook = await this.prisma.book.findFirst({
      orderBy: {
        id: 'desc',
      },
      select: {
        id: true,
      },
    });

    const newId = lastBook ? lastBook.id + 1 : 1;

    return this.prisma.book.create({
      data: {
        id: newId,
        ...bookData
      }
    });
  }

  async remove(bookId: string) : Promise<boolean> {
    await this.getOne(bookId);
    await this.prisma.book.delete({
      where: {id: +bookId},
    });
    return true;
  }

}
