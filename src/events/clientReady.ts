import { Events, Client } from "discord.js";
import log from "../utils/logger"

export default {
    name: Events.ClientReady,
    once: true,
    execute: async (client: Client) => {
        log.info(`Bot ${client.user?.tag} is online!`)
    }
}