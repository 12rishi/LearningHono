import { OpenAPIHono } from "@hono/zod-openapi";
import handleAuth from "../middleware/authMiddleware";
import {
  addTaskController,
  deleteTaskController,
  getTaskController,
  updateTaskController,
} from "../controller/taskController";

const taskroute = new OpenAPIHono();
taskroute.use(handleAuth);
taskroute.post("/task", addTaskController);
taskroute.get("/task", getTaskController);
taskroute.delete("/task/:id", deleteTaskController);
taskroute.patch("/task/:id", updateTaskController);
export default taskroute;
