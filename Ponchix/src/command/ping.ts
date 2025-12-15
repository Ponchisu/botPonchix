import { Message } from "discord.js";

const command = {
    name: "ping",

    execute: async (msg: Message, args: string[]) => {
        msg.react('🏓');
        msg.reply("Pong 🏓");
    }
}


export default command;