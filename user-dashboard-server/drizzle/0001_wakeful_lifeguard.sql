ALTER TABLE "comments" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "comments" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "interactions" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "interactions" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "refresh_token" varchar;