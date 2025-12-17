import { Message, Guild, EmbedBuilder } from "discord.js";

const command = {
    name: "unmute",

    execute: async (msg: Message, arg: string[]) => {
        if(!msg.inGuild()) return;
        if(!msg.member?.permissions.has("Administrator")) {
            msg.channel.send({
                embeds: [
                        new EmbedBuilder()
                        .setTitle("No eres admin papu:")
                        .setDescription("Este comando es solo para administradores")
                        .setColor(16711680)
                    ]
                });
            return
        } 
        let id = arg[0] || ""
        if(id.startsWith('<')) {
            id = id.slice(2, -1)
        }
        try {
            let user = await msg.guild?.members.fetch(id)
            if(!user.isCommunicationDisabled()) {
                msg.channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("No se desmueto:")
                        .setDescription(`${user} no esta muteado`)
                        .setColor(16711680)
                    ]
                });
                return
            }
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
        } catch (error) {
            msg.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setTitle("Sintaxis erronea:")
                    .setDescription(".unmute `[miembro]`")
                    .setColor(16711680)
                    .addFields({name: "Argumentos:", value: "`[miembro]`: Mencion de usuario o id", inline: false})
                ]
            });
        }
    }
}

export default command