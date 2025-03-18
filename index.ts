import { Hono } from "hono";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import V1Routes from "./routes/v1Route";
import "./database/connection";

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
    message: " dont try to access unavilable routes",
    status: c.status(404),
  });
});
export default {
  port: 5000,
  fetch: app.fetch,
};
