import Redis from 'ioredis';
import { redisConfig } from '../../config/redis.config';

export class RedisClient {
    private redisClient: Redis;

    constructor() {
        this.redisClient = null;
    }

    public getRedisClient() {
        if (this.redisClient) {
            return this.redisClient;
        }

        this.redisClient = new Redis(
            redisConfig.getConfig(),
        );
        return this.redisClient;
    }
}
