import mysql from "mysql2/promise";
import config from "./config";
import { Message } from "discord.js";

const pool = mysql.createPool({
    host: config.mysql.HOST,
    user: config.mysql.USER,
    password: config.mysql.PASSWORD,
    database: config.mysql.DB,
    port: Number(config.mysql.PORT),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: "utf8mb4",
});

async function devolverTabla(tabla: string) {
    const [rows] = await pool.execute(
        `SELECT * FROM \`${tabla}\``
    )
    return rows
}

async function obtenerPrefix(msg: Message): Promise<string> {
    const result : any = await pool.execute(
        "SELECT pf FROM prefix WHERE server_id = ?",
        [msg.guildId]
    )

    return result[0][0].pf;
}

async function autorolDataBase(msg: Message, arg: string[]) {
    for(let i = 0; i < arg.length; i += 2) {
        await pool.execute(
            "INSERT INTO autorol (server_id, msg_id, channel_id, emoji, rol_id) values(?, ?, ?, ?, ?)",
            [msg.guildId, msg.id, msg.channelId, arg[i], arg[i + 1]]
        )
    }
}

export {
    pool,
    obtenerPrefix,
    autorolDataBase,
    devolverTabla,
}