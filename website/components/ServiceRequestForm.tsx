"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ImagePlus,
  Loader2,
  Send,
} from "lucide-react";
import {
  PROBLEM_CATEGORIES,
  SUPPORT_TYPES,
  SYSTEM_TYPES,
  TIMELINE_LEVELS,
  URGENCY_LEVELS,
} from "@/lib/content";
import { onLeadPrefill } from "@/lib/lead-bus";
import { SITE } from "@/lib/site";
import Reveal from "@/components/Reveal";

/* ============================================================
   GUIDED SERVICE REQUEST FORM
   3 steps: (1) system & issue → (2) support preference →
   (3) contact info. Issue cards and path cards pre-fill it.

   BACKEND HOOKUP — see submitLead() at the bottom of this file.
   Works today as a demo (logs the payload); swap in Formspree,
   HubSpot, HighLevel, Jobber, Airtable, or your own API there.
   ============================================================ */

type FormData = {
  name: string;
  phone: string;
  email: string;
  address: string;
  systemType: string;
  problemCategory: string;
  urgency: string;
  weInstalled: string;
  supportType: string;
  message: string;
};

const INITIAL: FormData = {
  name: "",
  phone: "",
  email: "",
  address: "",
  systemType: "",
  problemCategory: "",
  urgency: "",
  weInstalled: "",
  supportType: "",
  message: "",
};

const STEPS = ["Your system", "Support type", "Contact info"] as const;

/* Fields validated at each step */
const STEP_FIELDS: (keyof FormData)[][] = [
  ["systemType", "problemCategory", "urgency", "weInstalled"],
  ["supportType"],
  ["name", "phone", "email", "address"],
];

const LABELS: Record<keyof FormData, string> = {
  name: "Full name",
  phone: "Phone",
  email: "Email",
  address: "Home address or neighborhood",
  systemType: "What kind of system do you have?",
  problemCategory: "What do you need help with?",
  urgency: "How urgent is it?",
  weInstalled: "Did Electronic Dreams install this system?",
  supportType: "How would you like us to help?",
  message: "Anything else we should know?",
};

export default function ServiceRequestForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const panelRef = useRef<HTMLDivElement>(null);
  const didInteract = useRef(false);

  /* Listen for pre-fills from issue cards / path cards */
  useEffect(() => {
    return onLeadPrefill(({ issue, supportType, message }) => {
      setData((d) => ({
        ...d,
        ...(issue ? { problemCategory: issue } : {}),
        ...(supportType ? { supportType } : {}),
        ...(message ? { message } : {}),
      }));
      setStep(0);
      setStatus("idle");
    });
  }, []);

  /* Move focus to the panel when the step changes (skip initial render) */
  useEffect(() => {
    if (didInteract.current) panelRef.current?.focus();
  }, [step, status]);

  const set = (field: keyof FormData, value: string) => {
    setData((d) => ({ ...d, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  /* New-project requests skip the repair-only questions (what system
     do you have / did we install it) and get timeline instead of
     urgency — a new build has no system to diagnose. */
  const isNewProject = data.problemCategory === "new-project";
  const stepFields = (s: number): (keyof FormData)[] =>
    s === 0 && isNewProject ? ["problemCategory", "urgency"] : STEP_FIELDS[s];

  const validateStep = (s: number) => {
    const next: typeof errors = {};
    for (const field of stepFields(s)) {
      const value = data[field].trim();
      if (!value) next[field] = `Please provide ${LABELS[field].toLowerCase().replace(/\?$/, "")}.`;
      else if (field === "email" && !/^\S+@\S+\.\S+$/.test(value))
        next[field] = "That email doesn't look right — check for typos.";
      else if (field === "phone" && value.replace(/\D/g, "").length < 10)
        next[field] = "Please enter a 10-digit phone number.";
    }
    setErrors(next);
    if (Object.keys(next).length > 0) {
      // Focus the first invalid field for keyboard/screen-reader users
      const first = stepFields(s).find((f) => next[f]);
      if (first) document.getElementById(`field-${first}`)?.focus();
      return false;
    }
    return true;
  };

  const goNext = () => {
    didInteract.current = true;
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 2));
  };
  const goBack = () => {
    didInteract.current = true;
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(2)) return;
    setStatus("sending");
    try {
      await submitLead(data);
      setStatus("sent");
    } catch (err) {
      console.error("[Electronic Dreams] Lead submission failed:", err);
      setStatus("error");
    }
  };

  /* ---------- success state ---------- */
  if (status === "sent") {
    return (
      <FormShell>
        <div
          ref={panelRef}
          tabIndex={-1}
          role="status"
          className="flex flex-col items-center px-6 py-16 text-center outline-none"
        >
          <span className="grid size-16 place-items-center rounded-full bg-ok/10 text-ok">
            <CheckCircle2 className="size-8" aria-hidden />
          </span>
          <h3 className="mt-6 font-display text-2xl font-bold">Request received</h3>
          <p className="mt-3 max-w-md leading-relaxed text-ink-dim">
            Thanks, {data.name.split(" ")[0] || "neighbor"} — we&rsquo;ve got your{" "}
            details and we&rsquo;ll reach out within one business day with a
            plan (or a fix). Urgent issue? Call us at{" "}
            <a href={SITE.phoneHref} className="font-semibold text-signal">
              {SITE.phone}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => {
              setData(INITIAL);
              setStep(0);
              setStatus("idle");
            }}
            className="mt-8 text-sm font-semibold text-signal underline-offset-4 hover:underline"
          >
            Submit another request
          </button>
        </div>
      </FormShell>
    );
  }

  return (
    <FormShell>
      {/* Step indicator */}
      <ol className="flex items-center gap-2 border-b border-line/60 px-6 py-4 sm:px-8" aria-label="Form progress">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-2">
            <span
              aria-current={i === step ? "step" : undefined}
              className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                i < step
                  ? "bg-ok/15 text-ok"
                  : i === step
                    ? "bg-glow text-glow-ink"
                    : "bg-panel-2 text-ink-dim"
              }`}
            >
              {i < step ? <CheckCircle2 className="size-4" aria-hidden /> : i + 1}
            </span>
            <span
              className={`hidden text-xs font-medium sm:block ${
                i === step ? "text-ink" : "text-ink-dim"
              }`}
            >
              {i === 0 && isNewProject ? "Your project" : label}
            </span>
            {i < STEPS.length - 1 && <span className="h-px flex-1 bg-line" aria-hidden />}
          </li>
        ))}
      </ol>

      <form onSubmit={handleSubmit} noValidate>
        <div ref={panelRef} tabIndex={-1} className="px-6 py-8 outline-none sm:px-8">
          {/* ---------- STEP 1: system & issue ---------- */}
          {step === 0 && (
            <div className="grid gap-6">
              {/* Intent first — it decides which questions even apply */}
              <SelectField
                id="field-problemCategory"
                label={LABELS.problemCategory}
                value={data.problemCategory}
                onChange={(v) => {
                  const crossed =
                    (v === "new-project") !== (data.problemCategory === "new-project");
                  set("problemCategory", v);
                  // urgency options swap for new projects; clear a stale pick
                  if (crossed && data.urgency) set("urgency", "");
                }}
                error={errors.problemCategory}
                options={PROBLEM_CATEGORIES.map((c) => ({ value: c.slug, label: c.label }))}
                placeholder="Select the closest match…"
              />
              {!isNewProject && (
                <SelectField
                  id="field-systemType"
                  label={LABELS.systemType}
                  value={data.systemType}
                  onChange={(v) => set("systemType", v)}
                  error={errors.systemType}
                  options={SYSTEM_TYPES.map((s) => ({ value: s, label: s }))}
                  placeholder="Select your system…"
                />
              )}
              <RadioGroup
                idPrefix="field-urgency"
                label={isNewProject ? "When would you like to start?" : LABELS.urgency}
                value={data.urgency}
                onChange={(v) => set("urgency", v)}
                error={errors.urgency}
                options={isNewProject ? TIMELINE_LEVELS : URGENCY_LEVELS}
              />

              {/* Hottest leads shouldn't fill out forms — offer the phone */}
              {data.urgency === "emergency" && (
                <div
                  role="status"
                  className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-xl border border-glow/40 bg-glow/10 px-4 py-3 text-sm"
                >
                  <span className="font-semibold text-ink">System down right now?</span>
                  <span className="text-ink-dim">Skip the form —</span>
                  <a
                    href={SITE.phoneHref}
                    className="inline-flex items-center gap-1.5 font-semibold text-glow underline-offset-4 hover:underline"
                  >
                    call {SITE.phone}
                  </a>
                  <span className="text-ink-dim">({SITE.hours.split("·")[0].trim()})</span>
                </div>
              )}
              {!isNewProject && (
                <RadioGroup
                  idPrefix="field-weInstalled"
                  label={LABELS.weInstalled}
                  value={data.weInstalled}
                  onChange={(v) => set("weInstalled", v)}
                  error={errors.weInstalled}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No — someone else did" },
                    { value: "unsure", label: "Not sure" },
                  ]}
                  columns={3}
                />
              )}
            </div>
          )}

          {/* ---------- STEP 2: support preference ---------- */}
          {step === 1 && (
            <div className="grid gap-6">
              <RadioGroup
                idPrefix="field-supportType"
                label={LABELS.supportType}
                value={data.supportType}
                onChange={(v) => set("supportType", v)}
                error={errors.supportType}
                options={SUPPORT_TYPES}
              />

              <div>
                <label htmlFor="field-message" className="mb-2 block text-sm font-semibold">
                  {LABELS.message}{" "}
                  <span className="font-normal text-ink-dim">(optional)</span>
                </label>
                <textarea
                  id="field-message"
                  rows={4}
                  value={data.message}
                  onChange={(e) => set("message", e.target.value)}
                  placeholder="e.g. The theater lost sound after a storm last Tuesday. Receiver is a Denon, system was installed around 2019…"
                  className="w-full rounded-xl border border-line bg-night px-4 py-3 text-base placeholder:text-ink-dim/60 focus:border-signal"
                />
                <p className="mt-1.5 text-xs text-ink-dim">
                  The more detail you share, the faster we can fix it — often
                  without a truck roll.
                </p>
              </div>

              {/* Photo/video upload placeholder.
                  TODO: wire to your storage (S3, Uploadthing, Formspree
                  attachments…) — for now it's a visual placeholder that
                  sets expectations without a backend. */}
              <div>
                <span className="mb-2 block text-sm font-semibold">
                  Photos or video{" "}
                  <span className="font-normal text-ink-dim">(optional — coming soon)</span>
                </span>
                <div
                  aria-disabled
                  className="flex items-center gap-3 rounded-xl border border-dashed border-line bg-night/60 px-4 py-5 text-ink-dim opacity-70"
                >
                  <ImagePlus className="size-5 shrink-0" aria-hidden />
                  <p className="text-sm leading-snug">
                    A photo of your equipment rack or an error screen helps us
                    diagnose faster. Uploads launch soon — for now, we&rsquo;ll
                    request photos by text after you submit.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ---------- STEP 3: contact ---------- */}
          {step === 2 && (
            <div className="grid gap-6 sm:grid-cols-2">
              <TextField
                id="field-name"
                label={LABELS.name}
                value={data.name}
                onChange={(v) => set("name", v)}
                error={errors.name}
                autoComplete="name"
              />
              <TextField
                id="field-phone"
                label={LABELS.phone}
                type="tel"
                value={data.phone}
                onChange={(v) => set("phone", v)}
                error={errors.phone}
                autoComplete="tel"
                placeholder="(713) 555-0134"
              />
              <TextField
                id="field-email"
                label={LABELS.email}
                type="email"
                value={data.email}
                onChange={(v) => set("email", v)}
                error={errors.email}
                autoComplete="email"
                className="sm:col-span-2"
              />
              <TextField
                id="field-address"
                label={LABELS.address}
                value={data.address}
                onChange={(v) => set("address", v)}
                error={errors.address}
                autoComplete="street-address"
                placeholder="e.g. 1234 Heights Blvd, Houston 77008 — or just 'Katy'"
                className="sm:col-span-2"
              />
              <p className="text-xs leading-relaxed text-ink-dim sm:col-span-2">
                We only use your info to respond to this request. No spam, no
                selling your data.
              </p>
            </div>
          )}
        </div>

        {/* ---------- nav buttons ---------- */}
        <div className="flex items-center justify-between gap-3 border-t border-line/60 px-6 py-5 sm:px-8">
          {step > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-ink-dim transition-colors hover:text-ink"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back
            </button>
          ) : (
            <span />
          )}

          {status === "error" && (
            <p role="alert" className="w-full text-sm text-danger">
              Something went wrong sending your request. Please try again, or
              call us at{" "}
              <a href={SITE.phoneHref} className="font-semibold text-signal">
                {SITE.phone}
              </a>
              — your answers are still saved here.
            </p>
          )}

          {step < 2 ? (
            <button
              type="button"
              onClick={goNext}
              className="glow-cta inline-flex min-h-12 items-center gap-2 rounded-xl bg-glow px-6 py-3 text-base font-semibold text-glow-ink transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Continue
              <ArrowRight className="size-4" aria-hidden />
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "sending"}
              className="glow-cta inline-flex min-h-12 items-center gap-2 rounded-xl bg-glow px-6 py-3 text-base font-semibold text-glow-ink transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="size-4" aria-hidden />
                  Send my request
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </FormShell>
  );
}

/* ---------- shell ---------- */
function FormShell({ children }: { children: React.ReactNode }) {
  return (
    <section
      aria-labelledby="service-request-heading"
      className="border-t border-line/60 bg-abyss/50 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-3">Get help now</p>
          <h2 id="service-request-heading" className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Tell us what&rsquo;s going on
          </h2>
          <p className="mt-4 text-ink-dim">
            Three quick steps. We&rsquo;ll identify the issue, route you to the
            right support option, and only escalate to a technician when one is
            actually needed.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-panel shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            {children}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- field primitives ---------- */

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm font-medium text-danger">
      {error}
    </p>
  );
}

function TextField({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  placeholder,
  className = "",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label} <span aria-hidden className="text-glow">*</span>
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`min-h-12 w-full rounded-xl border bg-night px-4 py-3 text-base placeholder:text-ink-dim/60 focus:border-signal ${
          error ? "border-danger" : "border-line"
        }`}
      />
      <FieldError id={`${id}-error`} error={error} />
    </div>
  );
}

function SelectField({
  id,
  label,
  value,
  onChange,
  error,
  options,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label} <span aria-hidden className="text-glow">*</span>
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`min-h-12 w-full appearance-none rounded-xl border bg-night px-4 py-3 text-base focus:border-signal ${
          error ? "border-danger" : "border-line"
        } ${value ? "text-ink" : "text-ink-dim/60"}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="text-ink">
            {o.label}
          </option>
        ))}
      </select>
      <FieldError id={`${id}-error`} error={error} />
    </div>
  );
}

function RadioGroup({
  idPrefix,
  label,
  value,
  onChange,
  error,
  options,
  columns = 2,
}: {
  idPrefix: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  options: { value: string; label: string }[];
  columns?: 2 | 3;
}) {
  return (
    <fieldset aria-describedby={error ? `${idPrefix}-error` : undefined}>
      <legend className="mb-2 block text-sm font-semibold">
        {label} <span aria-hidden className="text-glow">*</span>
      </legend>
      <div className={`grid gap-2 ${columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
        {options.map((o, i) => (
          <label
            key={o.value}
            className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
              value === o.value
                ? "border-glow/60 bg-glow/10 text-ink"
                : "border-line bg-night text-ink-dim hover:border-line hover:text-ink"
            }`}
          >
            <input
              id={i === 0 ? idPrefix : undefined}
              type="radio"
              name={idPrefix}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="size-4 accent-[var(--color-glow)]"
            />
            {o.label}
          </label>
        ))}
      </div>
      <FieldError id={`${idPrefix}-error`} error={error} />
    </fieldset>
  );
}

/* ============================================================
   BACKEND HOOKUP — Formspree.

   Set NEXT_PUBLIC_FORMSPREE_ID in .env.local (see the note there):
   it's the 8-character ID from your form's endpoint URL,
   https://formspree.io/f/<THIS PART>. Without it the form runs in
   demo mode (logs the lead, delivers nothing) so dev still works.

   To move to HubSpot / HighLevel / Jobber / a custom API later:
   create app/api/lead/route.ts (keys stay server-side) and POST
   there from here instead.
   ============================================================ */
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

async function submitLead(payload: FormData) {
  if (!FORMSPREE_ID) {
    console.warn(
      "[Electronic Dreams] NEXT_PUBLIC_FORMSPREE_ID is not set — demo mode, lead NOT delivered:",
      payload,
    );
    await new Promise((r) => setTimeout(r, 900));
    return;
  }
  const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      ...payload,
      _subject: `Service request — ${payload.name} (${payload.urgency || "no urgency set"})`,
    }),
  });
  if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
}
