import { Client } from "discord.js"
import { handlersLogger } from "../utils/logger"
import { registerCommands } from "./commands"
import { registerEvents } from "./events"

export const log = handlersLogger

export default async function loadHandler(client: Client){
    await registerCommands(client)
    await registerEvents(client)
    log.info("Handlers loaded.")
}