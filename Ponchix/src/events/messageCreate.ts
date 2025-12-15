// import { Message } from "discord.js";
import { Message, EmbedBuilder} from "discord.js"
import { join } from "path";
import dirBase from "..";
import { existsSync } from "fs";


const prefix = ".";

const event = {
    name: "messageCreate",
    
    execute: async (msg: Message) => {
        if (msg.author.bot) return;
        if (!msg.content.startsWith(prefix)) return;
        let args = msg.content.slice(prefix.length).trim().split(/\s+/);
        let command = args.shift()?.toLowerCase();
        if(!command) return;
        let commandDir = join(dirBase, `/command/${command}.ts`);

        if (!existsSync(commandDir)) return;
        
        try {
            const commandModule = await import(commandDir);
            const command = commandModule.default;
            await command.execute(msg, args);
        } catch (err) {
            if(!msg.inGuild()) return;
            msg.channel.send("Error ejecutando el comando");
        }
        
        console.log(`> Se ejecuto ${command}`);
    }
};

export default event