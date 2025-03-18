import { OpenAPIHono } from "@hono/zod-openapi";
import AuthRoute from "./authRoute";

const V1Routes = new OpenAPIHono();
V1Routes.route("/v1", AuthRoute);
export default V1Routes;
