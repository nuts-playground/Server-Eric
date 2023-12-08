import {IsNotEmpty, MaxLength, MinLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateBoardDto {
    @MinLength(2)
    @MaxLength(20)
    @IsNotEmpty()
    @ApiProperty({
        description: '제목',
        required: true,
        example: '보드 제목'
    })
    title: string;

    @IsNotEmpty()
    @ApiProperty({
        description: '내용',
        required: true,
        example: '보드의 내용'
    })
    content: string;
}
