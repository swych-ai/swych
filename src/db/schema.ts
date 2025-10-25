import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const testimonials = sqliteTable('testimonials', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  clientName: text('client_name').notNull(),
  company: text('company').notNull(),
  position: text('position').notNull(),
  testimonial: text('testimonial').notNull(),
  rating: integer('rating').notNull(),
  avatarUrl: text('avatar_url'),
  createdAt: text('created_at').notNull(),
});

export const clients = sqliteTable('clients', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  companyName: text('company_name').notNull(),
  logoUrl: text('logo_url'),
  description: text('description'),
  websiteUrl: text('website_url'),
  createdAt: text('created_at').notNull(),
});