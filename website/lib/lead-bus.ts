/**
 * Tiny client-side event bus that lets any component pre-fill the
 * service request form (e.g. clicking a Rescue Desk issue card sets
 * the problem category, clicking a path card sets the intent).
 * No dependencies, no context providers — just a CustomEvent.
 *
 * Prefills also persist to sessionStorage so they survive page
 * navigation (e.g. the homepage "fix-system" card → /rescue-desk):
 * the form replays and clears any stored prefill when it mounts.
 */
export type LeadPrefill = {
  /** matches PROBLEM_CATEGORIES slugs in lib/content.ts */
  issue?: string;
  /** matches SUPPORT_TYPES values in lib/content.ts */
  supportType?: string;
  /** pre-fills the free-text "anything else" field (e.g. a Scene
      Builder plan summary or triage result) */
  message?: string;
};

const EVENT = "ed:lead-prefill";
const STORAGE_KEY = "ed:lead-prefill";

export function prefillLeadForm(detail: LeadPrefill) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(detail));
  } catch {
    /* storage unavailable (private mode etc.) — live event still works */
  }
  window.dispatchEvent(new CustomEvent<LeadPrefill>(EVENT, { detail }));
}

export function onLeadPrefill(handler: (detail: LeadPrefill) => void) {
  const consume = (detail: LeadPrefill) => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
    handler(detail);
  };

  /* Replay a prefill stored before a cross-page navigation */
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) consume(JSON.parse(stored) as LeadPrefill);
  } catch {}

  const listener = (e: Event) => consume((e as CustomEvent<LeadPrefill>).detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
