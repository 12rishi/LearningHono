import type { Context } from "hono";
import userSchema from "../services/zodSchema";
import { z } from "zod";
import { db } from "../database/connection";
import { users } from "../database/schema";
import { eq } from "drizzle-orm";
import { generateToken } from "../services/generateToken";

type UserSchema = z.infer<typeof userSchema>;

export const registerController = async (c: Context) => {
  try {
    // Parse request body
    const body = await c.req.json();
    const parsedData = userSchema.parse(body);

    // Insert into the database
    await db.insert(users).values({
      name: parsedData.name,
      email: parsedData.email,
      password: parsedData.password,
    });

    return c.json(
      {
        message: "Successfully registered data",
        data: parsedData,
      },
      201
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      // ✅ Return proper JSON error response for validation errors
      return c.json(
        {
          message: "Validation failed",
          errors: error.flatten().fieldErrors,
        },
        400
      );
    }

    // ✅ Handle generic errors
    return c.json(
      {
        message: "Something went wrong",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      500 // Internal Server Error
    );
  }
};
export const loginController = async (c: Context) => {
  try {
    // Parse request body
    const { email, password } = await c.req.json();

    // Validate input
    if (!email || !password) {
      return c.json(
        {
          message: "Email and password are required",
        },
        400
      );
    }

    // Check if user exists
    const user: { id: number | string; email: string; password: string }[] =
      await db
        .select({ id: users.id, email: users.email, password: users.password })
        .from(users)
        .where(eq(users.email, email));
    if (user.length === 0) {
      return c.json(
        {
          message: "Invalid email or password",
        },
        401
      );
    }
    const id = user[0] && user[0].id;
    // Verify password

    if (user[0] && user[0].password !== password) {
      return c.json(
        {
          message: "Invalid email or password",
        },
        401
      );
    }
    const token = await generateToken({ id } as { id: string | number });

    // Return success response
    return c.json(
      {
        message: "Login successful",
        data: user,
        token: token,
      },
      200
    );
  } catch (error) {
    // Handle generic errors
    return c.json(
      {
        message: "Something went wrong",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
};
