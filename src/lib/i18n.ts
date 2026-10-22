/**
 * Language handling (restored 2026-10-21).
 *
 *  - The site's own content is English.
 *  - Every other language, Arabic included, is machine-translated with Google Translate,
 *    which is only downloaded for visitors who pick one of those languages.
 *  - Arabic and Urdu switch the page to right-to-left.
 */
export const RTL_LANGS = ["ar", "ur"];
const COOKIE = "googtrans";

/** Reads the Google Translate target language from the cookie (handles duplicate cookies). */
export function readMachineLang(): string | null {
  if (typeof document === "undefined") return null;
  const matches = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/;]+\/([^;]+)/g);
  if (!matches) return null;
  const last = matches[matches.length - 1].split("/").pop() || "";
  const code = decodeURIComponent(last.trim());
  return code && code !== "en" ? code : null;
}

function domainVariants(): (string | null)[] {
  const host = window.location.hostname;
  const parts = host.split(".");
  const out: (string | null)[] = [null, host, `.${host}`];
  if (parts.length > 2) out.push(`.${parts.slice(-2).join(".")}`);
  return out;
}

export function setMachineLang(code: string) {
  clearMachineLang();
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `${COOKIE}=/en/${code}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

export function clearMachineLang() {
  for (const d of domainVariants()) {
    document.cookie = `${COOKIE}=; path=/; max-age=0${d ? `; domain=${d}` : ""}`;
  }
}

/**
 * Runs before React hydrates (inlined in <head>) so the page is drawn in the right
 * direction from the first frame: no left-to-right flash for Arabic or Urdu.
 */
export const LANG_BOOT_SCRIPT = `(function(){try{
var m=document.cookie.match(/(?:^|;\\s*)googtrans=\\/[^/;]+\\/([^;]+)/g);
var l=m?decodeURIComponent(m[m.length-1].split('/').pop()):'en';
if(!l)l='en';
var d=document.documentElement;d.lang=l;d.dir=(l==='ar'||l==='ur')?'rtl':'ltr';if(l!=='en')d.classList.add('fs-translated');
if(window.IntersectionObserver&&!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('fs-motion');
}catch(e){}})();`;
