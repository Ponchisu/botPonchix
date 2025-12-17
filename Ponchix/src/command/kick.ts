import { Message, Guild, EmbedBuilder } from "discord.js";

const command = {
    name: "kick",

    execute: async (msg: Message, arg: string[]) => {
        if (!msg.inGuild()) return;
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
                    .setDescription(".kick `[miembro]`")
                    .setColor(16711680)
                    .addFields({name: "Argumentos:", value: "`[miembro]`: Mencion de usuario o id", inline: false})
                ]
            });
            return
        }

        let id = arg[0] || ""
        if(id.startsWith('<')) {
            id = id.slice(2, -1)
        }
        try {
            console.log(id)
            let user = await msg.guild?.members.fetch(id)
            if(msg.author.id === user?.id) {
                if(!msg.inGuild()) return;
                msg.channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("No puedes autokickearte")
                        .setColor(16711680)
                    ]
                });
                return
            }
            if(user?.permissions.has("Administrator")) {
                msg.channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("No puedes kickear a un admin:")
                        .setDescription(`${user} es administrador`)
                        .setColor(16711680)
                    ]
                });
                return
            }
            await user.kick()
            msg.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setTitle("Kickeado con exito:")
                    .setDescription(`${user} fue kickeado`)
                    .setColor(65280)
                ]
            });
        } catch(err) {
            msg.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setTitle("Sintaxis erronea:")
                    .setDescription(".kick `[miembro]`")
                    .setColor(16711680)
                    .addFields({name: "Argumentos:", value: "`[miembro]`: Mencion de usuario o id", inline: false})
                ]
            });
        }
    }
}

export default command