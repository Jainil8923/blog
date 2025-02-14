import {
  boolean,
  pgTable,
  varchar,
  uuid,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  first_name: varchar({ length: 255 }).notNull(),
  last_name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  content: text(),
  user_image: varchar(),
  background_image: varchar(),
  instagram_url: varchar(),
  facebook_url: varchar(),
  refresh_token: varchar(),
  is_active: boolean().default(true),
  registered_at: timestamp().defaultNow(),
  updated_at: timestamp(),
  deleted_at: timestamp(),
});

export const postsTable = pgTable("posts", {
  id: uuid().defaultRandom().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  content: text().notNull(),
  user_id: uuid().references(() => usersTable.id, { onDelete: "cascade" }),
  is_deleted: boolean().default(false),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp(),
  deleted_at: timestamp(),
});

export const commentsTable = pgTable("comments", {
  id: uuid().defaultRandom().primaryKey(),
  user_id: uuid().references(() => usersTable.id, { onDelete: "cascade" }),
  post_id: uuid().references(() => postsTable.id, { onDelete: "cascade" }),
  content: text().notNull(),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp(),
});

export const interactionsTable = pgTable("interactions", {
  id: uuid().defaultRandom().primaryKey(),
  user_id: uuid().references(() => usersTable.id, { onDelete: "cascade" }),
  post_id: uuid().references(() => postsTable.id, { onDelete: "cascade" }),
  liked: boolean(),
});

export const userRelations = relations(usersTable, ({ many }) => ({
  comments: many(commentsTable),
  interactions: many(interactionsTable),
  posts: many(postsTable),
}));

export const postsRelations = relations(postsTable, ({ one, many }) => ({
  author: one(usersTable, {
    fields: [postsTable.user_id],
    references: [usersTable.id],
  }),
  comments: many(commentsTable),
  interactions: many(interactionsTable),
}));

export const commentsRelations = relations(commentsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [commentsTable.user_id],
    references: [usersTable.id],
  }),
  post: one(postsTable, {
    fields: [commentsTable.post_id],
    references: [postsTable.id],
  }),
}));

export const interactionsRelations = relations(
  interactionsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [interactionsTable.user_id],
      references: [usersTable.id],
    }),
    post: one(postsTable, {
      fields: [interactionsTable.post_id],
      references: [postsTable.id],
    }),
  })
);
