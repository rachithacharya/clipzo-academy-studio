import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import clipzoHero from "@/assets/clipzo-hero.png";
import { brands, type BrandKey } from "@/lib/brands";
import { BrandLogo, Chatbot, LoadingMark, SiteFooter } from "@/components/site-shell";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Clipzo - One Brand. Three Creative Worlds." },
    { name: "description", content: "Explore Clipzo content production, Clipzo Academy, and Clipzo Studio." },
    { property: "og:title", content: "Clipzo - One Brand. Three Creative Worlds." },
    { property: "og:description", content: "Create, learn, and produce across three connected creative worlds." },
    { property: "og:url", content: "/" },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/" }] }),
  component: Index,
});

const order: BrandKey[] = ["clipzo", "academy", "studio"];

function Index() {
  return <div data-brand="clipzo" className="theme-frame home-frame">
    <LoadingMark brand="clipzo" />
    <header className="home-nav"><BrandLogo brand="clipzo" /><span>Creative universe · Mangalore</span></header>
    <main>
      <section className="home-hero">
        <img src={clipzoHero} alt="Clipzo creator filming a cinematic reel in the studio" className="home-hero-image" />
        <div className="home-hero-image-shade" />
        <p className="kicker">Three worlds. One creative engine.</p>
        <h1>One Brand.<br /><em>Three Creative Worlds.</em></h1>
        <p>Step inside a connected house for creative production, practical learning, and a professional studio floor.</p>
        <a href="#worlds" className="scroll-cue">Explore the worlds <span>↓</span></a>
      </section>
      <section id="worlds" className="worlds">
        {order.map((key, index) => {
          const item = brands[key];
          return <article key={key} data-brand={key} className="world-panel">
            <img src={item.image} alt={item.imageAlt} width={1280} height={800} loading="lazy" />
            <div className="world-shade" />
            <div className="world-copy">
              <span className="world-number">0{index + 1}</span>
              <BrandLogo brand={key} />
              <h2>{item.name}</h2>
              <p className="world-strapline">{item.strapline}</p>
              <p className="world-description">{item.description}</p>
              <Button asChild variant="brand" size="lg"><Link to={`/${key}`}>Enter {key === "clipzo" ? "Clipzo" : key === "academy" ? "Academy" : "Studio"} <ArrowRight /></Link></Button>
            </div>
            <div className="world-glass"><span>Inside this world</span>{item.features.slice(0, 3).map((feature, featureIndex) => <p key={feature}><b>0{featureIndex + 1}</b>{feature}</p>)}</div>
          </article>;
        })}
      </section>
    </main>
    <SiteFooter /><Chatbot brand="clipzo" />
  </div>;
}