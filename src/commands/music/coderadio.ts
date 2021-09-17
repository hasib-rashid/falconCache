import { MessageEmbed } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const name = 'coderadio'
export const category = 'music'
export const description = 'Listen to CodeRadio'

export const run: RunFunction = async (client, message, args) => {
    let connectionDispatcher;

    try {
        const cmd = args[0]
        const voiceChannel = message.member?.voice.channel;

        if (!cmd) {
            message.channel.send(
                ":no_entry: Use a valid music command from the help menu."
            );
        }

        if (cmd == "start") {
            if (!voiceChannel) {
                return message.channel.send(
                    "You need to be in a voice channel!"
                );
            }

            const permissions = voiceChannel.permissionsFor(
                // @ts-ignore
                message.client?.user
            );

            if (!permissions?.has("CONNECT") || !permissions?.has("SPEAK")) {
                return message.channel.send(
                    "I don't have permissions to join and speak in that voice channel!"
                );
            }

            voiceChannel.join().then((connection) => {
                connectionDispatcher = connection.play(
                    "https://coderadio-admin.freecodecamp.org/radio/8010/radio.mp3"
                );

                const radio_play_embed = new MessageEmbed()
                    .setTitle("Started Playing the Radio!")
                    .setDescription(
                        "**:white_check_mark: Joined the Voice Channel and Playing the radio.** \n \n *Powered by FreeCodeCamp Radio*"
                    )
                    .setThumbnail(
                        "https://media.discordapp.net/attachments/793772583946027050/801479779441967144/Z.png"
                    )
                    .setColor("BLUE")
                    .setFooter(
                        client.user?.username,
                        client.user?.displayAvatarURL()
                    );
                message.channel.send(radio_play_embed);
            });
        }

        if (cmd == "stop") {
            voiceChannel?.leave();
            message.channel.send(
                ":white_check_mark: Stopped the Radio and left the Voice channel!"
            );
        }
    } catch (err) {
        console.error(err);
    }
}