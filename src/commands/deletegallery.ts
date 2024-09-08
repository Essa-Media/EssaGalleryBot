import { SlashCommandBuilder, ChatInputCommandInteraction, ChannelType, PermissionFlagsBits, TextChannel } from "discord.js"
import { disableGallery, getDiscordChannelId, removeGuildMediaById } from "../utils/gallerydata"
import { enable } from "../features/gallery"

export default {
    enable: enable,
    data: new SlashCommandBuilder()
              .setName("deletegallery")
              .setDescription("Delete Gallery Media.")
              .addStringOption(option => option
                .setRequired(true)
                .setDescription("Media Id")
                .setName("id")
              )
              .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const id = interaction.options.getString("id")
        const guildId: string|null = interaction.guildId
        if(!guildId) return await interaction.reply({ content: `You need to run this command in your server.`})
        const discordChannelId =  await getDiscordChannelId(guildId)
        if(!discordChannelId) return await interaction.reply({ content: `Channel not found.`})
        const deletedMedia = removeGuildMediaById(guildId, id!)
        if(!deletedMedia) return await interaction.reply({ content: `Media not found, please enter the correct id.`})
        const mediaChannel = await interaction.client.channels.fetch(discordChannelId) as TextChannel
        const mediaMessage = await mediaChannel.messages.fetch(id!)
        await mediaMessage.delete()
        await interaction.reply(`Success delete media id:\`${id}\``)
    }   
}