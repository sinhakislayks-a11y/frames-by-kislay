import { useState, useEffect, useRef } from "react";

// ============================================================
// DESIGN SYSTEM
// ============================================================
// Palette: near-black bg, electric cyan accent, warm off-white text
// Typography: Playfair Display (editorial headers) + DM Sans (clean body)
// Aesthetic: cinematic editorial — film grain, timecode details, precision grid
// ============================================================

const WORKS = [
  {
    id: 1,
    title: "SaaS Onboarding Reel",
    client: "Fintech Founder",
    type: "Talking Head",
    duration: "0:42",
    tags: ["Hook Surgery", "Retention Edit"],
    thumb: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=600&q=80",
    embedUrl: "YOUR_LINK_1",
  },
  {
    id: 2,
    title: "Product Launch Reel",
    client: "B2B SaaS",
    type: "Short-form",
    duration: "0:31",
    tags: ["Done-For-You", "Motion Graphics"],
    thumb: "https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=600&q=80",
    embedUrl: "YOUR_LINK_2",
  },
  {
    id: 3,
    title: "Personal Brand Series",
    client: "Agency Founder",
    type: "Talking Head",
    duration: "0:58",
    tags: ["Retention Engine", "Subtitles"],
    thumb: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80",
    embedUrl: "YOUR_LINK_3",
  },
  {
    id: 4,
    title: "Cinematic Brand Film",
    client: "D2C Brand",
    type: "Brand Film",
    duration: "1:24",
    tags: ["Color Grade", "Cinematography"],
    thumb: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&q=80",
    embedUrl: "YOUR_LINK_4",
  },
];

const SERVICES = [
  {
    id: "hook",
    label: "01",
    name: "Hook Surgery",
    tagline: "One-time fix. Immediate results.",
    price: "₹3,000",
    period: "one-time",
    pitch: "90% of drop-off happens in the first 5 seconds. I re-cut only the opening of 3 existing reels — tighter hook, better pacing, pattern interrupt. You see the difference in 30 seconds.",
    deliverables: ["3 re-cut hooks (first 5 sec)", "Side-by-side comparison", "Turnaround: 48 hours"],
    cta: "Fix My Hooks",
    highlight: false,
  },
  {
    id: "retention",
    label: "02",
    name: "Retention Engine",
    tagline: "Monthly retainer. Consistent output.",
    price: "₹12,000",
    period: "/month",
    pitch: "You already have the content. Podcasts, long videos, webinars — I turn them into 4 high-retention reels per month. Hooks tightened, subtitles on, pattern breaks added. Upload-ready.",
    deliverables: ["4 reels/month from your long-form", "Captions + subtitles", "Hook review per reel", "2 revision rounds"],
    cta: "Start the Engine",
    highlight: true,
  },
  {
    id: "dfy",
    label: "03",
    name: "Done-For-You",
    tagline: "You record. I handle everything else.",
    price: "₹25,000",
    period: "/month",
    pitch: "Record raw footage — phone, camera, whatever. I handle hooks, editing, captions, thumbnails, and deliver upload-ready files. Designed for SaaS founders who don't want to think about content.",
    deliverables: ["Unlimited raw footage input", "Full editing + motion graphics", "Thumbnail + cover design", "Weekly delivery schedule"],
    cta: "Go Hands-Free",
    highlight: false,
  },
];

const PROCESS_STEPS = [
  { n: "01", title: "You send footage", body: "Raw recording, phone video, Loom, podcast — anything you have. No format requirements. Google Drive link is fine." },
  { n: "02", title: "I diagnose the content", body: "I watch everything with fresh eyes. Identify the strongest moments, weak hooks, drop-off points. You don't brief me — the footage tells the story." },
  { n: "03", title: "Edit + craft", body: "Hooks tightened. Pacing sculpted. Subtitles added. Motion graphics where they serve the message, not the ego." },
  { n: "04", title: "You review", body: "Delivered as an unlisted link with a short note explaining every cut. 2 revision rounds included. Most clients approve on round 1." },
  { n: "05", title: "Upload-ready delivery", body: "Final file in your spec — resolution, format, aspect ratio. Ready to post. No conversion needed." },
];

const NAV_LINKS = ["Work", "Services", "Process", "About", "Contact"];

// ============================================================
// UTILITY COMPONENTS
// ============================================================

function GrainOverlay() {
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1000, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.35,
      }}
    />
  );
}

function Timecode({ value }) {
  return (
    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.15em", color: "rgba(0,255,220,0.5)", textTransform: "uppercase" }}>
      {value}
    </span>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "64px" }}>
      <div style={{ width: "32px", height: "1px", background: "rgba(0,255,220,0.6)" }} />
      <Timecode value={children} />
    </div>
  );
}

function CyanDot() {
  return <span style={{ display: "inline-block", width: "6px", height: "6px", borderRadius: "50%", background: "#00FFDC", marginRight: "8px", verticalAlign: "middle" }} />;
}

// ============================================================
// NAVIGATION
// ============================================================

function Nav({ active, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        padding: "20px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        background: scrolled ? "rgba(6,6,8,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "all 0.4s ease",
      }}>
        {/* Logo */}
        <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", flexDirection: "column", gap: "2px" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 700, color: "#F5F0E8", letterSpacing: "0.02em", lineHeight: 1 }}>
            Frames by Kislay
          </div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "9px", color: "rgba(0,255,220,0.7)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Video Editor · Colorist · Delhi
          </div>
        </button>

        {/* Desktop Nav */}
        <div style={{ display: "flex", gap: "36px", alignItems: "center" }} className="desktop-nav">
          {NAV_LINKS.map(link => (
            <button
              key={link}
              onClick={() => setPage(link.toLowerCase())}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
                color: active === link.toLowerCase() ? "#00FFDC" : "rgba(245,240,232,0.65)",
                letterSpacing: "0.08em", textTransform: "uppercase",
                transition: "color 0.2s",
                padding: 0,
              }}
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => setPage("contact")}
            style={{
              background: "transparent", border: "1px solid #00FFDC",
              color: "#00FFDC", padding: "8px 20px",
              fontFamily: "'DM Sans', sans-serif", fontSize: "12px",
              letterSpacing: "0.1em", textTransform: "uppercase",
              cursor: "pointer", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.target.style.background = "#00FFDC"; e.target.style.color = "#060608"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#00FFDC"; }}
          >
            Work With Me
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "#F5F0E8", fontSize: "20px" }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 490, background: "rgba(6,6,8,0.98)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "32px",
        }}>
          {NAV_LINKS.map(link => (
            <button
              key={link}
              onClick={() => { setPage(link.toLowerCase()); setMenuOpen(false); }}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Playfair Display', serif", fontSize: "32px",
                color: "#F5F0E8", letterSpacing: "0.02em",
              }}
            >
              {link}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}

// ============================================================
// HOME PAGE
// ============================================================

function HomePage({ setPage }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#060608" }}>

      {/* Hero */}
      <section style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "flex-end", padding: "120px 40px 80px",
        position: "relative", overflow: "hidden",
      }}>
        {/* Background grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(0,255,220,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,220,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />

        {/* Top-right timecodes */}
        <div style={{ position: "absolute", top: "100px", right: "40px", display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
          <Timecode value="FBK-2026 · DELHI NCR" />
          <Timecode value="EDITING · COLOR · MOTION" />
        </div>

        {/* Vertical line accent */}
        <div style={{
          position: "absolute", left: "40px", top: "100px", bottom: "80px",
          width: "1px", background: "linear-gradient(to bottom, transparent, rgba(0,255,220,0.4), transparent)",
        }} />

        {/* Hero headline */}
        <div style={{ maxWidth: "900px", opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
          <div style={{ marginBottom: "24px" }}>
            <Timecode value="Video Editor for Founders" />
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(48px, 8vw, 96px)",
            fontWeight: 700,
            color: "#F5F0E8",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            margin: 0,
          }}>
            Your content,<br />
            <span style={{ color: "#00FFDC", fontStyle: "italic" }}>finally</span> edited<br />
            to convert.
          </h1>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "18px", color: "rgba(245,240,232,0.6)",
            lineHeight: 1.7, maxWidth: "520px",
            marginTop: "32px", marginBottom: "48px",
          }}>
            I help SaaS founders and creators turn raw footage into high-retention reels — cinematic quality, fast turnaround, one editor who actually gets your brand.
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <button
              onClick={() => setPage("work")}
              style={{
                background: "#00FFDC", color: "#060608", border: "none",
                padding: "14px 32px", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
                fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.target.style.background = "#F5F0E8"; }}
              onMouseLeave={e => { e.target.style.background = "#00FFDC"; }}
            >
              See the Work →
            </button>
            <button
              onClick={() => setPage("services")}
              style={{
                background: "transparent", color: "#F5F0E8",
                border: "1px solid rgba(245,240,232,0.25)",
                padding: "14px 32px", cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif", fontSize: "13px",
                fontWeight: 400, letterSpacing: "0.1em", textTransform: "uppercase",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.target.style.borderColor = "#00FFDC"; e.target.style.color = "#00FFDC"; }}
              onMouseLeave={e => { e.target.style.borderColor = "rgba(245,240,232,0.25)"; e.target.style.color = "#F5F0E8"; }}
            >
              View Services
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "40px", right: "40px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "1px", height: "60px", background: "linear-gradient(to bottom, transparent, rgba(0,255,220,0.5))", animation: "pulse 2s infinite" }} />
          <Timecode value="scroll" />
        </div>
      </section>

      {/* Stats bar */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "40px", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "32px" }}>
        {[["2+", "Years editing"], ["50+", "Reels delivered"], ["DaVinci", "Primary tool"], ["48hr", "Avg turnaround"]].map(([num, label]) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", color: "#00FFDC", fontWeight: 700 }}>{num}</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(245,240,232,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "4px" }}>{label}</div>
          </div>
        ))}
      </section>

      {/* Work preview */}
      <section style={{ padding: "100px 40px" }}>
        <SectionLabel>Selected Work</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2px" }}>
          {WORKS.map((w, i) => (
            <WorkCard key={w.id} work={w} index={i} onClick={() => setPage("work")} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <button onClick={() => setPage("work")} style={{ background: "none", border: "1px solid rgba(245,240,232,0.2)", color: "rgba(245,240,232,0.7)", padding: "12px 32px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.2s" }}
            onMouseEnter={e => { e.target.style.borderColor = "#00FFDC"; e.target.style.color = "#00FFDC"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(245,240,232,0.2)"; e.target.style.color = "rgba(245,240,232,0.7)"; }}>
            View Full Portfolio →
          </button>
        </div>
      </section>

      {/* Offers preview */}
      <section style={{ padding: "0 40px 100px" }}>
        <SectionLabel>What I Offer</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          {SERVICES.map(s => (
            <div key={s.id} style={{ background: s.highlight ? "rgba(0,255,220,0.04)" : "#060608", padding: "40px", position: "relative", borderTop: s.highlight ? "2px solid #00FFDC" : "2px solid transparent" }}>
              {s.highlight && <div style={{ position: "absolute", top: "-1px", left: "40px", background: "#00FFDC", color: "#060608", padding: "2px 12px", fontSize: "10px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Most Popular</div>}
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "rgba(0,255,220,0.5)", marginBottom: "16px" }}>{s.label}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#F5F0E8", marginBottom: "8px" }}>{s.name}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(245,240,232,0.5)", marginBottom: "24px" }}>{s.tagline}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: "#00FFDC" }}>{s.price}<span style={{ fontSize: "14px", color: "rgba(0,255,220,0.6)", fontFamily: "'DM Sans', sans-serif" }}>{s.period}</span></div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button onClick={() => setPage("services")} style={{ background: "none", border: "1px solid rgba(245,240,232,0.2)", color: "rgba(245,240,232,0.7)", padding: "12px 32px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.2s" }}
            onMouseEnter={e => { e.target.style.borderColor = "#00FFDC"; e.target.style.color = "#00FFDC"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(245,240,232,0.2)"; e.target.style.color = "rgba(245,240,232,0.7)"; }}>
            See Full Pricing →
          </button>
        </div>
      </section>

      {/* CTA banner */}
      <section style={{ margin: "0 40px 100px", border: "1px solid rgba(0,255,220,0.2)", padding: "80px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-40px", right: "-40px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,220,0.08) 0%, transparent 70%)" }} />
        <Timecode value="Ready when you are" />
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5vw, 56px)", color: "#F5F0E8", margin: "24px 0 16px", fontWeight: 700, letterSpacing: "-0.02em" }}>
          Your raw footage is<br />
          <span style={{ color: "#00FFDC", fontStyle: "italic" }}>closer than you think.</span>
        </h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(245,240,232,0.6)", fontSize: "16px", maxWidth: "480px", marginBottom: "40px" }}>
          Start with Hook Surgery — ₹3,000, 3 reels, 48 hours. No commitment. See the results first.
        </p>
        <button onClick={() => setPage("contact")} style={{ background: "#00FFDC", color: "#060608", border: "none", padding: "16px 40px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.2s" }}
          onMouseEnter={e => { e.target.style.background = "#F5F0E8"; }}
          onMouseLeave={e => { e.target.style.background = "#00FFDC"; }}>
          Get Started →
        </button>
      </section>

      <style>{`@keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }`}</style>
    </div>
  );
}

// ============================================================
// WORK CARD (shared)
// ============================================================

function WorkCard({ work, index, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", cursor: "pointer", overflow: "hidden", aspectRatio: "9/16", maxHeight: "420px" }}
    >
      <img src={work.thumb} alt={work.title} style={{ width: "100%", height: "100%", objectFit: "cover", transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)", filter: hovered ? "brightness(0.5)" : "brightness(0.7)" }} />

      {/* Timecode top */}
      <div style={{ position: "absolute", top: "16px", left: "16px" }}>
        <Timecode value={`${String(index + 1).padStart(2, "0")} / ${work.duration}`} />
      </div>

      {/* Overlay info */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px",
        background: "linear-gradient(to top, rgba(6,6,8,0.95) 0%, transparent 100%)",
        transform: hovered ? "translateY(0)" : "translateY(10px)",
        transition: "transform 0.4s ease",
      }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "#00FFDC", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "6px" }}>{work.type}</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: "#F5F0E8", marginBottom: "4px" }}>{work.title}</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(245,240,232,0.5)" }}>{work.client}</div>
        {hovered && (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "12px" }}>
            {work.tags.map(t => (
              <span key={t} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", color: "#00FFDC", border: "1px solid rgba(0,255,220,0.3)", padding: "3px 8px", letterSpacing: "0.08em" }}>{t}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// WORK PAGE
// ============================================================

function WorkPage({ setPage }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "Talking Head", "Short-form", "Brand Film"];
  const filtered = activeFilter === "All" ? WORKS : WORKS.filter(w => w.type === activeFilter);

  return (
    <div style={{ minHeight: "100vh", background: "#060608", paddingTop: "120px" }}>
      <div style={{ padding: "0 40px 40px" }}>
        <SectionLabel>Selected Work · 2024–2026</SectionLabel>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 6vw, 72px)", color: "#F5F0E8", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 48px" }}>
          The reel speaks.<br />
          <span style={{ color: "#00FFDC", fontStyle: "italic" }}>Numbers confirm.</span>
        </h1>

        {/* Filter bar */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "60px", flexWrap: "wrap" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{ background: activeFilter === f ? "#00FFDC" : "transparent", color: activeFilter === f ? "#060608" : "rgba(245,240,232,0.5)", border: "1px solid", borderColor: activeFilter === f ? "#00FFDC" : "rgba(255,255,255,0.1)", padding: "8px 20px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.2s" }}>
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2px" }}>
          {filtered.map((w, i) => <WorkCard key={w.id} work={w} index={i} onClick={() => {}} />)}
        </div>

        {/* Placeholder for more work */}
        <div style={{ marginTop: "80px", border: "1px dashed rgba(255,255,255,0.1)", padding: "60px", textAlign: "center" }}>
          <Timecode value="More work being added" />
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(245,240,232,0.4)", fontSize: "14px", marginTop: "16px" }}>
            Replace the thumbnail URLs and embed links in the WORKS array with your actual portfolio pieces.
          </p>
        </div>

        {/* CTA */}
        <div style={{ marginTop: "80px", textAlign: "center" }}>
          <button onClick={() => setPage("contact")} style={{ background: "#00FFDC", color: "#060608", border: "none", padding: "16px 40px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Work Together →
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SERVICES PAGE
// ============================================================

function ServicesPage({ setPage }) {
  return (
    <div style={{ minHeight: "100vh", background: "#060608", paddingTop: "120px" }}>
      <div style={{ padding: "0 40px 100px" }}>
        <SectionLabel>Services & Pricing</SectionLabel>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 6vw, 72px)", color: "#F5F0E8", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 16px" }}>
          Fixed offers.<br />
          <span style={{ color: "#00FFDC", fontStyle: "italic" }}>Clear outcomes.</span>
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: "rgba(245,240,232,0.5)", maxWidth: "520px", lineHeight: 1.7, marginBottom: "80px" }}>
          No vague "editing packages". Three offers built for founders who want content that actually performs — not just content that exists.
        </p>

        {/* Services grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          {SERVICES.map(s => (
            <div key={s.id} style={{ background: s.highlight ? "rgba(0,255,220,0.03)" : "#060608", padding: "56px 40px", position: "relative", borderTop: s.highlight ? "2px solid #00FFDC" : "2px solid transparent" }}>
              {s.highlight && <div style={{ position: "absolute", top: "-1px", left: "40px", background: "#00FFDC", color: "#060608", padding: "2px 12px", fontSize: "10px", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}>MOST POPULAR</div>}

              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "rgba(0,255,220,0.5)", marginBottom: "20px" }}>{s.label}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", color: "#F5F0E8", marginBottom: "8px" }}>{s.name}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(245,240,232,0.4)", marginBottom: "32px", letterSpacing: "0.05em" }}>{s.tagline}</div>

              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", color: "#00FFDC", marginBottom: "32px" }}>
                {s.price}
                <span style={{ fontSize: "16px", color: "rgba(0,255,220,0.6)", fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}>{s.period}</span>
              </div>

              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(245,240,232,0.6)", lineHeight: 1.8, marginBottom: "32px" }}>{s.pitch}</p>

              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "24px", marginBottom: "40px" }}>
                {s.deliverables.map(d => (
                  <div key={d} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "12px" }}>
                    <CyanDot />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(245,240,232,0.7)" }}>{d}</span>
                  </div>
                ))}
              </div>

              <button onClick={() => setPage("contact")} style={{ width: "100%", background: s.highlight ? "#00FFDC" : "transparent", color: s.highlight ? "#060608" : "#00FFDC", border: "1px solid #00FFDC", padding: "14px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: s.highlight ? 700 : 400, letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.2s" }}>
                {s.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div style={{ marginTop: "80px" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#F5F0E8", marginBottom: "32px" }}>Also available</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
            {[["Single Reel", "₹2,000–5,000"], ["YouTube Edit", "₹3,000–8,000"], ["Brand Film", "₹25,000–50,000"], ["Color Grade", "Quote on request"]].map(([name, price]) => (
              <div key={name} style={{ background: "#060608", padding: "32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(245,240,232,0.7)" }}>{name}</span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: "#00FFDC" }}>{price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginTop: "80px", maxWidth: "640px" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#F5F0E8", marginBottom: "40px" }}>Frequently asked</div>
          {[
            ["Do I need to send camera footage?", "No. Phone footage, Loom recordings, podcast video — anything works. Format doesn't matter; content does."],
            ["How fast is your turnaround?", "Hook Surgery: 48 hours. Retention Engine deliveries: within the agreed weekly schedule. Rush options available."],
            ["Can I start with one reel before committing?", "Yes — that's what Hook Surgery is for. It's designed as a risk-free entry point."],
            ["Do you work with Western/global clients?", "Yes. Primary focus is Indian SaaS founders and creators, but I work globally. Payments via bank transfer, UPI, or Wise."],
          ].map(([q, a]) => (
            <div key={q} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "28px", marginBottom: "28px" }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#F5F0E8", marginBottom: "10px", fontWeight: 600 }}>{q}</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(245,240,232,0.55)", lineHeight: 1.7 }}>{a}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PROCESS PAGE
// ============================================================

function ProcessPage({ setPage }) {
  return (
    <div style={{ minHeight: "100vh", background: "#060608", paddingTop: "120px" }}>
      <div style={{ padding: "0 40px 100px" }}>
        <SectionLabel>How It Works</SectionLabel>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px, 6vw, 72px)", color: "#F5F0E8", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 80px" }}>
          Simple for you.<br />
          <span style={{ color: "#00FFDC", fontStyle: "italic" }}>Precise on my end.</span>
        </h1>

        {/* Steps */}
        <div style={{ maxWidth: "720px" }}>
          {PROCESS_STEPS.map((step, i) => (
            <div key={step.n} style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "32px", marginBottom: "64px", position: "relative" }}>
              {/* Vertical connector */}
              {i < PROCESS_STEPS.length - 1 && (
                <div style={{ position: "absolute", left: "39px", top: "48px", bottom: "-48px", width: "1px", background: "linear-gradient(to bottom, rgba(0,255,220,0.3), transparent)" }} />
              )}
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "48px", color: "rgba(0,255,220,0.15)", fontWeight: 700, lineHeight: 1 }}>{step.n}</div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#F5F0E8", marginBottom: "12px" }}>{step.title}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(245,240,232,0.6)", lineHeight: 1.8 }}>{step.body}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tools section */}
        <div style={{ marginTop: "80px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "80px" }}>
          <SectionLabel>Tools & Stack</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.06)", maxWidth: "800px" }}>
            {[["DaVinci Resolve", "Primary editing + color"], ["After Effects", "Motion graphics"], ["Premiere Pro", "Client preference"], ["Photoshop", "Thumbnails + assets"], ["Mac Mini M4", "24GB RAM workstation"], ["Adobe Express", "Social graphics"]].map(([tool, role]) => (
              <div key={tool} style={{ background: "#060608", padding: "24px" }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#F5F0E8", marginBottom: "4px" }}>{tool}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(245,240,232,0.4)" }}>{role}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: "80px" }}>
          <button onClick={() => setPage("contact")} style={{ background: "#00FFDC", color: "#060608", border: "none", padding: "16px 40px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Start a Project →
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ABOUT PAGE
// ============================================================

function AboutPage({ setPage }) {
  return (
    <div style={{ minHeight: "100vh", background: "#060608", paddingTop: "120px" }}>
      <div style={{ padding: "0 40px 100px" }}>
        <SectionLabel>About</SectionLabel>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "start" }} className="about-grid">
          {/* Left — text */}
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 60px)", color: "#F5F0E8", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 32px", lineHeight: 1.1 }}>
              Kislay.<br />
              <span style={{ color: "#00FFDC", fontStyle: "italic" }}>Editor. Colorist.<br />Cinematographer.</span>
            </h1>

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: "rgba(245,240,232,0.65)", lineHeight: 1.9, marginBottom: "24px" }}>
              I'm a Delhi-based video editor, colorist, and cinematographer with 2+ years across brand content, reels, YouTube, wedding films, and cinematic projects. I work under the brand <strong style={{ color: "#F5F0E8" }}>Frames by Kislay</strong> — a one-person creative studio built for founders who want editorial-quality content without the agency overhead.
            </p>

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: "rgba(245,240,232,0.65)", lineHeight: 1.9, marginBottom: "24px" }}>
              My primary tool is DaVinci Resolve. I think in color, rhythm, and pacing. I'm not a button-pusher — I watch your content, diagnose what's losing viewers, and build the edit around that diagnosis.
            </p>

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: "rgba(245,240,232,0.65)", lineHeight: 1.9, marginBottom: "48px" }}>
              I also run <strong style={{ color: "#F5F0E8" }}>Gande Bande</strong>, a music label with one artist currently in production. The aesthetic sensibility I've built through that work feeds directly into how I edit for founders.
            </p>

            <button onClick={() => setPage("contact")} style={{ background: "transparent", border: "1px solid #00FFDC", color: "#00FFDC", padding: "14px 32px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", transition: "all 0.2s" }}>
              Let's Talk →
            </button>
          </div>

          {/* Right — photo placeholder + details */}
          <div>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", aspectRatio: "3/4", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "32px" }}>
              <div style={{ textAlign: "center" }}>
                <Timecode value="Your photo here" />
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(245,240,232,0.3)", marginTop: "12px" }}>Replace with your portrait</p>
              </div>
            </div>

            {/* Detail grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
              {[["Based in", "Delhi NCR, India"], ["Primary tool", "DaVinci Resolve"], ["Experience", "2+ years"], ["Available for", "Remote · Hybrid"]].map(([k, v]) => (
                <div key={k} style={{ background: "#060608", padding: "20px" }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(0,255,220,0.5)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>{k}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#F5F0E8" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Positioning statement */}
        <div style={{ marginTop: "100px", borderLeft: "2px solid #00FFDC", paddingLeft: "32px", maxWidth: "640px" }}>
          <blockquote style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(18px, 3vw, 26px)", color: "#F5F0E8", fontStyle: "italic", lineHeight: 1.5, margin: 0 }}>
            "I help SaaS founders and creators turn raw footage into content that actually converts — fast turnaround, cinematic quality, one editor who gets your brand."
          </blockquote>
        </div>
      </div>
      <style>{`.about-grid { @media (max-width: 768px) { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

// ============================================================
// CONTACT PAGE
// ============================================================

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handle = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const submit = (e) => { e.preventDefault(); setSubmitted(true); };

  const inputStyle = {
    width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
    color: "#F5F0E8", padding: "14px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: "14px",
    outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
  };

  return (
    <div style={{ minHeight: "100vh", background: "#060608", paddingTop: "120px" }}>
      <div style={{ padding: "0 40px 100px", maxWidth: "1100px" }}>
        <SectionLabel>Get In Touch</SectionLabel>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }} className="contact-grid">
          {/* Left */}
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 60px)", color: "#F5F0E8", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 32px", lineHeight: 1.1 }}>
              Ready to start?<br />
              <span style={{ color: "#00FFDC", fontStyle: "italic" }}>Let's talk.</span>
            </h1>

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", color: "rgba(245,240,232,0.6)", lineHeight: 1.8, marginBottom: "48px" }}>
              Tell me what you're working on. I'll respond within 24 hours with next steps — or a sample re-cut if you send a reel.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {[["Instagram", "@vettedframes", "https://instagram.com/vettedframes"], ["Email", "Available on request", null]].map(([platform, handle, href]) => (
                <div key={platform} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "40px", height: "40px", border: "1px solid rgba(0,255,220,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Timecode value={platform[0]} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(0,255,220,0.5)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{platform}</div>
                    {href ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#F5F0E8", textDecoration: "none" }}>{handle}</a>
                      : <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#F5F0E8" }}>{handle}</div>}
                  </div>
                </div>
              ))}
            </div>

            {/* Offer reminder */}
            <div style={{ marginTop: "48px", background: "rgba(0,255,220,0.04)", border: "1px solid rgba(0,255,220,0.15)", padding: "24px" }}>
              <Timecode value="Start here if unsure" />
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: "#F5F0E8", margin: "12px 0 8px" }}>Hook Surgery — ₹3,000</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(245,240,232,0.55)" }}>3 reels, 48 hours. No commitment. The lowest-risk way to see if we work well together.</div>
            </div>
          </div>

          {/* Right — Form */}
          <div>
            {submitted ? (
              <div style={{ border: "1px solid rgba(0,255,220,0.3)", padding: "60px 40px", textAlign: "center" }}>
                <div style={{ fontSize: "48px", marginBottom: "24px" }}>✓</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#F5F0E8", marginBottom: "16px" }}>Message sent.</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(245,240,232,0.55)" }}>I'll be in touch within 24 hours.</div>
              </div>
            ) : (
              <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(0,255,220,0.6)", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>Name</label>
                  <input required value={form.name} onChange={handle("name")} placeholder="Your name" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "#00FFDC"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                </div>
                <div>
                  <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(0,255,220,0.6)", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>Email</label>
                  <input required type="email" value={form.email} onChange={handle("email")} placeholder="your@email.com" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "#00FFDC"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                </div>
                <div>
                  <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(0,255,220,0.6)", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>Service</label>
                  <select value={form.service} onChange={handle("service")} style={{ ...inputStyle, appearance: "none" }}>
                    <option value="">Select a service</option>
                    <option>Hook Surgery — ₹3,000</option>
                    <option>Retention Engine — ₹12,000/mo</option>
                    <option>Done-For-You — ₹25,000/mo</option>
                    <option>Something else</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(0,255,220,0.6)", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>Message</label>
                  <textarea required value={form.message} onChange={handle("message")} rows={5} placeholder="Tell me about your content, niche, and what you're trying to fix..." style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={e => e.target.style.borderColor = "#00FFDC"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
                </div>
                <button type="submit" style={{ background: "#00FFDC", color: "#060608", border: "none", padding: "16px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", transition: "background 0.2s", marginTop: "8px" }}
                  onMouseEnter={e => { e.target.style.background = "#F5F0E8"; }}
                  onMouseLeave={e => { e.target.style.background = "#00FFDC"; }}>
                  Send Message →
                </button>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(245,240,232,0.3)", textAlign: "center", margin: 0 }}>I respond within 24 hours. No spam. No agency pitch.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// FOOTER
// ============================================================

function Footer({ setPage }) {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "60px 40px 40px", background: "#060608" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "40px", marginBottom: "48px" }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#F5F0E8", marginBottom: "8px" }}>Frames by Kislay</div>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(245,240,232,0.4)", maxWidth: "280px", lineHeight: 1.7 }}>
            Video editing for SaaS founders and creators. Delhi NCR, India.
          </div>
        </div>
        <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(0,255,220,0.5)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>Pages</div>
            {NAV_LINKS.map(l => (
              <button key={l} onClick={() => setPage(l.toLowerCase())} style={{ display: "block", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(245,240,232,0.5)", marginBottom: "10px", padding: 0, textAlign: "left" }}>{l}</button>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", color: "rgba(0,255,220,0.5)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "16px" }}>Connect</div>
            <a href="https://instagram.com/vettedframes" target="_blank" rel="noopener noreferrer" style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(245,240,232,0.5)", textDecoration: "none", marginBottom: "10px" }}>Instagram</a>
            <a href="#" style={{ display: "block", fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(245,240,232,0.5)", textDecoration: "none", marginBottom: "10px" }}>LinkedIn</a>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <Timecode value={`© ${new Date().getFullYear()} Frames by Kislay · All rights reserved`} />
        <Timecode value="Delhi NCR · India · framesbykislay.com" />
      </div>
    </footer>
  );
}

// ============================================================
// GOOGLE FONTS LOADER
// ============================================================

function FontLoader() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600&family=DM+Mono&display=swap";
    document.head.appendChild(link);
  }, []);
  return null;
}

// ============================================================
// ROOT APP
// ============================================================

export default function App() {
  const [page, setPage] = useState("home");

  // Scroll to top on page change
  const changePage = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };

  const pages = {
    home: <HomePage setPage={changePage} />,
    work: <WorkPage setPage={changePage} />,
    services: <ServicesPage setPage={changePage} />,
    process: <ProcessPage setPage={changePage} />,
    about: <AboutPage setPage={changePage} />,
    contact: <ContactPage />,
  };

  return (
    <>
      <FontLoader />
      <GrainOverlay />
      <div style={{ background: "#060608", minHeight: "100vh" }}>
        <Nav active={page} setPage={changePage} />
        {pages[page] || pages.home}
        <Footer setPage={changePage} />
      </div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060608; overflow-x: hidden; }
        ::selection { background: rgba(0,255,220,0.3); color: #F5F0E8; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #060608; }
        ::-webkit-scrollbar-thumb { background: rgba(0,255,220,0.3); }
        @media (max-width: 768px) {
          .about-grid, .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
