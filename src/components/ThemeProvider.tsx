/** @format */

"use client";

import { createContext, useContext, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

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

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeProviderContext);
