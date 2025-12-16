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
            let time = parseInt(arg[1]);
            if(!user || arg.length < 1 || isNaN(Number(time))) {
                if(!msg.inGuild()) return;
                msg.channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("Sintaxis erronea:")
                        .setDescription(".mute `[miembro] [tiempo] (motivo)`")
                        .setColor(16711680)
                        .addFields({name: "Argumentos:", value: "`[miembro]`: Mencion de usuario o id\n`[tiempo]`: Tiempo de duracion\n`(motivo)`: Motivo del baneo(opcional)", inline: false})
                    ]
                });
            } else if(msg.author.id === user.id) {
                if(!msg.inGuild()) return;
                msg.channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("No puedes automutearte")
                        .setColor(16711680)
                    ]
                });
            } else if(user.permissions.has("Administrator")) {
                if(!msg.inGuild()) return;
                msg.channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("No puedes mutear a un admin:")
                        .setDescription(`${user} es administrador`)
                        .setColor(16711680)
                    ]
                });
            } else {
                const reason = arg.slice(1).join(" ") || "Sin motivo";
                await user.timeout(time * 1000, reason)
                if(!msg.inGuild()) return;
                msg.channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("Muteado con exito:")
                        .setDescription(`${user} fue muteado por ${time}seg`)
                        .setColor(65280)
                    ]
                });
            }
        }
    }
}

export default command