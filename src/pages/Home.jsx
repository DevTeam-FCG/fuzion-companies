import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Anchor, Globe, Building2, Zap, CheckCircle, ArrowRight } from "lucide-react";
import BeforeTheFire from "@/components/home/BeforeTheFire";

const NAVY = '#0a1628';
const NAVY2 = '#0d1f3c';
const GOLD = '#C8922A';
const CHICKASAW_INDIGO = '#3D3B8E';  // Chickasaw Nation flag indigo
const CHICKASAW_PURPLE = '#9B8EC4'; // Chickasaw seal inner rim (honor)

const PortfolioCompanyEntity = base44.entities.PortfolioCompany;
const LeadershipMemberEntity = base44.entities.LeadershipMember;

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

// ─── HERO — Dark Navy ────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20" style={{ background: `linear-gradient(160deg, ${NAVY} 0%, ${NAVY2} 100%)` }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full blur-[140px]" style={{ background: `${GOLD}18` }} />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: `${GOLD}0d` }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full flex flex-col justify-center min-h-[80vh]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-[1px]" style={{ background: GOLD }} />
            <span className="text-[10px] tracking-[0.3em] uppercase font-semibold" style={{ color: `${GOLD}cc` }}>Fuzion Companies · FuzionCompanies.com</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-[6.5rem] font-medium tracking-tight leading-[1.05] mb-8 text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Technology built on<br />
            <em className="italic font-semibold" style={{ color: GOLD }}>the conviction of showing up.</em>
          </h1>

          <p className="text-white/75 text-base sm:text-[17px] max-w-xl mb-12 leading-relaxed font-normal">
            A portfolio of technology, consulting, and mission-driven businesses united by a single conviction — that excellence and service are not competing values. They are the same thing.
          </p>

          <div className="flex flex-wrap items-center gap-6 mb-14">
            {["Faith", "Service", "Precision", "Community"].map((val, i) => (
              <div key={val} className="flex items-center gap-6">
                <span className="text-[11px] tracking-[0.25em] uppercase font-semibold" style={{ color: GOLD }}>{val}</span>
                {i < 3 && <div className="w-px h-3 bg-white/20" />}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#portfolio" className="inline-flex items-center justify-center gap-3 px-8 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5" style={{ background: GOLD }}>
              Explore the Portfolio →
            </a>
            <a href="#story" className="inline-flex items-center justify-center gap-3 border px-8 py-3.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-white hover:bg-white/10 transition-all duration-300" style={{ borderColor: 'rgba(255,255,255,0.3)' }}>
              Read Our Story
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── QUOTE BANNER — Gold ─── (Third-party trust signal — parent-brand appropriate)
function QuoteBanner() {
  return (
    <div style={{ background: GOLD }} className="py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
        <div className="flex-1 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
          <p className="text-white text-xl md:text-[22px] italic font-medium leading-snug max-w-3xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            "This application is better than many of the enterprise logistics tools I have ever seen."
          </p>
          <span className="text-white text-[11px] font-bold tracking-[0.22em] uppercase whitespace-nowrap lg:border-l lg:border-white/40 lg:pl-8">
            — Amy Houston Gaddis · Co-Founder, Rancher Navy
          </span>
        </div>
        <a href="/sb217" className="inline-flex items-center gap-2 border border-white/60 hover:bg-white hover:text-yellow-700 px-6 py-3 text-[11px] font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 whitespace-nowrap flex-shrink-0">
          See the Platform →
        </a>
      </div>
    </div>
  );
}

// ─── STORY — White ───── (Removed from Home — Pass 1. Preserved for potential move to SB217 page.)
// eslint-disable-next-line no-unused-vars
function StorySection() {
  const timeline = [
    { date: "January 2026", title: "A major project pauses", desc: "Fuzion's largest engagement is placed on hold. The team stays together. The horizon opens. Faith holds." },
    { date: "February 17, 2026 — The Ranger Road Fire", title: "Fuzion drives in", desc: "Our founder pulls a truck out of storage, picks up a loaned trailer and donated hay from CM Cattle Company in Prairie City, Iowa, and drives to Gate, Oklahoma — delivering hay to ranchers who lost everything." },
    { date: "Gate, Oklahoma", title: "Rancher Navy connection", desc: "Fuzion meets Morgan Broome and Amy Houston Gaddis — running an entire disaster response from spreadsheets. Fuzion offers to change that. For free." },
    { date: "Six Weeks Later", title: "Support Beacon Relief is born", desc: "The entire Fuzion team volunteers. What starts as a spreadsheet becomes a full logistics platform — described by nonprofit leaders as better than enterprise tools they have paid for." },
    { date: "Today", title: "A new door — wide open", desc: "SB217, Support Beacon Relief, Support Beacon Logistics, Fuzion Chickasaw Group, Fortitude — an entire ecosystem born from one decision to show up." },
  ];
  const stats = [
    { value: "35+", label: "Years of Combined Team Experience" },
    { value: "6", label: "Weeks to Build SBR" },
    { value: "$0", label: "Charged to Rancher Navy" },
    { value: "2/17", label: "The Date Everything Changed" },
  ];

  return (
    <section id="story" className="py-32" style={{ background: '#FAF8F4' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-7">
            <AnimatedElement>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>How It Started</p>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium mb-8 leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
                Born from boots<br />on the ground.
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-16 max-w-2xl font-normal">
                In January 2026, a major project pauses — and with it, the certainty of what comes next. Our founder found himself in Olathe, Kansas, searching and praying that a new door would open. It did. On February 17.
              </p>
            </AnimatedElement>

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <AnimatedElement key={i} delay={i * 100}>
                  <div className="flex gap-6 group">
                    <div className="flex flex-col items-center mt-1 flex-shrink-0">
                      <div className="w-3 h-3 rounded-full border-2 bg-white group-hover:bg-yellow-600 transition-colors duration-300 relative z-10" style={{ borderColor: GOLD }} />
                      {i < timeline.length - 1 && <div className="w-px flex-1 mt-2" style={{ background: '#e5e7eb' }} />}
                    </div>
                    <div className="pb-6">
                      <p className="text-[11px] tracking-[0.2em] uppercase font-semibold mb-2" style={{ color: GOLD }}>{item.date}</p>
                      <p className="text-lg font-semibold mb-2 tracking-wide" style={{ color: NAVY }}>{item.title}</p>
                      <p className="text-gray-600 text-[15px] leading-relaxed font-normal">{item.desc}</p>
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <AnimatedElement delay={300}>
              <div className="border border-gray-200 p-8 relative overflow-hidden shadow-sm" style={{ borderLeft: `4px solid ${GOLD}`, background: '#FAF8F4' }}>
                <blockquote className="text-lg italic leading-relaxed mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
                  "This application is better than many of the enterprise logistics tools I have ever seen."
                </blockquote>
                <cite className="text-[10px] tracking-[0.2em] uppercase font-semibold block" style={{ color: GOLD }}>— Amy Houston Gaddis, Co-Founder, Rancher Navy</cite>
              </div>
            </AnimatedElement>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <AnimatedElement key={i} delay={400 + (i * 100)}>
                  <div className="border border-gray-200 p-6 shadow-sm hover:border-yellow-400 transition-colors duration-300 flex flex-col justify-between h-full min-h-[120px]" style={{ background: '#FAF8F4' }}>
                    <div className="text-4xl font-medium mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>{s.value}</div>
                    <div className="text-gray-500 text-[12px] tracking-wide uppercase leading-snug font-medium">{s.label}</div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PORTFOLIO — Light Gray ───────────────────────────────────────────────────
function PortfolioSection() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    PortfolioCompanyEntity.list('sort_order', 10).then(setCompanies).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const staticFallback = [
    { name: "Fuzion Consulting Group", tagline: "Technology Consulting · Primary", description: "The flagship firm. With over 35+ years of combined team experience supporting large-scale engineering, construction, utility, and enterprise programs. Specialists in PowerApps, AWS, AI, M365, project management, and project controls.", link_url: "https://fuzionconsultinggroup.com/", link_label: "fuzionconsultinggroup.com →", status: "Live" },
    { name: "Fuzion Chickasaw Group", tagline: "Minority Woman-Owned · Native American · Chickasaw Nation · Calera, Oklahoma", description: "Founded by a proud Chickasaw Nation member to serve tribal governments, Native American enterprises, nonprofits, and public sector organizations from Calera, Oklahoma.", link_url: "https://fuzionchickasawgroup.com/", link_label: "fuzionchickasawgroup.com", status: "Launching" },
    { name: "SB217 — Support Beacon Platform", tagline: "Technology Platform · Born 2/17/2026", description: "The parent technology platform born from the Ranger Road Fire. Houses Support Beacon Relief for nonprofits and Support Beacon Logistics for enterprise clients.", link_url: "https://sb217platform.com/", link_label: "sb217platform.com", status: "Live" },
    { name: "Rancher Navy", tagline: "501(c)(3) · Founding Partner", description: "The Texas-based 501(c)(3) nonprofit that started everything. Founded by Morgan Broome and Amy Houston Gaddis to support agricultural communities in disaster.", link_url: "https://ranchernavy.org/", link_label: "ranchernavy.org", status: "Live" },
    { name: "Fortitude Junk Removal", tagline: "Live · Veteran-Owned · Supported Entity", description: "A veteran-owned hauling company supported by Fuzion Companies technology and integrated with the Support Beacon Relief dispatch platform to support Rancher Navy's ground operations during natural disasters.", link_url: "https://fortitudejunk.com/", link_label: "fortitudejunk.com →", status: "Live" },
  ];
  
  const items = companies.length > 0 ? companies : staticFallback;
  const mainItems = items.filter(c => c.status !== 'Coming Soon');
  const comingSoon = items.find(c => c.status === 'Coming Soon');

  return (
    <section id="portfolio" className="py-32" style={{ background: '#EEE9E2' }}>
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-16 items-end">
            <div className="lg:w-1/2">
              <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>The Portfolio</p>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
                Every company. One mission.
              </h2>
            </div>
            <div className="lg:w-1/2 pb-2">
              <p className="text-gray-600 text-base leading-relaxed font-normal">
                Fuzion Companies is a portfolio of technology consulting firms, a proprietary logistics platform, a veteran-owned hauling company, and a founding nonprofit partnership — each distinct, all united by the same values and the same conviction that great work done with integrity changes things.
              </p>
            </div>
          </div>
        </AnimatedElement>

        {/* Main 2x2 grid */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 border border-gray-200 ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}>
          {mainItems.map((company, i) => (
            <AnimatedElement key={i} delay={i * 80} className="h-full">
              <div className="p-8 h-full flex flex-col border-b border-r border-gray-200 hover:shadow-md transition-shadow duration-300 group" style={{ background: '#FAF8F4' }}>
                {/* Color accent top bar */}
                <div className="h-1 w-12 mb-6" style={{ background: [NAVY, CHICKASAW_INDIGO, GOLD, GOLD][i] || NAVY }} />
                <p className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: GOLD }}>{company.tagline}</p>
                <h3 className="text-xl lg:text-2xl font-semibold mb-4 group-hover:opacity-80 transition-opacity" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
                  {company.name}
                </h3>
                <p className="text-gray-600 text-[15px] leading-relaxed mb-8 flex-1 font-normal">{company.description}</p>
                <a href={company.link_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.15em] uppercase hover:opacity-70 transition-opacity" style={{ color: NAVY }}>
                  {company.link_label} <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </AnimatedElement>
          ))}
        </div>

        {/* Coming soon full-width card */}
        {comingSoon && (
          <AnimatedElement delay={400}>
            <div className="bg-white border border-gray-200 border-t-0 p-8 hover:shadow-md transition-shadow duration-300">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-1">
                  <p className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: GOLD }}>{comingSoon.tagline}</p>
                  <h3 className="text-xl lg:text-2xl font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>{comingSoon.name}</h3>
                  <p className="text-gray-600 text-[15px] leading-relaxed font-normal max-w-2xl">{comingSoon.description}</p>
                </div>
                <a href={comingSoon.link_url} className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.15em] uppercase whitespace-nowrap hover:opacity-70 transition-opacity mt-2" style={{ color: NAVY }}>
                  {comingSoon.link_label} <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </AnimatedElement>
        )}
      </div>
    </section>
  );
}

// ─── PRODUCTS & PLATFORMS ───────────────────────────────────────────────────
function ProductsSection() {
  const families = [
    {
      eyebrow: "The Works Suite · theworkssuite.com",
      name: "Enterprise Construction & Project Technology",
      description: "A suite of purpose-built enterprise applications for construction, engineering, and utility programs — deployable in Fuzion's tenant or your own.",
      accent: NAVY,
      products: [
        { name: "Fuzion365 Fieldworks", status: "Live", statusColor: '#1a8a6e', desc: "M365-integrated field management with Bluebeam connectivity. Available now in modular deployment." },
        { name: "Construct Works", status: "January 2027", statusColor: GOLD, desc: "AI-powered document & construction management with custom forms, workflows, and metadata. Final development." },
        { name: "ProjectWorks", status: "January 2027", statusColor: '#6366f1', desc: "Long-range forecasting and Stage Gate 1–5 project management with SAP / Oracle / Maximo / M365 connectivity. SaaS-ready." },
      ],
      link: "https://fcghelps.com/",
      linkLabel: "FuzionConsultingGroup.com →",
    },
    {
      eyebrow: "SB217 Platform · sb217platform.com",
      name: "Disaster Relief & Logistics Technology",
      description: "Born from the Ranger Road Fire. A full-stack disaster logistics platform connecting nonprofits, donors, haulers, and communities in crisis.",
      accent: GOLD,
      products: [
        { name: "Support Beacon Relief", status: "In Testing", statusColor: GOLD, desc: "Nonprofit logistics platform for disaster response — donor management, volunteer coordination, and DOT-integrated dispatch." },
        { name: "Support Beacon Logistics", status: "Spring 2027", statusColor: '#6366f1', desc: "Enterprise logistics management for large-scale relief and hauling operations with live tracking and mobile apps." },
      ],
      link: "https://sb217platform.com/",
      linkLabel: "SB217 Platform →",
    },
    {
      eyebrow: "Fuzion Storm Works · Fuzion Chickasaw Group",
      name: "Community Safety & Storm Shelter Technology",
      description: "Technology for community safety — connecting residents to storm shelters and empowering tribal governments and housing communities with life-saving tools.",
      accent: CHICKASAW_INDIGO,
      products: [
        { name: "Take Cover", status: "In Testing", statusColor: GOLD, desc: "Desktop and mobile application mapping every storm shelter in individual housing communities. Expanding to tribal communities and beyond." },
        { name: "Fuzion Storm Works", status: "Roadmap", statusColor: GOLD, desc: "The platform brand for community safety and emergency preparedness technology serving tribal nations and municipalities." },
      ],
      link: "https://fuzionchickasawgroup.com/",
      linkLabel: "Fuzion Chickasaw Group →",
    },
  ];

  return (
    <section id="products" className="py-32" style={{ background: '#FAF8F4' }}>
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-20 items-end">
            <div className="lg:w-1/2">
              <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>Products &amp; Platforms</p>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
                Three product families.<br />One standard of excellence.
              </h2>
            </div>
            <div className="lg:w-1/2 pb-2">
              <p className="text-gray-600 text-base leading-relaxed font-normal">
                Before the Ranger Road Fire opened a new door, Fuzion was already building enterprise-grade technology for construction, engineering, and community safety. Each family is distinct, each deployable independently, each built to the same engineering standard.
              </p>
            </div>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 lg:grid-cols-3 border border-gray-200">
          {families.map((fam, fi) => (
            <AnimatedElement key={fi} delay={fi * 120}>
              <div className="flex flex-col h-full border-r border-gray-200 last:border-r-0" style={{ background: '#FAF8F4' }}>
                <div className="h-1 w-full" style={{ background: fam.accent }} />
                <div className="p-8 flex flex-col flex-1">
                  <div className="min-h-[200px] flex flex-col">
                    <p className="text-[9px] tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: fam.accent }}>{fam.eyebrow}</p>
                    <h3 className="text-xl font-semibold mb-3 leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>{fam.name}</h3>
                    <p className="text-gray-600 text-[14px] leading-relaxed font-normal">{fam.description}</p>
                  </div>
                  <div className="space-y-5 flex-1">
                    {fam.products.map((p, pi) => (
                      <div key={pi} className="border-t border-gray-100 pt-5">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[11px] font-bold tracking-wide" style={{ color: NAVY }}>{p.name}</span>
                          <span className="text-[9px] font-bold tracking-[0.15em] uppercase px-2 py-0.5" style={{ background: `${p.statusColor}18`, color: p.statusColor }}>{p.status}</span>
                        </div>
                        <p className="text-gray-600 text-[13px] leading-relaxed font-normal">{p.desc}</p>
                      </div>
                    ))}
                  </div>
                  <a href={fam.link} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.15em] uppercase hover:opacity-70 transition-opacity" style={{ color: fam.accent }}>
                    {fam.linkLabel}
                  </a>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>

        <AnimatedElement delay={400}>
          <div className="border border-gray-200 border-t-0 p-8 flex flex-col sm:flex-row items-center justify-between gap-6" style={{ background: NAVY }}>
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase font-semibold mb-1" style={{ color: GOLD }}>The Works Suite</p>
              <p className="text-white text-[15px] font-normal">Fuzion365 Fieldworks · Construct Works · ProjectWorks — deployable together or independently.</p>
            </div>
            <a href="/works-suite" className="inline-flex items-center gap-2 px-6 py-3 text-[11px] font-bold tracking-[0.2em] uppercase whitespace-nowrap hover:opacity-90 transition-opacity flex-shrink-0" style={{ background: GOLD, color: 'white' }}>
              Explore the Works Suite →
            </a>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}

// ─── MISSION — Dark Navy ─────────────────────────────────────────────────────
function MissionSection() {
  const values = [
    { title: "Faith", desc: "The conviction that a new door opens when you keep showing up — even in the hard seasons." },
    { title: "Service", desc: "We drove our own trucks. We donated our own time. That is what we mean when we say service." },
    { title: "Precision", desc: "35 years of engineering-grade discipline applied to every line of code and every project plan." },
    { title: "Community", desc: "Rancher Navy. Chickasaw Nation. Veterans. Nonprofits. These are the people we build for." },
  ];

  return (
    <section id="mission" className="py-32" style={{ background: `linear-gradient(160deg, ${NAVY} 0%, ${NAVY2} 100%)` }}>
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>Our Mission</p>
          <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium text-white mb-6 leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Excellence and service are the same thing.
          </h2>
          <p className="text-white/75 text-base leading-relaxed mb-16 max-w-2xl font-normal">
            Every company in the Fuzion Companies portfolio was built on a belief that doing extraordinary work for the right reasons — not despite serving others, but because of it — is both a competitive advantage and a calling.
          </p>
        </AnimatedElement>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10">
          {values.map((v, i) => (
            <AnimatedElement key={i} delay={i * 100}>
              <div className="p-10 hover:bg-white/5 transition-colors duration-300" style={{ background: `${NAVY}cc` }}>
                <p className="text-base font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: GOLD }}>{v.title}</p>
                <p className="text-white/75 text-[15px] leading-relaxed font-normal">{v.desc}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── RANCHER NAVY — White ─────────────────────────────────────────────────────
function RancherNavySection() {
  return (
    <section id="partner" className="py-32" style={{ background: '#FAF8F4' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          <div className="lg:col-span-6">
            <AnimatedElement>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-6 font-semibold" style={{ color: GOLD }}>Founding Nonprofit Partner</p>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium mb-8 leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
                Built alongside<br />Rancher Navy.
              </h2>
              <p className="text-gray-600 text-base leading-relaxed font-normal">
                Rancher Navy is the founding nonprofit partner of the Fuzion Companies portfolio. Their trust — with their operations, their donors, their volunteers, and their mission — is the foundation of Support Beacon Relief and a defining relationship for everything we build.
              </p>
            </AnimatedElement>
          </div>

          <div className="lg:col-span-6">
            <AnimatedElement delay={200}>
              <div className="border border-gray-200 p-10 sm:p-12 shadow-sm hover:shadow-md transition-shadow duration-300" style={{ borderLeft: '4px solid #1a8a6e', background: '#FAF8F4' }}>
                <div className="flex items-center gap-3 mb-6">
                  <Anchor className="w-4 h-4" style={{ color: '#1a8a6e' }} />
                  <span className="text-[11px] tracking-[0.15em] uppercase font-semibold text-gray-400">Rancher Navy · 501(c)(3)</span>
                </div>
                <h3 className="text-3xl font-medium mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
                  Mobilizing relief<br />when it matters most.
                </h3>
                <p className="text-gray-600 text-[15px] leading-relaxed mb-8 font-normal">
                  A Texas-based 501(c)(3) nonprofit connecting donors, haulers, volunteers, and agricultural families in crisis — now powered by Support Beacon Relief.
                </p>
                <a href="https://ranchernavy.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] uppercase hover:opacity-70 transition-opacity" style={{ color: '#1a8a6e' }}>
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

// ─── LEADERSHIP — Light Gray ──────────────────────────────────────────────────
const FOUNDERS = [
  {
    name: "Dan Goretskie",
    title: "Founder & CEO",
    companies: "Fuzion Consulting Group  ·  Co-Founder & COO, Fuzion Chickasaw Group",
    bio: "The founder and driving vision behind Fuzion Consulting Group, bringing together a team with 35+ years of combined experience supporting large-scale engineering, construction, utility, and enterprise technology programs. The leader who drove into the Ranger Road Fire with a hay trailer and came back with a platform. The vision and conviction behind SB217, Support Beacon Relief, and the entire Fuzion Companies portfolio.",
    accentColor: NAVY,
  },
  {
    name: "Donna Webb",
    title: "Founder & CEO",
    companies: "Fuzion Chickasaw Group  ·  Co-Founder & COO, Fuzion Consulting Group",
    bio: "A proud member of the Chickasaw Nation and the founder of Fuzion Chickasaw Group — bringing decades of consulting and program management expertise to tribal governments, Native American enterprises, nonprofits, and public sector organizations. Co-architect of the operational foundation that powers the entire Fuzion Companies team.",
    accentColor: CHICKASAW_INDIGO,
  },
];

const LEADERSHIP_TEAM = [
  { name: "Andy Much", role_badge: "Principal Solutions Leader · SB217 Platform", bio: "Conceived the SB217 architecture and built the secure registration portal anchoring Support Beacon Relief. Built for reliability, built for mission." },
  { name: "Prag Padilla", role_badge: "Principal Solutions Leader · Logistics & Mobile", bio: "The logistics and mobile development lead behind Support Beacon Relief — DOT-integrated dispatch, live hauler tracking, and iOS & Android applications." },
  { name: "Pat Sagaser", role_badge: "Principal Solutions Engineer · Fuzion Consulting Group", bio: "Engineering solutions leader with deep expertise in regulated industry systems, field technology, and enterprise integration across construction and utility programs." },
  { name: "Dennis Del Grosso", role_badge: "Principal Engineering Leader · Fuzion Consulting Group", bio: "Experienced engineering leader supporting delivery, controls, and execution across large-scale construction, utility, and enterprise programs." },
  { name: "Charles Eder", role_badge: "Principal Technology Program Manager · Fuzion Consulting Group", bio: "Program management leader specializing in technology initiative delivery, M365 implementations, and enterprise workflow transformation." },
  { name: "Shirley Patterson", role_badge: "Sr. Director, Accounting & HR · Fuzion Consulting Group", bio: "Senior director overseeing accounting, human resources, and administrative operations — the operational backbone supporting every company in the Fuzion portfolio." },
];

function LeadershipSection() {
  return (
    <section id="leadership" className="py-32" style={{ background: '#EEE9E2' }}>
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>Leadership</p>
          <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium mb-4 leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
            The people<br />behind the mission.
          </h2>
          <p className="text-gray-600 text-base leading-relaxed mb-16 max-w-2xl font-normal">
            One leadership team. Two companies. The same conviction in every engagement.
          </p>
        </AnimatedElement>

        {/* Founders */}
        <AnimatedElement>
          <p className="text-[10px] tracking-[0.25em] uppercase font-bold mb-6" style={{ color: NAVY }}>Founders</p>
        </AnimatedElement>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {FOUNDERS.map((f, i) => (
            <AnimatedElement key={i} delay={i * 100}>
              <div className="border border-gray-200 p-10 h-full hover:shadow-sm transition-shadow duration-300" style={{ background: '#FAF8F4', borderTop: `3px solid ${f.accentColor}` }}>
                <h3 className="text-2xl font-semibold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>{f.name}</h3>
                <p className="text-sm font-semibold mb-1" style={{ color: f.accentColor }}>{f.title}</p>
                <p className="text-[10px] tracking-[0.12em] uppercase font-medium mb-6 text-gray-400">{f.companies}</p>
                <p className="text-gray-600 text-[15px] leading-relaxed font-normal">{f.bio}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>

        {/* Leadership Team */}
        <AnimatedElement delay={100}>
          <p className="text-[10px] tracking-[0.25em] uppercase font-bold mb-6" style={{ color: NAVY }}>Leadership Team</p>
        </AnimatedElement>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEADERSHIP_TEAM.map((member, i) => (
            <AnimatedElement key={i} delay={i * 80} className="h-full">
              <div className="border border-gray-200 p-8 h-full hover:border-yellow-400 hover:shadow-sm transition-all duration-300" style={{ background: '#FAF8F4' }}>
                <div className="h-0.5 w-8 mb-6" style={{ background: GOLD }} />
                <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>{member.name}</h3>
                <p className="text-[9px] tracking-[0.2em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>{member.role_badge}</p>
                <p className="text-gray-600 text-[14px] leading-relaxed font-normal">{member.bio}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT — White ─────────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({ firstName: "", lastName: "", organization: "", email: "", interest: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Fuzion Companies Inquiry — ${form.interest || "General"}`;
    const body = `Name: ${form.firstName} ${form.lastName}%0D%0AOrganization: ${form.organization}%0D%0AEmail: ${form.email}%0D%0AInterest: ${form.interest}%0D%0A%0D%0AMessage:%0D%0A${form.message}`;
    window.location.href = `mailto:technology@fcghelps.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    setSubmitted(true);
  };

  const contacts = [
    { icon: Globe, label: "Fuzion Companies", link: "mailto:technology@fcghelps.com", linkLabel: "technology@fcghelps.com" },
    { icon: Globe, label: "Fuzion Consulting Group", link: "https://fuzionconsultinggroup.com/", linkLabel: "FuzionConsultingGroup.com" },
    { icon: Building2, label: "Fuzion Chickasaw Group", link: "https://fuzionchickasawgroup.com/", linkLabel: "fuzionchickasawgroup.com" },
    { icon: Zap, label: "SB217 Platform", links: [{ href: "https://sb217platform.com/", label: "sb217platform.com" }, { href: "https://www.supportbeaconrelief.com/", label: "supportbeaconrelief.com" }] },
    { icon: Anchor, label: "Rancher Navy", links: [{ href: "https://ranchernavy.org/", label: "ranchernavy.org" }, { href: "tel:+18172646444", label: "(817) 264-6444" }] },
  ];

  return (
    <section id="contact" className="py-32 border-t border-gray-200" style={{ background: '#FAF8F4' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          
          <div className="lg:col-span-5">
            <AnimatedElement>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>Get In Touch</p>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium mb-8 leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
                Ready to build<br />something that matters?
              </h2>
              <p className="text-gray-600 text-base leading-relaxed mb-14 font-normal">
                Whether you are a nonprofit looking for disaster logistics technology, an enterprise exploring Support Beacon Logistics, a tribal organization seeking a certified technology partner, or anyone who wants to work with a team that shows up — we want to hear from you.
              </p>
              <div className="space-y-7">
                {contacts.map((c, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className="w-9 h-9 border border-gray-200 flex items-center justify-center flex-shrink-0">
                      <c.icon className="w-4 h-4" style={{ color: GOLD }} />
                    </div>
                    <div className="pt-0.5">
                      <p className="text-[15px] font-semibold mb-1.5 tracking-wide" style={{ color: NAVY }}>{c.label}</p>
                      {c.link ? (
                        <a href={c.link} target="_blank" rel="noopener noreferrer" className="text-gray-500 text-[13px] hover:text-yellow-600 transition-colors">{c.linkLabel}</a>
                      ) : (
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                          {c.links?.map((l, li) => (
                            <a key={li} href={l.href} target="_blank" rel="noopener noreferrer" className="text-gray-500 text-[13px] hover:text-yellow-600 transition-colors">{l.label}</a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedElement>
          </div>

          <div className="lg:col-span-7">
            <AnimatedElement delay={200}>
              <div className="border border-gray-200 p-8 sm:p-12 shadow-sm" style={{ background: '#FAF8F4' }}>
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
                        <input type="text" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} className="w-full border border-gray-200 text-sm px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors" style={{ color: NAVY, background: '#FAF8F4' }} required />
                      </div>
                      <div>
                        <label className="text-gray-400 text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block">Last Name</label>
                        <input type="text" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} className="w-full border border-gray-200 text-sm px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors" style={{ color: NAVY, background: '#FAF8F4' }} required />
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-400 text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block">Organization</label>
                      <input type="text" value={form.organization} onChange={e => setForm({...form, organization: e.target.value})} className="w-full border border-gray-200 text-sm px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors" style={{ color: NAVY, background: '#FAF8F4' }} />
                    </div>
                    <div>
                      <label className="text-gray-400 text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block">Email Address</label>
                      <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full border border-gray-200 text-sm px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors" style={{ color: NAVY, background: '#FAF8F4' }} required />
                    </div>
                    <div>
                      <label className="text-gray-400 text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block">I am interested in</label>
                      <select value={form.interest} onChange={e => setForm({...form, interest: e.target.value})} className="w-full border border-gray-200 text-sm px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors appearance-none" style={{ color: NAVY, background: '#FAF8F4' }}>
                        <option value="">Select one...</option>
                        <option>Fuzion Consulting Group</option>
                        <option>Fuzion Chickasaw Group</option>
                        <option>Support Beacon Relief</option>
                        <option>Support Beacon Logistics</option>
                        <option>Fortitude Junk Removal</option>
                        <option>Partnership / Media / Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-400 text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block">Message</label>
                      <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={5} className="w-full border border-gray-200 text-sm px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors resize-none" style={{ color: NAVY, background: '#FAF8F4' }} required />
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

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: '#EEE9E2' }}>
      <HeroSection />
      <QuoteBanner />
      <BeforeTheFire />
      <PortfolioSection />
      <ProductsSection />
      <MissionSection />
      <RancherNavySection />
      <LeadershipSection />
      <ContactSection />
    </div>
  );
}