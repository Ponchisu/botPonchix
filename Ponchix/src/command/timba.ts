import { Message, Guild, EmbedBuilder } from "discord.js";

const fruit: string[] = ["🍇", "🍈", "🍉", "🍊", "🍋", "🍋‍🟩", "🍌", "🍍", "🥭", "🍎", "🍏", "🍐"];

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));


const command = {
    name:"timba",

    execute: async (msg: Message, arg: string[]) => {
        if(!msg.inGuild()) return;

        let timba: string[] = [fruit[Math.floor(Math.random() * fruit.length)], fruit[Math.floor(Math.random() * fruit.length)], fruit[Math.floor(Math.random() * fruit.length)]]

        let ganador: boolean = timba[0] == timba[1] && timba[0] == timba[2]
        msg.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(ganador ? `Timba sale bien:` : `Timba sale mal:`)
                    .setDescription(timba.join(""))
                    .setColor(ganador ? 15793986 : 12143435)
                    .setFooter({text: ganador ? "Ganaste papu" : "Perdiste papu"})
            ],
        })
        
    }
}

export default command