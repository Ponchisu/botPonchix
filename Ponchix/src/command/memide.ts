import { Message, Guild } from "discord.js";

const command = {
    name: "memide",

    execute: async (msg: Message, arg: string[]) => {
        if(!msg.inGuild()) return;
        msg.channel.send({content: `A <@${msg.author.id}> le mide ${Math.floor(Math.random() * (50 + 1))}cm de profundo`});
    }
}

export default command