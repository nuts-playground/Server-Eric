import * as redis from "redis";
import { redisConfig } from "../../config/redis.config";

class RedisClient {
    private redisClient;

    constructor() {
        this.redisClient = null;
    }

    public async getRedisClient() {
        if (this.redisClient) {
            return this.redisClient;
        }

        this.redisClient = redis.createClient(redisConfig.getConfig());

        await this.redisClient.connect();

        return this.redisClient;
    }
}

export default new RedisClient();