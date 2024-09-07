export type GuildId = string
export type ChannelId = string

export interface IGalleryMedia {
    id: string,
    type: "image"|"youtube",
    url: string
}

export type IGallery = IGallery[]