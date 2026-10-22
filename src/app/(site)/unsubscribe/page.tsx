import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, MailX, XCircle } from "lucide-react";
import { verifyUnsubscribeToken } from "@/lib/newsletter";
import PageHeader from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "Unsubscribe", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

type Props = { searchParams: { e?: string; t?: string; status?: string } };

// Asks for a click before unsubscribing, so email link scanners can't unsubscribe people by opening the link.
export default function UnsubscribePage({ searchParams }: Props) {
  const email = (searchParams.e || "").trim().toLowerCase();
  const token = searchParams.t || "";
  const status = searchParams.status;
  const valid = Boolean(email && token && verifyUnsubscribeToken(email, token));

  let icon = <MailX className="w-6 h-6" aria-hidden="true" />;
  let title = "Unsubscribe from our newsletter";
  let body: React.ReactNode = null;

  if (status === "done") {
    icon = <CheckCircle2 className="w-6 h-6" aria-hidden="true" />;
    title = "You're unsubscribed";
    body = <p className="text-slate-600 dark:text-slate-300">You won&apos;t receive our newsletter any more. Changed your mind? You can sign up again at the bottom of any page.</p>;
  } else if (status === "invalid" || !valid) {
    icon = <XCircle className="w-6 h-6" aria-hidden="true" />;
    title = "This link isn't valid";
    body = (
      <p className="text-slate-600 dark:text-slate-300">
        Please use the unsubscribe link from your latest email, or write to{" "}
        <a href="mailto:contact@factual-solutions.com" className="text-navy dark:text-steel-light underline underline-offset-4">contact@factual-solutions.com</a>{" "}
        and we&apos;ll remove you.
      </p>
    );
  } else {
    body = (
      <form method="post" action={`/api/newsletter/unsubscribe`} className="space-y-4">
        <input type="hidden" name="e" value={email} />
        <input type="hidden" name="t" value={token} />
        <p className="text-slate-600 dark:text-slate-300">
          Stop sending the newsletter to <strong className="text-ink dark:text-white">{email}</strong>?
        </p>
        <button type="submit" className="btn-primary">Unsubscribe</button>
      </form>
    );
  }

  return (
    <div className="pb-20 sm:pb-24 text-ink dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader eyebrow="Newsletter" title={title} />
        <div className="max-w-lg mx-auto fs-card p-6 sm:p-8 space-y-4 text-center flex flex-col items-center">
          <span className="fs-icon bg-navy">{icon}</span>
          {body}
          <Link href="/" className="link-arrow text-sm text-navy dark:text-steel-light">Back to the website</Link>
        </div>
      </div>
    </div>
  );
}
