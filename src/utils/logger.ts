import pino, { Logger } from "pino"
const logger: Logger = pino({
    name: "EssaGalleryBot",
    level: process.env.LOG_LEVEL || "debug"
})
export default logger