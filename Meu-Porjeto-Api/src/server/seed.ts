import { getRawDb } from './db';
import { drizzle } from 'drizzle-orm-sqlite';
import { products } from './drizzle/schema';

async function seed() {
  const raw = getRawDb();
  const db = drizzle(raw as any);

  raw.exec(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    category TEXT NOT NULL,
    imageUrl TEXT,
    inStock INTEGER DEFAULT 0,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
    updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
  );`);

  const count = db.select().from(products).all();
  if (count.length === 0) {
    const sample = [
      {
        name: 'Notebook Dell Inspiron 15',
        description: 'Notebook com processador Intel Core i5',
        price: 299999,
        category: 'Eletrônicos',
        imageUrl: '',
        inStock: 5,
      },
      {
        name: 'Mouse Logitech MX Master 3',
        description: 'Mouse ergonômico',
        price: 7999,
        category: 'Periféricos',
        imageUrl: '',
        inStock: 10,
      },
    ];

    for (const p of sample) {
      await db.insert(products).values(p as any);
    }
    console.log('Seed completa');
  } else console.log('DB já contém dados');
}

seed().catch(console.error);
