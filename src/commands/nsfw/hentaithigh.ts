import { RunFunction } from '../../interfaces/Command';
import NSFW from 'discord-nsfw'
const nsfw = new NSFW();

export const name = 'hentaithigh'
export const category = 'nsfw'
export const description = 'NSFW Hentaithigh'

export const run: RunFunction = async (client, message, args) => {
    message.channel.send(await nsfw.hentaithigh())
}