import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { contactLinks } from "@/data/navigation";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Factual Solutions collects, uses and protects personal information on factual-solutions.com.",
  path: "/privacy",
});

// Keep this in step with what the site actually does (forms, sign-in, cookies, providers).
const UPDATED = "22 October 2026";

const h2 = "text-xl sm:text-2xl font-bold font-display text-ink dark:text-white";
const p = "text-[15px] sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed";
const li = "text-[15px] sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed";

export default function PrivacyPage() {
  return (
    <div className="pb-20 sm:pb-24 text-ink dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          crumbs={[{ name: "Home", href: "/" }, { name: "Privacy Policy", href: "/privacy" }]}
          eyebrow="Legal"
          title="Privacy Policy"
          lede={`How we collect, use and protect your information. Last updated ${UPDATED}.`}
        />

        <article className="max-w-3xl mx-auto fs-card p-6 sm:p-10 space-y-8">
          <section className="space-y-3">
            <h2 className={h2}>Who we are</h2>
            <p className={p}>
              Factual Solutions (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a management consulting, training and ERP &amp; digital
              transformation firm based in Lahore, Pakistan. This policy explains how we handle personal information when you use
              factual-solutions.com. Questions can be sent to{" "}
              <a href={contactLinks.emailHref} className="text-navy dark:text-steel-light underline underline-offset-4">{contactLinks.email}</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>What we collect</h2>
            <ul className="list-disc ps-5 space-y-2">
              <li className={li}><strong>Contact form:</strong> your name, work email, and optionally company, phone number, the service you are interested in and your message.</li>
              <li className={li}><strong>Newsletter:</strong> your email address.</li>
              <li className={li}><strong>Blog comments:</strong> your name, email address and comment. Your name and comment are shown publicly on the article; your email address is never shown.</li>
              <li className={li}><strong>Client sign-in (Google):</strong> your name, email address and profile picture from your Google account, so you can see your inquiries and our replies. We do not receive your Google password.</li>
              <li className={li}><strong>Technical data:</strong> your IP address is used briefly, in a one-way scrambled (hashed) form, to limit repeated form submissions and protect the site against spam.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>How we use it</h2>
            <ul className="list-disc ps-5 space-y-2">
              <li className={li}>To reply to your inquiry and arrange consultations.</li>
              <li className={li}>To send the newsletter you signed up for. You can ask us to remove you at any time.</li>
              <li className={li}>To publish your blog comment and let our team moderate comments.</li>
              <li className={li}>To show signed-in clients their own inquiries and our replies.</li>
              <li className={li}>To keep the website secure and free of spam.</li>
            </ul>
            <p className={p}>We do not sell your personal information and we do not use it for advertising.</p>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>Services we use</h2>
            <p className={p}>We rely on a small number of trusted providers to run the website:</p>
            <ul className="list-disc ps-5 space-y-2">
              <li className={li}><strong>Vercel</strong> hosts the website.</li>
              <li className={li}><strong>MongoDB Atlas</strong> stores inquiries, subscribers, comments and published content.</li>
              <li className={li}><strong>Resend</strong> sends emails from the website, such as inquiry notifications and our replies.</li>
              <li className={li}><strong>Google</strong> provides reCAPTCHA (spam protection on the contact form), Google sign-in and, if you choose another language, Google Translate.</li>
              <li className={li}><strong>WhatsApp</strong> (Meta) if you choose to message us through the WhatsApp button.</li>
            </ul>
            <p className={p}>These providers process data on our behalf and may store it outside Pakistan. Each is bound by its own privacy and security commitments.</p>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>Cookies and local storage</h2>
            <p className={p}>
              We use only what the site needs to work. There are no advertising or tracking cookies. When you first visit, a banner
              asks whether you accept Google&rsquo;s cookies; you can change your choice at any time with &ldquo;Cookie settings&rdquo; at the
              bottom of every page.
            </p>
            <ul className="list-disc ps-5 space-y-2">
              <li className={li}><strong>fs_client:</strong> keeps you signed in to the client portal (only if you sign in).</li>
              <li className={li}><strong>fs_admin:</strong> keeps our staff signed in to the admin panel.</li>
              <li className={li}><strong>googtrans:</strong> remembers the language you chose.</li>
              <li className={li}><strong>fs_consent:</strong> remembers your cookie choice (6 months).</li>
              <li className={li}><strong>fs-theme</strong> and <strong>fs-subscribe</strong> (local storage): remember light or dark mode, and whether you have seen or answered the newsletter invitation.</li>
            </ul>
            <p className={p}>
              Only if you accept: Google reCAPTCHA (spam protection on the contact form), Google sign-in and Google Translate set
              Google&rsquo;s own cookies. If you decline, they stay switched off, and the site asks before using one of them.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>How long we keep it</h2>
            <p className={p}>
              We keep inquiries for as long as needed to serve you and for our business records, newsletter addresses until you
              unsubscribe, and comments while the article is published. You can ask us to delete your information at any time.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>Your choices and rights</h2>
            <p className={p}>
              You can ask us to see, correct or delete the personal information we hold about you, or to stop sending you emails.
              Email{" "}
              <a href={contactLinks.emailHref} className="text-navy dark:text-steel-light underline underline-offset-4">{contactLinks.email}</a>{" "}
              and we will respond within 30 days. If you signed in with Google, you can also remove our access at any time from
              your Google Account under &ldquo;Third-party apps &amp; services&rdquo;.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>Security</h2>
            <p className={p}>
              The site is served over HTTPS, sign-ins are verified on our server, and access to stored data is limited to our team.
              No method of transmission or storage is completely secure, but we work to protect your information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className={h2}>Changes to this policy</h2>
            <p className={p}>
              We may update this policy when our services change. The date at the top shows the latest version. See also our{" "}
              <Link href="/terms" className="text-navy dark:text-steel-light underline underline-offset-4">Terms of Use</Link>.
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
