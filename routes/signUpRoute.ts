import { OpenAPIHono } from "@hono/zod-openapi";
import {
  loginController,
  registerController,
} from "../controller/loginController";

const SignUpRoute = new OpenAPIHono();
SignUpRoute.post("/register", registerController);
SignUpRoute.post("/login", loginController);
export default SignUpRoute;
