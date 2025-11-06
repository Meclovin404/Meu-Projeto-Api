'use client';
import { useEffect, useState } from 'react';

type Product = {
  id: number;
  name: string;
  price: number;
  inStock: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch('/api/trpc/products.list')
      .then(res => res.json())
      .then(data => setProducts((data && data.result && data.result.data) || []))
      .catch(console.error);
  }, []);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">Produtos</h1>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(p => (
          <div key={p.id} className="border p-4 rounded">
            <h2 className="font-semibold">{p.name}</h2>
            <p className="mt-2">Preço: R$ {(p.price / 100).toFixed(2)}</p>
            <p className="mt-1 text-sm">{p.inStock > 0 ? 'Em estoque' : 'Fora de estoque'}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
