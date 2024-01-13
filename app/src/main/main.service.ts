import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class MainService {
    constructor(private readonly userService: UserService) {}
}
