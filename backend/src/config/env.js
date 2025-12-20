import dotenv from "dotenv";

dotenv.config()

export const ENV = {
    MODE_ENV: process.env.MODE_ENV || "development",
    PORT: process.env.PORT || 3000,
    DB_URL: process.env.DB_URL,
} 