import { Message, EmbedBuilder, Guild } from "discord.js";
import dirBase from "..";

const command = {
    name: "hi", 

    execute: async (msg: Message, arg: string[]) => {
        if (!msg.inGuild()) return;
        const user = msg.mentions.users.first()?.displayName;
        if(!user) {
            msg.channel.send({
                content: `**${msg.author.displayName}** manda saludos a todos :3`,
                embeds: [
                    new EmbedBuilder().setImage("https://cdn.nekotina.com/images/k6PVYNk7.gif").setColor(5814783)
                ],
            });
        }else {
            msg.channel.send({
                content: `**${msg.author.displayName}** saludo a **${user}** :3`,
                embeds: [
                    new EmbedBuilder().setImage("https://cdn.nekotina.com/images/k6PVYNk7.gif").setColor(5814783)
                ],
            });
        }
    }
}

export default command