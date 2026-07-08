import { ChevronDown } from "lucide-react";
import { FAQS } from "@/lib/content";
import Reveal from "@/components/Reveal";

/**
 * FAQ — native <details> for zero-JS accessibility.
 * Also emits FAQPage JSON-LD for rich results in Google.
 */
export default function FAQ() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-20 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal className="text-center">
          <p className="eyebrow mb-3">Good questions</p>
          <h2 id="faq-heading" className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
        </Reveal>

        <div className="mt-10 space-y-3">
          {FAQS.map((faq, i) => (
            <Reveal key={faq.q} delay={Math.min(i * 40, 200)}>
              <details className="group rounded-2xl border border-line bg-panel open:border-signal/40 open:bg-panel-2">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 font-display text-base font-semibold [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown
                    className="size-5 shrink-0 text-ink-dim transition-transform group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="px-6 pb-5 text-sm leading-relaxed text-ink-dim">{faq.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
