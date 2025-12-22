import { Message, Guild, EmbedBuilder } from "discord.js";
import { autorolDataBase } from "../mysql";

const isEmoji = /\p{Extended_Pictographic}/u;

const comand = {
    name:"autorol",
    
    execute: async (msg: Message, arg: string[]) => {
        let argVal: boolean = true;
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
        
        msg.delete();
        const emojiUsed = new Set<String>();
        const rolUsed = new Set<String>();


        for(let i = 0; i < arg.length; i += 2) {
            const emoji = arg[i]
            const rol = arg[i + 1]

            if(emojiUsed.has(emoji) || rolUsed.has(rol)) {
                argVal = false
                break;
            }

            const emojiVal = isEmoji.test(emoji)
            const rolVal = msg.guild.roles.cache.get(arg[i + 1]);

            if(!emojiVal || !rolVal) {
                argVal = false
                break;
            }

            emojiUsed.add(emoji)
            rolUsed.add(rol)
        }

        if(arg.length / 2 > 10) {
            argVal = false
        }


        if(!argVal || arg.length % 2 != 0) {
            const msgBot: Message = await msg.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setTitle("Sintaxis erronea:")
                    .setDescription(".autorol `[emoji] [rolId] (hasta 10)`")
                    .setColor(16711680)
                    .addFields({name: "Argumentos:", value: "`[emoji]`: emoji para la reaccion\n`[rolId]`: id del rol", inline: false})
                ]
            })
            await new Promise(r => setTimeout(r, 1500));
            await msgBot.delete();
            return
        }
        
        let roles: string = ""
        for(let i = 0; i < arg.length; i += 2) {
            const role = msg.guild.roles.cache.get(arg[i + 1]);
            roles = roles.concat(`\`${arg[i]}:\` ${role?.name}\n`)
        }


        const msgBot = await msg.channel.send({
            embeds: [
                new EmbedBuilder()
                .setTitle("Mensaje de autorol")
                .setDescription("Reacciona a este mensaje para elegir tu rol de forma autonoma")
                .setColor(16753400)
                .addFields({name: "Roles:", value: roles, inline: false})
            ]
        })

        for(let i = 0; i < arg.length; i += 2) {
            msgBot.react(arg[i]);
        }

        await autorolDataBase(msgBot, arg)
    }
}

export default comand