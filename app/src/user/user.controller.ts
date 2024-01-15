import { Body, Controller, Get, InternalServerErrorException, Post, Session } from '@nestjs/common';
import { UserDeleteDto } from './dto/user-delete.dto';
import { UserService } from './user.service';
import { ResponseDto } from '../common/dto/response.dto';
import { User } from './entity/user.entity';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/getInfo')
    async getInfo(@Session() session: Record<string, any>): Promise<ResponseDto<any>> {
        try {
            const userEmail = session.passport.user;
            const user = (await this.userService.findByEmail(userEmail)) as User;

            if (!user) return ResponseDto.error('로그인 하지 않았습니다.');

            const responseUserInfo = new UserResponseDto(user.user_email, user.user_name, user.provider_id).getProfileInfo();
            return ResponseDto.successData(responseUserInfo);
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    @Post('/delete')
    async delete(@Body() userDeleteDto: UserDeleteDto): Promise<ResponseDto<any>> {
        try {
            const user = await this.userService.findByEmail(userDeleteDto.getEmail());
            if (!user) return ResponseDto.error('존재하지 않는 유저입니다.');

            const result = await this.userService.delete(userDeleteDto.getEmail());
            return result ? ResponseDto.success() : ResponseDto.error('삭제에 실패했습니다.');
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }
}
