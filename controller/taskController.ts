import type { Context } from "hono";
import { db } from "../database/connection";
import { tasks, users } from "../database/schema";
import { eq } from "drizzle-orm";
import { sendResponse } from "../services/responseFUnction";
import type { STATUS } from "../type";
import { dbOperationHelper } from "../services/dbOperationFunction";

export const addTaskController = async (c: Context) => {
  const { title, description } = await c.req.json();
  if (!title || !description) {
    return sendResponse(
      400 as STATUS.clientError,
      "title or description is undefined"
    );
  }
  // await db.insert(tasks).values({
  //   title,
  //   description,
  //   userId: 1,
  // });
  await dbOperationHelper({
    tableName: tasks,
    operation: "INSERT",
    selectValues: { title, description, userId: 1 },
  });

  return sendResponse(
    200 as STATUS.success,
    "successfully inserted the data "
  )(c as Context);
};
export const getTaskController = async (c: Context) => {
  try {
    // const data = await db
    //   .select({
    //     title: tasks.title,
    //     description: tasks.description,
    //     userName: users.name,
    //     userEmail: users.email,
    //   })
    //   .from(tasks)
    //   .innerJoin(users, eq(users.id, tasks.userId));
    const data = await dbOperationHelper({
      tableName: tasks,
      operation: "SELECT",
      fetchValues: {
        title: tasks.title,
        description: tasks.description,
        userName: users.name,
        userEmail: users.email,
      },
      joinTable: users,
    });

    return sendResponse(
      200 as STATUS.success,
      "successfully fetched the data",
      data
    )(c as Context);
  } catch (error) {
    return sendResponse(
      500 as STATUS.serverError,
      error instanceof Error ? error?.message : "failed to fetched the data"
    );
  }
};

export const deleteTaskController = async (c: Context) => {
  const taskId: number | unknown = Number(c.req.param("id"));
  if (!taskId) {
    return c.json({ error: "Task ID is required" }, 400);
  }

  await db.delete(tasks).where(eq(tasks.id, taskId as number));
  //   tasks = tasks.filter((task) => task.id !== taskId);
  return c.json({ message: `Task with ID ${taskId} deleted successfully` });
};

export const updateTaskController = async (c: Context) => {
  const taskId = Number(c.req.param("id"));
  if (!taskId) {
    return c.json({ error: "Task ID is required" }, 400);
  }
  const { title, description } = await c.req.json();
  if (!title || !description) {
    return c.json({ error: "Title and description are required" }, 400);
  }
  await db
    .update(tasks)
    .set({ title, description })
    .where(eq(tasks.id, taskId));
  return c.json({
    message: `Task with ID ${taskId} updated successfully`,
  });
};
