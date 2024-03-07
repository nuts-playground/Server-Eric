import { Injectable } from '@nestjs/common';
import { ExchangeObj, SignupDto } from '../dto/signup.dto';
import { User } from '../entity/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async findByEmail(userEmail: string): Promise<User | boolean> {
        const query = { where: { user_email: userEmail } };
        const user = await this.userRepository.findOne(query);
        return user instanceof User ? user : false;
    }

    async signUp(signUpDto: SignupDto): Promise<User | boolean | ExchangeObj | never> {
        const user = signUpDto.toEntity();
        const notFoundUser = !(user instanceof User);

        return notFoundUser ? user : await this.userRepository.save(user);
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
