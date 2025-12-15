import { Message } from "discord.js";

const command = {
    name: "ping",

    execute: async (msg: Message, args: string[]) => {
        msg.reply("Si, es re gay🫦🫦");
    }
}


export default command;