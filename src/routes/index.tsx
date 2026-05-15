import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedCars } from "@/components/FeaturedCars";
import { Collections } from "@/components/Collections";
import { CategorySection } from "@/components/CategorySection";
import { NewArrivals } from "@/components/NewArrivals";
import { About } from "@/components/About";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import { SearchResults } from "@/components/SearchResults";
import { useSearch } from "@/context/SearchContext";
import heroCar from "@/assets/hero-car.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hotwheelz — Shop Premium Die-Cast Cars" },
      {
        name: "description",
        content:
          "Shop the official Hotwheelz drop: classic muscle, futuristic supercars, and rare limited-edition collectibles. Fast checkout, free shipping over $50.",
      },
      { property: "og:title", content: "Hotwheelz — Shop Premium Die-Cast Cars" },
      {
        property: "og:description",
        content: "Classic muscle, supercars, and rare limited collectibles. Shop the drop.",
      },
      { property: "og:url", content: "https://hotwheelz.lovable.app/" },
    ],
    links: [
      { rel: "canonical", href: "https://hotwheelz.lovable.app/" },
      { rel: "preload", as: "image", href: heroCar, fetchpriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Hotwheelz",
          url: "https://hotwheelz.lovable.app/",
          description:
            "Premium die-cast cars and racing tracks — classics, supercars, and rare limited editions.",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Hotwheelz",
          url: "https://hotwheelz.lovable.app/",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { isActive } = useSearch();

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <SearchResults />
      {!isActive && (
        <>
          <FeaturedCars />
          <Collections />
          <CategorySection
            id="fast-furious"
            eyebrow="Saga Collection"
            title="Fast &"
            highlight="Furious"
            description="The full diecast saga — Brian's Supra, Dom's Charger, Han's RX-7 and more. Heavy metal bodies, chrome wheels, rubber tires."
            category="Fast & Furious"
          />
          <CategorySection
            id="classics"
            eyebrow="Heritage"
            title="Classic"
            highlight="Muscle"
            description="Chrome-trimmed icons from the golden age. Built to be displayed and driven."
            category="Classic"
          />
          <CategorySection
            id="supercars"
            eyebrow="Future"
            title="Modern"
            highlight="Supercars"
            description="Aero-tuned hypercars with razor-sharp lines and premium die-cast finishes."
            category="Supercar"
            bg="bg-secondary/30"
          />
          <CategorySection
            id="track"
            eyebrow="Race Day"
            title="Track &"
            highlight="Rally"
            description="Formula racers, WRC rally legends, JDM tuners, and lifted off-road beasts."
            category="Track"
          />
          <CategorySection
            id="limited"
            eyebrow="Rare"
            title="Limited"
            highlight="Edition"
            description="Numbered, hand-finished, never restocked. For serious collectors only."
            category="Limited"
            bg="bg-secondary/30"
          />
          <NewArrivals />
          <About />
        </>
      )}
      <Newsletter />
      <Footer />
    </main>
  );
}
