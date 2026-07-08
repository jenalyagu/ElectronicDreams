import { Star } from "lucide-react";
import { GOOGLE_RATING, REVIEWS } from "@/lib/content";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/fx/TiltCard";

/**
 * GOOGLE REVIEWS — social proof near the lead form (the CRO audit's
 * top on-page gap). Renders NOTHING until real reviews are pasted
 * into REVIEWS in lib/content.ts — never ship placeholder
 * testimonials. Aggregate badge appears once GOOGLE_RATING is set.
 */

function Stars({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden
          className={`size-4 ${i < Math.round(n) ? "fill-glow text-glow" : "text-line"}`}
        />
      ))}
    </span>
  );
}

export default function Reviews() {
  if (REVIEWS.length === 0) return null;

  return (
    <section aria-labelledby="reviews-heading" className="border-y border-line/60 bg-abyss/50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-3">Houston homeowners on Google</p>
          <h2 id="reviews-heading" className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Take their word for it
          </h2>
          {GOOGLE_RATING && (
            <a
              href={GOOGLE_RATING.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-3 rounded-full border border-line bg-panel px-5 py-2.5 transition-colors hover:border-glow/40"
            >
              <Stars n={GOOGLE_RATING.stars} />
              <span className="text-sm font-semibold">{GOOGLE_RATING.stars.toFixed(1)}</span>
              <span className="text-sm text-ink-dim">
                · {GOOGLE_RATING.count} Google reviews
              </span>
            </a>
          )}
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {REVIEWS.slice(0, 6).map((review, i) => (
            <Reveal key={review.name + i} delay={(i % 3) * 80} className="h-full">
              <TiltCard className="h-full rounded-2xl">
                <figure className="flex h-full flex-col rounded-2xl border border-line bg-panel p-7">
                  <Stars n={review.stars} />
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink-dim">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 border-t border-line/60 pt-4">
                    <p className="text-sm font-semibold">{review.name}</p>
                    {review.detail && (
                      <p className="mt-0.5 text-xs text-ink-dim">{review.detail}</p>
                    )}
                  </figcaption>
                </figure>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
