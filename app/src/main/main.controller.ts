import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { MainService } from './main.service';

@Controller('main')
export class MainController {
    constructor(private readonly mainService: MainService) {}

    @Get('/')
    test(@Res() res: Response) {
        res.json({
            key: 'https://api.seokhoweb.com/auth/to-google',
            // key: 'http://localhost:3781/auth/to-google',
        });
        res.end();
    }
}
