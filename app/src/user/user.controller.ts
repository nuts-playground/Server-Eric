import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { UserSignUpDto } from './dto/user-signup.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('/test')
    test(@Req() req, @Res() res) {
        res.send('안녕하세요!');
    }

    @Post('/signUp')
    async signUp(@Body() userSignUpDto: UserSignUpDto) {
        return await this.userService.signUp(userSignUpDto);
    }

    // @Post('/delete')
    // async delete(@Body() ): Promise<boolean> {
    //     const state = await this.userService.delete(userEmail);
    //     return !!state;
    // }
    //
    // @Post('/restore')
    // async restore(@Body() userEmail: UserEmail): Promise<boolean> {
    //     const state = await this.userService.restore(userEmail);
    //     return !!state;
    // }
}
