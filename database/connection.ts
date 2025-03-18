import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();
const connectionString = postgres(String(process.env.DATABASE_URL));

const db = drizzle(connectionString);
export { connectionString, db };
