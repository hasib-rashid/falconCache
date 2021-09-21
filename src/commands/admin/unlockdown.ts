import { PermissionResolvable } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const name = 'unlockdown'
export const category = 'admin'
export const description = 'Unlockdown the server'
export const userPermissions: PermissionResolvable = "MANAGE_GUILD"

export const run: RunFunction = async (client, message, args) => {
    const role = message.guild?.roles.everyone;

    const perms = role?.permissions.toArray();

    perms?.push("SEND_MESSAGES");
    await role?.edit({ permissions: perms });

    message.channel.send(
        "**:unlock: Unlocked the Server! Members can chat now!**"
    );
}