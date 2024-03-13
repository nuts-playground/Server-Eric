import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Response } from 'express';

@Controller('main')
@ApiExcludeController()
export class MainController {
    constructor() {}

    @Get('/')
    test(@Res() res: Response) {
        res.json({
            key: 'https://api.seokhoweb.com/auth/to-google',
        });
        res.end();
    }
}
