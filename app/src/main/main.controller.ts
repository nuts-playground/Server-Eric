import { Controller, Get, Req, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('main')
@ApiExcludeController()
export class MainController {
    constructor() {}

    @Get('/')
    test(@Req() req: Request, @Res() res: Response) {
        console.log(req);
        console.log(
            '==============================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================',
        );
        console.log(res);
        res.setHeader('test', 'testHeaderValue')
        res.send('hello!');
    }
}
