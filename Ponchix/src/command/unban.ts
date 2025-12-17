import { Message, Guild, EmbedBuilder } from "discord.js";

const command = {
    name: "unban",

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
                    .setDescription(".unban `[miembro]`")
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
            await msg.client.users.fetch(id);
            try {
                await msg.guild.bans.remove(id)
                msg.channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("Desbaneado con exito:")
                        .setDescription(`<@${id}> fue desbaneado`)
                        .setColor(65280)
                    ]
                });
            } catch (error) {
                msg.channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("Error al desbanear:")
                        .setDescription(`<@${id}> no esta baneado`)
                        .setColor(16711680)
                    ]
                });
            }
        } catch (error) {
            msg.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setTitle("Sintaxis erronea:")
                    .setDescription(".unban `[miembro]`")
                    .setColor(16711680)
                    .addFields({name: "Argumentos:", value: "`[miembro]`: Mencion de usuario o id", inline: false})
                ]
            });
        }
    }
}

export default command