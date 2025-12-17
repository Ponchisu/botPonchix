import { Message } from "discord.js";

const command = {
    name: "nicoesgay",

    execute: async (msg: Message, args: string[]) => {
        msg.reply("Si, es re gay🫦🫦");
    }
}


export default command;