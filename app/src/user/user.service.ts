import { Injectable } from '@nestjs/common';
import { UserSignUpDto } from './dto/user-signup.dto';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { UserFindDto } from './dto/user-find.dto';
// import { use } from 'passport';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    // async signUp(userSignUpDto: UserSignUpDto) {
    // }

    async findByEmail(userEmail: string): Promise<User> {
        return this.userRepository.findOne({
            where: { email: userEmail },
        });
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
