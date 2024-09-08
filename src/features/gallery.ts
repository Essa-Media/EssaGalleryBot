import { Client } from "discord.js"
import GalleryMessage from "../utils/gallery_message";

export const enable: boolean = true;
export default {
    enable,
    load: async (client: Client) => {
        const handleGalleryMessage = new GalleryMessage(client);
        await handleGalleryMessage.load()
    }
}