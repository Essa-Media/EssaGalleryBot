import { Events, Client } from "discord.js"
import { loadFeatures } from "../handlers/features" 
import { eventsLogger as log } from "../utils/logger"

export default {
    name: Events.ClientReady,
    once: true,
    execute: async (client: Client) => {
        await loadFeatures(client)
        log.info(`Bot ${client.user?.tag} is online!`)
    }
}