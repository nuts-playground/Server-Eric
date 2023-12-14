import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
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
    async signUp(
        @Body() userSignUpDto: UserSignUpDto,
    ): Promise<ResponseDto<UserSignUpDto>> {
        const result = await this.userService.signUp(userSignUpDto);
        return ResponseDto.successData(result);
    }

    @Post('/delete')
    async delete(@Body() userEmail: UserFindDto): Promise<boolean> {
        const state = await this.userService.delete(userEmail.getEmail());
        return !!state;
    }
    //
    @Post('/restore')
    async restore(@Body() userEmail: UserFindDto): Promise<boolean> {
        const state = await this.userService.restore(userEmail.getEmail());
        return !!state;
    }
}
