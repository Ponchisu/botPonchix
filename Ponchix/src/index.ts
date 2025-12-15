import {Client, GatewayIntentBits, Message} from "discord.js"
import {join} from "path";
import dotenv from 'dotenv'
import { readdir, readdirSync } from "fs";
dotenv.config()


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
    ],
});

if(!process.env.DISCORD_TOKEN || !process.env.CLIENT_ID) {
    throw new Error("`DISCORD_TOKEN` or `CLIENT_ID` no encontrados");
}

const dirBase = __dirname;

let eventDir = join(__dirname, "../src/events/");
readdirSync(eventDir).forEach((file) => {
    if (!file.endsWith(".ts")) return;
    
    const event = require(`${eventDir}${file}`).default;
    client.on(event.name, (...args) => event.execute(...args));
});

client.login(process.env.DISCORD_TOKEN);

export default dirBase;