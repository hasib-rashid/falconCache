import { MessageEmbed, PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const name = 'slowmode'
export const category = 'admin'
export const description = 'Set the slowmode of a channel'
export const userPermissions: PermissionResolvable = "MANAGE_CHANNELS"

export const run: RunFunction = async (client, message, args) => {
    try {
        let time = args[0]
        const reason = args.slice(1).join(' ') || "No Reason";

        if (!message.member?.hasPermission("MANAGE_CHANNELS"))
            return message.channel.send(
                "**You need `MANAGE_CHANNELS` permission to use this command**"
            );

        const { channel } = message;

        let duration = time;
        if (duration === "off") {
            // @ts-ignore
            duration = 0;
        }

        if (isNaN(+duration)) {
            let embed = new MessageEmbed()
                .setAuthor(
                    message.author.tag,
                    message.author.displayAvatarURL()
                )
                .setColor("#387df5")
                .setDescription(
                    '**Please provide either a number of seconds or the word "off"**'
                )
                .setThumbnail(
                    "https://i.pinimg.com/originals/3f/82/40/3f8240fa1d16d0de6d4e7510b43b37ba.gif"
                )
                .setFooter(client.user?.username, client.user?.displayAvatarURL());

            message.channel.send(embed);
            return;
        }

        // @ts-ignore
        channel.setRateLimitPerUser(duration, reason);

        const embed = new MessageEmbed()
            .setAuthor(
                message.author.tag,
                message.author.displayAvatarURL()
            )
            .setColor("#387df5")
            .setDescription(
                // @ts-ignore
                `**The slowmode for ${message.channel} was successfully set to ${duration} seconds for \`${reason}\`**`
            )
            .setThumbnail(
                "https://i.pinimg.com/originals/3f/82/40/3f8240fa1d16d0de6d4e7510b43b37ba.gif"
            )
            .setFooter(client.user?.username, client.user?.displayAvatarURL());

        message.reply(embed);
    } catch (err) {
        console.error(err);
    }
}