import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @IsString()
    @ApiProperty({description:'이메일', default: 'test@gmail.com'})
    email: string;

    @IsString()
    @ApiProperty({description:'비밀번호', default: 'verystrongpassword'})
    password: string;
}
  