import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
// import { Book } from './entity/book.entity'
import { Book } from '@prisma/client'; 
import { BookDto } from './dto/book.dto';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@ApiTags('도서 관리자 API')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({summary:'전체 도서', description: '모든 도서에 관련된 정보를 불러옵니다.'})
  getAll(): Promise<Book[]> {
    return this.appService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get("/:id")
  @ApiOperation({summary:'도서 검색', description: '해당 ID의 도서 정보를 불러옵니다.'})
  @ApiResponse({status:201, description:'도서 정보를 불러오는데 성공하였습니다.'})
  @ApiResponse({status:404, description:'도서 정보를 불러오는데 실패하였습니다.'})
  getOne(@Param("id") bookId:string): Promise<Book> {
    return this.appService.getOne(bookId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({summary:'도서 추가', description: '도서 정보를 추가합니다.'})
  @ApiResponse({status:201, description:'도서 정보를 추가하는데 성공하였습니다.'})
  @ApiResponse({status:404, description:'도서 정보를 추가하는데 실패하였습니다.'})
  create(@Body() bookData: BookDto): Promise<Book>{
    return this.appService.create(bookData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete("/:id")
  @ApiOperation({summary:'도서 삭제', description: '도서 정보를 삭제합니다.'})
  @ApiResponse({status:201, description:'도서 정보를 삭제하는데 성공하였습니다.'})
  @ApiResponse({status:404, description:'도서 정보를 삭제하는데 실패하였습니다.'})
  remove(@Param("id") bookId:string): Promise<boolean>{
    return this.appService.remove(bookId);
  }
}
