import { Hono } from "hono";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import V1Routes from "./routes/v1Route";
import "./database/connection";
import { createBunWebSocket } from "hono/bun";
import type { BunRequest, Server } from "bun";
import { webSocketHelper } from "./helperFunc/websocketHelper";
import { logger } from "hono/logger";
import dummyRoute from "./routes/dummyRoute";
import redisClient from "./helper/redisClient";

const app = new Hono();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(logger());
app.use("*", secureHeaders()); //to protect from different security threat
//moiddleware

app.route("/", V1Routes);
app.route("/", dummyRoute);

app.onError((err, c) => {
  return c.json({
    error: err.message,
    statusCode: c.status(500),
  });
});

app.notFound((c) => {
  return c.json({
    message: " dont try to access unavailable routes",
    status: c.status(404),
  });
});
redisClient.connect();
redisClient.on("connect", (data) => {
  console.log("Redis Client connected");
});
const server = Bun.serve({
  port: 5000,
  fetch: (request, server) => {
    if (server.upgrade(request)) {
      return;
    } else {
      return app.fetch(request, server);
    }
  },
  websocket: {
    open(ws: any) {
      console.log("web socket connected", ws);
    },
    close(ws: any) {
      console.log("WebSocket connection closed:", ws);
    },
    message(ws: any, message: any) {
      webSocketHelper(ws, message);
    },
  },
});

export default app;
