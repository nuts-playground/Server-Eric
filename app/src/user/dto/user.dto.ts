import {
    IsEmail,
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
    IsEnum,
} from 'class-validator';
import { ProviderId } from '../enum/provider-id';

export class UserSignUpDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly EMAIL: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(10)
    readonly NICKNAME: string;

    @IsNotEmpty()
    @IsString()
    @IsEnum(ProviderId)
    readonly PROVIDER_ID: ProviderId;

    constructor(email: string, nickname: string, providerId: ProviderId) {
        this.EMAIL = email;
        this.NICKNAME = nickname;
        this.PROVIDER_ID = providerId;
    }

    get email() {
        return this.EMAIL;
    }

    get nickname() {
        return this.NICKNAME;
    }

    get providerId() {
        return this.PROVIDER_ID;
    }
}

export class UserEmail {
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    readonly EMAIL: string;
}
