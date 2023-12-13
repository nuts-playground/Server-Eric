import { Injectable } from '@nestjs/common';
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

    async signUp(userSignUpDto: UserSignUpDto): Promise<UserSignUpDto> {
        const user = User.from(
            userSignUpDto.getEmail(),
            userSignUpDto.getNickname(),
            userSignUpDto.getProviderId()
        )
        try {
            await this.userRepository.save(user);
            return userSignUpDto;
        }catch(err) {
            console.log(err);
        }
    }

    // async findByEmail(userEmail: string): Promise<User> {
    //     return await this.userRepository.findOne({
    //         where: { EMAIL: userEmail },
    //     });
    // }
    // async delete(userEmail: UserEmail): Promise<UpdateResult> {
    //     return await this.userRepository.softDelete({ EMAIL: userEmail.EMAIL });
    // }
    //
    // async restore(userEmail: UserEmail): Promise<UpdateResult> {
    //     return await this.userRepository.restore({ EMAIL: userEmail.EMAIL });
    // }
}
