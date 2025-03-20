import type { Context } from "hono";
import userSchema from "../services/zodSchema";
import { string, z } from "zod";
import { db } from "../database/connection";
import { users } from "../database/schema";
import { eq } from "drizzle-orm";
import { generateToken } from "../services/generateToken";
import { dbOperationHelper } from "../services/dbOperationFunction";
import { sendResponse } from "../services/responseFUnction";
import type { STATUS } from "../type";

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
    // const user: { id: number | string; email: string; password: string }[] =
    //   // await db
    //   //   .select({ id: users.id, email: users.email, password: users.password })
    //   //   .from(users)
    //   //   .where(eq(users.email, email));
    const user: { id: number | string; email: string; password: string }[] =
      await dbOperationHelper({
        tableName: users,
        operation: "SELECT",
        fetchValues: {
          id: users.id,
          email: users.email,
          password: users.password,
        },
        fetchCondition: { cond1: users.email, cond2: email },
      });

    if (user.length === 0) {
      return sendResponse(401 as STATUS.clientError, "forbidden")(c as Context);
    }
    const id = user[0] && user[0].id;
    // Verify password

    if (user[0] && user[0].password !== password) {
      return sendResponse(
        401 as STATUS.clientError,
        "unauthorized"
      )(c as Context);
    }
    const token = await generateToken({ id } as { id: string | number });

    // Return success response
    // return c.json(
    //   {
    //     message: "Login successful",
    //     data: user,
    //     token: token,
    //   },
    //   200
    // );
    const response = sendResponse(200 as STATUS.success, "successfully login", {
      token: token,
      data: {
        id,
        email: user[0]?.email,
      },
    });
    return response(c as Context);
  } catch (error) {
    // Handle generic errors
    return sendResponse(
      500 as STATUS.serverError,
      "Something went wrong",
      undefined,

      error instanceof Error ? error.message : "Unknown error"
    )(c as Context);
  }
};
