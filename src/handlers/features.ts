import { readdirSync } from "fs"
import { join } from "path"
import { Client } from "discord.js"
import { IFeatures } from "../types"
import { log } from "."

const featPath = join(__dirname, "../features")
const featFiles = readdirSync(featPath).filter(file => file.endsWith(".js") || file.endsWith(".ts"))

export async function loadFeatures(client:Client): Promise<void> {
    for(const file of featFiles){
        const filePath: string = join(featPath, file)
        const loadFeat: IFeatures = (await import(filePath)).default
        if(loadFeat.enable === false){
            log.info(`Feature ${file} disabled.`)
            continue
        }
        await loadFeat.load(client)
        log.debug(`Feature ${file} loaded.`)
    }
    log.info(`Features loaded.`)
}