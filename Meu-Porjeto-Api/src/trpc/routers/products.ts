import { z } from 'zod';
import { initTRPC } from '@trpc/server';
import { drizzle } from 'drizzle-orm-sqlite';
import { getRawDb } from '../../server/db';
import { products } from '../../server/drizzle/schema';

const t = initTRPC.create();
const db = drizzle(getRawDb() as any);

export const productsRouter = t.router({
  list: t.procedure.query(() => {
    return db.select().from(products).orderBy(products.createdAt.desc()).all();
  }),
  getById: t.procedure.input(z.object({ id: z.number() })).query(({ input }) => {
    return db.select().from(products).where(products.id.eq(input.id)).limit(1).all().then(r => r[0]);
  }),
  create: t.procedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        price: z.number().min(0),
        category: z.string().min(1),
        imageUrl: z.string().url().optional(),
        inStock: z.number().min(0).optional(),
      })
    )
    .mutation(async ({ input }) => {
      return await db.insert(products).values(input as any);
    }),
  delete: t.procedure.input(z.object({ id: z.number() })).mutation(async ({ input }) => {
    return await db.delete(products).where(products.id.eq(input.id));
  }),
});
