import { sqliteTable, text, integer, timestamp } from 'drizzle-orm-sqlite';

export const products = sqliteTable('products', {
  id: integer('id').primaryKey({ autoIncrement: true }).notNull(),
  name: text('name').notNull(),
  description: text('description'),
  price: integer('price').notNull(),
  category: text('category').notNull(),
  imageUrl: text('imageUrl'),
  inStock: integer('inStock').default(0).notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
  updatedAt: timestamp('updatedAt').defaultNow().notNull(),
});
