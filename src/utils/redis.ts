import log from "./logger"
import { Redis } from "ioredis"

const redisClient: Redis = new Redis(process.env.REDIS_URI!)

redisClient.on("ready", () => {
    log.info("Connected to the redis database.")
})

redisClient.on("connecting", () => {
    log.debug("Connecting to the redis database...")
})

export default redisClient