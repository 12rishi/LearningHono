CREATE UNIQUE INDEX "id_idx" ON "tasks" USING btree ("id");--> statement-breakpoint
CREATE INDEX "userId_idx" ON "tasks" USING btree ("user_id");