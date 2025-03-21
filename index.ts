import { Hono } from "hono";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import V1Routes from "./routes/v1Route";
import "./database/connection";
import { createBunWebSocket } from "hono/bun";
import type { BunRequest, Server } from "bun";
import { webSocketHelper } from "./helperFunc/websocketHelper";

const app = new Hono();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use("*", secureHeaders()); //to protect from different security threat
//moiddleware
app.route("/", V1Routes);

app.onError((err, c) => {
  console.dir(err);
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
