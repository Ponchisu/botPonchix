import { Message, Guild, EmbedBuilder } from "discord.js";

const command = {
    name: "ban",

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
                        .setDescription(".ban `[miembro] (motivo)`")
                        .setColor(16711680)
                        .addFields({name: "Argumentos:", value: "`[miembro]`: Mencion de usuario o id\n`(motivo)`: Motivo del baneo(opcional)", inline: false})
                    ]
                });
            } else if(msg.author.id === user.id) {
                if(!msg.inGuild()) return;
                msg.channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("No puedes autobanearte")
                        .setColor(16711680)
                    ]
                });
            } else if(user.permissions.has("Administrator")) {
                if(!msg.inGuild()) return;
                msg.channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("No puedes banear a un admin:")
                        .setDescription(`${user} es administrador`)
                        .setColor(16711680)
                    ]
                });
            } else {
                const reason = arg.slice(1).join(" ") || "Sin motivo";
                user.ban({reason})
                if(!msg.inGuild()) return;
                msg.channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("Baneado con exito:")
                        .setDescription(`${user} fue baneado`)
                        .setColor(65280)
                    ]
                });
            }
        }
    }
}

export default command