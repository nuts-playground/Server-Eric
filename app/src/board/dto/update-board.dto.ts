import { IsOptional, MaxLength, MinLength } from 'class-validator';
import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { CreateBoardDto } from './create-board.dto';

export class UpdateBoardDto {
  @MinLength(2)
  @MaxLength(20)
  @IsOptional()
  title?: string;

  @IsOptional()
  content?: string;
}

// export class UpdateBoardDto extends PartialType(CreateBoardDto) {}
// export class UpdateBoardDto extends PickType(CreateBoardDto,['title']) {}
