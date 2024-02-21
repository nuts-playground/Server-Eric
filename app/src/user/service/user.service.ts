import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserSignUpDto } from '../dto/user-signup.dto';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

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
            const user = userSignUpDto.toEntity() ?? false;
            if (user instanceof User) {
                return await this.userRepository.save(user);
            } else {
                new Error(JSON.stringify(userSignUpDto));
            }
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

    // async findAll() {
    //     try {
    //         const result = await this.userRepository.find();
    //         console.log(result);
    //     } catch (err) {
    //         throw new InternalServerErrorException(err);
    //     }
    // }

    async test() {
        console.log('test');
    }
}
