import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { contactLinks } from "@/data/navigation";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: "The terms for using factual-solutions.com, including blog comments and the client portal.",
  path: "/terms",
});

const UPDATED = "22 October 2026";

const h2 = "text-xl sm:text-2xl font-bold font-display text-ink dark:text-white";
const p = "text-[15px] sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed";
const li = "text-[15px] sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed";

export default function TermsPage() {
  return (
    <div className="pb-20 sm:pb-24 text-ink dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          crumbs={[{ name: "Home", href: "/" }, { name: "Terms of Use", href: "/terms" }]}
          eyebrow="Legal"
          title="Terms of Use"
          lede={`The rules for using this website. Last updated ${UPDATED}.`}
        />

        <article className="max-w-3xl mx-auto fs-card p-6 sm:p-10 space-y-8">
          <section className="space-y-3">
            <h2 className={h2}>About these terms</h2>
            <p className={p}>
              By using factual-solutions.com you agree to these terms. The website is operated by Factual Solutions, Lahore,
              Pakistan. If you do not agree, please do not use the site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>Information on this site</h2>
            <p className={p}>
              Articles, case studies and other content are provided for general information. They are not professional advice for
              your specific situation. Consulting, training and implementation services are provided under a separate written
              agreement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>Blog comments</h2>
            <p className={p}>When you comment, you agree to:</p>
            <ul className="list-disc ps-5 space-y-2">
              <li className={li}>keep it respectful and relevant to the article;</li>
              <li className={li}>not post spam, advertising, links, or anything unlawful, abusive or misleading;</li>
              <li className={li}>not share other people&rsquo;s personal information.</li>
            </ul>
            <p className={p}>We may hide or delete any comment at our discretion. You remain responsible for what you post.</p>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>Client portal</h2>
            <p className={p}>
              Signing in with Google lets you see the inquiries sent from your email address and our replies. Keep access to your
              Google account secure, and tell us if you notice anything unexpected in your portal.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>Intellectual property</h2>
            <p className={p}>
              The Factual Solutions name, logo, text, graphics and design belong to Factual Solutions. You may share links to our
              pages and quote short extracts with credit, but you may not copy or republish content without our permission.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>Acceptable use</h2>
            <p className={p}>
              Do not try to break, overload or gain unauthorised access to the website, its admin area or its data, or use
              automated tools to submit forms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>Liability</h2>
            <p className={p}>
              We work to keep the website accurate and available, but it is provided &ldquo;as is&rdquo;. To the extent the law
              allows, we are not liable for losses arising from use of the website or reliance on its content.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>Privacy, changes and contact</h2>
            <p className={p}>
              Our <Link href="/privacy" className="text-navy dark:text-steel-light underline underline-offset-4">Privacy Policy</Link>{" "}
              explains how we handle personal information. We may update these terms; the date at the top shows the latest
              version. These terms are governed by the laws of Pakistan. Questions:{" "}
              <a href={contactLinks.emailHref} className="text-navy dark:text-steel-light underline underline-offset-4">{contactLinks.email}</a>.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
