import { Client } from "discord.js"
import parrentLogger from "../utils/logger"
import { registerCommands } from "./commands"
import { registerEvents } from "./events"

export const log = parrentLogger.child({ module: "handlers"})

export default async function loadHandler(client: Client){
    await registerCommands(client)
    await registerEvents(client)
    log.info("Handlers loaded.")
}