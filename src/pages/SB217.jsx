import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Flame, Anchor, Truck, Users, Heart, ArrowRight, CheckCircle, Calendar, MapPin, Database, Shield } from "lucide-react";
import FoundingStory from "@/components/sb217/FoundingStory";

const NAVY = '#0a1628';
const NAVY2 = '#0d1f3c';
const GOLD = '#C8922A';
const CREAM = '#FAF8F4';
const CREAM_DEEP = '#EEE9E2';
const TEAL = '#1A8A6E';

function AnimatedElement({ children, className, delay = 0 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) { setIsVisible(true); return; }
    const fallback = setTimeout(() => setIsVisible(true), 200);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { clearTimeout(fallback); setTimeout(() => setIsVisible(true), delay); observer.unobserve(el); }
    }, { threshold: 0.05, rootMargin: '0px 0px 200px 0px' });
    observer.observe(el);
    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, [delay]);
  return (
    <div ref={ref} className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className || ''}`}>
      {children}
    </div>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20" style={{ background: `linear-gradient(160deg, ${NAVY} 0%, ${NAVY2} 100%)` }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full blur-[140px]" style={{ background: `${GOLD}22` }} />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: `${GOLD}14` }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full flex flex-col justify-center min-h-[80vh]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-[1px]" style={{ background: GOLD }} />
            <span className="text-[10px] tracking-[0.3em] uppercase font-semibold" style={{ color: `${GOLD}cc` }}>SB217 Platform · sb217platform.com</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-[6.5rem] font-medium tracking-tight leading-[1.05] mb-8 text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Born from the<br />
            <em className="italic font-semibold" style={{ color: GOLD }}>Ranger Road Fire.</em>
          </h1>

          <p className="text-white/75 text-base sm:text-[17px] max-w-xl mb-12 leading-relaxed font-normal">
            A disaster relief and logistics technology platform built in six weeks — by a team that drove their own trucks into Gate, Oklahoma, and decided showing up wasn't enough. The work had to scale.
          </p>

          <div className="flex flex-wrap items-center gap-6 mb-14">
            {["2/17/2026", "Gate, Oklahoma", "6 Weeks", "$0 Billed"].map((val, i) => (
              <div key={val} className="flex items-center gap-6">
                <span className="text-[11px] tracking-[0.25em] uppercase font-semibold" style={{ color: GOLD }}>{val}</span>
                {i < 3 && <div className="w-px h-3 bg-white/20" />}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#products" className="inline-flex items-center justify-center gap-3 px-8 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5" style={{ background: GOLD }}>
              Explore the Platform →
            </a>
            <a href="#origin" className="inline-flex items-center justify-center gap-3 border px-8 py-3.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-white hover:bg-white/10 transition-all duration-300" style={{ borderColor: 'rgba(255,255,255,0.3)' }}>
              Read the Origin
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── ORIGIN — GOLD BANNER ───────────────────────────────────────────────────
function OriginBanner() {
  return (
    <div style={{ background: GOLD }} className="py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center md:text-left">
        <span className="text-white/85 text-[13px] font-bold tracking-[0.25em] uppercase whitespace-nowrap flex items-center gap-2">
          <Flame className="w-4 h-4" /> February 17, 2026
        </span>
        <span className="hidden md:block w-px h-5 bg-white/35" />
        <p className="text-white text-lg md:text-[19px] italic font-medium leading-relaxed max-w-3xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          "This application is better than many of the enterprise logistics tools I have ever seen."
        </p>
        <span className="hidden md:block w-px h-5 bg-white/35" />
        <span className="text-white/85 text-[10px] font-bold tracking-[0.25em] uppercase whitespace-nowrap">— Rancher Navy</span>
      </div>
    </div>
  );
}

// ─── PRODUCTS ────────────────────────────────────────────────────────────────
function ProductsSection() {
  const products = [
    {
      eyebrow: "For Nonprofits · 501(c)(3)",
      name: "Support Beacon Relief",
      status: "In Testing",
      statusColor: GOLD,
      accent: TEAL,
      tagline: "The platform born from the Ranger Road Fire.",
      desc: "Full-stack disaster logistics for nonprofits. Donor management, volunteer coordination, DOT-integrated hauler dispatch, live tracking, and mobile applications. Built for Rancher Navy — adaptable to any agricultural or disaster-response nonprofit.",
      features: ["Donor & sponsor management", "Volunteer dispatch & coordination", "DOT-integrated hauler tracking", "Real-time logistics dashboard", "iOS & Android applications"],
      link: "https://www.supportbeaconrelief.com/",
      linkLabel: "supportbeaconrelief.com",
    },
    {
      eyebrow: "For Enterprise · Spring 2027",
      name: "Support Beacon Logistics",
      status: "Spring 2027",
      statusColor: '#6366f1',
      accent: NAVY,
      tagline: "Enterprise logistics at relief-operation scale.",
      desc: "The enterprise sibling of SBR. Designed for large-scale hauling, relief operations, and logistics programs that need DOT integration, fleet visibility, mobile dispatch, and audit-grade reporting.",
      features: ["Enterprise fleet management", "DOT compliance & reporting", "Live tracking at scale", "Mobile dispatch applications", "Audit-grade event log"],
      link: "#contact",
      linkLabel: "Inquire about SBL",
    },
  ];

  return (
    <section id="products" className="py-32" style={{ background: CREAM_DEEP }}>
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-16 items-end">
            <div className="lg:w-1/2">
              <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>The Platform</p>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
                Two products.<br />One platform.
              </h2>
            </div>
            <div className="lg:w-1/2 pb-2">
              <p className="text-base leading-relaxed font-normal" style={{ color: NAVY, opacity: 0.75 }}>
                SB217 is the parent. Support Beacon Relief serves nonprofits. Support Beacon Logistics serves enterprise. Both share the same engineering foundation — proven in the field, hardened in disaster response.
              </p>
            </div>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-gray-200">
          {products.map((p, i) => (
            <AnimatedElement key={i} delay={i * 120} className="h-full">
              <div className="p-10 h-full flex flex-col border-r border-b border-gray-200 last:border-r-0 hover:shadow-md transition-shadow duration-300 group" style={{ background: CREAM }}>
                <div className="h-1 w-12 mb-6" style={{ background: p.accent }} />
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: GOLD }}>{p.eyebrow}</p>
                  <span className="text-[9px] font-bold tracking-[0.15em] uppercase px-2 py-0.5" style={{ background: `${p.statusColor}18`, color: p.statusColor }}>{p.status}</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>{p.name}</h3>
                <p className="text-base italic mb-5 font-medium" style={{ color: NAVY, fontFamily: "'Cormorant Garamond', serif" }}>{p.tagline}</p>
                <p className="text-[15px] leading-relaxed mb-6 font-normal" style={{ color: NAVY, opacity: 0.75 }}>{p.desc}</p>
                <ul className="space-y-2 mb-8 flex-1">
                  {p.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-3 text-[14px] font-normal" style={{ color: NAVY, opacity: 0.8 }}>
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: p.accent }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href={p.link} target={p.link.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.15em] uppercase hover:opacity-70 transition-opacity" style={{ color: p.accent }}>
                  {p.linkLabel} <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CAPABILITIES ────────────────────────────────────────────────────────────
function CapabilitiesSection() {
  const capabilities = [
    { icon: Users, title: "Donor Management", desc: "Track sponsors, recurring givers, and one-time donors. Built for nonprofits that grew up on spreadsheets and outgrew them." },
    { icon: Truck, title: "Hauler Dispatch", desc: "DOT-integrated dispatch with live tracking. Verify carrier compliance before they leave the lot." },
    { icon: Database, title: "Volunteer Coordination", desc: "Schedule, assign, and track volunteer hours. Communications built in." },
    { icon: MapPin, title: "Live Logistics", desc: "Real-time tracking of trucks, loads, and deliveries. Mobile-first for the field." },
    { icon: Calendar, title: "Event & Drive Management", desc: "Run hay drives, fundraisers, and supply runs with structured workflows instead of group texts." },
    { icon: Shield, title: "Audit-Grade Reporting", desc: "Every donation, every dispatch, every delivery — logged for 501(c)(3) compliance and donor transparency." },
  ];

  return (
    <section id="capabilities" className="py-32" style={{ background: CREAM }}>
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>Capabilities</p>
          <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium mb-6 leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
            What the platform does.
          </h2>
          <p className="text-base leading-relaxed mb-16 max-w-2xl font-normal" style={{ color: NAVY, opacity: 0.75 }}>
            Every capability was specified, designed, and shipped in response to a real problem Rancher Navy was solving by hand. There is no theoretical feature in SB217. Every line was earned.
          </p>
        </AnimatedElement>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-gray-200">
          {capabilities.map((c, i) => (
            <AnimatedElement key={i} delay={i * 80}>
              <div className="p-8 border-r border-b border-gray-200 hover:shadow-sm transition-shadow duration-300 h-full" style={{ background: CREAM }}>
                <div className="w-10 h-10 border border-gray-200 flex items-center justify-center mb-6">
                  <c.icon className="w-4 h-4" style={{ color: GOLD }} />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>{c.title}</h3>
                <p className="text-[14px] leading-relaxed font-normal" style={{ color: NAVY, opacity: 0.75 }}>{c.desc}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── RANCHER NAVY PARTNER ───────────────────────────────────────────────────
function PartnerSection() {
  return (
    <section id="partner" className="py-32" style={{ background: CREAM }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          <div className="lg:col-span-6">
            <AnimatedElement>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-6 font-semibold" style={{ color: GOLD }}>Founding Partner</p>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium mb-8 leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
                The nonprofit that<br />opened the door.
              </h2>
              <p className="text-base leading-relaxed mb-6 font-normal" style={{ color: NAVY, opacity: 0.75 }}>
                Rancher Navy is a Texas-based 501(c)(3) connecting donors, haulers, volunteers, and agricultural families in crisis. Co-founded by Morgan Broome and Amy Houston Gaddis — the two women whose phone call started everything.
              </p>
              <p className="text-base leading-relaxed font-normal" style={{ color: NAVY, opacity: 0.75 }}>
                SB217 was built for them. Every product decision starts with: "Does this help Rancher Navy do the work?"
              </p>
            </AnimatedElement>
          </div>
          <div className="lg:col-span-6">
            <AnimatedElement delay={200}>
              <div className="border border-gray-200 p-10 sm:p-12 shadow-sm hover:shadow-md transition-shadow duration-300" style={{ borderLeft: `4px solid ${TEAL}`, background: CREAM }}>
                <div className="flex items-center gap-3 mb-6">
                  <Anchor className="w-4 h-4" style={{ color: TEAL }} />
                  <span className="text-[11px] tracking-[0.15em] uppercase font-semibold" style={{ color: NAVY, opacity: 0.55 }}>Rancher Navy · 501(c)(3)</span>
                </div>
                <h3 className="text-3xl font-medium mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
                  Mobilizing relief<br />when it matters most.
                </h3>
                <p className="text-[15px] leading-relaxed mb-8 font-normal" style={{ color: NAVY, opacity: 0.75 }}>
                  Now powered by Support Beacon Relief — donor coordination, volunteer dispatch, and DOT-integrated hauling for agricultural communities in crisis.
                </p>
                <a href="https://ranchernavy.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase hover:opacity-70 transition-opacity" style={{ color: TEAL }}>
                  Visit Rancher Navy →
                </a>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({ firstName: "", lastName: "", organization: "", email: "", interest: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <section id="contact" className="py-32 border-t border-gray-200" style={{ background: CREAM }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <AnimatedElement>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>Get In Touch</p>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium mb-8 leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
                Bring SB217<br />to your mission.
              </h2>
              <p className="text-base leading-relaxed mb-10 font-normal" style={{ color: NAVY, opacity: 0.75 }}>
                Whether you are a 501(c)(3) that needs Support Beacon Relief, an enterprise exploring Support Beacon Logistics, or a partner who wants to help us scale what we built — we want to hear from you.
              </p>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <Heart className="w-4 h-4" style={{ color: GOLD }} />
                  <span className="text-[15px] font-semibold tracking-wide" style={{ color: NAVY }}>sb217platform.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <Anchor className="w-4 h-4" style={{ color: TEAL }} />
                  <span className="text-[15px] font-semibold tracking-wide" style={{ color: NAVY }}>ranchernavy.org</span>
                </div>
              </div>
            </AnimatedElement>
          </div>
          <div className="lg:col-span-7">
            <AnimatedElement delay={200}>
              <div className="border border-gray-200 p-8 sm:p-12 shadow-sm" style={{ background: CREAM }}>
                {submitted ? (
                  <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                    <div className="w-16 h-16 flex items-center justify-center mb-6 border border-gray-200">
                      <CheckCircle className="w-8 h-8" style={{ color: GOLD }} />
                    </div>
                    <h3 className="text-3xl font-medium mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>Message Sent</h3>
                    <p className="text-base font-normal" style={{ color: NAVY, opacity: 0.75 }}>Thank you for reaching out. We will be in touch soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block" style={{ color: NAVY, opacity: 0.55 }}>First Name</label>
                        <input type="text" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} className="w-full border border-gray-200 text-sm px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors" style={{ color: NAVY, background: CREAM }} required />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block" style={{ color: NAVY, opacity: 0.55 }}>Last Name</label>
                        <input type="text" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} className="w-full border border-gray-200 text-sm px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors" style={{ color: NAVY, background: CREAM }} required />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block" style={{ color: NAVY, opacity: 0.55 }}>Organization</label>
                      <input type="text" value={form.organization} onChange={e => setForm({...form, organization: e.target.value})} className="w-full border border-gray-200 text-sm px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors" style={{ color: NAVY, background: CREAM }} />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block" style={{ color: NAVY, opacity: 0.55 }}>Email Address</label>
                      <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border border-gray-200 text-sm px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors" style={{ color: NAVY, background: CREAM }} required />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block" style={{ color: NAVY, opacity: 0.55 }}>I am interested in</label>
                      <select value={form.interest} onChange={e => setForm({...form, interest: e.target.value})} className="w-full border border-gray-200 text-sm px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors appearance-none" style={{ color: NAVY, background: CREAM }}>
                        <option value="">Select one...</option>
                        <option>Support Beacon Relief (Nonprofit)</option>
                        <option>Support Beacon Logistics (Enterprise)</option>
                        <option>Partnership / Donor Inquiry</option>
                        <option>Media / Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block" style={{ color: NAVY, opacity: 0.55 }}>Message</label>
                      <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={5} className="w-full border border-gray-200 text-sm px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors resize-none" style={{ color: NAVY, background: CREAM }} required />
                    </div>
                    <button type="submit" className="px-8 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase text-white hover:-translate-y-0.5 hover:opacity-90 transition-all duration-300" style={{ background: NAVY }}>
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SB217() {
  return (
    <div className="min-h-screen" style={{ background: CREAM_DEEP }}>
      <HeroSection />
      <OriginBanner />
      <FoundingStory />
      <ProductsSection />
      <CapabilitiesSection />
      <PartnerSection />
      <ContactSection />
    </div>
  );
}