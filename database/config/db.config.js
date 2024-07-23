import pkg from 'pg';
const { Pool } = pkg;
import * as dotenv from 'dotenv';
dotenv.config();

const DB_CONNECTION_PASSCODE = process.env.DB_CONNECTION_PASSCODE

export const pool = new Pool({
    user: "avnadmin",
    host: "famtrust-bd-famtrust-476f.f.aivencloud.com",
    database: "defaultdb",
    password: DB_CONNECTION_PASSCODE,
    port: 13204,
    ssl: {
        rejectUnauthorized: false // Allows self-signed certificates
    }
});
