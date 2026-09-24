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
        {brand === "studio" ? <div className="coming-soon-panel"><p className="kicker">Inside the soundstage</p><h2>Clipzo Studio is coming soon.</h2><p>Our production floor, camera systems, lighting, and crew support are being prepared. We’ll share the launch details soon.</p></div> : <>
          <div className="section-heading"><div><p className="kicker">Inside {data.room}</p><h2>Built for serious creative work.</h2></div><p>A focused experience shaped around the way creators actually learn, shoot, edit, and deliver.</p></div>
          <div className="capability-grid">{data.features.map((feature, index) => <article key={feature}><span>0{index + 1}</span><h3>{feature}</h3><Check /></article>)}</div>
          <div className="stat-line">{data.stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
        </>}
    </section>
    {brand === "academy" && <section id="academy-enrolment" className="academy-enrolment">
      <div className="academy-enrolment-copy">
        <p className="kicker">Enroll today</p>
        <h2>One Goal • One Decision • One Direction</h2>
        <p>Choose your path. Commit to your craft. The next step in your creative journey starts here.</p>
        <div className="academy-enrolment-actions">
          <Button asChild variant="brand" size="lg"><a href={academyEnrollmentFormUrl} target="_blank" rel="noreferrer">Open Google Form <ArrowUpRight /></a></Button>        </div>
      </div>
      <div id="academy-form" className="academy-enrolment-form">
        <iframe src={`${academyEnrollmentFormUrl}&embedded=true`} title="Clipzo Academy enrollment form" loading="lazy">Loading the enrollment form...</iframe>
      </div>
    </section>}
    {brand !== "studio" && <Enquiry brand={brand} />}
  </>;
}

const whatsappUrl = "https://wa.me/919591631027?text=Hi%20Clipzo%2C%20I%27d%20like%20to%20book%20a%20reel%20shoot";
const youtubeChannelId = "UCOfGYJgXItJTgmQQiQJYI7Q";
const youtubeChannelUrl = `https://www.youtube.com/channel/${youtubeChannelId}`;

export type YoutubeReel = { id: string; title: string; thumbnail: string; url: string };

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
  const sourceCards = youtubeReels;
  const videoCards = [...sourceCards, ...sourceCards];
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);
  const selectedVideo = selectedIndex === null ? null : videoCards[selectedIndex];
     const trackRef = useRef<HTMLDivElement | null>(null);

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

  return <section className={`reel-showcase ${fullPage ? "reel-showcase-page" : ""}`}>
    <div className="reel-showcase-heading">
      <div><p className="kicker">Portfolio</p><h2>{fullPage ? "Watch the work." : "Reels that keep moving."}</h2></div>
      <p>{fullPage ? "A moving archive of Clipzo production, learning, and studio stories." : "A glimpse of what we shoot, edit, and deliver for creators, brands, and celebrations."}</p>
    </div>
    <div className="reel-track" ref={trackRef} aria-label="Clipzo reel showcase">
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
    </div>
    {sourceCards.length === 0 && <div className="reel-empty-state"><p>Latest Clipzo reels are unavailable right now.</p><a href={youtubeChannelUrl} target="_blank" rel="noreferrer">Watch the original videos on YouTube <ArrowUpRight /></a></div>}
       <div className="reel-mobile-controls" aria-label="Scroll reels">
         <button type="button" onClick={() => scrollReels(-1)} aria-label="Scroll reels left"><ArrowLeft /></button>
         <button type="button" onClick={() => scrollReels(1)} aria-label="Scroll reels right"><ArrowRight /></button>
       </div>
    {!fullPage && <div className="reel-showcase-action"><a href={youtubeChannelUrl} target="_blank" rel="noreferrer" className="button button-brand">View more <ArrowUpRight /></a></div>}
    {selectedVideo && <div className="reel-modal" role="dialog" aria-modal="true" aria-label={selectedVideo.title} onClick={() => setSelectedIndex(null)}>
      <button className="reel-modal-close" type="button" onClick={() => setSelectedIndex(null)} aria-label="Close preview"><X /></button>
      <button className="reel-modal-nav reel-modal-prev" type="button" onClick={(event) => { event.stopPropagation(); movePreview(-1); }} aria-label="Previous video"><ArrowLeft /></button>
      <div className="reel-modal-content" onClick={(event) => event.stopPropagation()} onTouchStart={(event) => { touchStartX.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => { const startX = touchStartX.current; const endX = event.changedTouches[0]?.clientX; touchStartX.current = null; if (startX === null || endX === undefined || Math.abs(endX - startX) < 45) return; movePreview(endX < startX ? 1 : -1); }}>
        {selectedVideo.id.length === 11 ? <iframe src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&playsinline=1&rel=0&modestbranding=1&vq=hd2160`} title={selectedVideo.title} allow="autoplay; encrypted-media; picture-in-picture; web-share" allowFullScreen /> : <img src={selectedVideo.thumbnail} alt={selectedVideo.title} />}
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
      <address><p><Phone /> <a href="tel:+919591631027">+91 95916 31027</a></p><p><MapPin />Operating in Mangaluru, Bengaluru, Udupi, and Kerala.</p><p><Mail /><a href="mailto:clipzoindia@gmail.com">clipzoindia@gmail.com</a></p><p><Instagram /><a href="https://www.instagram.com/clipzo.in_">Instagram: clipzo.in_</a></p><p><Globe2 /><a href="https://www.clipzo.in">www.clipzo.in</a></p><p><Clock3 />Monday–Saturday, 10:00 AM – 8:00 PM</p><a href="https://www.google.com/maps/search/?api=1&query=Shree+Mangaladevi+Palace+Clock+Tower+Hampankatta+Mangaluru">Open in Google Maps <ArrowUpRight /></a></address>
    </section>
  </>;
}

function DetailPage({ brand, page, youtubeReels = [] }: { brand: BrandKey; page: Exclude<BrandPageKey, "home">; youtubeReels?: YoutubeReel[] }) {
  if (brand === "clipzo" && page === "partner") return <ClipzoPartnerPage />;
  if (brand === "clipzo" && page === "reels") return <ReelPortfolioPage youtubeReels={youtubeReels} />;
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
    <SiteFooter />
  </ThemeFrame>;
}
