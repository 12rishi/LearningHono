import { OpenAPIHono } from "@hono/zod-openapi";
import { char } from "drizzle-orm/singlestore-core";
import type { Context } from "hono";
import { bodyLimit } from "hono/body-limit";
import { compress } from "hono/compress";
import { StreamingApi } from "hono/utils/stream";
import { getCacheData, setCacheData } from "../helper/redisClient";
const users = [
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
  { id: 3, name: "User 3" },
  { id: 4, name: "User 4" },
  { id: 5, name: "User 5" },
  { id: 6, name: "User 6" },
  { id: 7, name: "User 7" },
  { id: 8, name: "User 8" },
  { id: 9, name: "User 9" },
  { id: 10, name: "User 10" },
  { id: 11, name: "User 11" },
  { id: 12, name: "User 12" },
  { id: 13, name: "User 13" },
  { id: 14, name: "User 14" },
  { id: 15, name: "User 15" },
  { id: 16, name: "User 16" },
  { id: 17, name: "User 17" },
  { id: 18, name: "User 18" },
  { id: 19, name: "User 19" },
  { id: 20, name: "User 20" },
  { id: 21, name: "User 21" },
  { id: 22, name: "User 22" },
  { id: 23, name: "User 23" },
  { id: 24, name: "User 24" },
  { id: 25, name: "User 25" },
  { id: 26, name: "User 26" },
  { id: 27, name: "User 27" },
  { id: 28, name: "User 28" },
  { id: 29, name: "User 29" },
  { id: 30, name: "User 30" },
  { id: 31, name: "User 31" },
  { id: 32, name: "User 32" },
  { id: 33, name: "User 33" },
  { id: 34, name: "User 34" },
  { id: 35, name: "User 35" },
  { id: 36, name: "User 36" },
  { id: 37, name: "User 37" },
  { id: 38, name: "User 38" },
  { id: 39, name: "User 39" },
  { id: 40, name: "User 40" },
  { id: 41, name: "User 41" },
  { id: 42, name: "User 42" },
  { id: 43, name: "User 43" },
  { id: 44, name: "User 44" },
  { id: 45, name: "User 45" },
  { id: 46, name: "User 46" },
  { id: 47, name: "User 47" },
  { id: 48, name: "User 48" },
  { id: 49, name: "User 49" },
  { id: 50, name: "User 50" },
  { id: 51, name: "User 51" },
  { id: 52, name: "User 52" },
  { id: 53, name: "User 53" },
  { id: 54, name: "User 54" },
  { id: 55, name: "User 55" },
  { id: 56, name: "User 56" },
  { id: 57, name: "User 57" },
  { id: 58, name: "User 58" },
  { id: 59, name: "User 59" },
  { id: 60, name: "User 60" },
  { id: 61, name: "User 61" },
  { id: 62, name: "User 62" },
  { id: 63, name: "User 63" },
  { id: 64, name: "User 64" },
  { id: 65, name: "User 65" },
  { id: 66, name: "User 66" },
  { id: 67, name: "User 67" },
  { id: 68, name: "User 68" },
  { id: 69, name: "User 69" },
  { id: 70, name: "User 70" },
  { id: 71, name: "User 71" },
  { id: 72, name: "User 72" },
  { id: 73, name: "User 73" },
  { id: 74, name: "User 74" },
  { id: 75, name: "User 75" },
  { id: 76, name: "User 76" },
  { id: 77, name: "User 77" },
  { id: 78, name: "User 78" },
  { id: 79, name: "User 79" },
  { id: 80, name: "User 80" },
  { id: 81, name: "User 81" },
  { id: 82, name: "User 82" },
  { id: 83, name: "User 83" },
  { id: 84, name: "User 84" },
  { id: 85, name: "User 85" },
  { id: 86, name: "User 86" },
  { id: 87, name: "User 87" },
  { id: 88, name: "User 88" },
  { id: 89, name: "User 89" },
  { id: 90, name: "User 90" },
  { id: 91, name: "User 91" },
  { id: 92, name: "User 92" },
  { id: 93, name: "User 93" },
  { id: 94, name: "User 94" },
  { id: 95, name: "User 95" },
  { id: 96, name: "User 96" },
  { id: 97, name: "User 97" },
  { id: 98, name: "User 98" },
  { id: 99, name: "User 99" },
  { id: 100, name: "User 100" },
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
  { id: 3, name: "User 3" },
  { id: 4, name: "User 4" },
  { id: 5, name: "User 5" },
  { id: 6, name: "User 6" },
  { id: 7, name: "User 7" },
  { id: 8, name: "User 8" },
  { id: 9, name: "User 9" },
  { id: 10, name: "User 10" },
  { id: 11, name: "User 11" },
  { id: 12, name: "User 12" },
  { id: 13, name: "User 13" },
  { id: 14, name: "User 14" },
  { id: 15, name: "User 15" },
  { id: 16, name: "User 16" },
  { id: 17, name: "User 17" },
  { id: 18, name: "User 18" },
  { id: 19, name: "User 19" },
  { id: 20, name: "User 20" },
  { id: 21, name: "User 21" },
  { id: 22, name: "User 22" },
  { id: 23, name: "User 23" },
  { id: 24, name: "User 24" },
  { id: 25, name: "User 25" },
  { id: 26, name: "User 26" },
  { id: 27, name: "User 27" },
  { id: 28, name: "User 28" },
  { id: 29, name: "User 29" },
  { id: 30, name: "User 30" },
  { id: 31, name: "User 31" },
  { id: 32, name: "User 32" },
  { id: 33, name: "User 33" },
  { id: 34, name: "User 34" },
  { id: 35, name: "User 35" },
  { id: 36, name: "User 36" },
  { id: 37, name: "User 37" },
  { id: 38, name: "User 38" },
  { id: 39, name: "User 39" },
  { id: 40, name: "User 40" },
  { id: 41, name: "User 41" },
  { id: 42, name: "User 42" },
  { id: 43, name: "User 43" },
  { id: 44, name: "User 44" },
  { id: 45, name: "User 45" },
  { id: 46, name: "User 46" },
  { id: 47, name: "User 47" },
  { id: 48, name: "User 48" },
  { id: 49, name: "User 49" },
  { id: 50, name: "User 50" },
  { id: 51, name: "User 51" },
  { id: 52, name: "User 52" },
  { id: 53, name: "User 53" },
  { id: 54, name: "User 54" },
  { id: 55, name: "User 55" },
  { id: 56, name: "User 56" },
  { id: 57, name: "User 57" },
  { id: 58, name: "User 58" },
  { id: 59, name: "User 59" },
  { id: 60, name: "User 60" },
  { id: 61, name: "User 61" },
  { id: 62, name: "User 62" },
  { id: 63, name: "User 63" },
  { id: 64, name: "User 64" },
  { id: 65, name: "User 65" },
  { id: 66, name: "User 66" },
  { id: 67, name: "User 67" },
  { id: 68, name: "User 68" },
  { id: 69, name: "User 69" },
  { id: 70, name: "User 70" },
  { id: 71, name: "User 71" },
  { id: 72, name: "User 72" },
  { id: 73, name: "User 73" },
  { id: 74, name: "User 74" },
  { id: 75, name: "User 75" },
  { id: 76, name: "User 76" },
  { id: 77, name: "User 77" },
  { id: 78, name: "User 78" },
  { id: 79, name: "User 79" },
  { id: 80, name: "User 80" },
  { id: 81, name: "User 81" },
  { id: 82, name: "User 82" },
  { id: 83, name: "User 83" },
  { id: 84, name: "User 84" },
  { id: 85, name: "User 85" },
  { id: 86, name: "User 86" },
  { id: 87, name: "User 87" },
  { id: 88, name: "User 88" },
  { id: 89, name: "User 89" },
  { id: 90, name: "User 90" },
  { id: 91, name: "User 91" },
  { id: 92, name: "User 92" },
  { id: 93, name: "User 93" },
  { id: 94, name: "User 94" },
  { id: 95, name: "User 95" },
  { id: 96, name: "User 96" },
  { id: 97, name: "User 97" },
  { id: 98, name: "User 98" },
  { id: 99, name: "User 99" },
  { id: 100, name: "User 100" },
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
  { id: 3, name: "User 3" },
  { id: 4, name: "User 4" },
  { id: 5, name: "User 5" },
  { id: 6, name: "User 6" },
  { id: 7, name: "User 7" },
  { id: 8, name: "User 8" },
  { id: 9, name: "User 9" },
  { id: 10, name: "User 10" },
  { id: 11, name: "User 11" },
  { id: 12, name: "User 12" },
  { id: 13, name: "User 13" },
  { id: 14, name: "User 14" },
  { id: 15, name: "User 15" },
  { id: 16, name: "User 16" },
  { id: 17, name: "User 17" },
  { id: 18, name: "User 18" },
  { id: 19, name: "User 19" },
  { id: 20, name: "User 20" },
  { id: 21, name: "User 21" },
  { id: 22, name: "User 22" },
  { id: 23, name: "User 23" },
  { id: 24, name: "User 24" },
  { id: 25, name: "User 25" },
  { id: 26, name: "User 26" },
  { id: 27, name: "User 27" },
  { id: 28, name: "User 28" },
  { id: 29, name: "User 29" },
  { id: 30, name: "User 30" },
  { id: 31, name: "User 31" },
  { id: 32, name: "User 32" },
  { id: 33, name: "User 33" },
  { id: 34, name: "User 34" },
  { id: 35, name: "User 35" },
  { id: 36, name: "User 36" },
  { id: 37, name: "User 37" },
  { id: 38, name: "User 38" },
  { id: 39, name: "User 39" },
  { id: 40, name: "User 40" },
  { id: 41, name: "User 41" },
  { id: 42, name: "User 42" },
  { id: 43, name: "User 43" },
  { id: 44, name: "User 44" },
  { id: 45, name: "User 45" },
  { id: 46, name: "User 46" },
  { id: 47, name: "User 47" },
  { id: 48, name: "User 48" },
  { id: 49, name: "User 49" },
  { id: 50, name: "User 50" },
  { id: 51, name: "User 51" },
  { id: 52, name: "User 52" },
  { id: 53, name: "User 53" },
  { id: 54, name: "User 54" },
  { id: 55, name: "User 55" },
  { id: 56, name: "User 56" },
  { id: 57, name: "User 57" },
  { id: 58, name: "User 58" },
  { id: 59, name: "User 59" },
  { id: 60, name: "User 60" },
  { id: 61, name: "User 61" },
  { id: 62, name: "User 62" },
  { id: 63, name: "User 63" },
  { id: 64, name: "User 64" },
  { id: 65, name: "User 65" },
  { id: 66, name: "User 66" },
  { id: 67, name: "User 67" },
  { id: 68, name: "User 68" },
  { id: 69, name: "User 69" },
  { id: 70, name: "User 70" },
  { id: 71, name: "User 71" },
  { id: 72, name: "User 72" },
  { id: 73, name: "User 73" },
  { id: 74, name: "User 74" },
  { id: 75, name: "User 75" },
  { id: 76, name: "User 76" },
  { id: 77, name: "User 77" },
  { id: 78, name: "User 78" },
  { id: 79, name: "User 79" },
  { id: 80, name: "User 80" },
  { id: 81, name: "User 81" },
  { id: 82, name: "User 82" },
  { id: 83, name: "User 83" },
  { id: 84, name: "User 84" },
  { id: 85, name: "User 85" },
  { id: 86, name: "User 86" },
  { id: 87, name: "User 87" },
  { id: 88, name: "User 88" },
  { id: 89, name: "User 89" },
  { id: 90, name: "User 90" },
  { id: 91, name: "User 91" },
  { id: 92, name: "User 92" },
  { id: 93, name: "User 93" },
  { id: 94, name: "User 94" },
  { id: 95, name: "User 95" },
  { id: 96, name: "User 96" },
  { id: 97, name: "User 97" },
  { id: 98, name: "User 98" },
  { id: 99, name: "User 99" },
  { id: 100, name: "User 100" },
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
  { id: 3, name: "User 3" },
  { id: 4, name: "User 4" },
  { id: 5, name: "User 5" },
  { id: 6, name: "User 6" },
  { id: 7, name: "User 7" },
  { id: 8, name: "User 8" },
  { id: 9, name: "User 9" },
  { id: 10, name: "User 10" },
  { id: 11, name: "User 11" },
  { id: 12, name: "User 12" },
  { id: 13, name: "User 13" },
  { id: 14, name: "User 14" },
  { id: 15, name: "User 15" },
  { id: 16, name: "User 16" },
  { id: 17, name: "User 17" },
  { id: 18, name: "User 18" },
  { id: 19, name: "User 19" },
  { id: 20, name: "User 20" },
  { id: 21, name: "User 21" },
  { id: 22, name: "User 22" },
  { id: 23, name: "User 23" },
  { id: 24, name: "User 24" },
  { id: 25, name: "User 25" },
  { id: 26, name: "User 26" },
  { id: 27, name: "User 27" },
  { id: 28, name: "User 28" },
  { id: 29, name: "User 29" },
  { id: 30, name: "User 30" },
  { id: 31, name: "User 31" },
  { id: 32, name: "User 32" },
  { id: 33, name: "User 33" },
  { id: 34, name: "User 34" },
  { id: 35, name: "User 35" },
  { id: 36, name: "User 36" },
  { id: 37, name: "User 37" },
  { id: 38, name: "User 38" },
  { id: 39, name: "User 39" },
  { id: 40, name: "User 40" },
  { id: 41, name: "User 41" },
  { id: 42, name: "User 42" },
  { id: 43, name: "User 43" },
  { id: 44, name: "User 44" },
  { id: 45, name: "User 45" },
  { id: 46, name: "User 46" },
  { id: 47, name: "User 47" },
  { id: 48, name: "User 48" },
  { id: 49, name: "User 49" },
  { id: 50, name: "User 50" },
  { id: 51, name: "User 51" },
  { id: 52, name: "User 52" },
  { id: 53, name: "User 53" },
  { id: 54, name: "User 54" },
  { id: 55, name: "User 55" },
  { id: 56, name: "User 56" },
  { id: 57, name: "User 57" },
  { id: 58, name: "User 58" },
  { id: 59, name: "User 59" },
  { id: 60, name: "User 60" },
  { id: 61, name: "User 61" },
  { id: 62, name: "User 62" },
  { id: 63, name: "User 63" },
  { id: 64, name: "User 64" },
  { id: 65, name: "User 65" },
  { id: 66, name: "User 66" },
  { id: 67, name: "User 67" },
  { id: 68, name: "User 68" },
  { id: 69, name: "User 69" },
  { id: 70, name: "User 70" },
  { id: 71, name: "User 71" },
  { id: 72, name: "User 72" },
  { id: 73, name: "User 73" },
  { id: 74, name: "User 74" },
  { id: 75, name: "User 75" },
  { id: 76, name: "User 76" },
  { id: 77, name: "User 77" },
  { id: 78, name: "User 78" },
  { id: 79, name: "User 79" },
  { id: 80, name: "User 80" },
  { id: 81, name: "User 81" },
  { id: 82, name: "User 82" },
  { id: 83, name: "User 83" },
  { id: 84, name: "User 84" },
  { id: 85, name: "User 85" },
  { id: 86, name: "User 86" },
  { id: 87, name: "User 87" },
  { id: 88, name: "User 88" },
  { id: 89, name: "User 89" },
  { id: 90, name: "User 90" },
  { id: 91, name: "User 91" },
  { id: 92, name: "User 92" },
  { id: 93, name: "User 93" },
  { id: 94, name: "User 94" },
  { id: 95, name: "User 95" },
  { id: 96, name: "User 96" },
  { id: 97, name: "User 97" },
  { id: 98, name: "User 98" },
  { id: 99, name: "User 99" },
  { id: 100, name: "User 100" },
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
  { id: 3, name: "User 3" },
  { id: 4, name: "User 4" },
  { id: 5, name: "User 5" },
  { id: 6, name: "User 6" },
  { id: 7, name: "User 7" },
  { id: 8, name: "User 8" },
  { id: 9, name: "User 9" },
  { id: 10, name: "User 10" },
  { id: 11, name: "User 11" },
  { id: 12, name: "User 12" },
  { id: 13, name: "User 13" },
  { id: 14, name: "User 14" },
  { id: 15, name: "User 15" },
  { id: 16, name: "User 16" },
  { id: 17, name: "User 17" },
  { id: 18, name: "User 18" },
  { id: 19, name: "User 19" },
  { id: 20, name: "User 20" },
  { id: 21, name: "User 21" },
  { id: 22, name: "User 22" },
  { id: 23, name: "User 23" },
  { id: 24, name: "User 24" },
  { id: 25, name: "User 25" },
  { id: 26, name: "User 26" },
  { id: 27, name: "User 27" },
  { id: 28, name: "User 28" },
  { id: 29, name: "User 29" },
  { id: 30, name: "User 30" },
  { id: 31, name: "User 31" },
  { id: 32, name: "User 32" },
  { id: 33, name: "User 33" },
  { id: 34, name: "User 34" },
  { id: 35, name: "User 35" },
  { id: 36, name: "User 36" },
  { id: 37, name: "User 37" },
  { id: 38, name: "User 38" },
  { id: 39, name: "User 39" },
  { id: 40, name: "User 40" },
  { id: 41, name: "User 41" },
  { id: 42, name: "User 42" },
  { id: 43, name: "User 43" },
  { id: 44, name: "User 44" },
  { id: 45, name: "User 45" },
  { id: 46, name: "User 46" },
  { id: 47, name: "User 47" },
  { id: 48, name: "User 48" },
  { id: 49, name: "User 49" },
  { id: 50, name: "User 50" },
  { id: 51, name: "User 51" },
  { id: 52, name: "User 52" },
  { id: 53, name: "User 53" },
  { id: 54, name: "User 54" },
  { id: 55, name: "User 55" },
  { id: 56, name: "User 56" },
  { id: 57, name: "User 57" },
  { id: 58, name: "User 58" },
  { id: 59, name: "User 59" },
  { id: 60, name: "User 60" },
  { id: 61, name: "User 61" },
  { id: 62, name: "User 62" },
  { id: 63, name: "User 63" },
  { id: 64, name: "User 64" },
  { id: 65, name: "User 65" },
  { id: 66, name: "User 66" },
  { id: 67, name: "User 67" },
  { id: 68, name: "User 68" },
  { id: 69, name: "User 69" },
  { id: 70, name: "User 70" },
  { id: 71, name: "User 71" },
  { id: 72, name: "User 72" },
  { id: 73, name: "User 73" },
  { id: 74, name: "User 74" },
  { id: 75, name: "User 75" },
  { id: 76, name: "User 76" },
  { id: 77, name: "User 77" },
  { id: 78, name: "User 78" },
  { id: 79, name: "User 79" },
  { id: 80, name: "User 80" },
  { id: 81, name: "User 81" },
  { id: 82, name: "User 82" },
  { id: 83, name: "User 83" },
  { id: 84, name: "User 84" },
  { id: 85, name: "User 85" },
  { id: 86, name: "User 86" },
  { id: 87, name: "User 87" },
  { id: 88, name: "User 88" },
  { id: 89, name: "User 89" },
  { id: 90, name: "User 90" },
  { id: 91, name: "User 91" },
  { id: 92, name: "User 92" },
  { id: 93, name: "User 93" },
  { id: 94, name: "User 94" },
  { id: 95, name: "User 95" },
  { id: 96, name: "User 96" },
  { id: 97, name: "User 97" },
  { id: 98, name: "User 98" },
  { id: 99, name: "User 99" },
  { id: 100, name: "User 100" },
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
  { id: 3, name: "User 3" },
  { id: 4, name: "User 4" },
  { id: 5, name: "User 5" },
  { id: 6, name: "User 6" },
  { id: 7, name: "User 7" },
  { id: 8, name: "User 8" },
  { id: 9, name: "User 9" },
  { id: 10, name: "User 10" },
  { id: 11, name: "User 11" },
  { id: 12, name: "User 12" },
  { id: 13, name: "User 13" },
  { id: 14, name: "User 14" },
  { id: 15, name: "User 15" },
  { id: 16, name: "User 16" },
  { id: 17, name: "User 17" },
  { id: 18, name: "User 18" },
  { id: 19, name: "User 19" },
  { id: 20, name: "User 20" },
  { id: 21, name: "User 21" },
  { id: 22, name: "User 22" },
  { id: 23, name: "User 23" },
  { id: 24, name: "User 24" },
  { id: 25, name: "User 25" },
  { id: 26, name: "User 26" },
  { id: 27, name: "User 27" },
  { id: 28, name: "User 28" },
  { id: 29, name: "User 29" },
  { id: 30, name: "User 30" },
  { id: 31, name: "User 31" },
  { id: 32, name: "User 32" },
  { id: 33, name: "User 33" },
  { id: 34, name: "User 34" },
  { id: 35, name: "User 35" },
  { id: 36, name: "User 36" },
  { id: 37, name: "User 37" },
  { id: 38, name: "User 38" },
  { id: 39, name: "User 39" },
  { id: 40, name: "User 40" },
  { id: 41, name: "User 41" },
  { id: 42, name: "User 42" },
  { id: 43, name: "User 43" },
  { id: 44, name: "User 44" },
  { id: 45, name: "User 45" },
  { id: 46, name: "User 46" },
  { id: 47, name: "User 47" },
  { id: 48, name: "User 48" },
  { id: 49, name: "User 49" },
  { id: 50, name: "User 50" },
  { id: 51, name: "User 51" },
  { id: 52, name: "User 52" },
  { id: 53, name: "User 53" },
  { id: 54, name: "User 54" },
  { id: 55, name: "User 55" },
  { id: 56, name: "User 56" },
  { id: 57, name: "User 57" },
  { id: 58, name: "User 58" },
  { id: 59, name: "User 59" },
  { id: 60, name: "User 60" },
  { id: 61, name: "User 61" },
  { id: 62, name: "User 62" },
  { id: 63, name: "User 63" },
  { id: 64, name: "User 64" },
  { id: 65, name: "User 65" },
  { id: 66, name: "User 66" },
  { id: 67, name: "User 67" },
  { id: 68, name: "User 68" },
  { id: 69, name: "User 69" },
  { id: 70, name: "User 70" },
  { id: 71, name: "User 71" },
  { id: 72, name: "User 72" },
  { id: 73, name: "User 73" },
  { id: 74, name: "User 74" },
  { id: 75, name: "User 75" },
  { id: 76, name: "User 76" },
  { id: 77, name: "User 77" },
  { id: 78, name: "User 78" },
  { id: 79, name: "User 79" },
  { id: 80, name: "User 80" },
  { id: 81, name: "User 81" },
  { id: 82, name: "User 82" },
  { id: 83, name: "User 83" },
  { id: 84, name: "User 84" },
  { id: 85, name: "User 85" },
  { id: 86, name: "User 86" },
  { id: 87, name: "User 87" },
  { id: 88, name: "User 88" },
  { id: 89, name: "User 89" },
  { id: 90, name: "User 90" },
  { id: 91, name: "User 91" },
  { id: 92, name: "User 92" },
  { id: 93, name: "User 93" },
  { id: 94, name: "User 94" },
  { id: 95, name: "User 95" },
  { id: 96, name: "User 96" },
  { id: 97, name: "User 97" },
  { id: 98, name: "User 98" },
  { id: 99, name: "User 99" },
  { id: 100, name: "User 100" },
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
  { id: 3, name: "User 3" },
  { id: 4, name: "User 4" },
  { id: 5, name: "User 5" },
  { id: 6, name: "User 6" },
  { id: 7, name: "User 7" },
  { id: 8, name: "User 8" },
  { id: 9, name: "User 9" },
  { id: 10, name: "User 10" },
  { id: 11, name: "User 11" },
  { id: 12, name: "User 12" },
  { id: 13, name: "User 13" },
  { id: 14, name: "User 14" },
  { id: 15, name: "User 15" },
  { id: 16, name: "User 16" },
  { id: 17, name: "User 17" },
  { id: 18, name: "User 18" },
  { id: 19, name: "User 19" },
  { id: 20, name: "User 20" },
  { id: 21, name: "User 21" },
  { id: 22, name: "User 22" },
  { id: 23, name: "User 23" },
  { id: 24, name: "User 24" },
  { id: 25, name: "User 25" },
  { id: 26, name: "User 26" },
  { id: 27, name: "User 27" },
  { id: 28, name: "User 28" },
  { id: 29, name: "User 29" },
  { id: 30, name: "User 30" },
  { id: 31, name: "User 31" },
  { id: 32, name: "User 32" },
  { id: 33, name: "User 33" },
  { id: 34, name: "User 34" },
  { id: 35, name: "User 35" },
  { id: 36, name: "User 36" },
  { id: 37, name: "User 37" },
  { id: 38, name: "User 38" },
  { id: 39, name: "User 39" },
  { id: 40, name: "User 40" },
  { id: 41, name: "User 41" },
  { id: 42, name: "User 42" },
  { id: 43, name: "User 43" },
  { id: 44, name: "User 44" },
  { id: 45, name: "User 45" },
  { id: 46, name: "User 46" },
  { id: 47, name: "User 47" },
  { id: 48, name: "User 48" },
  { id: 49, name: "User 49" },
  { id: 50, name: "User 50" },
  { id: 51, name: "User 51" },
  { id: 52, name: "User 52" },
  { id: 53, name: "User 53" },
  { id: 54, name: "User 54" },
  { id: 55, name: "User 55" },
  { id: 56, name: "User 56" },
  { id: 57, name: "User 57" },
  { id: 58, name: "User 58" },
  { id: 59, name: "User 59" },
  { id: 60, name: "User 60" },
  { id: 61, name: "User 61" },
  { id: 62, name: "User 62" },
  { id: 63, name: "User 63" },
  { id: 64, name: "User 64" },
  { id: 65, name: "User 65" },
  { id: 66, name: "User 66" },
  { id: 67, name: "User 67" },
  { id: 68, name: "User 68" },
  { id: 69, name: "User 69" },
  { id: 70, name: "User 70" },
  { id: 71, name: "User 71" },
  { id: 72, name: "User 72" },
  { id: 73, name: "User 73" },
  { id: 74, name: "User 74" },
  { id: 75, name: "User 75" },
  { id: 76, name: "User 76" },
  { id: 77, name: "User 77" },
  { id: 78, name: "User 78" },
  { id: 79, name: "User 79" },
  { id: 80, name: "User 80" },
  { id: 81, name: "User 81" },
  { id: 82, name: "User 82" },
  { id: 83, name: "User 83" },
  { id: 84, name: "User 84" },
  { id: 85, name: "User 85" },
  { id: 86, name: "User 86" },
  { id: 87, name: "User 87" },
  { id: 88, name: "User 88" },
  { id: 89, name: "User 89" },
  { id: 90, name: "User 90" },
  { id: 91, name: "User 91" },
  { id: 92, name: "User 92" },
  { id: 93, name: "User 93" },
  { id: 94, name: "User 94" },
  { id: 95, name: "User 95" },
  { id: 96, name: "User 96" },
  { id: 97, name: "User 97" },
  { id: 98, name: "User 98" },
  { id: 99, name: "User 99" },
  { id: 100, name: "User 100" },
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
  { id: 3, name: "User 3" },
  { id: 4, name: "User 4" },
  { id: 5, name: "User 5" },
  { id: 6, name: "User 6" },
  { id: 7, name: "User 7" },
  { id: 8, name: "User 8" },
  { id: 9, name: "User 9" },
  { id: 10, name: "User 10" },
  { id: 11, name: "User 11" },
  { id: 12, name: "User 12" },
  { id: 13, name: "User 13" },
  { id: 14, name: "User 14" },
  { id: 15, name: "User 15" },
  { id: 16, name: "User 16" },
  { id: 17, name: "User 17" },
  { id: 18, name: "User 18" },
  { id: 19, name: "User 19" },
  { id: 20, name: "User 20" },
  { id: 21, name: "User 21" },
  { id: 22, name: "User 22" },
  { id: 23, name: "User 23" },
  { id: 24, name: "User 24" },
  { id: 25, name: "User 25" },
  { id: 26, name: "User 26" },
  { id: 27, name: "User 27" },
  { id: 28, name: "User 28" },
  { id: 29, name: "User 29" },
  { id: 30, name: "User 30" },
  { id: 31, name: "User 31" },
  { id: 32, name: "User 32" },
  { id: 33, name: "User 33" },
  { id: 34, name: "User 34" },
  { id: 35, name: "User 35" },
  { id: 36, name: "User 36" },
  { id: 37, name: "User 37" },
  { id: 38, name: "User 38" },
  { id: 39, name: "User 39" },
  { id: 40, name: "User 40" },
  { id: 41, name: "User 41" },
  { id: 42, name: "User 42" },
  { id: 43, name: "User 43" },
  { id: 44, name: "User 44" },
  { id: 45, name: "User 45" },
  { id: 46, name: "User 46" },
  { id: 47, name: "User 47" },
  { id: 48, name: "User 48" },
  { id: 49, name: "User 49" },
  { id: 50, name: "User 50" },
  { id: 51, name: "User 51" },
  { id: 52, name: "User 52" },
  { id: 53, name: "User 53" },
  { id: 54, name: "User 54" },
  { id: 55, name: "User 55" },
  { id: 56, name: "User 56" },
  { id: 57, name: "User 57" },
  { id: 58, name: "User 58" },
  { id: 59, name: "User 59" },
  { id: 60, name: "User 60" },
  { id: 61, name: "User 61" },
  { id: 62, name: "User 62" },
  { id: 63, name: "User 63" },
  { id: 64, name: "User 64" },
  { id: 65, name: "User 65" },
  { id: 66, name: "User 66" },
  { id: 67, name: "User 67" },
  { id: 68, name: "User 68" },
  { id: 69, name: "User 69" },
  { id: 70, name: "User 70" },
  { id: 71, name: "User 71" },
  { id: 72, name: "User 72" },
  { id: 73, name: "User 73" },
  { id: 74, name: "User 74" },
  { id: 75, name: "User 75" },
  { id: 76, name: "User 76" },
  { id: 77, name: "User 77" },
  { id: 78, name: "User 78" },
  { id: 79, name: "User 79" },
  { id: 80, name: "User 80" },
  { id: 81, name: "User 81" },
  { id: 82, name: "User 82" },
  { id: 83, name: "User 83" },
  { id: 84, name: "User 84" },
  { id: 85, name: "User 85" },
  { id: 86, name: "User 86" },
  { id: 87, name: "User 87" },
  { id: 88, name: "User 88" },
  { id: 89, name: "User 89" },
  { id: 90, name: "User 90" },
  { id: 91, name: "User 91" },
  { id: 92, name: "User 92" },
  { id: 93, name: "User 93" },
  { id: 94, name: "User 94" },
  { id: 95, name: "User 95" },
  { id: 96, name: "User 96" },
  { id: 97, name: "User 97" },
  { id: 98, name: "User 98" },
  { id: 99, name: "User 99" },
  { id: 100, name: "User 100" },
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
  { id: 3, name: "User 3" },
  { id: 4, name: "User 4" },
  { id: 5, name: "User 5" },
  { id: 6, name: "User 6" },
  { id: 7, name: "User 7" },
  { id: 8, name: "User 8" },
  { id: 9, name: "User 9" },
  { id: 10, name: "User 10" },
  { id: 11, name: "User 11" },
  { id: 12, name: "User 12" },
  { id: 13, name: "User 13" },
  { id: 14, name: "User 14" },
  { id: 15, name: "User 15" },
  { id: 16, name: "User 16" },
  { id: 17, name: "User 17" },
  { id: 18, name: "User 18" },
  { id: 19, name: "User 19" },
  { id: 20, name: "User 20" },
  { id: 21, name: "User 21" },
  { id: 22, name: "User 22" },
  { id: 23, name: "User 23" },
  { id: 24, name: "User 24" },
  { id: 25, name: "User 25" },
  { id: 26, name: "User 26" },
  { id: 27, name: "User 27" },
  { id: 28, name: "User 28" },
  { id: 29, name: "User 29" },
  { id: 30, name: "User 30" },
  { id: 31, name: "User 31" },
  { id: 32, name: "User 32" },
  { id: 33, name: "User 33" },
  { id: 34, name: "User 34" },
  { id: 35, name: "User 35" },
  { id: 36, name: "User 36" },
  { id: 37, name: "User 37" },
  { id: 38, name: "User 38" },
  { id: 39, name: "User 39" },
  { id: 40, name: "User 40" },
  { id: 41, name: "User 41" },
  { id: 42, name: "User 42" },
  { id: 43, name: "User 43" },
  { id: 44, name: "User 44" },
  { id: 45, name: "User 45" },
  { id: 46, name: "User 46" },
  { id: 47, name: "User 47" },
  { id: 48, name: "User 48" },
  { id: 49, name: "User 49" },
  { id: 50, name: "User 50" },
  { id: 51, name: "User 51" },
  { id: 52, name: "User 52" },
  { id: 53, name: "User 53" },
  { id: 54, name: "User 54" },
  { id: 55, name: "User 55" },
  { id: 56, name: "User 56" },
  { id: 57, name: "User 57" },
  { id: 58, name: "User 58" },
  { id: 59, name: "User 59" },
  { id: 60, name: "User 60" },
  { id: 61, name: "User 61" },
  { id: 62, name: "User 62" },
  { id: 63, name: "User 63" },
  { id: 64, name: "User 64" },
  { id: 65, name: "User 65" },
  { id: 66, name: "User 66" },
  { id: 67, name: "User 67" },
  { id: 68, name: "User 68" },
  { id: 69, name: "User 69" },
  { id: 70, name: "User 70" },
  { id: 71, name: "User 71" },
  { id: 72, name: "User 72" },
  { id: 73, name: "User 73" },
  { id: 74, name: "User 74" },
  { id: 75, name: "User 75" },
  { id: 76, name: "User 76" },
  { id: 77, name: "User 77" },
  { id: 78, name: "User 78" },
  { id: 79, name: "User 79" },
  { id: 80, name: "User 80" },
  { id: 81, name: "User 81" },
  { id: 82, name: "User 82" },
  { id: 83, name: "User 83" },
  { id: 84, name: "User 84" },
  { id: 85, name: "User 85" },
  { id: 86, name: "User 86" },
  { id: 87, name: "User 87" },
  { id: 88, name: "User 88" },
  { id: 89, name: "User 89" },
  { id: 90, name: "User 90" },
  { id: 91, name: "User 91" },
  { id: 92, name: "User 92" },
  { id: 93, name: "User 93" },
  { id: 94, name: "User 94" },
  { id: 95, name: "User 95" },
  { id: 96, name: "User 96" },
  { id: 97, name: "User 97" },
  { id: 98, name: "User 98" },
  { id: 99, name: "User 99" },
  { id: 100, name: "User 100" },
];

const dummyRoute = new OpenAPIHono();
dummyRoute.use(
  bodyLimit({
    maxSize: 50 * 1024, // 50kb
    onError: (c) => {
      throw Error("body size exceeds");
    },
  })
);

dummyRoute.post("/dummy", async (c: Context) => {
  // Get the request body as a stream
  const bodyStream = c.req.raw.body;

  if (!bodyStream) {
    return c.text("No body stream found", 400);
  }

  // Create a TransformStream to process the incoming data
  const transformStream = new TransformStream({
    async transform(chunk, controller) {
      // Convert the chunk to a string (assuming it's text data)
      const chunkString = new TextDecoder().decode(chunk);

      // Enqueue the processed chunk
      controller.enqueue(new TextEncoder().encode(chunkString));
    },
  });

  // Pipe the incoming stream through the transform stream
  const processedStream = bodyStream.pipeThrough(transformStream);

  // Send the processed stream back to the client
  return new Response(processedStream, {
    headers: {
      "Content-Type": "text/plain",
      "Transfer-Encoding": "chunked",
    },
  });
});

// dummyRoute.get("/dummy", (c: Context) => {
//   //   const readDbStream = new ReadableStream({
//   //     async start(controller) {
//   //       const batchSize = 10; // Number of users to fetch in each loop
//   //       for (let offset = 0; offset < users.length; offset += batchSize) {
//   //         // Get the batch of 10 users
//   //         const batch = users.slice(offset, offset + batchSize);
//   //         controller.enqueue(JSON.stringify(batch) + "\n");
//   //       }
//   //       controller.close();
//   //     },
//   //   });
//   //   return new Response(readDbStream, {
//   //     headers: {
//   //       "Content-Type": "application/x-ndjson",
//   //       "Transfer-Encoding": "chunked",
//   //     },
//   //   });
// });
dummyRoute.post("/dummy/compress", async (c: Context) => {
  const data = await c.req.json();
  return c.json({
    data,
  });
});
dummyRoute.post("/dummy/cache", async (c: Context) => {
  try {
    const data = await c.req.json();
    await setCacheData("dummy_cache", "dummy_key", JSON.stringify(data), 40);
    return c.json({
      message: "data set to cache",
    });
  } catch (error: unknown) {
    return c.json(
      {
        message: "error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});
dummyRoute.get("/dummy/cache", async (c: Context) => {
  const data = await getCacheData("dummy_cache", "dummy_key");
  if (!data) {
    return c.json({
      message: "cache did not hit",
    });
  }
  return c.json({
    message: "cache hit",
    data,
  });
});

dummyRoute.post("/dummy/stream", async (c: Context) => {
  const reqBody = await c.req.json(); // Await request body

  // Create a ReadableStream that streams JSON data as chunks
  const streamingData = new ReadableStream({
    async start(controller) {
      const chunks = splitIntoChunks(JSON.stringify(reqBody)); // Split data into chunks
      for (let chunk of chunks) {
        console.log("chunk is", JSON.stringify(chunk));

        controller.enqueue(chunk); // Send each chunk
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay between chunks
      }
      controller.close(); // Close stream after sending all chunks
    },
  });

  return new Response(streamingData, {
    headers: {
      "Content-Type": "application/json",
      "Transfer-Encoding": "chunked",
    },
  });
});

// Utility function to split data into chunks
function splitIntoChunks(data: any, chunkSize = 500) {
  const result = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    result.push(data.slice(i, i + chunkSize));
  }
  return result;
}

export default dummyRoute;
