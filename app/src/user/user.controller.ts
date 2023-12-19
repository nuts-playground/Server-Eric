import { Body, Controller, Get, InternalServerErrorException, Post, Req, Res } from '@nestjs/common';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserService } from './user.service';
import { UserFindDto } from './dto/user-find.dto';
import { ResponseDto } from '../common/dto/response-dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/test')
    test(@Req() req, @Res() res) {
        res.send('안녕하세요!');
    }

    @Post('/signUp')
    async signUp(@Body() userSignUpDto: UserSignUpDto): Promise<any> {
        try {
            const user = await this.userService.signUp(userSignUpDto);
            if (!user) {
                const state = userSignUpDto.isReadySignUp();
                return state === true ? ResponseDto.error('이미 존재하는 유저입니다.') : ResponseDto.badParam(userSignUpDto.valiDateParam());
            }
            return ResponseDto.success();
        } catch (err) {
            throw new InternalServerErrorException(err);
        }
    }

    @Post('/delete')
    async delete(@Body() userEmail: UserFindDto): Promise<boolean> {
        const state = await this.userService.delete(userEmail.getEmail());
        return !!state;
    }

    @Post('/restore')
    async restore(@Body() userEmail: UserFindDto): Promise<boolean> {
        const state = await this.userService.restore(userEmail.getEmail());
        return !!state;
    }
}
