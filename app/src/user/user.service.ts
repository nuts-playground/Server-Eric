import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserSignUpDto } from './dto/user-signup.dto';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findByEmail(userEmail: string): Promise<User | boolean> {
        try {
            const user = this.userRepository.findOne({
                where: { email: userEmail },
            });
            return user ? user : false;
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    async signUp(userSignUpDto: UserSignUpDto): Promise<User | boolean> {
        try {
            const state = userSignUpDto.isReadySignUp();
            if (!state) {
                return false;
            }
            const user = await this.findByEmail(userSignUpDto.getEmail());
            return !user ? this.userRepository.save(userSignUpDto.toEntity()) : false;
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    async delete(userEmail: string): Promise<boolean> {
        try {
            const user = await this.findByEmail(userEmail);
            if (user) {
                await this.userRepository.softDelete({
                    email: userEmail,
                });
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    async restore(userEmail: string): Promise<UpdateResult> {
        return await this.userRepository.restore({
            email: userEmail,
        });
    }
}
