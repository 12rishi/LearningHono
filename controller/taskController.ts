import type { Context } from "hono";
import { db } from "../database/connection";
import { tasks, users } from "../database/schema";
import { eq } from "drizzle-orm";

export const addTaskController = async (c: Context) => {
  const { title, description } = await c.req.json();
  if (!title || !description) {
    return c.json({ error: "Title and description are required" }, 400);
  }
  await db.insert(tasks).values({
    title,
    description,
    userId: 1,
  });

  return c.json({ message: "Task added successfully" }, 200);
};
export const getTaskController = async (c: Context) => {
  try {
    const data = await db
      .select({
        title: tasks.title,
        description: tasks.description,
        userName: users.name,
        userEmail: users.email,
      })
      .from(tasks)
      .innerJoin(users, eq(users.id, tasks.userId));

    return c.json({
      message: "successfully fetched the data",
      status: c.status(200),
      data,
    });
  } catch (error) {
    return c.json({ error: "Failed to fetch tasks" }, 500);
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
