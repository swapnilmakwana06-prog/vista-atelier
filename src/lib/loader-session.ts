/** In-memory guard — prevents duplicate runs during the same page load only. */
let loaderCompletedThisPage = false;

export function hasLoaderPlayed(): boolean {
  return loaderCompletedThisPage;
}

export function markLoaderPlayed(): void {
  loaderCompletedThisPage = true;
}

export function clearLoaderSession(): void {
  loaderCompletedThisPage = false;
}