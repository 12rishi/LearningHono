import { eq, type SelectedFields } from "drizzle-orm";
import { db } from "../database/connection";


import { STATUS } from "../type";

type Operation = "SELECT" | "INSERT" | "UPDATE" | "DELETE";

interface DbOperationParams {
  tableName: any;
  operation: Operation;
  fetchValues?: Record<any, any>;
  fetchCondition?: any;
  joinTable?: any;
  selectValues?: Record<string, any>;
}

export async function dbOperationHelper(params: DbOperationParams) {
  const {
    tableName,
    operation,
    fetchValues,
    selectValues,
    joinTable,
    fetchCondition,
  } = params;

  let query = "";

  switch (operation) {
    case "SELECT":
      let data;
      if (joinTable) {
        data = await db
          .select(fetchValues as SelectedFields<any, any>)
          .from(tableName)
          .innerJoin(joinTable as any, eq(tableName.id, joinTable?.id));
      } else {
        data = await db
          .select(fetchValues as SelectedFields<any, any>)
          .from(tableName)
          .where(eq(fetchCondition.cond1, fetchCondition.cond2));
      }
      return data;

    case "INSERT":
      await db.insert(tableName).values(selectValues as Record<string, any>);
      return;

    case "UPDATE":
      break;

    case "DELETE":
      break;

    default:
      throw new Error("Invalid operation");
  }

  return query;
}
