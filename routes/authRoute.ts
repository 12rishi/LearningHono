import { OpenAPIHono } from "@hono/zod-openapi";
import SignUpRoute from "./signUpRoute";
import taskroute from "./taskroute";

const AuthRoute = new OpenAPIHono();
AuthRoute.route("/auth", SignUpRoute);
AuthRoute.route("/auth", taskroute);

export default AuthRoute;
