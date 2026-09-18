import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Bot, Menu, Send, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import chatbotKnowledge from "@/data/chatbot-knowledge.json";
import { brands, type BrandKey } from "@/lib/brands";

const whatsappUrl = "https://wa.me/919591631027?text=Hi%20Clipzo%2C%20I%27d%20like%20to%20start%20a%20conversation";

export function BrandLogo({ brand, className = "" }: { brand: BrandKey; className?: string }) {
  const item = brands[brand];
  return <img src={item.logo} alt={`${item.name} logo`} className={`brand-logo ${className}`} />;
}

export function SiteNav({ active = "clipzo" }: { active?: BrandKey }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-nav">
      <Link to="/" className="logo-link" aria-label="Clipzo worlds home">
        <BrandLogo brand={active} />
      </Link>
      <nav className="desktop-nav" aria-label="Creative worlds">
        <Link to="/clipzo" activeProps={{ className: "is-active" }}>Clipzo</Link>
        <Link to="/academy" activeProps={{ className: "is-active" }}>Academy</Link>
        <Link to="/studio" activeProps={{ className: "is-active" }}>Studio</Link>
      </nav>
      <Button asChild variant="brand" size="lg" className="nav-cta"><a href={whatsappUrl}>Start a conversation</a></Button>
      <Button variant="glass" size="icon" className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      {open && <nav className="mobile-nav" aria-label="Mobile creative worlds">
        <Link to="/clipzo" onClick={() => setOpen(false)}>Clipzo</Link>
        <Link to="/academy" onClick={() => setOpen(false)}>Academy</Link>
        <Link to="/studio" onClick={() => setOpen(false)}>Studio</Link>
      </nav>}
    </header>
  );
}

export function LoadingMark({ brand }: { brand: BrandKey }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 720);
    return () => window.clearTimeout(timer);
  }, []);
  if (!visible) return null;
  return <div className="loading-mark" aria-label={`Loading ${brands[brand].name}`}><BrandLogo brand={brand} /><span /></div>;
}

export function Chatbot({ brand }: { brand: BrandKey }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<Array<{ role: "bot" | "user"; text: string; mapUrl?: string }>>([{ role: "bot", text: chatbotKnowledge[brand].welcome }]);
  const latestMessageRef = useRef<HTMLDivElement | null>(null);
  const botLabels: Record<BrandKey, string> = { clipzo: "Clipzo", academy: "Academy", studio: "Studio" };

  useEffect(() => {
    setDraft("");
    setMessages([{ role: "bot", text: chatbotKnowledge[brand].welcome }]);
  }, [brand]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    latestMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, open]);

  function findAnswer(question: string) {
    const normalizedQuestion = question.toLowerCase().replace(/[^a-z0-9₹]+/g, " ");
    const words = normalizedQuestion.split(" ").filter(word => word.length > 2);
    const answers = chatbotKnowledge[brand].answers;
    const bestMatch = answers
      .map((entry) => ({ entry, score: entry.keywords.reduce((score, keyword) => score + (normalizedQuestion.includes(keyword.toLowerCase()) ? 1 : 0), 0) }))
      .sort((left, right) => right.score - left.score)[0];

    if (bestMatch && bestMatch.score > 0) return { text: bestMatch.entry.answer, mapUrl: "mapUrl" in bestMatch.entry ? bestMatch.entry.mapUrl : undefined };
    if (words.some(word => ["hello", "hi", "hey"].includes(word))) return { text: chatbotKnowledge[brand].welcome };
    return { text: `I can answer questions about ${botLabels[brand]} using the information on this website. I don't have a verified answer for that yet. Please send us a WhatsApp message for help.` };
  }

  function submitQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = draft.trim();
    if (!question) return;
    const answer = findAnswer(question);
    setMessages(current => [...current, { role: "user", text: question }, { role: "bot", text: answer.text, ...(answer.mapUrl ? { mapUrl: answer.mapUrl } : {}) }]);
    setDraft("");
  }

  function askQuickQuestion(question: string) {
    const answer = findAnswer(question);
    setMessages(current => [...current, { role: "user", text: question }, { role: "bot", text: answer.text, ...(answer.mapUrl ? { mapUrl: answer.mapUrl } : {}) }]);
  }

  function answerPoints(text: string) {
    return text.split(/(?<=[.!?])\s+|;\s+/).map(point => point.trim()).filter(Boolean);
  }

  return <div className="chat-wrap">
    {open && <button type="button" className="chat-backdrop" aria-label="Close assistant popup" onClick={() => setOpen(false)} />}
    {open && <div className="chat-panel" role="dialog" aria-modal="true" aria-label={`${brands[brand].name} assistant`} onClick={(event) => event.stopPropagation()}>
      <div className="chat-head"><BrandLogo brand={brand} /><Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close chat"><X /></Button></div>
      <div className="chat-messages" aria-live="polite">{messages.map((message, index) => message.role === "bot" ? <div key={`${message.role}-${index}`} className="chat-message chat-message-bot"><ul>{answerPoints(message.text).map((point, pointIndex) => <li key={`${point}-${pointIndex}`}>{point}</li>)}</ul>{message.mapUrl && <div className="chat-map-wrap"><iframe src={message.mapUrl} title="Clipzo office location map" loading="lazy" /><a href="https://www.google.com/maps/search/?api=1&query=Shree+Mangaladevi+Palace+Clock+Tower+Hampankatta+Mangaluru" target="_blank" rel="noreferrer">Open in Google Maps <ArrowUpRight /></a></div>}</div> : <p key={`${message.role}-${index}`} className="chat-message chat-message-user">{message.text}</p>)}<div ref={latestMessageRef} aria-hidden="true" /></div>
      <div className="chat-quick-questions"><span>Quick asks</span>{chatbotKnowledge[brand].quickQuestions.map(question => <button key={question} type="button" onClick={() => askQuickQuestion(question)}>{question}</button>)}</div>
      <a className="chat-whatsapp" href={`${whatsappUrl}&brand=${brand}`} target="_blank" rel="noreferrer">Ask on WhatsApp <ArrowUpRight /></a>
      <form className="chat-input" onSubmit={submitQuestion}><input value={draft} onChange={(event) => setDraft(event.target.value)} aria-label={`${brands[brand].name} chat message`} placeholder="Ask a question..." /><Button type="submit" variant="brand" size="icon" aria-label="Send message"><Send /></Button></form>
    </div>}
    <div className="chat-bot-list" aria-label={`${brands[brand].name} assistant`}>
      <button type="button" className={`chat-bot chat-bot-${brand} ${open ? "is-open" : ""}`} onClick={() => setOpen(!open)} aria-label={`Open ${brands[brand].name} assistant`} aria-pressed={open}>
        <span className="chat-bot-orbit" aria-hidden="true">
          <svg viewBox="0 0 100 100" role="presentation">
            <path id={`chat-arc-${brand}`} d="M 10 52 A 40 40 0 0 1 90 52" />
            <text><textPath href={`#chat-arc-${brand}`} startOffset="50%" textAnchor="middle">ASK {botLabels[brand].toUpperCase()}</textPath></text>
          </svg>
        </span>
        <span className="chat-bot-face"><Bot /></span>
        <span className="chat-bot-label">Ask {botLabels[brand]}</span>
      </button>
    </div>
  </div>;
}

export function Enquiry({ brand }: { brand: BrandKey }) {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const enquirySchema = z.object({
    name: z.string().trim().min(2, "Please enter your name.").max(80, "Please keep your name under 80 characters."),
    email: z.string().trim().email("Please enter a valid email address.").max(254, "Please keep your email under 254 characters."),
    project: z.string().trim().min(12, "Please share a little more about your project.").max(1200, "Please keep your project details under 1,200 characters."),
  });
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const result = enquirySchema.safeParse({ name: form.get("name"), email: form.get("email"), project: form.get("project") });
    if (!result.success) {
      const nextErrors: Record<string, string> = {};
      for (const issue of result.error.issues) nextErrors[String(issue.path[0])] = issue.message;
      setErrors(nextErrors);
      const firstInvalid = event.currentTarget.querySelector<HTMLElement>("[aria-invalid='true']");
      window.requestAnimationFrame(() => firstInvalid?.focus());
      return;
    }
    setErrors({});
    if (brand === "academy") {
      const message = [
        "Hi Clipzo Academy,",
        `Name: ${result.data.name}`,
        `Email: ${result.data.email}`,
        `Enquiry: ${result.data.project}`,
      ].join("\n");
      window.open(`https://wa.me/919591631027?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    }
    setSent(true);
  }
  return <section id="enquiry" className="enquiry-band">
    <div><p className="kicker">Start here</p><h2>Tell us what you’re making.</h2><p>Share a few details. The right {brands[brand].name} team will get back to you.</p></div>
    {sent ? <div className="form-success" role="status" aria-live="polite"><span>Brief received</span><p>Thanks. We’ll be in touch soon.</p></div> : <form onSubmit={submit} noValidate>
      <label htmlFor={`${brand}-name`}>Name<input id={`${brand}-name`} name="name" autoComplete="name" required maxLength={80} aria-invalid={Boolean(errors["name"])} aria-describedby={errors["name"] ? `${brand}-name-error` : undefined} placeholder="Your name" />{errors["name"] && <span className="field-error" id={`${brand}-name-error`}>{errors["name"]}</span>}</label>
      <label htmlFor={`${brand}-email`}>Email<input id={`${brand}-email`} name="email" autoComplete="email" required type="email" maxLength={254} aria-invalid={Boolean(errors["email"])} aria-describedby={errors["email"] ? `${brand}-email-error` : undefined} placeholder="you@email.com" />{errors["email"] && <span className="field-error" id={`${brand}-email-error`}>{errors["email"]}</span>}</label>
      <label className="form-wide" htmlFor={`${brand}-project`}>Project<textarea id={`${brand}-project`} name="project" required minLength={12} maxLength={1200} rows={3} aria-invalid={Boolean(errors["project"])} aria-describedby={errors["project"] ? `${brand}-project-error` : undefined} placeholder={`Tell us about your ${brands[brand].name} project…`} />{errors["project"] && <span className="field-error" id={`${brand}-project-error`}>{errors["project"]}</span>}</label>
      <Button type="submit" variant="brand" size="lg" className="form-wide">Send enquiry <ArrowUpRight /></Button>
    </form>}
  </section>;
}

export function SiteFooter() {
  return <footer className="site-footer"><span>Clipzo · Academy · Studio</span><span>One brand. Three creative worlds.</span><span className="footer-links"><a href="#terms">Terms</a><a href="#privacy">Privacy</a></span><span>© 2026 Clipzo</span><span>Developed and designed by <a href="https://rachithacharya.in" target="_blank" rel="noreferrer">Rachitha R Achary</a></span></footer>;
}

export function ThemeFrame({ brand, children }: { brand: BrandKey; children: ReactNode }) {
  return <div data-brand={brand} className="theme-frame"><LoadingMark brand={brand} />{children}<Chatbot brand={brand} /></div>;
}
