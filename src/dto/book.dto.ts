import { IsString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class BookDto {
    @IsString()
    @ApiProperty({description:'제목', default: 'test'})
    readonly title: string;
    
    @IsNumber()
    @ApiProperty({description:'출판년도', default: '2024'})
    readonly year: number;

    @IsString({each : true})
    @ApiProperty({description:'장르', default: '[test, test]'})
    readonly genres: string[];
}