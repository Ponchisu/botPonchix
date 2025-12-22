import { Message } from "discord.js";

const command = {
    name: "miki",

    execute: async (msg: Message, arg: string[]) => {
        if(!msg.inGuild()) return;
        msg.channel.send({content: `#UnRegaloParaMiki`});
    }
}

export default command