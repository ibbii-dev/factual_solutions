import Link from "next/link";

// Placeholder while the site is rebuilt from a new design system.
// Only the blog and the admin panel are live during the rebuild.
export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-3xl font-semibold">Factual Solutions</h1>
      <p className="max-w-md opacity-70">Our new website is on the way.</p>
      <Link href="/blog" className="underline underline-offset-4">
        Read the blog
      </Link>
    </main>
  );
}
