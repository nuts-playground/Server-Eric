import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
} from 'class-validator';

export class UserSignUpDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    EMAIL: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(10)
    NICKNAME: string;

    @IsNotEmpty()
    @IsString()
    PROVIDER_ID: string;
}

export class UserEmail {
    @IsEmail()
    @IsNotEmpty()
    @IsString()
    EMAIL: string;
}
