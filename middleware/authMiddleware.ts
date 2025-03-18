import type { Next, Context } from "hono";
import fs from "fs";
import jwt from "jsonwebtoken";
import { promisify } from "util";
import dotenv from "dotenv";
import { db } from "../database/connection";
import { users } from "../database/schema";
import { eq } from "drizzle-orm";

dotenv.config();
const handleAuth = async (c: Context, next: Next) => {
  const token = c.req.header("authorization") as string | undefined;

  if (!token) {
    throw Error("invalid token");
  }
  const publicKey = fs.readFileSync(
    process.env.PUBLIC_KEY_FILE as string,
    "utf-8"
  );
  jwt.verify(
    token,
    publicKey,
    { algorithms: [process.env.ALGO as any] },
    async (err: any, decoded: any): Promise<Response | any> => {
      if (err) {
        throw Error("forbidden");
      }
      const decodedData = decoded.id;
      console.log("decoded data is", decodedData);
      const userData = await db
        .select({ id: users.id, email: users.email, name: users.name })
        .from(users)
        .where(eq(decoded.id, users.id)) // Ensure we fetch only the logged-in user
        .limit(1);
      if (!userData) {
        throw Error("forbidden");
      }

      c.set("user", userData);
    }
  );
  await next();
};

export default handleAuth;
