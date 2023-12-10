import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
export class UserSignUpDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(10)
  nickname: string;

  @IsNotEmpty()
  @IsString()
  provider_id: string;
}

export class UserEmail {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
