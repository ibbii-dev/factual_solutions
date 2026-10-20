import Link from "next/link";

// Placeholder while the site is rebuilt. The home page is designed after the
// header, footer and components are in place.
export default function HomePage() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 py-24 sm:py-32 flex flex-col items-center gap-6 text-center">
      <p className="eyebrow">Consulting · Training · ERP &amp; digital</p>
      <h1 className="text-display text-heading">Our new website is on the way.</h1>
      <p className="text-lede text-muted">In the meantime, read our latest thinking on the blog.</p>
      <Link href="/blog" className="btn-secondary">
        Read the blog
      </Link>
    </section>
  );
}
