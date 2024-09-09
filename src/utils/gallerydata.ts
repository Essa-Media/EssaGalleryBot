import redis from "./redis"
import { v2 as cloudinary } from "cloudinary"
import { GuildId, ChannelId, IGalleryMedia, IGallery } from "../types"

export async function getDiscordChannelId(guildId: GuildId): Promise<null|ChannelId> {
    const isGuildExist = await redis.exists(`gallery_info:${guildId}`)
    if(!isGuildExist) return null
    return await redis.hget(`gallery_info:${guildId}`, "channelId")
}

export async function setDiscordChannelId(
    guildId: GuildId,
    channelId: ChannelId
): Promise<number|undefined> {
    return await redis.hset(`gallery_info:${guildId}`, {
        channelId: channelId
    })
}

export async function disableGallery(guildId: GuildId) {
    return await redis.del(`gallery_info:${guildId}`)
}

export async function getAllGuildMedia(
    guildId: GuildId
): Promise<IGallery|null> {
    const mediaList = await redis.lrange(`gallery:${guildId}`, 0, -1)
    if(!mediaList || mediaList.length === 0) return null
    return mediaList.map(item => JSON.parse(item))
}

export async function addGuildMedia(
    guildId: GuildId,
    galleryMedia: IGalleryMedia
): Promise<number> {
    const mediaString = JSON.stringify(galleryMedia)
    return await redis.lpush(`gallery:${guildId}`, mediaString)
}

export async function removeGuildMediaById(
    guildId: GuildId,
    mediaId: IGalleryMedia["id"]
): Promise<number> {
    const key = `gallery:${guildId}`
    const mediaList = await redis.lrange(key, 0, -1)
    let removedCount = 0
    
    for (let i = 0; i < mediaList.length; i++) {
        const item = JSON.parse(mediaList[i])
        if (item.id === mediaId) {
            await cloudinary.uploader.destroy(item.id)
            await redis.lrem(key, 1, mediaList[i])
            removedCount++
        }
    }
    
    return removedCount
}

export async function rangeGuildMedia(
    guildId: GuildId,
    startIndex: number,
    stopIndex: number
): Promise<IGallery> {
    const key = `gallery:${guildId}`
    const mediaList = await redis.lrange(key, startIndex, stopIndex)
    return mediaList.map(item => JSON.parse(item))
}