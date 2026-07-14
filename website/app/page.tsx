import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ChoosePath from "@/components/ChoosePath";
// import SupportSystem from "@/components/SupportSystem"; // hidden for now
// import Services from "@/components/Services"; // hidden for now (film covers "What we do")
// import WhyCall from "@/components/WhyCall"; // hidden for now
// import ProjectCTA from "@/components/ProjectCTA"; // retired — its copy + CTA moved into the Hero
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
// Below-the-fold heavy client sections — code-split and mounted on scroll
// (see components/LazySections.tsx) to keep them off the first-load path.
import {
  CinematicJourneyLazy,
  SceneBuilderLazy,
  ServiceRequestFormLazy,
} from "@/components/LazySections";

/**
 * HOMEPAGE — section order is the conversion funnel:
 * interactive panel hero → trust → split paths → scroll film →
 * scene builder → reviews → FAQ → lead form → footer.
 * Rescue Desk and Support Plans live on their own pages
 * (/rescue-desk, /support-plans).
 * Reorder by moving components; each is self-contained.
 */
export default function HomePage() {
  return (
    <>
      <Header />

      <main id="main">
        <Hero />
        <TrustBar />
        <ChoosePath />
        <CinematicJourneyLazy />
        {/* <SupportSystem /> — hidden for now */}
        {/* <Services /> — hidden for now (film covers "What we do") */}
        {/* <WhyCall /> — hidden for now */}
        <SceneBuilderLazy />
        <Reviews />
        <FAQ />
        <ServiceRequestFormLazy />
      </main>

      <Footer />
    </>
  );
}
