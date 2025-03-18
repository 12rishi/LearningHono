import { migrate } from "drizzle-orm/postgres-js/migrator";
import { connectionString, db } from "./database/connection";
import "dotenv/config";

(async () => {
  try {
    console.log("Starting migrations...");
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migrations completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    await connectionString.end();
  }
})();
