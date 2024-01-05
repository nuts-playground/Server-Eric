import { Controller, Get, InternalServerErrorException, Session } from '@nestjs/common';
import { ResponseDto } from '../common/dto/response.dto';
import { UserResponseDto } from '../user/dto/user-response.dto';
import { User } from '../user/entity/user.entity';
import { MainService } from './main.service';

@Controller('main')
export class MainController {
    constructor(private readonly mainService: MainService) {}
    @Get('/')
    async returnUser(@Session() session: Record<string, any>): Promise<ResponseDto<any>> {
        try {
            if (!session.passport) return ResponseDto.error('로그인 하지 않았습니다.');
            const userEmail = session.passport.user;
            const user = (await this.mainService.returnUser(userEmail)) as User;
            if (!user) return ResponseDto.error('로그인 하지 않았습니다.');
            const responseUserInfo = new UserResponseDto(user.user_email, user.user_name, user.provider_id);
            return ResponseDto.successData<UserResponseDto>(responseUserInfo);
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }
}
