export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "vista-theme";

export const themeColors = {
  dark: "#0a0a0c",
  light: "#f5f0e6",
} as const;

const THEME_TRANSITION_MS = 400;

export function isTheme(value: string | null | undefined): value is Theme {
  return value === "dark" || value === "light";
}

/** Read theme from the live DOM (class + storage). */
export function getTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  if (document.documentElement.classList.contains("dark")) return "dark";
  const attr = document.documentElement.getAttribute("data-theme");
  if (isTheme(attr)) return attr;
  return getStoredTheme();
}

export function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "dark";
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (isTheme(stored)) return stored;
  } catch {
    /* localStorage unavailable */
  }
  return "dark";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;

  root.classList.toggle("dark", theme === "dark");
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;

  const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
  if (meta) {
    meta.content = themeColors[theme];
  }
}

export function setTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* localStorage unavailable */
  }
  applyTheme(theme);
  pulseThemeTransition();
}

export function toggleTheme(): Theme {
  const next: Theme = getTheme() === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}

export function pulseThemeTransition() {
  const root = document.documentElement;
  root.classList.add("theme-animate");
  window.setTimeout(() => {
    root.classList.remove("theme-animate");
  }, THEME_TRANSITION_MS + 50);
}

/** Runs before paint — sets class + data-theme from localStorage. */
export const themeInitScript = `(function(){try{var k='${THEME_STORAGE_KEY}',t=localStorage.getItem(k),r=document.documentElement,d=t!=='light';r.classList.toggle('dark',d);r.setAttribute('data-theme',d?'dark':'light');r.style.colorScheme=d?'dark':'light';}catch(e){document.documentElement.classList.add('dark');document.documentElement.setAttribute('data-theme','dark');}})();`;