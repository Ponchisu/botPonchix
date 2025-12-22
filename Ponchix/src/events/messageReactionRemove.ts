import { MessageReaction, User } from "discord.js"
import { pool } from "../mysql";

const command = {
    name: "messageReactionRemove",

    execute: async (reaccion: MessageReaction, user: User) => {
        if(!reaccion.message.guild) return;
        if(user.bot) return;
        if(reaccion.message.author?.client.user.tag) {
            try {
                const [dupla]: any = await pool.execute(
                    "SELECT * FROM autorol WHERE server_id = ? AND msg_id = ? AND channel_id = ? AND emoji = ? COLLATE utf8mb4_bin",
                    [reaccion.message.guildId, reaccion.message.id, reaccion.message.channelId, reaccion.emoji.name]
                )

                const member = await reaccion.message.guild.members.fetch(user.id);
                member.roles.remove(dupla[0].rol_id)
                console.log(`> Se quito el rol al usuario ${user.username}`);
                return
            } catch (error) {
                return
            }
        }
    }
}

export default command