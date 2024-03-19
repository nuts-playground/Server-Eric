import { Body, Controller, Delete, Get, Next, Req, Res, Session } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { instanceToPlain } from 'class-transformer';
import { NextFunction, Request, Response } from 'express';
import { DeleteUserDto } from '../dto/delete-user.dto';
import { UserService } from '../service/user.service';
import { ResponseDto } from '../../common/dto/response.dto';
import { User } from '../entity/user.entity';
import { SafeResponseDto } from '../dto/safe-response.dto';

@Controller('user')
@ApiTags('유저 API')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiExcludeEndpoint()
    @Get('/info')
    async getUserInfo(@Session() session: Record<string, any>, @Res() res: Response): Promise<any> {
        const change = (obj: any) => {
            return instanceToPlain(obj);
        };
        if (!session['passport']) {
            res.send(change(ResponseDto.error('잘못된 정보 요청입니다.')));
            return;
        }
        const userEmail = session['passport']['user'];
        const user = await this.userService.findByEmail(userEmail);
        if (!(user instanceof User)) {
            res.send(change(ResponseDto.error('유저를 찾을 수 없습니다.')));
            return;
        } else {
            const responseUserInfo = new SafeResponseDto(
                user.user_id,
                user.user_email,
                user.user_name,
                user.provider_id,
            ).getProfileInfo();

            res.cookie('state', 'active', {
                maxAge: 3600000 * 12 * 7,
            });
            res.send(change(ResponseDto.successData(responseUserInfo)));
            return;
        }
    }

    @ApiExcludeEndpoint()
    @Delete('/info')
    async deleteUserInfo(@Body() deleteUserDto: DeleteUserDto): Promise<ResponseDto<string>> {
        const userEmail = deleteUserDto.getEmail();
        const user = await this.userService.findByEmail(userEmail);

        if (!user) return ResponseDto.error('존재하지 않는 유저입니다.');
        const result = await this.userService.delete(userEmail);
        return result ? ResponseDto.success() : ResponseDto.error('삭제에 실패했습니다.');
    }

    /*
     *
     * 테스트 유저 세팅 => Responses 에 있는 value 로 다른 API 에 쓰시면 됩니다.
     *
     * npm*/
    @Get('/setSwaggerTestInfo')
    @ApiOperation({
        description:
            '유저가 oauth 로만 만들어져서 아래 보이는 데이터로 테스트 해보시면 됩니다. request 로 나오는 정보는 실제 응답 정보로 user_id가 없습니다.',
    })
    @ApiResponse({
        status: 200,
        description: '이 정보로 다른 요청을 해보세요!',
        schema: {
            type: 'object',
            properties: {
                testData: {
                    type: 'object',
                    properties: {
                        user_id: { type: 'string', default: 1 },
                        user_email: { type: 'string', default: 'test1@google.com' },
                        user_name: { type: 'string', default: 'testUser1' },
                        provider_id: { type: 'string', default: 'google' },
                    },
                },
            },
        },
    })
    async setSwaggerTestInfo() {
        const user = (await this.userService.findByEmail('test1@google.com')) as User;
        if (!(user instanceof User)) {
            return ResponseDto.error('로그인 하지 않았습니다.');
        } else {
            const responseUserInfo = new SafeResponseDto(
                user.user_id,
                user.user_email,
                user.user_name,
                user.provider_id,
            ).getProfileInfo();

            return ResponseDto.successData(responseUserInfo);
        }
    }
}
