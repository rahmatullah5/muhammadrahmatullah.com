/** @format */

"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

type Origin = { x: number; y: number };

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: (origin?: Origin) => void;
};

/** Fired on every toggle; ThemeToast listens and tells a joke. */
export const THEME_EVENT = "theme:switched";

export const THEME_STORAGE_KEY = "vite-ui-theme";

/**
 * Inline script run before paint so the correct theme class is applied
 * on first render (no flash). Also marks <html> with `js` so scroll-reveal
 * styles only hide content when JavaScript is available.
 */
export const themeInitScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.classList.add(t)}catch(e){d.classList.add('light')}})();`;

const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: "light",
  setTheme: () => null,
  toggleTheme: () => null,
});

function subscribe(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => mo.disconnect();
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // The <html> class (set by themeInitScript) is the source of truth.
  const theme = useSyncExternalStore<Theme>(
    subscribe,
    () =>
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    () => "light",
  );

  const setTheme = (next: Theme) => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {}
  };

  /**
   * Switch theme with a circular wipe growing from `origin` (the toggle
   * button). Uses the View Transitions API; falls back to an instant swap.
   */
  const toggleTheme = (origin?: Origin) => {
    const next: Theme = theme === "light" ? "dark" : "light";
    window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: next }));

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) {
      setTheme(next);
      return;
    }

    const x = origin?.x ?? window.innerWidth - 40;
    const y = origin?.y ?? 40;
    const r = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const vt = document.startViewTransition(() => setTheme(next));
    vt.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${r}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 750,
            easing: "cubic-bezier(0.7, 0, 0.2, 1)",
            pseudoElement: "::view-transition-new(root)",
          },
        );
      })
      .catch(() => {});
  };

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeProviderContext);
