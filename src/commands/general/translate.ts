import { RunFunction } from '../../interfaces/Command';
import { default as translate } from '@vitalets/google-translate-api'
import { MessageEmbed } from 'discord.js';

export const name = 'translate'
export const category = 'general'
export const description = 'Translate something in Discord'

export const run: RunFunction = async (client, message, args) => {
    const argFrom = args[0]
    const argTo = args[1]
    const text = args.slice(2).join(' ');

    const translate_image =
        "https://play-lh.googleusercontent.com/ZrNeuKthBirZN7rrXPN1JmUbaG8ICy3kZSHt-WgSnREsJzo2txzCzjIoChlevMIQEA=s180-rw";

    translate(text, { from: argFrom, to: argTo })
        .then((res) => {
            const embed =
                new MessageEmbed()
                    .setAuthor("Google Translate", translate_image)
                    .setTitle("Translating....")
                    .addField(`From: ${res.from.language.iso}:`, text)
                    .addField(`To ${argTo}:`, res.text)
                    .addField(`Pronunciation`, res.pronunciation || "Nothing")
                    .setColor("#4287f5")
                    .setFooter(
                        "Powered By Google Translate",
                        translate_image
                    )
            message.channel.send(embed)
        }
        )
        .catch((err) => {
            console.error(err)
            message.channel.send(
                ":no_entry: Please Specify the correct language. Example: `.translate en nl Hello there`"
            )
        })
}