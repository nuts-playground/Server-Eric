import { Injectable } from '@nestjs/common';
import {UserEmail, UserSignUpDto} from './dto/user.dto';
import {Repository, UpdateResult} from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async signUp(userSignUpDto: UserSignUpDto): Promise<UserSignUpDto> {
    await this.userRepository.save(userSignUpDto);
    return userSignUpDto;
  }

  async findByEmail() {
    return true;
  }

  async delete(userEmail: UserEmail): Promise<UpdateResult> {
      return await this.userRepository.softDelete({email: userEmail.email});
  }

  async restore(userEmail: UserEmail): Promise<UpdateResult> {
      return await this.userRepository.restore({email: userEmail.email})
  }
}
