import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { MainController } from './main.controller';
import { MainService } from './main.service';

@Module({
    imports: [AuthModule, UserModule],
    controllers: [MainController],
    providers: [MainService],
})
export class MainModule {}
