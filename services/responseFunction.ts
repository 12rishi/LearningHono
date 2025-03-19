import type { Context } from "hono";
import type { STATUS } from "../type";
import type { StatusCode } from "hono/utils/http-status";

export const sendResponse = (
  status: StatusCode,
  message: string,
  data?: {},
  error?: string | Error
) => {
  return (c: Context) => {
    return c.json({
      message,
      status: c.status(status),
      ...(data !== undefined && { data }),
      error,
    });
  };
};
