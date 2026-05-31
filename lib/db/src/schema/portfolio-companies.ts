import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const portfolioCompaniesTable = pgTable("portfolio_companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  tagline: text("tagline"),
  category: text("category"),
  badge: text("badge"),
  description: text("description"),
  features: jsonb("features").$type<string[]>().default([]),
  link_url: text("link_url"),
  link_label: text("link_label"),
  status: text("status"),
  sort_order: integer("sort_order").default(0),
});

export const insertPortfolioCompanySchema = createInsertSchema(
  portfolioCompaniesTable,
).omit({ id: true });
export type InsertPortfolioCompany = z.infer<typeof insertPortfolioCompanySchema>;
export type PortfolioCompany = typeof portfolioCompaniesTable.$inferSelect;
