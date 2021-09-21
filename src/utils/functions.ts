import { GuildMember, Message, User } from "discord.js";

const MONEY = ['', 'k', 'M', 'G', 'T', 'P', 'E'];
const yes = ['yes', 'y', 'ye', 'yea', 'correct'];
const no = ['no', 'n', 'nah', 'nope', 'fuck off'];
const inviteRegex = /(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(\.gg|(app)?\.com\/invite|\.me)\/([^ ]+)\/?/gi;
const botInvRegex = /(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(app)\.com\/(api\/)?oauth2\/authorize\?([^ ]+)\/?/gi;

export function getMember(message: Message, toFind = '') {
    toFind = toFind.toLowerCase();

    let target = message.guild?.members.cache.get(toFind);

    if (!target && message.mentions.members)
        target = message.mentions.members.first();

    if (!target && toFind) {
        target = message.guild?.members.cache.find(member => {
            return member.displayName.toLowerCase().includes(toFind) ||
                member.user.tag.toLowerCase().includes(toFind)
        });
    }

    if (!target) {
        (target: User) => message.author;
    }

    return target;
}

export async function promptMessage(message: Message, author: User, time: number, validReactions: any) {
    time *= 1000;

    for (const reaction of validReactions) await message.react(reaction);

    const filter = (reaction: any, user: User) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

    return message
        .awaitReactions(filter, { max: 1, time: time })
        .then(collected => collected.first() && collected.first()?.emoji.name);
}

export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-US').format(date);
}

export function formatNumber(number: string, minimumFractionDigits = 0) {
    return Number.parseFloat(number).toLocaleString(undefined, {
        minimumFractionDigits,
        maximumFractionDigits: 2
    });
}

export function randomRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function verify(channel: any, user: GuildMember, { time = 30000, extraYes = [], extraNo = [] } = {}) {
    const filter = (res: any) => {
        const value = res.content.toLowerCase();
        return (user ? res.author.id === user.id : true)
            // @ts-ignore
            && (yes.includes(value) || no.includes(value) || extraYes.includes(value) || extraNo.includes(value));
    };
    const verify = await channel.awaitMessages(filter, {
        max: 1,
        time
    });
    if (!verify.size) return 0;
    // @ts-ignore
    const choice = verify.first().content.toLowerCase();
    // @ts-ignore
    if (yes.includes(choice) || extraYes.includes(choice)) return true;
    // @ts-ignore
    if (no.includes(choice) || extraNo.includes(choice)) return false;
    return false;
}

export function list(arr: any, conj = 'and') {
    const len = arr.length;
    if (len === 0) return '';
    if (len === 1) return arr[0];
    return `${arr.slice(0, -1).join(', ')}${len > 1 ? `${len > 2 ? ',' : ''} ${conj} ` : ''}${arr.slice(-1)}`;
}

export function firstUpperCase(text: any, split = ' ') {
    return text.split(split).map((word: string) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ');
}

export function shorten(text: string, maxLen = 2000) {
    return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
}

export function stripInvites(str: string, { guild = true, bot = true, text = '[redacted invite]' } = {}) {
    if (guild) str = str.replace(inviteRegex, text);
    if (bot) str = str.replace(botInvRegex, text);
    return str;
}

export function shuffle(array: any) {
    const arr = array.slice(0);
    for (let i = arr.length - 1; i >= 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}