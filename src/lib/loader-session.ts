const LOADER_KEY = "vista-loader-done";

export function hasLoaderPlayed(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return sessionStorage.getItem(LOADER_KEY) === "1";
  } catch {
    return false;
  }
}

export function markLoaderPlayed(): void {
  try {
    sessionStorage.setItem(LOADER_KEY, "1");
  } catch {
    /* private mode */
  }
}

export function clearLoaderSession(): void {
  try {
    sessionStorage.removeItem(LOADER_KEY);
  } catch {
    /* noop */
  }
}