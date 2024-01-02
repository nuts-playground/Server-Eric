import {INestApplication} from "@nestjs/common";
import RedisStore from "connect-redis";
import RedisClient from "../common/redis/redis";
import * as session from "express-session";
import * as passport from "passport";
import { redisConfig } from "./redis.config";

export async function setSession(app: INestApplication) {
    const redisClient = await RedisClient.getRedisClient();
    const redisStore = new RedisStore(redisClient);
    app.use(
        session({
            store: redisStore,
            secret: redisConfig.getSessionKey(),
            resave: false,
            saveUninitialized: false,
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());
}