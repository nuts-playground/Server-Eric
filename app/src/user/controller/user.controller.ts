import { Body, Controller, Delete, Get, Session } from '@nestjs/common';
import { EmailDto } from '../dto/email.dto';
import { UserService } from '../service/user.service';
import { ResponseDto } from '../../common/dto/response.dto';
import { User } from '../entity/user.entity';
import { SafeResponseDto } from '../dto/safe-response.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/info')
    async getUserInfo(@Session() session: Record<string, any>): Promise<ResponseDto<any>> {
        if (!session.passport) return ResponseDto.error('정보가 존재하지 않습니다.');

        const userEmail = session.passport.user;
        const user = (await this.userService.findByEmail(userEmail)) as User;

        if (!user) return ResponseDto.error('로그인 하지 않았습니다.');
        const responseUserInfo = new SafeResponseDto(
            user.user_id,
            user.user_email,
            user.user_name,
            user.provider_id,
        ).getProfileInfo();

        return ResponseDto.successData(responseUserInfo);
    }

    @Delete('/info')
    async deleteUserInfo(@Body() userEmailDto: EmailDto): Promise<ResponseDto<any>> {
        const userEmail = userEmailDto.getEmail();
        const user = await this.userService.findByEmail(userEmail);

        if (!user) return ResponseDto.error('존재하지 않는 유저입니다.');

        const result = await this.userService.delete(userEmail);
        return result ? ResponseDto.success() : ResponseDto.error('삭제에 실패했습니다.');
    }

    @Get('/test')
    async test() {
        return '무의미 라우터 테스트';
    }
}
