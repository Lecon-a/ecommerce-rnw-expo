import dotenv from "dotenv";

dotenv.config()

export const ENV = {
    MODE_ENV: process.env.MODE_ENV,
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
}