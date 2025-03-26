import redis, { createClient } from "redis";
import type { RedisClientType } from "redis";

const redisClient: RedisClientType = createClient({
  socket: {
    host: "127.0.0.1",
    port: 6379,
    keepAlive: 0, //maintain same TCP connection
  },
});

const setCacheData = async (
  hashName: string,
  hashKey: string,
  hashValue: string | number,
  ttlInSeconds: number = 3600 // Default 1 hour
): Promise<void> => {
  const pipeline = redisClient.multi(); // Create a pipeline instance

  pipeline.hSet(hashName, hashKey, hashValue); // Queue hSet command
  pipeline.expire(hashName, ttlInSeconds); // Queue expire command

  await pipeline.exec(); // Execute all queued commands in one go
};

export const getCacheData = async (hashName: string, hashKey: string) => {
  const data = await redisClient.hGet(hashName, hashKey);
  if (!data) {
    return null;
  }
  return JSON.parse(data);
};

redisClient.on("error", (err: Error) => {
  console.error("Redis Client Error", err);
});

export { setCacheData };
export default redisClient;
