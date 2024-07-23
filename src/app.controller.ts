import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Book } from './book'
import { bookDto } from './dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAll(): Book[] {
    return this.appService.getAll();
  }

  @Get("/:id")
  getOne(@Param("id") bookId:string): Book {
    return this.appService.getOne(bookId);
  }

  @Post()
  create(@Body() bookData: bookDto){
    return this.appService.create(bookData);
  }

  @Delete("/:id")
  remove(@Param("id") bookId:string) {
    return this.appService.remove(bookId);
  }
}
