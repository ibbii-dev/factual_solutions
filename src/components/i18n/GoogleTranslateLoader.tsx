"use client";

import { useEffect } from "react";
import { loadScript } from "@/lib/loadScript";

/**
 * Google Translate changes text nodes behind React's back. When React later
 * updates those nodes it can throw "Failed to execute 'removeChild'". This
 * small guard makes those calls safe while a machine translation is active.
 */
function patchDomForTranslation() {
  const w = window as unknown as { __fsDomPatched?: boolean };
  if (w.__fsDomPatched || typeof Node !== "function" || !Node.prototype) return;
  w.__fsDomPatched = true;

  const originalRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) return child;
    return originalRemoveChild.call(this, child) as T;
  };

  const originalInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(this: Node, newNode: T, referenceNode: Node | null): T {
    if (referenceNode && referenceNode.parentNode !== this) return newNode;
    return originalInsertBefore.call(this, newNode, referenceNode) as T;
  };
}

/** Loads Google Translate only for visitors who picked a machine-translated language. */
export default function GoogleTranslateLoader() {
  useEffect(() => {
    patchDomForTranslation();
    const w = window as unknown as {
      googleTranslateElementInit?: () => void;
      google?: { translate?: { TranslateElement: new (opts: object, id: string) => unknown } };
    };
    w.googleTranslateElementInit = () => {
      try {
        if (w.google?.translate) {
          new w.google.translate.TranslateElement(
            { pageLanguage: "en", includedLanguages: "ur,tr,es,fr,de,zh-CN", autoDisplay: false },
            "google_translate_element"
          );
        }
      } catch (e) {
        console.error("Translate init error:", e);
      }
    };
    loadScript(
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit",
      "google-translate-script"
    ).catch(() => {});
  }, []);

  return <div id="google_translate_element" className="hidden" aria-hidden="true" translate="no" />;
}
