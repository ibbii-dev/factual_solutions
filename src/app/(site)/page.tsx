import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { dbGetBlogPosts } from "@/lib/mongodb";
import { principalConsultant } from "@/data/companyData";
import { serviceLines, bookingHref } from "@/data/navigation";
import { phasesForLine } from "@/data/servicePages";
import { industries } from "@/data/aboutContent";
import PageHero, { SectionLabel } from "@/components/layout/PageHero";

export const metadata: Metadata = pageMetadata({
  title: "Consulting, Training & Digital Transformation",
  description:
    "Consulting, training and ERP & digital transformation: Lean Six Sigma, operational excellence, strategy and quality that help organizations perform better.",
  path: "/",
});

// Refresh the "Latest insights" list every 10 minutes without a redeploy.
export const revalidate = 600;

const NEEDS: Record<string, string> = {
  consulting: "Improve operations, strategy, quality or maintenance.",
  training: "Build your team's skills: PMP, Lean Six Sigma, TPM and more.",
  digital: "Implement ERPNext, automate workflows or build custom software.",
};

// Marks on the deep hero: the navy piece is lifted so it shows on navy.
const PIECE = { navy: "bg-[rgb(var(--c-glow-navy))]", sky: "bg-piece-sky", brick: "bg-piece-brick" } as const;
const CREDENTIALS = ["PMP", "Lean Six Sigma Master Black Belt", "Agile Scrum Master", "M.Sc. Computer Engineering"];
const STATS = [
  { value: "60+", label: "years combined experience" },
  { value: "11", label: "countries of experience" },
  { value: "12", label: "services, three lines" },
];

function formatDate(value: string) {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? value : d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

// Home, modern layer (approved 2026-10-20): choice-first hero on deep navy, no cube.
export default async function HomePage() {
  const posts = (await dbGetBlogPosts({ status: "published" })).slice(0, 3);
  const phases = phasesForLine("consulting");

  return (
    <>
      <PageHero
        size="home"
        eyebrow="Consulting · Training · ERP & digital"
        title={<>Consulting people to <span className="text-tint">grow</span> their business.</>}
        lede="We combine consulting, training, and digital implementation to help organizations design better ways of working, build the capabilities to sustain them, and embed improvement into daily operations."
        aside={
          <nav aria-labelledby="needs" className="fs-glass rounded-3xl p-4 sm:p-5 flex flex-col gap-3">
            <h2 id="needs" className="px-1 text-lg font-display text-on-deep">What do you need?</h2>
            <ul className="flex flex-col gap-2.5">
              {serviceLines.map((line) => (
                <li key={line.id}>
                  <Link
                    href={line.href}
                    className="group flex items-center gap-4 rounded-2xl bg-on-deep/[0.06] hover:bg-on-deep/[0.12] border border-on-deep/10 p-4 transition-colors"
                  >
                    <span aria-hidden="true" className={`w-3 h-10 shrink-0 rounded-full ${PIECE[line.piece]}`} />
                    <span className="flex-1 flex flex-col gap-0.5">
                      <span className="font-display text-lg text-on-deep">{line.title}</span>
                      <span className="text-small text-on-deep-muted">{NEEDS[line.id]}</span>
                    </span>
                    <span aria-hidden="true" className="text-xl text-on-deep transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        }
      >
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap gap-3">
            <Link href={bookingHref} className="btn-primary !bg-deep-action min-h-[54px] px-7 text-base shadow-lift">
              Book a consultation <span aria-hidden="true">→</span>
            </Link>
            <Link href="/services" className="inline-flex items-center min-h-[54px] px-7 rounded-full border border-on-deep/35 text-on-deep font-semibold hover:border-on-deep transition-colors">
              Explore what we do
            </Link>
          </div>
          <dl className="flex flex-wrap gap-x-10 gap-y-4 pt-6 border-t border-on-deep/15">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="order-last text-small text-on-deep-muted">{s.label}</dt>
                <dd className="font-display text-4xl text-on-deep">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </PageHero>

      {/* Industries ticker */}
      <section aria-label="Industries we work with" className="fs-marquee-box overflow-hidden border-b border-line py-5 bg-bg">
        <ul className="fs-marquee">
          {[...industries, ...industries].map((name, i) => (
            <li key={`${name}-${i}`} aria-hidden={i >= industries.length ? true : undefined} className="flex items-center gap-12 pe-12 whitespace-nowrap font-display text-xl text-heading">
              {name}
              <span aria-hidden="true" className="w-2 h-2 rounded-sm bg-piece-sky" />
            </li>
          ))}
        </ul>
      </section>

      {/* What we do: three tiles only, so the page stays open and calm */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
          <div data-reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex flex-col gap-3 max-w-2xl">
              <SectionLabel>What we do</SectionLabel>
              <h2 className="text-h1 text-heading">One partner, from diagnosis to daily practice.</h2>
            </div>
            <Link href="/services" className="text-small font-semibold text-primary hover:underline underline-offset-4 shrink-0">All 12 services →</Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-5 lg:auto-rows-[15rem]">
            <Link
              href="/services/consulting"
              data-reveal
              className="fs-lift group lg:col-span-7 lg:row-span-2 rounded-[1.75rem] bg-band p-7 sm:p-9 flex flex-col gap-4 relative overflow-hidden"
            >
              <span aria-hidden="true" className="w-9 h-1.5 rounded-full bg-piece-navy" />
              <h3 className="text-h2 text-heading">Consulting</h3>
              <p className="text-lede text-muted max-w-md">Identify what needs to change, and make it work in practice.</p>
              <ol aria-label="Our approach" className="mt-auto flex flex-wrap items-center gap-3">
                {phases.map((p, i) => (
                  <li key={p.phase} className="flex items-center gap-3">
                    <span className="rounded-2xl bg-bg px-4 py-3 shadow-card text-small font-bold text-heading">
                      {p.phase} · {p.title.split(" & ")[0]}
                    </span>
                    {i < phases.length - 1 && <span aria-hidden="true" className="text-xl text-tint">→</span>}
                  </li>
                ))}
              </ol>
              <span aria-hidden="true" className="absolute top-7 right-7 w-12 h-12 rounded-full bg-primary text-on-solid inline-flex items-center justify-center text-xl transition-transform group-hover:rotate-45">↗</span>
            </Link>

            <Link
              href="/services/training"
              data-reveal
              style={{ "--d": "120ms" } as React.CSSProperties}
              className="fs-lift group lg:col-span-5 rounded-[1.75rem] border border-line bg-bg p-7 pb-44 lg:pb-7 flex flex-col gap-2 relative overflow-hidden min-h-[15rem]"
            >
              <span aria-hidden="true" className="w-9 h-1.5 rounded-full bg-piece-sky" />
              <h3 className="text-h3 text-heading">Training</h3>
              <p className="text-muted max-w-[14rem]">Build the capability to change it.</p>
              <div aria-hidden="true" className="absolute right-6 bottom-6 w-44 h-32">
                <span className="absolute right-0 bottom-0 w-40 rounded-2xl bg-primary text-on-solid px-4 py-3 text-small font-bold rotate-[4deg]">Lean Six Sigma</span>
                <span className="absolute right-5 bottom-9 w-40 rounded-2xl bg-tint text-ink px-4 py-3 text-small font-bold -rotate-3 dark:text-on-solid">TPM &amp; 5S</span>
                <span className="absolute right-1 bottom-[4.5rem] w-40 rounded-2xl border border-line bg-bg text-heading px-4 py-3 text-small font-bold rotate-2">PMP preparation</span>
              </div>
            </Link>

            <Link
              href="/services/digital"
              data-reveal
              style={{ "--d": "220ms" } as React.CSSProperties}
              className="fs-lift group fs-deep lg:col-span-5 rounded-[1.75rem] p-7 pb-40 lg:pb-7 flex flex-col gap-2 min-h-[15rem]"
            >
              <div aria-hidden="true" className="fs-glow fs-glow-brick w-80 h-80 -right-24 -top-32" />
              <span aria-hidden="true" className="w-9 h-1.5 rounded-full bg-piece-brick" />
              <h3 className="text-h3 text-on-deep">ERP &amp; Digital</h3>
              <p className="text-on-deep-muted max-w-[15rem]">Technology that makes better processes easier to run.</p>
              <div aria-hidden="true" className="absolute right-6 bottom-6 w-48 h-28 rounded-2xl fs-glass p-3 flex gap-2.5">
                <div className="w-6 flex flex-col gap-2">
                  <span className="h-2 rounded bg-on-deep/35" />
                  <span className="h-2 rounded bg-on-deep/20" />
                  <span className="h-2 rounded bg-on-deep/20" />
                </div>
                <div className="flex-1 flex items-end gap-2">
                  <span className="fs-bar flex-1 h-[80%] rounded bg-piece-sky" />
                  <span className="fs-bar flex-1 h-full rounded bg-piece-brick [animation-delay:.4s]" />
                  <span className="fs-bar flex-1 h-[65%] rounded bg-piece-sky [animation-delay:.8s]" />
                  <span className="fs-bar flex-1 h-[90%] rounded bg-on-deep-muted [animation-delay:1.2s]" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* How we work, on deep navy */}
      <section className="fs-deep fs-dots py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-14">
          <div data-reveal className="flex flex-col gap-3 max-w-3xl">
            <SectionLabel onDeep>How we work</SectionLabel>
            <h2 className="text-h1 text-on-deep">Evidence first. Change where the work happens. Results that last.</h2>
          </div>
          <div className="relative">
            <div aria-hidden="true" className="hidden md:block absolute left-9 right-9 top-9 h-0.5 bg-gradient-to-r from-piece-navy via-piece-sky to-piece-brick">
              <span className="fs-travel absolute -top-[5px] -ml-1.5 w-3 h-3 rounded-full bg-on-deep shadow-[0_0_18px_4px_rgb(var(--c-piece-sky)/0.8)]" />
            </div>
            <ol className="grid md:grid-cols-3 gap-10">
              {phases.map((p, i) => (
                <li key={p.phase} data-reveal style={{ "--d": `${i * 120}ms` } as React.CSSProperties} className="relative flex flex-col gap-3.5">
                  <span className="font-display w-[4.5rem] h-[4.5rem] rounded-full bg-deep-surface border border-on-deep/20 inline-flex items-center justify-center text-2xl text-on-deep">
                    {p.phase}
                  </span>
                  <h3 className="text-h3 text-on-deep">{p.title}</h3>
                  <p className="text-on-deep-muted">{p.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Lead consultant, editorial */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          <div data-reveal className="lg:col-span-5 relative max-w-md w-full mx-auto lg:mx-0">
            <Image
              src={principalConsultant.image}
              alt={`${principalConsultant.name}, ${principalConsultant.role}`}
              width={1024}
              height={1024}
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="w-full aspect-[4/5] object-cover object-top rounded-[2rem]"
            />
            <div className="absolute -right-3 sm:-right-6 bottom-8 rounded-2xl bg-bg shadow-lift px-5 py-4 flex flex-col">
              <span className="font-display text-base text-heading">{principalConsultant.name}</span>
              <span className="text-small text-muted">PMP · Lean Six Sigma Master Black Belt</span>
            </div>
          </div>
          <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties} className="lg:col-span-7 flex flex-col gap-5">
            <SectionLabel>Your lead consultant</SectionLabel>
            <h2 className="text-h1 text-heading">Practical experience. Transferable methods. Measurable improvement.</h2>
            <p className="text-lede text-muted">
              From London and Nokia to programs in Canada and assignments across 11 countries, Qadeer brings strategy, project
              management, Lean Six Sigma and digital transformation experience to every engagement.
            </p>
            <ul className="flex flex-wrap gap-2" aria-label="Credentials">
              {CREDENTIALS.map((c) => (
                <li key={c} className="text-small font-semibold px-3.5 py-2 rounded-full border border-line text-heading">{c}</li>
              ))}
            </ul>
            <Link href="/about" className="self-start font-semibold text-primary border-b-2 border-tint pb-0.5 hover:border-primary transition-colors">
              More about who we are →
            </Link>
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="pb-20 sm:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
            <div data-reveal className="flex items-end justify-between gap-4">
              <div className="flex flex-col gap-3">
                <SectionLabel>Blog</SectionLabel>
                <h2 className="text-h1 text-heading">Latest insights</h2>
              </div>
              <Link href="/blog" className="text-small font-semibold text-primary hover:underline underline-offset-4 shrink-0">All articles →</Link>
            </div>
            <ul className="grid md:grid-cols-3 gap-5">
              {posts.map((post, i) => (
                <li key={post.id} data-reveal style={{ "--d": `${i * 100}ms` } as React.CSSProperties}>
                  <Link href={`/blog/${post.slug}`} className="fs-lift group h-full flex flex-col overflow-hidden rounded-[1.5rem] border border-line bg-bg">
                    {post.coverImage ? (
                      // Cover images can come from any host the editor pastes, so they skip the optimiser.
                      <Image src={post.coverImage} alt={post.coverImageAlt || ""} width={800} height={450} unoptimized className="w-full aspect-[16/9] object-cover" />
                    ) : (
                      <span aria-hidden="true" className="fs-deep fs-dots block aspect-[16/9]" />
                    )}
                    <span className="flex flex-col gap-2.5 p-6 flex-1">
                      <span className="text-label uppercase text-accent">{post.category}</span>
                      <span className="text-h3 text-heading">{post.title}</span>
                      <span className="text-small text-muted mt-auto">{formatDate(post.publishedAt)} · {post.readTime}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
