import { Client } from "discord.js";

const event = {
    name: "clientReady",
    
    execute: async (client: Client) => {
        if(!client.user) return;
        console.log(`Bot ${client.user.tag} conectado`); 
    }
};


export default event