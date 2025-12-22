import { Guild } from "discord.js";
import { pool } from "../mysql";

const event = {
    name: "guildCreate",
    
    execute: async (guild: Guild) => {
        await pool.execute(
            "INSERT IGNORE INTO servers (id) values (?)",
            [guild.id]
        )

        await pool.execute(
            "INSERT IGNORE INTO prefix (server_id, pf) values (?, ?)",
            [guild.id, "."]
        )
    }
};

export default event

