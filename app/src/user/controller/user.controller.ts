import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Post,
    Session,
} from '@nestjs/common';
import { UserEmailDto } from '../dto/user-email.dto';
import { UserService } from '../service/user.service';
import { ResponseDto } from '../../common/dto/response.dto';
import { User } from '../entity/user.entity';
import { UserResponseDto } from '../dto/user-response.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/getInfo')
    async getInfo(
        @Session() session: Record<string, any>,
    ): Promise<ResponseDto<any>> {
        try {
            if (!session.passport)
                return ResponseDto.error('정보가 존재하지 않습니다.');

            const userEmail = session.passport.user;
            const user = (await this.userService.findByEmail(
                userEmail,
            )) as User;

            if (!user) return ResponseDto.error('로그인 하지 않았습니다.');

            const responseUserInfo = new UserResponseDto(
                user.user_id,
                user.user_email,
                user.user_name,
                user.provider_id,
            ).getProfileInfo();

            return ResponseDto.successData(responseUserInfo);
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    @Post('/delete')
    async delete(
        @Body() userEmailDto: UserEmailDto,
    ): Promise<ResponseDto<any>> {
        try {
            const user = await this.userService.findByEmail(
                userEmailDto.getEmail(),
            );
            if (!user) return ResponseDto.error('존재하지 않는 유저입니다.');

            const result = await this.userService.delete(
                userEmailDto.getEmail(),
            );
            return result
                ? ResponseDto.success()
                : ResponseDto.error('삭제에 실패했습니다.');
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    @Get('/test')
    async test() {
        return '무의미 라우터 테스트';
    }
}
