import { MessageEmbed, PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';
import { Deta } from 'deta'
import { env } from '../../client/env';

const deta = Deta(env.db)
const db = deta.Base("muted")

export const name = 'unmute'
export const category = 'admin'
export const description = 'Unmute someone in the server'
export const userPermissions: PermissionResolvable = "MANAGE_MESSAGES"

export const run: RunFunction = async (client, message, args) => {
    const Member = message.mentions.members?.first() || message.guild?.members.cache.get(args[0])

    if (!Member) return message.channel.send('**Please enter a valid user**')

    const role = message.guild?.roles.cache.find(r => r.name.toLowerCase() === 'muted');

    const mutedUser = await db.fetch({ userID: Member.id })

    let state: boolean

    if (mutedUser.items[0] === undefined) state = true

    try {
        db.delete(mutedUser.items[0].key as any)
    } catch (err) {

    }

    // @ts-ignore
    await Member.roles.remove(role)

    const unmuteEmbed = new MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setTitle(`Unmuted from ${message.guild?.name}`)
        .setDescription(`**${message.author} Has unmuted you from ${message.guild?.name}**`)
        .setColor("#41d16a")
        .setFooter(client.user?.username, client.user?.displayAvatarURL())

    Member?.send(unmuteEmbed).catch((err) => { message.channel.send("**Message wasn't sent to this user because this user has his DM's disabled.**") })

    message.channel.send(`**${Member} was sucessfully unmuted**`)
}