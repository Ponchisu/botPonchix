import { Client } from "discord.js";
import { devolverTabla, pool } from "../mysql";

const event = {
    name: "clientReady",
    
    execute: async (client: Client) => {
        if(!client.user) return;
        console.log(`Bot ${client.user.tag} conectado`); 


        const duplas = await devolverTabla("autorol");
        for(const dupla of duplas as any[]) {
            try {
                const channel = await client.channels.fetch(dupla.channel_id)
                if(!channel?.isTextBased()) continue;

                await channel.messages.fetch(dupla.msg_id)
            } catch (error) {
                await pool.execute(
                    "DELETE FROM autorol WHERE channel_id = ? AND msg_id = ?",
                    [dupla.channel_id, dupla.msg_id]
                )
            }
        }
    }
};


export default event