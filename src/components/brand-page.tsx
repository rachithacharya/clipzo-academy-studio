import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Clock3, Globe2, Instagram, Mail, MapPin, Phone, Play, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { brands, type BrandKey } from "@/lib/brands";
import { BrandLogo, Enquiry, SiteFooter, SiteNav, ThemeFrame } from "@/components/site-shell";

export type BrandPageKey = "home" | "about" | "partner" | "videos" | "reels";

const pageCopy: Record<BrandPageKey, { eyebrow: string; title: string; description: string }> = {
  home: { eyebrow: "", title: "", description: "" },
  about: {
    eyebrow: "About us",
    title: "The people behind the creative work.",
    description: "We are a connected creative team built around clear ideas, careful craft, and relationships that last beyond one project.",
  },
  partner: {
    eyebrow: "Work with us",
    title: "Let’s make something people remember.",
    description: "Bring us into your next brief, campaign, class, or production. We’ll shape the right team and a clear way forward together.",
  },
  videos: {
    eyebrow: "Selected work",
    title: "Stories made to be watched again.",
    description: "A small window into the work, ideas, and moments being made inside this creative world.",
  },
  reels: {
    eyebrow: "Portfolio",
    title: "Reels made to move.",
    description: "Explore cinematic short-form work for creators, brands, weddings, and events.",
  },
};

const academyEnrollmentFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdI8Z66W6i1qANaTUujeEJebjsRHOUJV1Qs-twsO3j9WvrPZw/viewform?usp=sf_link";

function HomePage({ brand }: { brand: BrandKey }) {
  if (brand === "clipzo") return <ClipzoHome />;
  const data = brands[brand];
  return <>
    <section className="brand-hero">
        <img src={data.image} alt={data.imageAlt} width={1280} height={800} className="brand-hero-image" />
        <div className="brand-hero-shade" />
        <div className="brand-hero-copy">
          <BrandLogo brand={brand} className="hero-brand-logo" />
          <p className="kicker">{data.eyebrow}</p>
          <h1>{data.title}</h1>
          <p className="hero-description">{data.description}</p>
          <div className="hero-actions"><Button asChild variant="brand" size="lg"><a href={brand === "academy" ? "#academy-enrolment" : "#enquiry"}>{data.cta}</a></Button><Button asChild variant="glass" size="lg"><a href="#capabilities">Explore <ArrowDown /></a></Button></div>
        </div>
        <p className="hero-strapline">{data.strapline}</p>
    </section>
    <section id="capabilities" className="capability-section">
        {brand === "studio" ? <>
          <div className="section-heading"><div><p className="kicker">About Clipzo Studio</p><h2>Production spaces built for idea, craft, and impact.</h2></div><p>Clipzo Studio is a creative studio built around storytelling, visual production, and digital content. From photography, videography, podcast production, and brand storytelling to polished content experiences, we create work that feels cinematic, intentional, and memorable.</p></div>
          <div className="detail-grid studio-introduction-grid">
            <article><span>01</span><h3>Visual storytelling</h3><p>Creative work shaped around narratives, mood, movement, and a clear point of view that makes your brand feel alive.</p></article>
            <article><span>02</span><h3>Production flexibility</h3><p>Photography, videography, podcast production, and content production support designed to fit your brief and your timeline.</p></article>
            <article><span>03</span><h3>Creative momentum</h3><p>From concept to final delivery, we help teams move from idea to polished visual output without friction.</p></article>
          </div>
          <div className="studio-home-subsection">
            <div className="section-heading"><div><p className="kicker">Vision & Mission</p><h2>Turn good ideas into production value.</h2></div><p>We build creative systems that help brands and creators communicate with confidence, presence, and lasting recall.</p></div>
            <div className="detail-grid">
              <article><span>Vision</span><h3>Stories that last</h3><p>To become a trusted production partner for brands, founders, and creators who want strong, cinematic, story-led content.</p></article>
              <article><span>Mission</span><h3>Work that performs</h3><p>To produce thoughtful visual content that blends storytelling, production craft, and digital clarity with measurable creative impact.</p></article>
              <article><span>Approach</span><h3>Creative systems</h3><p>From photography to podcasts and polished visual storytelling, we turn ideas into content that is made to be seen and remembered.</p></article>
            </div>
          </div>
          <div className="studio-home-subsection">
            <div className="section-heading"><div><p className="kicker">Studio for rent</p><h2>Production-ready space for your next shoot.</h2></div><p>Book Clipzo Studio for product shoots, brand films, interviews, podcast recordings, social content, and small productions.</p></div>
            <div className="detail-grid">
              <article><span>01</span><h3>Creative studio rental</h3><p>Flexible booking for teams that need a polished environment and a professional backdrop.</p></article>
              <article><span>02</span><h3>Built for production</h3><p>Professional lighting, usable camera space, and clean visual framing for efficient shoots.</p></article>
              <article><span>03</span><h3>Ready when you are</h3><p>Bring your brief, team, and timeline into a space designed to move ideas into captured stories.</p></article>
            </div>
          </div>
          <div className="studio-home-subsection studio-home-gallery">
            <div className="section-heading"><div><p className="kicker">Studio preview</p><h2>Multiple angles. One cinematic setup.</h2></div><p>Preview the studio environment and imagine your shoot before you book.</p></div>
            <div className="studio-gallery-grid" aria-label="Clipzo Studio gallery preview">
              <figure className="studio-gallery-card studio-gallery-card-one"><img src={brands.studio.image} alt="Clipzo Studio front-angle production floor" /><figcaption>Front angle</figcaption></figure>
              <figure className="studio-gallery-card studio-gallery-card-two"><img src={brands.studio.image} alt="Clipzo Studio side-angle production floor" /><figcaption>Side view</figcaption></figure>
              <figure className="studio-gallery-card studio-gallery-card-three"><img src={brands.studio.image} alt="Clipzo Studio wide-angle studio setup" /><figcaption>Wide setup</figcaption></figure>
            </div>
          </div>
        </> : <>
          <div className="section-heading"><div><p className="kicker">Inside {data.room}</p><h2>Built for serious creative work.</h2></div><p>A focused experience shaped around the way creators actually learn, shoot, edit, and deliver.</p></div>
          <div className="capability-grid">{data.features.map((feature, index) => <article key={feature}><span>0{index + 1}</span><h3>{feature}</h3><Check /></article>)}</div>
          <div className="stat-line">{data.stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
        </>}
    </section>
    {brand === "academy" && <>
      <section className="detail-section academy-about-section">
        <div className="section-heading">
          <div>
            <p className="kicker">About Clipzo Academy</p>
            <h2>Learn with experience. Create with purpose.</h2>
          </div>
          <p>Clipzo Academy is a professional learning platform built for aspiring editors and creators. Powered by Clipzo’s real industry experience, the Academy focuses on practical editing skills, mentorship, and real project exposure.</p>
        </div>
        <div className="detail-grid studio-introduction-grid">
          <article>
            <span>About</span>
            <h3>Clipzo Academy</h3>
            <p>Built for creators who want to learn editing and storytelling through real-world practice, professional guidance, and portfolio-ready output.</p>
          </article>
          <article>
            <span>Growth</span>
            <h3>Practical skill</h3>
            <p>From beginner fundamentals to advanced concepts in Adobe After Effects, we help learners build confidence, creative direction, and real industry capability.</p>
          </article>
          <article>
            <span>Promise</span>
            <h3>Grow with Clipzo</h3>
            <p>Learn with experience. Create with purpose. Grow with Clipzo.</p>
          </article>
        </div>
      </section>
      <section className="detail-section studio-home-subsection">
        <div className="section-heading">
          <div>
            <p className="kicker">Vision & Mission</p>
            <h2>Build skill, confidence, and creative direction.</h2>
          </div>
          <p>We create a learning environment shaped around practical work, thoughtful feedback, and the habits that help students grow into real creative professionals.</p>
        </div>
        <div className="detail-grid">
          <article>
            <span>Vision</span>
            <h3>Next-generation creators</h3>
            <p>To build the next generation of skilled editors and creative professionals through practical learning and real industry experience.</p>
          </article>
          <article>
            <span>Mission</span>
            <h3>Practical skills that matter</h3>
            <p>To provide practical editing education, mentorship, real project exposure, and professional workflows that help students turn their passion for editing into a valuable skill.</p>
          </article>
          <article>
            <span>Purpose</span>
            <h3>Creative growth</h3>
            <p>We help students sharpen their skills, build their portfolio, and move toward a career with clarity and confidence.</p>
          </article>
        </div>
      </section>
      <section className="detail-section studio-home-subsection">
        <div className="section-heading">
          <div>
            <p className="kicker">Why learn here</p>
            <h2>Creative learning built around the real workflow.</h2>
          </div>
          <p>Every part of the Academy is designed to help students learn by creating, practising, and refining the craft that matters most in the industry.</p>
        </div>
        <div className="detail-grid">
          <article>
            <span>01</span>
            <h3>Industry-led learning</h3>
            <p>Students learn with the same creative thinking, workflow discipline, and production mindset used inside real client work.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Mentorship that matters</h3>
            <p>Feedback and guidance are built into the process so students improve with clarity and build strong creative habits early.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Portfolio-ready output</h3>
            <p>Each learner works toward practical results they can proudly present, use, and build on in their creative career.</p>
          </article>
        </div>
      </section>
    </>}
    {brand === "academy" && <section id="academy-enrolment" className="academy-enrolment">
      {/* <div className="academy-enrolment-copy">
        <p className="kicker">Enroll today</p>
        <h2>One Goal • One Decision • One Direction</h2>
        <p>Choose your path. Commit to your craft. The next step in your creative journey starts here.</p>
        <div className="academy-enrolment-actions">
          <Button asChild variant="brand" size="lg"><a href={academyEnrollmentFormUrl} target="_blank" rel="noreferrer">Open Google Form <ArrowUpRight /></a></Button>        </div>
      </div> */}
      {/* <div id="academy-form" className="academy-enrolment-form">
        <iframe src={`${academyEnrollmentFormUrl}&embedded=true`} title="Clipzo Academy enrollment form" loading="lazy">Loading the enrollment form...</iframe>
      </div> */}
    </section>}
    {brand === "academy" && <Enquiry brand="academy" />}
    {brand === "studio" && <Enquiry brand="studio" />}
    {brand === "academy" && <BrandContactSection brand="academy" />}
    {brand === "studio" && <BrandContactSection brand="studio" />}
    {brand !== "studio" && brand !== "academy" && <Enquiry brand={brand} />}
  </>;
}

const whatsappUrl = "https://wa.me/919591631027?text=Hi%20Clipzo%2C%20I%27d%20like%20to%20book%20a%20reel%20shoot";
const academyAddress = "Kelle Court Bld, 3rd Floor, P. M. Rao Road, Hampankatta, Mangaluru";
const studioAddress = "Kelle Court Bld, 3rd Floor, P. M. Rao Road, Hampankatta, Mangaluru";
const academyInstagramUrl = "https://www.instagram.com/clipzo_academy/?hl=en";
const studioInstagramUrl = "https://www.instagram.com/clipzo.in_";
const academyWhatsappUrl = "https://wa.me/919019348392?text=Hi%20Clipzo%20Academy%2C%20I%27d%20like%20to%20enquire%20about%20the%20course.";
const studioWhatsappUrl = "https://wa.me/919019348392?text=Hi%20Clipzo%20Studio%2C%20I%27d%20like%20to%20discuss%20a%20production%20project.";
const youtubeChannelId = "UCOfGYJgXItJTgmQQiQJYI7Q";
const youtubeChannelUrl = `https://www.youtube.com/channel/${youtubeChannelId}`;

function BrandContactSection({ brand }: { brand: BrandKey }) {
  const isAcademy = brand === "academy";
  const contact = isAcademy ? {
    kicker: "Your next creative step starts here.",
    headline: "Learn the craft. Build the work. Move forward with confidence.",
    phone: "+91 90193 48392",
    phoneHref: "tel:+919019348392",
    email: "clipzoacademy@gmail.com",
    emailHref: "mailto:clipzoacademy@gmail.com",
    instagram: "Instagram: clipzo_academy",
    instagramHref: academyInstagramUrl,
    website: "www.clipzo.in",
    websiteHref: "https://www.clipzo.in/academy",
    whatsappHref: academyWhatsappUrl,
    googleMapsHref: "https://www.google.com/maps/search/?api=1&query=Kelle+Court+Bld%2C+3rd+Floor%2C+P.+M.+Rao+Road%2C+Hampankatta%2C+Mangaluru",
  } : {
    kicker: "Your next production starts here.",
    headline: "We build stories that feel cinematic, clear, and unforgettable.",
    phone: "+91 90193 48392",
    phoneHref: "tel:+919019348392",
    email: "clipzostudio@gmail.com",
    emailHref: "mailto:clipzostudio@gmail.com",
    instagram: "Instagram: clipzo.in_",
    instagramHref: studioInstagramUrl,
    website: "www.clipzo.in",
    websiteHref: "https://www.clipzo.in/studio",
    whatsappHref: studioWhatsappUrl,
    googleMapsHref: "https://www.google.com/maps/search/?api=1&query=Kelle+Court+Bld%2C+3rd+Floor%2C+P.+M.+Rao+Road%2C+Hampankatta%2C+Mangaluru",
  };

  return <section className="clipzo-contact">
    <div>
      <p className="kicker">{contact.kicker}</p>
      <h2>{contact.headline}</h2>
      <Button asChild variant="brand" size="lg"><a href={contact.whatsappHref}>Book on WhatsApp <ArrowUpRight /></a></Button>
    </div>
    <address>
      <p><Phone /> <a href={contact.phoneHref}>{contact.phone}</a></p>
      <p><MapPin />Operating in Mangaluru.</p>
      <p><Mail /><a href={contact.emailHref}>{contact.email}</a></p>
      <p><Instagram /><a href={contact.instagramHref} target="_blank" rel="noreferrer">{contact.instagram}</a></p>
      <p><Globe2 /><a href={contact.websiteHref} target="_blank" rel="noreferrer">{contact.website}</a></p>
      <p><Clock3 />Monday–Saturday, 10:00 AM – 8:00 PM</p>
      <a href={contact.googleMapsHref} target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight /></a>
    </address>
  </section>;
}

export type YoutubeReel = { id: string; title: string; description: string; publishedAt: string; thumbnail: string; youtubeUrl: string };

const reelFeatures = [
  ["Pro Shooting", "Cinematic shots by trained reel specialists on location."],
  ["Instant Editing", "Trending cuts, transitions and captions edited in minutes."],
  ["10-Minute Delivery", "From shoot to delivery, reels arrive in your inbox within 10 minutes."],
  ["Trend Formulas", "Viral reel formats created by the Clipzo creator team."],
  ["Trained Reel Makers", "Every creator is trained in-house."],
  ["Time Tracking", "Watch shoot progress and know when your reels will arrive."],
];

const plans = [
  { name: "Basic Reel Making", price: "₹1,999", label: "Hourly plan", items: ["1 cinematic reel shot on the latest iPhone series", "1 hour shoot on location", "Extra time charged at ₹500 per hour", "Reel duration under 60 seconds", "Same-day delivery available on request"] },
  { name: "Basic Reel Making", price: "₹4,999", label: "Half-day plan", items: ["1 cinematic highlights reel shot on the latest iPhone series", "Whole event coverage", "Reel duration under 90 seconds", "Same-day delivery available on request", "One complimentary story edit"], popular: true },
  { name: "High-end Reel Making", price: "₹3,499", label: "Hourly plan", items: ["1 cinematic reel shot on the latest iPhone series", "1 hour shoot on location", "Extra time charged at ₹500 per hour", "High-end PC editing with Premiere Pro and After Effects", "Reel duration under 60 seconds"] },
  { name: "High-end Reel Making", price: "₹4,999", label: "Speed ramp plan", items: ["1 cinematic reel shot on the latest iPhone series", "2 hours shoot on location", "Extra time charged at ₹500 per hour", "High-end After Effects editing", "Reel duration under 60 seconds", "One complimentary story edit"] },
];

function planWhatsappUrl(plan: (typeof plans)[number]) {
  const message = [`Hi Clipzo, I would like to book this package:`, `${plan.name} - ${plan.label}`, `Price: ${plan.price}`, "What's included:", ...plan.items.map(item => `- ${item}`)].join("\n");
  return `https://wa.me/919591631027?text=${encodeURIComponent(message)}`;
}

function ProductionBrief() {
  function submitBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const message = [
      "Hi Clipzo,",
      `Name: ${String(form.get("name") ?? "")}`,
      `Email: ${String(form.get("email") ?? "")}`,
      `Project: ${String(form.get("project") ?? "")}`,
    ].join("\n");
    window.open(`https://wa.me/919591631027?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return <section id="enquiry" className="enquiry-band">
    <div><p className="kicker">Start here</p><h2>Tell us what you’re making.</h2><p>Share a few details. The right Clipzo team will get back to you on WhatsApp.</p></div>
    <form onSubmit={submitBrief}>
      <label htmlFor="clipzo-name">Name<input id="clipzo-name" name="name" autoComplete="name" required placeholder="Your name" /></label>
      <label htmlFor="clipzo-email">Email<input id="clipzo-email" name="email" type="email" autoComplete="email" required placeholder="you@email.com" /></label>
      <label className="form-wide" htmlFor="clipzo-project">Project<textarea id="clipzo-project" name="project" rows={3} required placeholder="Tell us about your Clipzo project..." /></label>
      <Button type="submit" variant="brand" size="lg" className="form-wide">Send to Enquiry <ArrowUpRight /></Button>
    </form>
  </section>;
}

const workflow = ["Book", "Shoot", "Edit", "Review", "Deliver"];

function ReelStrip({ fullPage = false, youtubeReels = [] }: { fullPage?: boolean; youtubeReels?: YoutubeReel[] }) {
  const [sourceCards, setSourceCards] = useState(youtubeReels);
  const [isLoading, setIsLoading] = useState(youtubeReels.length === 0);
  const videoCards = [...sourceCards, ...sourceCards];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const selectedVideo = selectedIndex === null ? null : videoCards[selectedIndex];
     const trackRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      setSourceCards(youtubeReels);
      setIsLoading(youtubeReels.length === 0);
    }, [youtubeReels]);

    useEffect(() => {
      let active = true;
      const refresh = async () => {
        try {
          const response = await fetch("/api/youtube-reels");
          if (!response.ok) return;
          const payload = await response.json() as { videos?: YoutubeReel[] };
          if (active && Array.isArray(payload.videos) && payload.videos.length > 0) setSourceCards(payload.videos);
        } catch {
          // Keep the server-rendered or previously cached feed when revalidation fails.
        } finally {
          if (active) setIsLoading(false);
        }
      };
      void refresh();
      const interval = window.setInterval(refresh, 30 * 60_000);
      return () => { active = false; window.clearInterval(interval); };
    }, []);

  function movePreview(direction: 1 | -1) {
    setSelectedIndex(index => index === null ? null : (index + direction + videoCards.length) % videoCards.length);
  }
   
     function scrollReels(direction: 1 | -1) {
       trackRef.current?.scrollBy({ left: direction * 280, behavior: "smooth" });
     }

  useEffect(() => {
    const track = trackRef.current;
    if (!track || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { root: track, threshold: 0.45 });
    track.querySelectorAll<HTMLElement>(".reel-tile").forEach((tile) => observer.observe(tile));
    return () => observer.disconnect();
  }, [videoCards.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
      if (event.key === "ArrowRight") setSelectedIndex(index => index === null ? null : (index + 1) % videoCards.length);
      if (event.key === "ArrowLeft") setSelectedIndex(index => index === null ? null : (index - 1 + videoCards.length) % videoCards.length);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, videoCards.length]);

  return <section id={fullPage ? undefined : "discover"} className={`reel-showcase ${fullPage ? "reel-showcase-page" : ""}`}>
    <div className="reel-showcase-heading">
      <div><p className="kicker">Portfolio</p><h2>{fullPage ? "Watch the work." : "Reels that keep moving."}</h2></div>
      <p>{fullPage ? "A moving archive of Clipzo production, learning, and studio stories." : "A glimpse of what we shoot, edit, and deliver for creators, brands, and celebrations."}</p>
    </div>
    {isLoading && <div className="reel-loading-state" aria-label="Loading Clipzo reels"><span /><span /><span /></div>}
    {!isLoading && sourceCards.length > 0 && <div className="reel-track" ref={trackRef} aria-label="Clipzo reel showcase">
      <div className="reel-track-motion">
        {videoCards.map((video, index) => <button className="reel-tile" type="button" onClick={() => setSelectedIndex(index)} key={`${video.id}-${index}`}>
          <img src={video.thumbnail} alt="" loading={index < 8 ? "eager" : "lazy"} decoding="async" onError={(event) => {
            const image = event.currentTarget;
            if (image.dataset["thumbnailFallback"] === "frame") return;
            image.dataset["thumbnailFallback"] = image.dataset["thumbnailFallback"] === "hq720" ? "frame" : "hq720";
            image.src = image.dataset["thumbnailFallback"] === "hq720"
              ? `https://i.ytimg.com/vi/${video.id}/hq720.jpg`
              : `https://i.ytimg.com/vi/${video.id}/0.jpg`;
          }} onLoad={(event) => {
            const image = event.currentTarget;
            if (image.dataset["thumbnailFallback"] || image.naturalWidth >= 800) return;
            image.dataset["thumbnailFallback"] = "hq720";
            image.src = `https://i.ytimg.com/vi/${video.id}/hq720.jpg`;
          }} />
          <span className="reel-tile-shade" />
          <span className="reel-tile-play"><Play fill="currentColor" /></span>
          <span className="reel-tile-copy"><b>{video.title}</b><small>Watch on YouTube</small></span>
        </button>)}
      </div>
    </div>}
    {!isLoading && sourceCards.length === 0 && <div className="reel-empty-state"><p>New cinematic stories are coming soon.</p><a href={youtubeChannelUrl} target="_blank" rel="noreferrer">Watch Clipzo on YouTube <ArrowUpRight /></a></div>}
       {!isLoading && sourceCards.length > 0 && <div className="reel-mobile-controls" aria-label="Scroll reels">
         <button type="button" onClick={() => scrollReels(-1)} aria-label="Scroll reels left"><ArrowLeft /></button>
         <button type="button" onClick={() => scrollReels(1)} aria-label="Scroll reels right"><ArrowRight /></button>
       </div>}
    {!fullPage && <div className="reel-showcase-action"><a href={youtubeChannelUrl} target="_blank" rel="noreferrer" className="button button-brand">View more <ArrowUpRight /></a></div>}
    {selectedVideo && <div className="reel-modal" role="dialog" aria-modal="true" aria-label={selectedVideo.title} onClick={() => setSelectedIndex(null)}>
      <button className="reel-modal-close" type="button" onClick={() => setSelectedIndex(null)} aria-label="Close preview"><X /></button>
      <button className="reel-modal-nav reel-modal-prev" type="button" onClick={(event) => { event.stopPropagation(); movePreview(-1); }} aria-label="Previous video"><ArrowLeft /></button>
      <div className="reel-modal-content" onClick={(event) => event.stopPropagation()} onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => { const startX = touchStartX.current; const endX = event.changedTouches[0]?.clientX; touchStartX.current = null; if (startX === null || endX === undefined || Math.abs(endX - startX) < 45) return; movePreview(endX < startX ? 1 : -1); }}>
        <iframe src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&playsinline=1&rel=0&modestbranding=1`} title={selectedVideo.title} allow="autoplay; encrypted-media; picture-in-picture; web-share" allowFullScreen />
      </div>
      <button className="reel-modal-nav reel-modal-next" type="button" onClick={(event) => { event.stopPropagation(); movePreview(1); }} aria-label="Next video"><ArrowRight /></button>
    </div>}
  </section>;
}

const cameraServices = [
  ["Traditional Videography", "Starts at ₹7,990", "One cinematic edit on professional camera; raw footage on request; Premiere Pro and DaVinci Resolve editing; slow-mo, transitions, overlays, and professional colour grading."],
  ["Candid Videography", "Starts at ₹11,990", "One cinematic highlights edit on professional camera; raw footage on request; Premiere Pro and After Effects editing; slow-mo, transitions, overlays, and professional colour grading."],
  ["Traditional Photography", "Starts at ₹7,990", "Professional event photography shaped around your brief."],
  ["Candid Photography", "Starts at ₹11,990", "Natural, story-led photography for events and celebrations."],
  ["Drone Videography", "Starts at ₹5,999", "Aerial coverage for locations, events, and cinematic productions."],
];

const editingServices: Array<{ title: string; price: string; items: string[] }> = [
  { title: "High-end PC Editing Services", price: "Starts at ₹2,499", items: ["Premiere Pro or After Effects", "Reel under 60 seconds", "Professional colour grading", "Smooth cuts, transitions, and pacing", "Basic motion graphics and titles", "Slow-mo, speed ramping, and overlays", "1080p or 4K output as required"] },
  { title: "Cinematic Highlight Services", price: "Starts at ₹4,999", items: ["Premiere Pro and DaVinci Resolve", "Highlights under 5 minutes", "Professional colour grading", "Smooth cuts, transitions, and pacing", "Audio cleanup and soundtrack syncing", "Cinematic slow-mo and overlays", "1080p or 4K output as required"] },
];

function ClipzoHome({ youtubeReels = [] }: { youtubeReels?: YoutubeReel[] }) {
  const data = brands.clipzo;
  return <>
    <section className="clipzo-hero">
      <img src={data.image} alt={data.imageAlt} className="clipzo-hero-image" />
      <div className="clipzo-hero-shade" />
      <div className="clipzo-hero-copy">
        <BrandLogo brand="clipzo" className="hero-brand-logo" />
        <p className="kicker">India’s reel making agency</p>
        <h1>Reels Shot, Edited<br />&amp; Delivered in <em>10 Minutes.</em></h1>
        <p>Book pro creators, cinema-grade gear and viral trend formulas-for creators, brands and couples across India.</p>
        <div className="hero-actions"><Button asChild variant="brand" size="lg"><a href="#enquiry">Book The Clipzo</a></Button><Button asChild variant="glass" size="lg"><a href="#discover">Explore <ArrowDown /></a></Button></div>
      </div>
      {/* <div className="clipzo-timeline" aria-label="Live production timeline"><p>Live production timeline</p><div>{[["00:00", "Book"], ["02:00", "Shoot"], ["05:00", "Edit"], ["08:00", "Trending audio"], ["10:00", "Delivered"]].map(([time, label]) => <span key={time}><b>{time}</b>{label}</span>)}</div></div> */}
      <div className="clipzo-hero-stats"><span><b>5000+</b>Reels Delivered</span><span><b>4.9/5</b>Client Rating</span><span><b>500+</b>Happy Creators</span></div>
    </section>

    <ReelStrip youtubeReels={youtubeReels} />

    <section id="features" className="clipzo-section reel-features-section">
      <div className="section-heading"><div><p className="kicker">Why Clipzo</p><h2>Every reel, engineered for reach.</h2></div><p>The 10-minute reel system combines cinematic craft, trend intelligence, and a production process made for speed.</p></div>
      <div className="reel-feature-grid">{reelFeatures.map(([title, description], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p><Check /></article>)}</div>
    </section>

    <section className="clipzo-section workflow-section">
      <div className="section-heading"><div><p className="kicker">Clipzo workflow</p><h2>Book. Shoot. Edit. Review. Deliver.</h2></div><p>A trained crew, a clear timeline, and final reels straight to your inbox.</p></div>
      <div className="workflow-list">{workflow.map((step, index) => <article key={step}><span>Step 0{index + 1}</span><h3>{step}</h3><p>{["Ping us on WhatsApp with your goal.", "A trained crew arrives with full gear.", "Cuts, captions and trending audio locked in.", "One-tap approve or request tweaks.", "Final reels straight to your inbox."][index]}</p></article>)}</div>
      <p className="workflow-note"><Clock3 /> Total time from book to delivery: <b>10 minutes.</b></p>
    </section>

    <section id="pricing" className="clipzo-section pricing-section">
      <div className="section-heading"><div><p className="kicker">Pricing</p><h2>Simple plans, viral output.</h2></div><p>Transparent packages for creators, brands, weddings, and events.</p></div>
      <div className="pricing-grid">{plans.map((plan) => <article key={`${plan.name}-${plan.label}`} className={plan.popular ? "is-popular" : undefined}>{plan.popular && <span className="popular-label">Most popular</span>}<p>{plan.label}</p><h3>{plan.name}</h3><strong>{plan.price}</strong><ul>{plan.items.map(item => <li key={item}><Check />{item}</li>)}</ul><Button asChild variant="brand" size="lg"><a href={planWhatsappUrl(plan)}>Book <ArrowUpRight /></a></Button></article>)}</div>
      <div className="service-note"><Sparkles /><p><b>Extra shooting time is charged at ₹500 per hour.</b> Same-day delivery is available on request. Ask us for a tailored quote.</p></div>
    </section>

    <section id="services" className="clipzo-section service-section">
      <div className="section-heading"><div><p className="kicker">More ways to create</p><h2>Camera and editing services.</h2></div><p>Professional production and post-production support for events, brands, and creators.</p></div>
      <div className="service-group"><p className="kicker">Camera services</p><div className="service-grid">{cameraServices.map(([title, price, description]) => <article key={title}><h3>{title}</h3><strong>{price}</strong><p>{description}</p></article>)}</div></div>
      <div className="service-group"><p className="kicker">Editing services</p><div className="service-grid editing-grid">{editingServices.map(({ title, price, items }) => <article key={title}><h3>{title}</h3><strong>{price}</strong><ul>{items.map(item => <li key={item}><Check />{item}</li>)}</ul></article>)}</div></div>
    </section>

    <section className="clipzo-section faq-section">
      <div className="section-heading"><div><p className="kicker">Questions, answered</p><h2>Still curious?</h2></div><p>Ping us on WhatsApp-we usually reply in under two minutes.</p></div>
      <div className="faq-list">{[["How fast is delivery really?", "Most standard reels are delivered within 10 minutes of the shoot. Same-day delivery is available for selected event packages."], ["Do you travel to my location?", "Yes. Travel within 10 km of Mangaluru is complimentary. Shoots beyond this area and in other cities are quoted separately."], ["Can I request revisions?", "Two revisions are included. Additional revisions or major changes can be arranged at an extra charge."], ["What gear do you use?", "We use the latest iPhone series for reel making, with professional camera, lighting and editing options available for premium productions."], ["Is advance payment required?", "A 50% non-refundable advance confirms your booking. The remaining balance is due immediately after the shoot."]].map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div>
    </section>

    <section id="terms" className="clipzo-section policy-section">
      <div className="section-heading"><div><p className="kicker">Before we shoot</p><h2>Terms and travel policy.</h2></div><p>Clear expectations help every production run smoothly.</p></div>
      <div className="policy-grid">
        <article><h3>Terms and Conditions</h3><ul><li>Shoot time starts upon our arrival at the location and ends at our departure.</li><li>A minimum 50% non-refundable advance payment is required to confirm the booking.</li><li>The remaining payment must be cleared immediately after the shoot.</li><li>The client may choose the music; Team Clipzo can also provide recommendations.</li><li>Finalized music cannot be changed.</li><li>A maximum of two revisions is included. Additional revisions or major changes are chargeable.</li><li>Extra shooting time is charged as per the selected package.</li><li>Raw footage is provided upon request.</li></ul></article>
        <article><h3>Travel Policy</h3><ul><li>Travel within a 10 km radius of Mangaluru city is complimentary.</li><li>Locations beyond 10 km are subject to a ₹500 travel charge.</li><li>This policy applies only to shoots based in Mangaluru.</li><li>Shoots in other cities or states are quoted separately.</li></ul></article>
      </div>
    </section>

    <section id="privacy" className="clipzo-section privacy-section">
      <div className="section-heading"><div><p className="kicker">Your information</p><h2>Privacy policy.</h2></div><p>We only use the details you share to respond to your enquiry and deliver the requested service.</p></div>
      <div className="privacy-copy"><p>Clipzo may collect your name, contact details, project information, and portfolio or booking information when you contact us. We use this information to discuss your project, confirm bookings, provide services, process payments, and communicate important production updates.</p><p>We do not sell your personal information. We share it only with the people needed to deliver your project or when required by law. We retain enquiry and booking information only for as long as reasonably necessary for business, legal, and service purposes.</p><p>You can request access to, correction of, or deletion of your personal information by contacting <a href="mailto:clipzoindia@gmail.com">clipzoindia@gmail.com</a>. By submitting an enquiry, you agree that we may contact you about that enquiry.</p></div>
    </section>

    <ProductionBrief />

    <section id="contact" className="clipzo-contact">
      <div><p className="kicker">Your next viral reel is 10 minutes away.</p><h2>Tap below and we’ll be on the shoot before you finish scrolling.</h2><Button asChild variant="brand" size="lg"><a href={whatsappUrl}>Book on WhatsApp <ArrowUpRight /></a></Button></div>
      <address><p><Phone /> <a href="tel:+919591631027">+91 95916 31027</a></p><p><MapPin />Operating in Mangaluru, Bengaluru, Udupi, and Kerala.</p><p><Mail /><a href="mailto:clipzoindia@gmail.com">clipzoindia@gmail.com</a></p><p><Instagram /><a href="https://www.instagram.com/clipzo.in_">Instagram: clipzo.in_</a></p><p><Globe2 /><a href="https://www.clipzo.in" target="_blank" rel="noreferrer">www.clipzo.in</a></p><p><Clock3 />Monday–Saturday, 10:00 AM – 8:00 PM</p><a href="https://maps.app.goo.gl/aqRRaSFYjpqHUS8N7" target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight /></a></address>
    </section>
  </>;
}

function AcademyAboutPage() {
  return <>
    <section className="page-hero">
      <img src={brands.academy.image} alt={brands.academy.imageAlt} className="page-hero-image" />
      <div className="page-hero-shade" />
      <div className="page-hero-copy">
        <BrandLogo brand="academy" className="page-brand-logo" />
        <p className="kicker">About</p>
        <h1>Learn with experience. Create with purpose.</h1>
        <p>Clipzo Academy is a professional learning platform built for aspiring editors and creators.</p>
        <p>Powered by Clipzo’s real industry experience, the Academy focuses on practical editing skills, professional workflows, mentorship, and real project exposure.</p>
        <p>From beginner fundamentals to advanced Adobe After Effects, we help creators build the skills, confidence, and portfolio needed to pursue editing professionally.</p>
        <p><strong>Learn with experience. Create with purpose. Grow with Clipzo.</strong></p>
      </div>
    </section>
    <section className="detail-section">
      <div className="section-heading"><div><p className="kicker">About Clipzo Academy</p><h2>Learn with experience. Create with purpose.</h2></div></div>
      <div className="detail-grid">
        <article><span>About</span><h3>Clipzo Academy</h3><p>Clipzo Academy is a professional learning platform built for aspiring editors and creators. Powered by Clipzo’s real industry experience, the Academy focuses on practical editing skills, professional workflows, mentorship, and real project exposure.</p></article>
        <article><span>Growth</span><h3>Practical skill</h3><p>From beginner fundamentals to advanced Adobe After Effects, we help creators build the skills, confidence, and portfolio needed to pursue editing professionally.</p></article>
        <article><span>Promise</span><h3>Grow with Clipzo</h3><p>Learn with experience. Create with purpose. Grow with Clipzo.</p></article>
      </div>
    </section>
    <section className="detail-section">
      <div className="section-heading"><div><p className="kicker">Vision & Mission</p><h2>Build skill, confidence, and creative direction.</h2></div></div>
      <div className="detail-grid">
        <article><span>Vision</span><h3>Next-generation creators</h3><p>To build the next generation of skilled editors and creative professionals through practical learning and real industry experience.</p></article>
        <article><span>Mission</span><h3>Practical skills that matter</h3><p>To provide practical editing education, mentorship, real project exposure, and professional workflows that help students turn their passion for editing into a valuable skill.</p></article>
        <article><span>Purpose</span><h3>Creative growth</h3><p>Learn with experience. Create with purpose. Grow with Clipzo.</p></article>
      </div>
    </section>
    <section className="detail-section">
      <div className="section-heading"><div><p className="kicker">Contact</p><h2>Reach the Academy team.</h2></div><p>Visit the space, connect with the team, or send your details for the next intake.</p></div>
      <div className="detail-grid">
        <article><span>Address</span><h3>Location</h3><p>{academyAddress}</p></article>
        <article><span>Phone</span><h3>Call</h3><p><a href="tel:+919019348392">+91 90193 48392</a></p></article>
        <article><span>Mail</span><h3>Email</h3><p><a href="mailto:clipzoacademy@gmail.com">clipzoacademy@gmail.com</a></p></article>
      </div>
      <div className="detail-grid" style={{ marginTop: "12px" }}>
        <article><span>Instagram</span><h3>Follow</h3><p><a href={academyInstagramUrl} target="_blank" rel="noreferrer">@clipzo_academy</a></p></article>
        <article><span>Studio</span><h3>Studio email</h3><p><a href="mailto:clipzostudio@gmail.com">clipzostudio@gmail.com</a></p></article>
        <article><span>Creative world</span><h3>One brand. Three worlds.</h3><p>Clipzo Academy is part of the same creative ecosystem as Clipzo and Clipzo Studio.</p></article>
      </div>
    </section>
    <Enquiry brand="academy" />
    <BrandContactSection brand="academy" />
  </>;
}

function StudioAboutPage() {
  return <>
    <section className="page-hero">
      <img src={brands.studio.image} alt={brands.studio.imageAlt} className="page-hero-image" />
      <div className="page-hero-shade" />
      <div className="page-hero-copy">
        <BrandLogo brand="studio" className="page-brand-logo" />
        <p className="kicker">About</p>
        <h1>Creative production made for stories that stay.</h1>
        <p>Clipzo Studio is a creative studio built around storytelling, visual production, and digital content. From photography, videography, podcast production, and brand storytelling to polished content experiences, we create work that feels cinematic, intentional, and memorable.</p>
      </div>
    </section>
    <section className="detail-section">
      <div className="section-heading"><div><p className="kicker">About Clipzo Studio</p><h2>Production spaces built for idea, craft, and impact.</h2></div><p>Our studio brings together visual direction, reliable production systems, and a creative process shaped for brands, founders, and content teams that want work with clarity and character.</p></div>
      <div className="detail-grid">
        <article><span>01</span><h3>Visual storytelling</h3><p>Creative work shaped around narratives, mood, movement, and a clear point of view that makes your brand feel alive.</p></article>
        <article><span>02</span><h3>Production flexibility</h3><p>Photography, videography, podcast production, and content production support designed to fit your brief and your timeline.</p></article>
        <article><span>03</span><h3>Creative momentum</h3><p>From concept to final delivery, we help teams move from idea to polished visual output without friction.</p></article>
      </div>
    </section>
    <section className="detail-section">
      <div className="section-heading"><div><p className="kicker">Vision & Mission</p><h2>Turn good ideas into production value.</h2></div><p>We build creative systems that help brands and creators communicate with confidence, presence, and lasting recall.</p></div>
      <div className="detail-grid">
        <article><span>Vision</span><h3>Stories that last</h3><p>To become a trusted production partner for brands, founders, and creators who want strong, cinematic, story-led content.</p></article>
        <article><span>Mission</span><h3>Work that performs</h3><p>To produce thoughtful visual content that blends storytelling, production craft, and digital clarity with measurable creative impact.</p></article>
        <article><span>Approach</span><h3>Creative systems</h3><p>From photography to podcasts and polished visual storytelling, we turn ideas into content that is made to be seen and remembered.</p></article>
      </div>
    </section>
    <section className="detail-section studio-rental-section">
      <div className="section-heading"><div><p className="kicker">Studio for rent</p><h2>Production-ready space for your next shoot.</h2></div><p>Clipzo Studio is available for rent for founders, creators, brands, and teams who need a professional backdrop, controlled lighting, and a space built for creative momentum.</p></div>
      <div className="detail-grid">
        <article><span>01</span><h3>Creative studio rental</h3><p>Flexible booking for product shoots, brand films, interviews, podcast recordings, social content, and small productions that need a polished environment.</p></article>
        <article><span>02</span><h3>Built for production</h3><p>Professional lighting, usable camera space, clean visual framing, and a setup designed to support efficient shoots and strong output.</p></article>
        <article><span>03</span><h3>Ready when you are</h3><p>Book the space for your brief, team, and timeline and work in an environment that helps your ideas move from concept to captured story.</p></article>
      </div>
    </section>
    <section className="detail-section studio-gallery-section">
      <div className="section-heading"><div><p className="kicker">Studio preview</p><h2>Multiple angles. One cinematic setup.</h2></div><p>Take a closer look at the studio environment from different perspectives so you can picture your shoot, frame, and final output before you book.</p></div>
      <div className="studio-gallery-grid" aria-label="Clipzo Studio gallery preview">
        <figure className="studio-gallery-card studio-gallery-card-one">
          <img src={brands.studio.image} alt="Clipzo Studio front-angle production floor" />
          <figcaption>Front angle</figcaption>
        </figure>
        <figure className="studio-gallery-card studio-gallery-card-two">
          <img src={brands.studio.image} alt="Clipzo Studio side-angle production floor" />
          <figcaption>Side view</figcaption>
        </figure>
        <figure className="studio-gallery-card studio-gallery-card-three">
          <img src={brands.studio.image} alt="Clipzo Studio wide-angle studio setup" />
          <figcaption>Wide setup</figcaption>
        </figure>
      </div>
    </section>
    <section className="detail-section">
      <div className="section-heading"><div><p className="kicker">Contact</p><h2>Inquire about the studio.</h2></div><p>Send us your project brief and we’ll help shape the right production approach for the story you want to tell.</p></div>
      <div className="detail-grid">
        <article><span>Address</span><h3>Location</h3><p>{studioAddress}</p></article>
        <article><span>Phone</span><h3>Call</h3><p><a href="tel:+919019348392">+91 90193 48392</a></p></article>
        <article><span>Mail</span><h3>Email</h3><p><a href="mailto:clipzostudio@gmail.com">clipzostudio@gmail.com</a></p></article>
      </div>
      <div className="detail-grid" style={{ marginTop: "12px" }}>
        <article><span>Instagram</span><h3>Follow</h3><p><a href={studioInstagramUrl} target="_blank" rel="noreferrer">@clipzo.in_</a></p></article>
        <article><span>Academy</span><h3>Academy email</h3><p><a href="mailto:clipzoacademy@gmail.com">clipzoacademy@gmail.com</a></p></article>
        <article><span>Creative world</span><h3>One brand. Three worlds.</h3><p>Clipzo Studio works alongside Clipzo and Clipzo Academy under one connected creative ecosystem.</p></article>
      </div>
    </section>
    <Enquiry brand="studio" />
    <BrandContactSection brand="studio" />
  </>;
}

function DetailPage({ brand, page, youtubeReels = [] }: { brand: BrandKey; page: Exclude<BrandPageKey, "home">; youtubeReels?: YoutubeReel[] }) {
  if (brand === "clipzo" && page === "partner") return <ClipzoPartnerPage />;
  if (brand === "clipzo" && page === "reels") return <ReelPortfolioPage youtubeReels={youtubeReels} />;
  if (brand === "academy" && page === "about") return <AcademyAboutPage />;
  if (brand === "studio" && page === "about") return <StudioAboutPage />;
  const data = brands[brand];
  const copy = pageCopy[page];
  const isVideos = page === "videos";
  const isPartner = page === "partner";

  return <>
    <section className="page-hero">
      <img src={data.image} alt="" className="page-hero-image" />
      <div className="page-hero-shade" />
      <div className="page-hero-copy">
        <BrandLogo brand={brand} className="page-brand-logo" />
        <p className="kicker">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.description}</p>
        {isPartner && <Button asChild variant="brand" size="lg"><a href="#enquiry">Start a conversation <ArrowUpRight /></a></Button>}
      </div>
    </section>
    {isVideos ? <section className="video-section">
      <div className="section-heading"><div><p className="kicker">Watch the work</p><h2>Made in this world.</h2></div><p>Fresh projects, behind-the-scenes moments, and creative ideas from {data.name}.</p></div>
      <div className="video-grid">
        {["The story", "Behind the scenes", "In the making"].map((title, index) => <article key={title}>
          <img src={data.image} alt="" />
          <div className="video-card-shade" />
          <span>0{index + 1}</span><h3>{title}</h3><button aria-label={`Play ${title}`}><Play fill="currentColor" /></button>
        </article>)}
      </div>
    </section> : <section className="detail-section">
      <div className="section-heading"><div><p className="kicker">{isPartner ? "A better way to collaborate" : `Inside ${data.name}`}</p><h2>{isPartner ? "Bring your next idea to the table." : "Creativity works better when it is shared."}</h2></div><p>{isPartner ? "From the first conversation to delivery day, we make room for the right ideas, the right people, and a process you can trust." : "Our work is grounded in practical craft and a point of view that helps every project feel considered, useful, and alive."}</p></div>
      <div className="detail-grid">
        {(isPartner ? ["Share your ambition", "Build the right team", "Make the work matter"] : ["A clear point of view", "Hands-on creative craft", "A team that stays curious"]).map((item, index) => <article key={item}><span>0{index + 1}</span><h3>{item}</h3><p>{isPartner ? "We listen closely, shape the opportunity, and keep every decision connected to what matters most." : "Thoughtful work begins with the details: listening, learning, and finding the idea worth making."}</p></article>)}
      </div>
    </section>}
    <Enquiry brand={brand} />
  </>;
}

function ReelPortfolioPage({ youtubeReels = [] }: { youtubeReels?: YoutubeReel[] }) {
  return <>
    <section className="page-hero reel-page-hero">
      <img src={brands.clipzo.image} alt={brands.clipzo.imageAlt} className="page-hero-image" />
      <div className="page-hero-shade" />
      <div className="page-hero-copy"><BrandLogo brand="clipzo" className="page-brand-logo" /><p className="kicker">Portfolio</p><h1>Reels made to move.</h1><p>Watch selected Clipzo work on YouTube, from fast creator reels to cinematic event stories.</p><Button asChild variant="brand" size="lg"><a href={youtubeChannelUrl} target="_blank" rel="noreferrer">Watch on YouTube <ArrowUpRight /></a></Button></div>
    </section>
    <ReelStrip fullPage youtubeReels={youtubeReels} />
  </>;
}

function ClipzoPartnerPage() {
  return <>
    <section className="page-hero clipzo-partner-hero">
      <img src={brands.clipzo.image} alt="" className="page-hero-image" />
      <div className="page-hero-shade" />
      <div className="page-hero-copy">
        <BrandLogo brand="clipzo" className="page-brand-logo" />
        <p className="kicker">Become a partner</p>
        <h1>Get paid gigs, <em>across India.</em></h1>
        <p>Join our roster for weddings, brand campaigns and viral reels. Bring your craft-we’ll bring the next opportunity.</p>
      </div>
    </section>
    <section className="partner-form-section">
      <div><p className="kicker">Join the Clipzo roster</p><h2>Make the work you want to be known for.</h2><p>We are looking for talented shooters, editors and creators who can bring energy, care and a sharp eye to every project.</p><a className="partner-whatsapp" href={whatsappUrl}>Questions? Chat on WhatsApp <ArrowUpRight /></a></div>
      <form className="partner-form" onSubmit={(event) => event.preventDefault()}>
        <label>Full name<input name="name" autoComplete="name" required placeholder="Your full name" /></label>
        <label>Email<input name="email" type="email" autoComplete="email" required placeholder="you@email.com" /></label>
        <label>Phone / WhatsApp<input name="phone" type="tel" autoComplete="tel" required placeholder="Your number" /></label>
        <label>I want to join as<select name="role" required defaultValue=""><option value="" disabled>Select a role</option><option>Shooter</option><option>Editor</option><option>Creator</option></select></label>
        <label className="form-wide">City<input name="city" autoComplete="address-level2" required placeholder="Your city" /></label>
        <label className="form-wide">About yourself and portfolio links<textarea name="portfolio" rows={4} required placeholder="Tell us about your work and share your portfolio links" /></label>
        <label className="form-wide">Resume <input name="resume" type="file" accept=".pdf,.doc,.docx" /></label>
        <Button type="submit" variant="brand" size="lg" className="form-wide">Submit application <ArrowUpRight /></Button>
      </form>
    </section>
  </>;
}

export function BrandPage({ brand, page = "home", youtubeReels = [] }: { brand: BrandKey; page?: BrandPageKey; youtubeReels?: YoutubeReel[] }) {
  return <ThemeFrame brand={brand}>
    <SiteNav active={brand} />
    <main>{page === "home" ? (brand === "clipzo" ? <ClipzoHome youtubeReels={youtubeReels} /> : <HomePage brand={brand} />) : <DetailPage brand={brand} page={page} youtubeReels={youtubeReels} />}</main>
    <SiteFooter brand={brand} />
  </ThemeFrame>;
}
