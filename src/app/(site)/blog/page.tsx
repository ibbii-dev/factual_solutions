import { dbGetBlogPosts } from "@/lib/mongodb";
import PageHero from "@/components/layout/PageHero";
import BlogBrowser from "./BlogBrowser";

// Rendered on the server so search engines see the heading and every post;
// searching and filtering then happen in the browser (BlogBrowser).
export default async function BlogPage({ searchParams }: { searchParams: { q?: string; category?: string } }) {
  const posts = await dbGetBlogPosts({ status: "published" });
  return (
    <div className="min-h-screen text-ink pb-20">
      <PageHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }]}
        eyebrow="Blog"
        title="Insights from practice."
        lede="Practical insights, tools, and real-world perspectives on operational excellence, strategy, Lean Six Sigma, quality, ERP, digital transformation, and continuous improvement."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16">
        <BlogBrowser posts={JSON.parse(JSON.stringify(posts))} initialQuery={searchParams.q ?? ""} initialCategory={searchParams.category ?? "All"} />
      </div>
    </div>
  );
}
