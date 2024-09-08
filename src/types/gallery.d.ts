export type GuildId = string
export type ChannelId = string

export interface IGalleryMedia {
    id: string,
    type: "image"|"youtube",
    url: string,
    author: string, // discord author.tag
    uploadDate: string  // this date format is ISO string (can be parsed with new Date())
}

export type IGallery = IGalleryMedia[]