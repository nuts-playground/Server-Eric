import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserSignUpDto } from '../dto/user-signup.dto';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
    ) {}

    async findByEmail(userEmail: string): Promise<User | boolean> {
        try {
            const user = await this.userRepository.findOne({
                where: { user_email: userEmail },
            });
            return user ? user : false;
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    async signUp(userSignUpDto: UserSignUpDto): Promise<User | boolean> {
        try {
            return await this.userRepository.save(userSignUpDto.toEntity());
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    async delete(userEmail: string): Promise<boolean> {
        try {
            const result = await this.userRepository.softDelete({
                user_email: userEmail,
            });
            return !!result;
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }
}
