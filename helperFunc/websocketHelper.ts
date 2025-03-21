import { eq } from "drizzle-orm";
import { db } from "../database/connection";
import { tasks } from "../database/schema";

export const webSocketHelper = async (ws: WebSocket, data: any) => {
  console.log("websocket coonnection is", ws);
  const parsedData = JSON.parse(data);

  console.log(parsedData);
  switch (parsedData.type) {
    case "UPDATE":
      try {
        const { id, value, path } = parsedData;
        if (!id || !value || !path) {
          throw Error("please provide all credential");
        }
        await db
          .update(tasks)
          .set({ ...value })
          .where(eq(tasks.id, id));

        if (ws.readyState === 1) {
        }
      } catch (error) {
        console.log("error occured", error.message);
      }
      return;

    case "DELETE":
      try {
        const { id } = parsedData;
        await db.delete(tasks).where(eq(id, tasks.id));
        if (ws.readyState === 1) {
          ws.send("successfully deleted bit**");
        }
      } catch (error) {}
  }
  ws.addEventListener("error", (ev) => {
    console.log("error occured", ev.message);
  });
};
