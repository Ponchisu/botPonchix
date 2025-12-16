import { Message, Guild, EmbedBuilder } from "discord.js";

const command = {
    name: "mute",

    execute: async (msg: Message, arg: string[]) => {
        if(!msg.member?.permissions.has("Administrator")) {
            if(!msg.inGuild()) return;
                msg.channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("No eres admin papu:")
                        .setDescription("Este comando es solo para administradores")
                        .setColor(16711680)
                    ]
                });
        } else{
            let user = msg.mentions.members?.first()
            if(!user) {
                if(!msg.inGuild()) return;
                msg.channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("Sintaxis erronea:")
                        .setDescription(".desmute `[miembro]`")
                        .setColor(16711680)
                        .addFields({name: "Argumentos:", value: "`[miembro]`: Mencion de usuario o id", inline: false})
                    ]
                });
            } else if(!user.isCommunicationDisabled()) {
                if(!msg.inGuild()) return;
                msg.channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("No se desmueto:")
                        .setDescription(`${user} no esta muteado`)
                        .setColor(16711680)
                    ]
                });
            } else {
                await user.timeout(null)
                if(!msg.inGuild()) return;
                msg.channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("Desmuteado con exito:")
                        .setDescription(`${user} fue desmuteado`)
                        .setColor(65280)
                    ]
                });
            }
        }
    }
}

export default command