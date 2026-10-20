import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { dbGetBlogPosts } from "@/lib/mongodb";
import { principalConsultant } from "@/data/companyData";
import { serviceLines, bookingHref } from "@/data/navigation";
import { phasesForLine } from "@/data/servicePages";
import { principles } from "@/data/aboutContent";

export const metadata: Metadata = pageMetadata({
  title: "Consulting, Training & Digital Transformation",
  description:
    "Consulting, training and ERP & digital transformation: Lean Six Sigma, operational excellence, strategy and quality that help organizations perform better.",
  path: "/",
});

// Refresh the "Latest insights" list every 10 minutes without a redeploy.
export const revalidate = 600;

// One line per service line for "What do you need?".
const NEEDS: Record<string, string> = {
  consulting: "Improve operations, strategy, quality or maintenance.",
  training: "Build your team's skills: PMP, Lean Six Sigma, TPM and more.",
  digital: "Implement ERPNext, automate workflows or build custom software.",
};

const PIECE = {
  navy: { mark: "bg-piece-navy", soft: "bg-piece-navy/10" },
  sky: { mark: "bg-piece-sky", soft: "bg-piece-sky/20" },
  brick: { mark: "bg-piece-brick", soft: "bg-piece-brick/10" },
} as const;

const CREDENTIALS = ["PMP", "Lean Six Sigma Master Black Belt", "Agile Scrum Master", "M.Sc. Computer Engineering"];

function formatDate(value: string) {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// Home "Option B · Choice first" (approved 2026-10-20).
export default async function HomePage() {
  const posts = (await dbGetBlogPosts({ status: "published" })).slice(0, 3);
  const phases = phasesForLine("consulting");

  return (
    <>
      <section className="bg-band">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 flex flex-col gap-5">
            <p className="text-label uppercase text-heading">Consulting · Training · ERP &amp; digital</p>
            <h1 className="text-display text-heading">Consulting people to grow their business.</h1>
            <p className="text-lede text-muted">
              We combine consulting, training, and digital implementation to help organizations design better ways of working,
              build the capabilities to sustain them, and embed improvement into daily operations.
            </p>
            <Link href={bookingHref} className="btn-primary self-start">Book a consultation</Link>
          </div>

          <nav aria-labelledby="needs" className="lg:col-span-6 flex flex-col gap-3">
            <h2 id="needs" className="text-lg font-display text-heading">What do you need?</h2>
            <ul className="flex flex-col gap-3">
              {serviceLines.map((line) => (
                <li key={line.id}>
                  <Link
                    href={line.href}
                    className="group flex items-center gap-4 rounded-2xl bg-bg p-4 sm:p-5 shadow-card hover:shadow-lift transition-shadow"
                  >
                    <span className={`w-11 h-11 shrink-0 rounded-xl inline-flex items-center justify-center ${PIECE[line.piece].soft}`}>
                      <span className={`w-4 h-4 rounded ${PIECE[line.piece].mark}`} />
                    </span>
                    <span className="flex-1 flex flex-col gap-0.5">
                      <span className="font-display text-lg text-heading">{line.title}</span>
                      <span className="text-small text-muted">{NEEDS[line.id]}</span>
                    </span>
                    <span aria-hidden="true" className="text-xl text-heading transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 flex flex-col gap-16 sm:gap-20">
        <section aria-labelledby="how" className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="eyebrow">How we work</p>
            <h2 id="how" className="text-h2 text-heading">From diagnosis to daily practice</h2>
          </div>
          <ol className="grid md:grid-cols-3 gap-5">
            {phases.map((p) => (
              <li key={p.phase} className="rounded-2xl border border-line p-6 flex flex-col gap-2.5">
                <span aria-hidden="true" className="font-display text-3xl leading-none text-primary/70">{p.phase}</span>
                <h3 className="text-h3 text-heading">{p.title}</h3>
                <p className="text-small text-muted">{p.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="lead" className="rounded-3xl bg-surface p-6 sm:p-8 grid md:grid-cols-12 gap-6 md:gap-8 items-center">
          <Image
            src={principalConsultant.image}
            alt={`${principalConsultant.name}, ${principalConsultant.role}`}
            width={1024}
            height={1024}
            sizes="(min-width: 768px) 16rem, 8rem"
            className="md:col-span-3 w-32 md:w-full aspect-square object-cover rounded-2xl"
          />
          <div className="md:col-span-9 flex flex-col gap-3">
            <p className="eyebrow">Your lead consultant</p>
            <h2 id="lead" className="text-h2 text-heading">{principalConsultant.name}</h2>
            <p className="text-body text-ink">
              From London and Nokia to programs in Canada and assignments across 11 countries, Qadeer brings strategy, project
              management, Lean Six Sigma and digital transformation experience to every engagement.
            </p>
            <ul className="flex flex-wrap gap-2" aria-label="Credentials">
              {CREDENTIALS.map((c) => (
                <li key={c} className="text-small font-semibold px-3 py-1.5 rounded-full bg-bg text-heading">{c}</li>
              ))}
            </ul>
            <Link href="/about" className="self-start text-small font-semibold text-primary hover:underline underline-offset-4">
              More about us →
            </Link>
          </div>
        </section>

        <section aria-labelledby="believe" className="flex flex-col gap-5">
          <h2 id="believe" className="text-h2 text-heading">What we believe</h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {principles.map((p, i) => (
              <li key={p.title}>
                <Link href="/about#principles" className="h-full flex flex-col gap-2 rounded-2xl border border-line p-5 hover:border-primary transition-colors">
                  <span aria-hidden="true" className="font-display text-xl leading-none text-primary/70">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-base leading-snug text-heading">{p.title}</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {posts.length > 0 && (
          <section aria-labelledby="insights" className="flex flex-col gap-5">
            <div className="flex items-end justify-between gap-4">
              <h2 id="insights" className="text-h2 text-heading">Latest insights</h2>
              <Link href="/blog" className="text-small font-semibold text-primary hover:underline underline-offset-4 shrink-0">All articles →</Link>
            </div>
            <ul className="grid md:grid-cols-3 gap-5">
              {posts.map((post) => (
                <li key={post.id}>
                  <Link href={`/blog/${post.slug}`} className="group fs-card fs-card-hover h-full flex flex-col gap-2.5 p-6">
                    <span className="text-label uppercase text-heading">{post.category}</span>
                    <span className="text-h3 text-heading">{post.title}</span>
                    <span className="text-small text-muted mt-auto">{formatDate(post.publishedAt)} · {post.readTime}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
