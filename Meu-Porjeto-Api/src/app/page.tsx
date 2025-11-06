import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold">API e Layout Responsivo</h1>
      <p className="mt-4">Projeto demo com Next.js, tRPC e SQLite (Drizzle).</p>
      <div className="mt-6">
        <Link href="/products" className="underline">Ver produtos</Link>
      </div>
    </main>
  );
}
