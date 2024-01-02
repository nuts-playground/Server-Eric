import { Body, Controller, InternalServerErrorException, Post } from '@nestjs/common';
import { UserDeleteDto } from './dto/user-delete.dto';
import { UserService } from './user.service';
import { ResponseDto } from '../common/dto/response.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    // @Post('/signUp')
    // async signUp(@Body() userSignUpDto: UserSignUpDto): Promise<ResponseDto<any>> {
    //     try {
    //         const state = userSignUpDto.isReadySignUp();
    //         if (!state) return ResponseDto.badParam(userSignUpDto.valiDateParam());
    //
    //         const user = await this.userService.findByEmail(userSignUpDto.getEmail());
    //         if (user) return ResponseDto.error('이미 존재하는 유저입니다.');
    //
    //         const result = await this.userService.signUp(userSignUpDto);
    //         return result ? ResponseDto.success() : ResponseDto.error('회원가입에 실패했습니다.');
    //     } catch (err) {
    //         throw new InternalServerErrorException(err);
    //     }
    // }

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
