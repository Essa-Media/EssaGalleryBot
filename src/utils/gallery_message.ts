import { Client, TextChannel, EmbedBuilder, Attachment, Message, User } from "discord.js"
import { getDiscordChannelId, addGuildMedia, getAllGuildMedia } from "./gallerydata"
import { v2 as cloudinary, UploadApiResponse } from "cloudinary"
import { featureLogger as log } from "../utils/logger"
import { IGalleryMedia } from "../types"

class GalleryMessage {
    private client: Client

    constructor(client: Client) {
        this.client = client
        this.initCloudinary()
    }

    private initCloudinary() {
        cloudinary.config(process.env.CLOUDINARY_URL!)
    }

    public async load() {
        this.client.on("messageCreate", this.handleMessage.bind(this))
    }

    private async handleMessage(msg: Message): Promise<void> {
        if (!msg.guildId || msg.author.bot) return

        if (this.isYoutubeLink(msg.content)) {
            await this.processYoutubeLink(msg)
            return
        }

        if (msg.attachments.size > 0) {
            await this.processAttachmentMessage(msg)
        }
    }

    private isYoutubeLink(content: string): boolean {
        return !!content.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/gi)
    }

    private async processYoutubeLink(msg: Message) {
        const imageryChannelId = await getDiscordChannelId(msg.guildId!)
        // TODO: Implement YouTube link processing
        const reply = await msg.reply({content: `This Feature Still Under Development.`})
        setTimeout(async () => [msg,reply].forEach(async m => await m.delete()), 10_000)
    }

    private async processAttachmentMessage(msg: Message) {
        const imageryChannelId = await getDiscordChannelId(msg.guildId!)
        if (!imageryChannelId || imageryChannelId !== msg.channelId) return

        const imageryChannel = this.client.channels.cache.get(imageryChannelId) as TextChannel
        if (!imageryChannel) {
            log.error(`Gallery channel with ID ${imageryChannelId} not found.`)
            return
        }

        const promises = msg.attachments.map(this.processAttachment.bind(this, msg, imageryChannel))

        try {
            await Promise.all(promises)
            await msg.delete()
        } catch (err) {
            log.error("Error processing attachments or deleting message:", err)
        }
    }

    private async processAttachment(msg: Message, imageryChannel: TextChannel, attachment: Attachment) {
        const reply = await imageryChannel.send({ content: `Uploading ${attachment.name}...` })
        const id: string = reply.id 
        try {
            await this.validateAttachment(attachment)
            const uploadResult = await this.uploadToCloudinary(attachment, id)
            const embed = this.createEmbed(uploadResult, msg)
            await this.saveGalleryMedia(msg.guildId!, uploadResult, msg.author)
            await reply.edit({ content: "", embeds: [embed] })
        } catch (err) {
            await this.handleUploadError(err, reply, attachment)
        }
    }

    private async validateAttachment(attachment: Attachment) {
        if (attachment.contentType?.includes("video")) throw new Error("type/video")
        if (!attachment.contentType?.includes("image")) throw new Error("type")
    }

    private async uploadToCloudinary(attachment: Attachment, id: string) {
        return await cloudinary.uploader.upload(attachment.url, { public_id: id })
    }

    private createEmbed(uploadResult: UploadApiResponse, msg: Message) {
        return new EmbedBuilder()
            .setColor("Yellow")
            .setImage(uploadResult.url)
            .setAuthor({ url: "https://example.com", name: "Essa Gallery", iconURL: "https://i.imgur.com/pwXfsLz.jpeg" })
            .setFooter({ text: uploadResult.public_id })
            .setDescription(`Uploaded by ${msg.author}`)
            .setTimestamp()
    }

    private async saveGalleryMedia(guildId: string, uploadResult: UploadApiResponse, author: User) {
        const media: IGalleryMedia = {
            type: 'image',
            url: uploadResult.secure_url,
            id: uploadResult.public_id,
            uploadDate: new Date().toISOString(),
            author: author.tag
        }
        await addGuildMedia(guildId, media)
    }

    private async handleUploadError(err: unknown, reply: Message, attachment: Attachment) {
        if (!(err instanceof Error)) return log.error(err)
        
        let message = `Error uploading attachment: ${attachment.name}\nThis message will be deleted after 10 Seconds`
        if (err.message === "type") {
            message = `Error: File type not supported.\nThis message will be deleted after 10 seconds.`
        } else if (err.message === "type/video") {
            message = `Error: Video file currently not supported. Use YouTube link instead.\nThis message will be deleted after 10 seconds.`
        } else {
            log.error(`Error processing attachment: ${attachment.name}`)
            log.error(err)
        }

        const errMessage = await reply.edit(message)
        setTimeout(async () => await errMessage.delete(), 10_000)
    }
}

export default GalleryMessage