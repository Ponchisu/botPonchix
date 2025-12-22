import { Message, Guild, EmbedBuilder } from "discord.js";
import { pool } from "../mysql";

const command = {
    name: "pf",

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

        if(arg.length == 0 || arg[0].length > 4) {
            msg.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setTitle("Sintaxis erronea:")
                    .setDescription(".pf `[prefijo]`")
                    .setColor(16711680)
                    .addFields({name: "Argumentos:", value: "`[prefijo]`: Prefijo para los comandos maximo 4 caracteres", inline: false})
                ]
            });
            return
        }

        try {
            await pool.execute(
                "UPDATE prefix SET pf = ? WHERE server_id = ?",
                [arg[0], msg.guild.id]
            )
            msg.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setTitle("Prefijo cambiado con exito:")
                    .setDescription(`\`${arg[0]}\` es el nuevo prefijo`)
                    .setColor(65280)
                ]
            });
        } catch (error) {
            msg.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setTitle("Error al cambiar el prefijo:")
                    .setDescription("Ocurrio un error al intentar cambiar el prefijo T-T")
                    .setColor(16711680)
                ]
            });
            return
        }
        

    }
}

export default command