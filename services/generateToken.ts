import jwt from "jsonwebtoken";
import fs from "fs";
import dotenv from "dotenv";
import { AlgorithmTypes } from "hono/utils/jwt/jwa";
dotenv.config();
export const generateToken = async ({ id }: { id: number | string }) => {
  console.log("id is", id);
  try {
    const privateKey = fs.readFileSync(
      process.env.PRIVATE_KEY_FILE as string,
      "utf8"
    );
    const token = jwt.sign({ id: id }, privateKey, {
      algorithm: process.env.ALGO as any,
    });
    return token;
  } catch (error: any) {
    throw Error(error?.message);
  }
};
