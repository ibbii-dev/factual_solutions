/** Inject a third-party script once, on demand. Resolves when it has loaded. */
const pending: Record<string, Promise<void> | undefined> = {};

export function loadScript(src: string, id: string): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  const inflight = pending[id];
  if (inflight) return inflight;
  pending[id] = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(id) as HTMLScriptElement | null;
    if (existing) {
      if (existing.dataset.loaded === "true") return resolve();
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), { once: true });
      return;
    }
    const el = document.createElement("script");
    el.id = id;
    el.src = src;
    el.async = true;
    el.onload = () => {
      el.dataset.loaded = "true";
      resolve();
    };
    el.onerror = () => {
      delete pending[id];
      reject(new Error(`Failed to load ${src}`));
    };
    document.body.appendChild(el);
  });
  return pending[id] as Promise<void>;
}
