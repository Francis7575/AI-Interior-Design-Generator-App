import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const Users = pgTable('users',{
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  email: varchar('email').notNull(),
  imageUrl: varchar('imageUrl').notNull(),
  credits: integer('credits').default(20),
})

export const AiGeneratedImage = pgTable('aiGeneratedImage', {
  id: serial('id').primaryKey(),
  roomType: varchar('roomType').notNull(),
  designType: varchar('designType').notNull(),
  orgImage: varchar('orgImage').notNull(),
  aiImage: varchar('aiImage').notNull(),
  userEmail: varchar('userEmail')
})