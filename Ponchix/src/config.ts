import dotenv from 'dotenv'
dotenv.config()

const config = {
    discord: {
        TOKEN: process.env.DISCORD_TOKEN,
        CLIENTE: process.env.CLIENT_ID,
    },

    mysql: {
        HOST: process.env.MYSQL_HOST,
        USER: process.env.MYSQL_USER,
        PASSWORD: process.env.MYSQL_PASSWORD,
        DB: process.env.MYSQL_DB,
        PORT: process.env.MYSQL_PORT,
    }
}

export default config