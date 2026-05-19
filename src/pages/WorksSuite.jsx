import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { HardHat, FileText, GanttChart, ArrowRight, CheckCircle, Download } from "lucide-react";
import { generateFieldworksSlipSheet } from "@/functions/generateFieldworksSlipSheet";
import Philosophy from "@/components/worksuite/Philosophy";
import IntegrationDepth from "@/components/worksuite/IntegrationDepth";
import BuiltForIndustries from "@/components/worksuite/BuiltForIndustries";
import Capabilities from "@/components/worksuite/Capabilities";
import ComparisonMatrix from "@/components/worksuite/ComparisonMatrix";
import Deployment from "@/components/worksuite/Deployment";

const NAVY = '#0a1628';
const NAVY2 = '#0d1f3c';
const GOLD = '#C8922A';
const CREAM = '#FAF8F4';
const CREAM_DEEP = '#EEE9E2';
const INDIGO = '#3D3B8E';
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
        <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full blur-[140px]" style={{ background: `${GOLD}1c` }} />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: `${GOLD}10` }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full flex flex-col justify-center min-h-[80vh]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-[1px]" style={{ background: GOLD }} />
            <span className="text-[10px] tracking-[0.3em] uppercase font-semibold" style={{ color: `${GOLD}cc` }}>The Works Suite · By Fuzion Consulting Group</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-[6.5rem] font-medium tracking-tight leading-[1.05] mb-8 text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Enterprise software for<br />
            <em className="italic font-semibold" style={{ color: GOLD }}>how the work actually gets done.</em>
          </h1>

          <p className="text-white/75 text-base sm:text-[17px] max-w-2xl mb-12 leading-relaxed font-normal">
            A suite of purpose-built applications for construction, engineering, and utility programs — designed by people who have spent 35+ years inside large-scale projects. Field, document, and program management, deployable in our tenant or yours.
          </p>

          <div className="flex flex-wrap items-center gap-6 mb-14">
            {["Field", "Document", "Program", "Integration"].map((val, i) => (
              <div key={val} className="flex items-center gap-6">
                <span className="text-[11px] tracking-[0.25em] uppercase font-semibold" style={{ color: GOLD }}>{val}</span>
                {i < 3 && <div className="w-px h-3 bg-white/20" />}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#products" className="inline-flex items-center justify-center gap-3 px-8 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5" style={{ background: GOLD }}>
              Explore the Suite →
            </a>
            <a href="#philosophy" className="inline-flex items-center justify-center gap-3 border px-8 py-3.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-white hover:bg-white/10 transition-all duration-300" style={{ borderColor: 'rgba(255,255,255,0.3)' }}>
              How We Build
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── QUOTE BANNER ───────────────────────────────────────────────────────────
function QuoteBanner() {
  return (
    <div style={{ background: GOLD }} className="py-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center md:text-left">
        <span className="text-white/85 text-[13px] font-bold tracking-[0.25em] uppercase whitespace-nowrap">Built by Fuzion Consulting Group</span>
        <span className="hidden md:block w-px h-5 bg-white/35" />
        <p className="text-white text-lg md:text-[19px] italic font-medium leading-relaxed max-w-3xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          "Modern platforms that streamline approvals, documentation, scheduling, and delivery — built for regulated, high-stakes environments."
        </p>
      </div>
    </div>
  );
}

// ─── PRODUCTS ────────────────────────────────────────────────────────────────
function ProductsSection() {
  const [downloading, setDownloading] = useState(false);
  const handleDownloadFieldworks = async () => {
    if (downloading) return;
    setDownloading(true);
    try {
      const res = await generateFieldworksSlipSheet({});
      const blob = res.data instanceof Blob ? res.data : new Blob([res.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Fuzion365-Fieldworks-Brief.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(false);
    }
  };

  const products = [
    {
      eyebrow: "Field Productivity",
      name: "Fuzion365 Fieldworks",
      status: "Live",
      statusColor: TEAL,
      accent: NAVY,
      icon: HardHat,
      tagline: "M365-integrated field management.",
      desc: "Field productivity portals and dashboards with deep Microsoft 365 integration and Bluebeam connectivity. Available now in modular deployment — pick the modules your program needs.",
      features: ["Microsoft 365 native integration", "Bluebeam connectivity", "Field dashboards & site portals", "Modular module deployment", "PowerApps-extensible"],
      link: "#contact",
      linkLabel: "Talk to a consultant",
      hasBrief: true,
    },
    {
      eyebrow: "Document & Construction Management",
      name: "Construct Works",
      status: "January 2027",
      statusColor: GOLD,
      accent: GOLD,
      icon: FileText,
      tagline: "AI-powered document & construction management.",
      desc: "A modern document and construction management platform with AI-driven document understanding, custom forms, configurable workflows, and rich metadata. In final development — built for EPC, utility, and regulated programs.",
      features: ["AI document understanding & extraction", "Custom forms & workflows", "Approvals, RFIs, submittals, transmittals", "Configurable metadata & taxonomies", "Audit-grade event log"],
      link: "#contact",
      linkLabel: "Request a preview",
    },
    {
      eyebrow: "Program Management & Forecasting",
      name: "ProjectWorks",
      status: "January 2027",
      statusColor: INDIGO,
      accent: INDIGO,
      icon: GanttChart,
      tagline: "Long-range forecasting. Stage Gate 1–5.",
      desc: "Program management built for Stage Gate 1–5 portfolios with long-range forecasting and native connectivity to SAP, Oracle, Maximo, and Microsoft 365. SaaS-ready, deployable in our tenant or yours.",
      features: ["Stage Gate 1–5 lifecycle management", "Long-range forecasting & scenario planning", "SAP / Oracle / Maximo integration", "Native M365 connectivity", "SaaS or private-tenant deployment"],
      link: "#contact",
      linkLabel: "Schedule a walkthrough",
    },
  ];

  return (
    <section id="products" className="py-32" style={{ background: CREAM_DEEP }}>
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-16 items-end">
            <div className="lg:w-1/2">
              <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>The Suite</p>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
                Three products.<br />One foundation.
              </h2>
            </div>
            <div className="lg:w-1/2 pb-2">
              <p className="text-gray-600 text-base leading-relaxed font-normal">
                Each product is deployable on its own — or as a unified program platform. Same architecture, same data model, same engineering discipline. Built to scale from a single project to a regional program.
              </p>
            </div>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 lg:grid-cols-3 border border-gray-200">
          {products.map((p, i) => (
            <AnimatedElement key={i} delay={i * 120} className="h-full">
              <div className="p-8 h-full flex flex-col border-r border-b border-gray-200 last:border-r-0 hover:shadow-md transition-shadow duration-300 group" style={{ background: CREAM }}>
                <div className="h-1 w-12 mb-6" style={{ background: p.accent }} />
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 border border-gray-200 flex items-center justify-center">
                    <p.icon className="w-4 h-4" style={{ color: p.accent }} />
                  </div>
                  <span className="text-[9px] font-bold tracking-[0.15em] uppercase px-2 py-0.5" style={{ background: `${p.statusColor}18`, color: p.statusColor }}>{p.status}</span>
                </div>
                <p className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-2" style={{ color: GOLD }}>{p.eyebrow}</p>
                <h3 className="text-2xl font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>{p.name}</h3>
                <p className="text-[15px] italic mb-5 font-medium" style={{ color: NAVY, fontFamily: "'Cormorant Garamond', serif" }}>{p.tagline}</p>
                <p className="text-gray-600 text-[14px] leading-relaxed mb-6 font-normal">{p.desc}</p>
                <ul className="space-y-2 mb-8 flex-1">
                  {p.features.map((f, fi) => (
                    <li key={fi} className="flex items-start gap-3 text-[13px] text-gray-700 font-normal">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: p.accent }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-3">
                  <a href={p.link} className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.15em] uppercase hover:opacity-70 transition-opacity" style={{ color: p.accent }}>
                    {p.linkLabel} <ArrowRight className="w-3 h-3" />
                  </a>
                  {p.hasBrief && (
                    <button
                      onClick={handleDownloadFieldworks}
                      disabled={downloading}
                      className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.15em] uppercase border px-3 py-2 hover:bg-gray-50 transition-colors disabled:opacity-50 self-start"
                      style={{ borderColor: p.accent, color: p.accent }}
                    >
                      <Download className="w-3 h-3" />
                      {downloading ? 'Generating...' : 'Download Product Brief'}
                    </button>
                  )}
                </div>
              </div>
            </AnimatedElement>
          ))}
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
                Bring The Works<br />Suite to your<br />program.
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-10 font-normal">
                Whether you are running a Stage Gate portfolio, a regional construction program, or a utility-scale capital plan — we want to hear what you are building, and how the suite can help.
              </p>
              <div className="space-y-4">
                <a href="https://fuzionconsultinggroup.com/" target="_blank" rel="noopener noreferrer" className="block text-[15px] font-semibold tracking-wide hover:opacity-70 transition-opacity" style={{ color: NAVY }}>
                  fuzionconsultinggroup.com →
                </a>
                <a href="https://fuzionchickasawgroup.com/" target="_blank" rel="noopener noreferrer" className="block text-[15px] font-semibold tracking-wide hover:opacity-70 transition-opacity" style={{ color: NAVY }}>
                  fuzionchickasawgroup.com →
                </a>
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
                    <p className="text-gray-600 text-base font-normal">Thank you for reaching out. We will be in touch soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-gray-400 text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block">First Name</label>
                        <input type="text" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} className="w-full border border-gray-200 text-sm px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors" style={{ color: NAVY, background: CREAM }} required />
                      </div>
                      <div>
                        <label className="text-gray-400 text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block">Last Name</label>
                        <input type="text" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} className="w-full border border-gray-200 text-sm px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors" style={{ color: NAVY, background: CREAM }} required />
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-400 text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block">Organization</label>
                      <input type="text" value={form.organization} onChange={e => setForm({...form, organization: e.target.value})} className="w-full border border-gray-200 text-sm px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors" style={{ color: NAVY, background: CREAM }} />
                    </div>
                    <div>
                      <label className="text-gray-400 text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block">Email Address</label>
                      <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border border-gray-200 text-sm px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors" style={{ color: NAVY, background: CREAM }} required />
                    </div>
                    <div>
                      <label className="text-gray-400 text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block">I am interested in</label>
                      <select value={form.interest} onChange={e => setForm({...form, interest: e.target.value})} className="w-full border border-gray-200 text-sm px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors appearance-none" style={{ color: NAVY, background: CREAM }}>
                        <option value="">Select one...</option>
                        <option>Fuzion365 Fieldworks</option>
                        <option>Construct Works</option>
                        <option>ProjectWorks</option>
                        <option>The Full Suite</option>
                        <option>Integration / Custom Engagement</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-400 text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block">Message</label>
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

export default function WorksSuite() {
  return (
    <div className="min-h-screen" style={{ background: CREAM_DEEP }}>
      <HeroSection />
      <QuoteBanner />
      <Philosophy />
      <IntegrationDepth />
      <ProductsSection />
      <BuiltForIndustries />
      <Capabilities />
      <ComparisonMatrix />
      <Deployment />
      <ContactSection />
    </div>
  );
}