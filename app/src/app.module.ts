import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import {AuthModule} from "./auth/auth.module";
import {UserModule} from "./user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import { mysqlConfig } from './config/mysql.config';
@Module({
    imports: [
        AuthModule,
        UserModule,
        BoardModule,
        TypeOrmModule.forRoot(mysqlConfig.getConfig()),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
