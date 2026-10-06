/**
 * Language handling.
 *
 *  - English and Arabic are served from the site's own hand-written content
 *    (no third-party script, instant switch, proper RTL).
 *  - Other languages are machine-translated with Google Translate, which is
 *    only downloaded for visitors who actually pick one of those languages.
 */
export const NATIVE_LANGS = ["en", "ar"] as const;
export type NativeLang = (typeof NATIVE_LANGS)[number];

export const MACHINE_LANGS = ["ur", "tr", "es", "fr", "de", "zh-CN"] as const;
export const RTL_LANGS = ["ar", "ur"];

export const LANG_STORAGE_KEY = "factual_lang_preference";
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
 * Runs before React hydrates (inlined in <head>) so the page is drawn in the
 * right direction from the first frame — no left-to-right flash for Arabic/Urdu.
 */
export const LANG_BOOT_SCRIPT = `(function(){try{
var m=document.cookie.match(/(?:^|;\\s*)googtrans=\\/[^/;]+\\/([^;]+)/g);
var mt=m?decodeURIComponent(m[m.length-1].split('/').pop()):'';
var s=localStorage.getItem('${LANG_STORAGE_KEY}');
if(mt==='ar'){s='ar';mt='';localStorage.setItem('${LANG_STORAGE_KEY}','ar');}
var l=(mt&&mt!=='en')?mt:(s==='ar'?'ar':'en');
var d=document.documentElement;d.lang=l;d.dir=(l==='ar'||l==='ur')?'rtl':'ltr';if(window.IntersectionObserver&&!matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('fs-motion');
}catch(e){}})();`;
