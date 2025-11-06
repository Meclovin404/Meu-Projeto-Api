import { createNextApiHandler } from '@trpc/server/adapters/next';
import { initTRPC } from '@trpc/server';
import { productsRouter } from './routers/products';

const t = initTRPC.create();
const appRouter = t.router({
  products: productsRouter,
});

export type AppRouter = typeof appRouter;

export default createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
