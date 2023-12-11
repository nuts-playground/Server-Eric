import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserEmail, UserSignUpDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/test')
  test(@Req() req, @Res() res) {
    res.send('안녕하세요!');
  }

  @Post('/signUp')
  @UsePipes(new ValidationPipe())
  async signUp(@Body() userSignUpDto: UserSignUpDto) {
    console.log(userSignUpDto);
    return await this.userService.signUp(userSignUpDto);
  }

  @Post('/delete')
  @UsePipes(new ValidationPipe())
  async delete(@Body() userEmail: UserEmail): Promise<Boolean> {
    const state = await this.userService.delete(userEmail);
    return !!state;
  }

  @Post('/restore')
  @UsePipes(new ValidationPipe())
  async restore(@Body() userEmail: UserEmail): Promise<Boolean> {
    const state = await this.userService.restore(userEmail);
    return !!state;
  }
}
