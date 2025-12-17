import { Message, Guild, EmbedBuilder } from "discord.js";

const command = {
    name: "ban",

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

        if(arg.length == 0) {
            msg.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setTitle("Sintaxis erronea:")
                    .setDescription(".ban `[miembro] (motivo)`")
                    .setColor(16711680)
                    .addFields({name: "Argumentos:", value: "`[miembro]`: Mencion de usuario o id\n`(motivo)`: Motivo del baneo(opcional)", inline: false})
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
            if(msg.author.id === user?.id) {
                msg.channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("No puedes autobanearte")
                        .setColor(16711680)
                    ]
                });
                return
            }
            if(user?.permissions.has("Administrator")) {
                msg.channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("No puedes banear a un admin:")
                        .setDescription(`${user} es administrador`)
                        .setColor(16711680)
                    ]
                });
                return
            }
            const reason = arg.slice(1).join(" ") || "Sin motivo";
            await user.ban({reason})
            msg.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setTitle("Baneado con exito:")
                    .setDescription(`${user} fue baneado`)
                    .setColor(65280)
                ]
            });
        } catch(err) {
            msg.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setTitle("Sintaxis erronea:")
                    .setDescription(".ban `[miembro] (motivo)`")
                    .setColor(16711680)
                    .addFields({name: "Argumentos:", value: "`[miembro]`: Mencion de usuario o id\n`(motivo)`: Motivo del baneo(opcional)", inline: false})
                ]
            });
        }
    }
}

export default command