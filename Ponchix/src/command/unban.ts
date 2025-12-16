import { Message, Guild, EmbedBuilder } from "discord.js";

const command = {
    name: "unban",

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
            let id = arg[0];
            if(arg.length == 0) {
                if(!msg.inGuild()) return;
                msg.channel.send({
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("Sintaxis erronea:")
                        .setDescription(".unban `[miembro]`")
                        .setColor(16711680)
                        .addFields({name: "Argumentos:", value: "`[miembro]`: Mencion de usuario o id", inline: false})
                    ]
                });
            } else  {
                if(!msg.inGuild()) return;
                try {
                    await msg.client.users.fetch(id);
                    await msg.guild.bans.remove(id)
                    msg.channel.send({
                        embeds: [
                            new EmbedBuilder()
                            .setTitle("Desbaneado con exito:")
                            .setDescription(`<@${id}> fue desbaneado`)
                            .setColor(65280)
                        ]
                    });
                } catch (err) {
                    msg.channel.send({
                        embeds: [
                            new EmbedBuilder()
                            .setTitle("No puedes desbanearlo:")
                            .setDescription(`La id no es valida`)
                            .setColor(16711680)
                        ]
                    });
                }
            }
        }
    }
}

export default command