import {Client, GatewayIntentBits, Message} from "discord.js"
import {join} from "path";
import { readdir, readdirSync } from "fs";
import config from "./config";



const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
    ],
});

if(!config.discord.TOKEN || !config.discord.CLIENTE) {
    throw new Error("`DISCORD_TOKEN` or `CLIENT_ID` no encontrados");
}

const dirBase = __dirname;

let eventDir = join(__dirname, "../src/events/");
readdirSync(eventDir).forEach((file) => {
    if (!file.endsWith(".ts")) return;
    
    const event = require(`${eventDir}${file}`).default;
    client.on(event.name, (...args) => event.execute(...args));
});

client.login(config.discord.TOKEN);

export default dirBase;