import { Injectable } from '@nestjs/common';
import { SignupDto } from '../dto/signup.dto';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async findByEmail(userEmail: string): Promise<User | boolean> {
        const query = { where: { user_email: userEmail } };
        const user = await this.userRepository.findOne(query);
        return user ? user : false;
    }

    async signUp(userSignUpDto: SignupDto): Promise<User | boolean> {
        const user = userSignUpDto.toEntity() ?? false;

        const notFoundUser = !(user instanceof User);

        if (notFoundUser) {
            new Error(JSON.stringify(userSignUpDto));
        } else {
            return await this.userRepository.save(user);
        }
    }

    async delete(userEmail: string): Promise<boolean> {
        const query = {
            user_email: userEmail,
        };
        const result = await this.userRepository.softDelete(query);
        return !!result;
    }

    async test() {
        console.log('test');
    }
}
