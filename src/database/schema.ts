import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const posts = sqliteTable('posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  image: text('image'),
  date: text('date').notNull(),
  categories: text('categories'), // stored as JSON array string
  translations: text('translations'), // stored as JSON string { "en": {...}, "hr": {...} }
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const translations = sqliteTable('translations', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  lang: text('lang').notNull(),
  key: text('key').notNull(),
  value: text('value').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

export const analytics = sqliteTable('analytics', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  anonymousId: text('anonymous_id').notNull(),
  event: text('event').notNull(),
  path: text('path'),
  country: text('country'),
  browserName: text('browser_name'),
  osName: text('os_name'),
  deviceType: text('device_type'),
  created_at: integer('created_at', { mode: 'timestamp' }).notNull(),
});
