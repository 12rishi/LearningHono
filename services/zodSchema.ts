import { password } from "bun";
import Zod, { string } from "zod";
const userSchema = Zod.object({
  email: string().email(),
  password: string()
    .max(15, "password cannot be longer than 15 character")
    .min(8, "password must be greater or equal to 8 character long"),
  name: string()
    .max(15, "name cannot be longer than 15 caharacter")
    .min(3, "name must be of at least 3 charcter"),
});
export default userSchema;
