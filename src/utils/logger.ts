import pino, { Logger } from "pino"
import { config } from "dotenv"
config()
const logger: Logger = pino({
    name: "EssaGalleryBot",
    level: process.env.LOG_LEVEL || "debug"
})

export const commandsLogger = logger.child({ module: "commands" })
export const eventsLogger = logger.child({ module: "events"})
export const featureLogger = logger.child({ module: "feature" })
export const handlersLogger = logger.child({ module: "handlers"})

export default logger