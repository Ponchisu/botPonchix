import { Message, Guild, EmbedBuilder, Embed } from "discord.js";

const command = {
    name: "help",

    execute: async (msg: Message, arg: string[]) => {
        msg.reply({
            embeds: [
                new EmbedBuilder()
                .setTitle("Comandos de Ponchix")
                .setColor(16056575)
                .addFields({
                    name: "Admin:", 
                    value: "`.ban [miembro] (motivo)` \n`.unban[miembro] ` \n`.mute[miembro] [tiempo] (motivo)` \n`.unmute [miembro]`\n`.kick [miembro]`", 
                    inline: false
                })
            ]
        })
    }
}

export default command