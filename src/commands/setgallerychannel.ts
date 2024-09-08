import { SlashCommandBuilder, ChatInputCommandInteraction, ChannelType, PermissionFlagsBits } from "discord.js"
import { setDiscordChannelId } from "../utils/gallerydata"
import { enable } from "../features/gallery"

export default {
    enable: enable,
    data: new SlashCommandBuilder()
              .setName("setgallerychannel")
              .setDescription("Set Gallery Channel.")
              .addChannelOption(option => option
                .setName("channel")
                .setDescription("text channel")
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)    
            )
            
            .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const imageryChannel = await setDiscordChannelId(interaction.guildId!, interaction.options.getChannel("channel")?.id!)
        interaction.reply(`Successfully set the gallery channel to ${interaction.options.getChannel("channel")}`)
    }   
}