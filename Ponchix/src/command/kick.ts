import { Message, Guild, EmbedBuilder } from "discord.js";

const command = {
    name: "kick",

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
                        .setDescription(".kick `[miembro]`")
                        .setColor(16711680)
                        .addFields({name: "Argumentos:", value: "`[miembro]`: Mencion de usuario o id", inline: false})
                    ]
                });
            } else if(msg.author.id === user.id) {
                if(!msg.inGuild()) return;
                msg.channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("No puedes autokickearte")
                        .setColor(16711680)
                    ]
                });
            } else if(user.permissions.has("Administrator")) {
                if(!msg.inGuild()) return;
                msg.channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("No puedes kickear a un admin:")
                        .setDescription(`${user} es administrador`)
                        .setColor(16711680)
                    ]
                });
            } else {
                user.kick()
                if(!msg.inGuild()) return;
                msg.channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("Kickeado con exito:")
                        .setDescription(`${user} fue kickeado`)
                        .setColor(65280)
                    ]
                });
            }
        }
    }
}

export default command