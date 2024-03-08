import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { MainService } from './main.service';

@Controller('main')
@ApiTags('main')
export class MainController {
    constructor(private readonly mainService: MainService) {}

    @Get('/')
    test(@Res() res: Response) {
        res.json({
            key: 'https://api.seokhoweb.com/auth/to-google',
        });
        res.end();
    }
}
