import { Message, Guild, EmbedBuilder } from "discord.js";


const command = {
    name: "pkm",

    execute: async (msg: Message, arg: string[]) => {
        if(!msg.inGuild()) return;

        if(arg.length == 0) {
            msg.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setTitle("Sintaxis erronea:")
                    .setDescription(".pokemon `[pokemon]`")
                    .setColor(16711680)
                    .addFields({name: "Argumentos:", value: "`[pokemon]`: nombre del pokemon", inline: false})
                ]
            });
            return
        }

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${arg[0].toLocaleLowerCase()}`);
            const pokemon = await res.json();
            let tipo;
            const tiposES: string[] = [];

            for (const t of pokemon.types.sort((a: any, b: any) => a.slot - b.slot)) {
                const res = await fetch(t.type.url);
                const data = await res.json();
                tiposES.push(
                    data.names.find((n: any) => n.language.name === "es")?.name
                );
            }

            msg.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setTitle("Pokemon encontrado:")
                    .setDescription(`Numero de pokedex: ${pokemon.id}\nTipo: ${tiposES.join(" ")}\nAltura: ${pokemon.height/10}m\nPeso: ${pokemon.weight/10}kg`)
                    .setImage(pokemon.sprites.front_default)
                    .setColor(5814783)
                    .setFooter({text: pokemon.name})
                ],
            });
        } catch (error) {
            msg.channel.send({
                embeds: [
                    new EmbedBuilder()
                    .setTitle("Pokemon no encontrado")
                    .setDescription("Escribir un nombre valido")
                    .setColor(16711680)
                ],
            });
        }
    }
}

export default command
