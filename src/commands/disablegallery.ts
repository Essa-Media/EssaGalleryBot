import { SlashCommandBuilder, ChatInputCommandInteraction, ChannelType, PermissionFlagsBits } from "discord.js"
import { disableGallery } from "../utils/gallerydata"
import { enable } from "../features/gallery"

export default {
    enable: enable,
    data: new SlashCommandBuilder()
              .setName("disablegallery")
              .setDescription("Disable Gallery Channel.")
              .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const imageryChannel = await disableGallery(interaction.guildId!)
        interaction.reply(`Gallery Feature Disabled.`)
    }   
}