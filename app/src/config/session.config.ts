import { INestApplication } from '@nestjs/common';
import RedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import { RedisClient } from '../common/redis/redis';
import { redisConfig } from './redis.config';

export async function setSession(app: INestApplication) {
    const redisClient = new RedisClient().getRedisClient();
    const redisStore = new RedisStore({
        client: redisClient,
        ttl: 30,
    });
    app.use(
        session({
            store: redisStore,
            secret: redisConfig.getSessionKey(),
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 3600000,
            },
        }),
    );

    app.use(passport.initialize());
    app.use(passport.session());
}
