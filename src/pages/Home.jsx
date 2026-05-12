import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { Anchor, Globe, Building2, Zap, CheckCircle, ArrowRight } from "lucide-react";

const NAVY = '#0a1628';
const NAVY2 = '#0d1f3c';
const GOLD = '#C8922A';

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
    const fallback = setTimeout(() => setIsVisible(true), 800 + delay);
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

/* ─── HERO — Deep Navy ─── */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20" style={{ background: `linear-gradient(160deg, ${NAVY} 0%, ${NAVY2} 100%)` }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full blur-[150px]" style={{ background: `${GOLD}18` }} />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px]" style={{ background: `${GOLD}10` }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full flex flex-col justify-center min-h-[80vh]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-semibold">Fuzion Companies</span>
            <span className="w-8 h-[1px] bg-white/20" />
            <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase font-semibold">FuzionCompanies.com</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-[6.5rem] font-medium tracking-tight leading-[1.05] mb-8 text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Technology built on{" "}
            <em style={{ color: GOLD }} className="italic font-semibold">35 years</em>
            <br />of showing up.
          </h1>

          <p className="text-white/60 text-sm sm:text-base max-w-xl mb-12 leading-relaxed font-light">
            A portfolio of technology, consulting, and mission-driven businesses united by a single conviction — that excellence and service are not competing values. They are the same thing.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-14">
            {["Faith", "Service", "Precision", "Community"].map((val, i) => (
              <div key={val} className="flex items-center gap-4">
                <span className="text-[11px] tracking-[0.25em] uppercase font-semibold" style={{ color: GOLD }}>{val}</span>
                {i < 3 && <span className="w-1 h-1 rounded-full" style={{ background: `${GOLD}60` }} />}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#portfolio" className="inline-flex items-center justify-center px-8 py-3.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-white hover:-translate-y-0.5 transition-all duration-300" style={{ background: GOLD }}>
              Explore the Portfolio →
            </a>
            <a href="#story" className="inline-flex items-center justify-center px-8 py-3.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-white border border-white/25 hover:border-white/50 hover:bg-white/10 transition-all duration-300">
              Read Our Story
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── QUOTE BANNER — Gold ─── */
function QuoteBanner() {
  return (
    <div style={{ background: GOLD }} className="py-5 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center md:text-left">
        <span className="text-white text-[11px] font-bold tracking-[0.25em] uppercase whitespace-nowrap opacity-90">February 17, 2026</span>
        <p className="text-white text-sm md:text-[15px] italic font-medium leading-relaxed opacity-95 max-w-3xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          "SB217 is our anchor. February 17 is our founding date. The Ranger Road Fire is our origin. That is a brand that can go a long way."
        </p>
      </div>
    </div>
  );
}

/* ─── STORY — White ─── */
function StorySection() {
  const timeline = [
    { date: "January 2026", title: "A major project pauses", desc: "Fuzion's largest engagement is placed on hold. The team stays together. The horizon opens. Faith holds." },
    { date: "February 17, 2026 — The Ranger Road Fire", title: "Fuzion drives in", desc: "Our founder pulls a hay trailer out of storage, loads donated alfalfa, and drives from Iowa to Gate, Oklahoma — delivering hay to ranchers who lost everything." },
    { date: "Gate, Oklahoma", title: "Rancher Navy connection", desc: "Fuzion meets Morgan Broome and Amy Houston Gaddis — running an entire disaster response from spreadsheets. Fuzion offers to change that. For free." },
    { date: "Six Weeks Later", title: "Support Beacon Relief is born", desc: "The entire Fuzion team volunteers. What starts as a spreadsheet becomes a full logistics platform — described by nonprofit leaders as better than enterprise tools they have paid for." },
    { date: "Today", title: "A new door — wide open", desc: "SB217, Support Beacon Relief, Support Beacon Logistics, Fuzion Chickasaw Group, Fortitude — an entire ecosystem born from one decision to show up." },
  ];
  const stats = [
    { value: "35+", label: "Years Combined Experience" },
    { value: "6", label: "Weeks to Build SBR" },
    { value: "$0", label: "Charged to Rancher Navy" },
    { value: "2/17", label: "The Date Everything Changed" },
  ];
  return (
    <section id="story" className="bg-white py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">

          <div className="lg:col-span-7">
            <AnimatedElement>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>How It Started</p>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium mb-8 leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
                Born from boots<br />on the ground.
              </h2>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-16 max-w-2xl font-light">
                In January 2026, Fuzion lost one of its largest contracts. In February, our founder was in Olathe, Kansas — stressed, searching, and praying that a new door would open. It did. On February 17.
              </p>
            </AnimatedElement>

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <AnimatedElement key={i} delay={i * 100}>
                  <div className="flex gap-6 group">
                    <div className="flex flex-col items-center mt-1">
                      <div className="w-3 h-3 rounded-full border-2 bg-white group-hover:bg-primary transition-colors duration-300 relative z-10" style={{ borderColor: GOLD }} />
                      {i < timeline.length - 1 && <div className="w-[1px] flex-1 mt-2" style={{ background: '#e5e7eb' }} />}
                    </div>
                    <div className="pb-8">
                      <p className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-2" style={{ color: GOLD }}>{item.date}</p>
                      <p className="font-semibold mb-2 tracking-wide" style={{ color: NAVY }}>{item.title}</p>
                      <p className="text-gray-500 text-sm leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <AnimatedElement delay={300}>
              <div className="border border-gray-200 p-8 relative overflow-hidden shadow-sm" style={{ borderLeft: `4px solid ${GOLD}` }}>
                <blockquote className="text-lg italic leading-relaxed mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
                  "This application is better than many of the enterprise logistics tools I have ever seen."
                </blockquote>
                <cite className="text-[10px] tracking-[0.2em] uppercase font-semibold" style={{ color: GOLD }}>— Amy Houston Gaddis, Co-Founder, Rancher Navy</cite>
              </div>
            </AnimatedElement>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <AnimatedElement key={i} delay={400 + (i * 100)}>
                  <div className="border border-gray-200 p-6 hover:border-yellow-400 transition-all duration-300 shadow-sm">
                    <div className="text-4xl font-medium mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>{s.value}</div>
                    <div className="text-gray-400 text-[11px] tracking-wide uppercase leading-snug">{s.label}</div>
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

/* ─── PORTFOLIO — Light Gray, White cards ─── */
function PortfolioSection() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PortfolioCompanyEntity.list('sort_order', 10).then(setCompanies).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const staticFallback = [
    { name: "Fuzion Consulting Group", tagline: "Technology Consulting · Primary", description: "35+ years of combined experience supporting engineering, construction, utility, and enterprise programs. Specialists in PowerApps, AWS, AI, M365, project management, and project controls.", features: [], link_url: "https://fcghelps.com/", link_label: "fcghelps.com →", status: "Live" },
    { name: "Fuzion Chickasaw Group", tagline: "Minority Woman-Owned · Native American", description: "Founded by a proud Chickasaw Nation member to serve tribal governments, Native American enterprises, nonprofits, and public sector organizations from Calera, Oklahoma.", features: [], link_url: "https://fuzionchickasawgroup.com/", link_label: "fuzionchickasawgroup.com →", status: "Launching" },
    { name: "SB217 — Support Beacon Platform", tagline: "Technology Platform · Born 2/17/2026", description: "The parent technology platform born from the Ranger Road Fire. Houses Support Beacon Relief for nonprofits and Support Beacon Logistics for enterprise clients.", features: [], link_url: "https://sb217platform.com/", link_label: "sb217platform.com →", status: "Live" },
    { name: "Rancher Navy", tagline: "501(c)(3) · Founding Partner", description: "The Texas-based 501(c)(3) nonprofit that started everything. Founded by Morgan Broome and Amy Houston Gaddis to support agricultural communities in disaster.", features: [], link_url: "https://ranchernavy.org/", link_label: "ranchernavy.org →", status: "Live" },
    { name: "Fortitude Junk Removal & Hauling, LLC", tagline: "Coming Soon · Veteran-Owned · Supported Entity", description: "A veteran-owned hauling company supported by Fuzion Companies technology and integrated with the Support Beacon Relief dispatch platform to support Rancher Navy's ground operations during natural disasters.", features: [], link_url: "#contact", link_label: "Inquire →", status: "Coming Soon" },
  ];

  const items = companies.length > 0 ? companies : staticFallback;

  return (
    <section id="portfolio" className="py-28 relative" style={{ background: '#f0f2f5' }}>
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-16 items-end">
            <div className="lg:w-1/2">
              <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>The Portfolio</p>
              <h2 className="text-4xl sm:text-5xl font-medium leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
                Every company.<br />One mission.
              </h2>
            </div>
            <div className="lg:w-1/2 pb-2">
              <p className="text-gray-500 text-[15px] leading-relaxed font-light">
                Fuzion Companies is a portfolio of technology consulting firms, a proprietary logistics platform, a veteran-owned hauling company, and a founding nonprofit partnership — each distinct, all united by the same values and the same conviction that great work done with integrity changes things.
              </p>
            </div>
          </div>
        </AnimatedElement>

        {/* 2-col grid for first 4, full-width for last */}
        <div className={`${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            {items.slice(0, 4).map((company, i) => (
              <AnimatedElement key={i} delay={i * 80}>
                <div className="bg-white border-t-2 border-l border-r border-b border-gray-200 p-8 h-full flex flex-col hover:shadow-md transition-all duration-300" style={{ borderTopColor: i % 2 === 0 ? GOLD : '#1a5c47' }}>
                  <p className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-4" style={{ color: GOLD }}>{company.tagline}</p>
                  <h3 className="text-2xl font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>{company.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1 font-light">{company.description}</p>
                  <a href={company.link_url} target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold tracking-[0.15em] uppercase hover:opacity-70 transition-opacity" style={{ color: NAVY }}>
                    {company.link_label}
                  </a>
                </div>
              </AnimatedElement>
            ))}
          </div>
          {items[4] && (
            <AnimatedElement delay={400}>
              <div className="bg-white border-t-2 border-l border-r border-b border-gray-200 p-8 hover:shadow-md transition-all duration-300" style={{ borderTopColor: GOLD }}>
                <p className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: GOLD }}>{items[4].tagline}</p>
                <h3 className="text-2xl font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>{items[4].name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light max-w-3xl">{items[4].description}</p>
              </div>
            </AnimatedElement>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── MISSION — Deep Navy ─── */
function MissionSection() {
  const values = [
    { title: "Faith", desc: "The conviction that a new door opens when you keep showing up — even in the hard seasons." },
    { title: "Service", desc: "We drove our own trucks. We donated our own time. That is what we mean when we say service." },
    { title: "Precision", desc: "35 years of engineering-grade discipline applied to every line of code and every project plan." },
    { title: "Community", desc: "Rancher Navy. Chickasaw Nation. Veterans. Nonprofits. These are the people we build for." },
  ];

  return (
    <section id="mission" className="py-32 relative" style={{ background: `linear-gradient(160deg, ${NAVY} 0%, ${NAVY2} 100%)` }}>
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>Our Mission</p>
          <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium text-white mb-6 leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Excellence and service are the same thing.
          </h2>
          <p className="text-white/60 text-[15px] leading-relaxed mb-16 max-w-2xl font-light">
            Every company in the Fuzion Companies portfolio was built on a belief that doing extraordinary work for the right reasons — not despite serving others, but because of it — is both a competitive advantage and a calling.
          </p>
        </AnimatedElement>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {values.map((v, i) => (
            <AnimatedElement key={i} delay={i * 100}>
              <div className="border border-white/15 p-8 hover:border-white/30 transition-colors duration-300">
                <p className="text-base font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: GOLD }}>{v.title}</p>
                <p className="text-white/60 text-[14px] leading-relaxed font-light">{v.desc}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── RANCHER NAVY — White ─── */
function RancherNavySection() {
  return (
    <section id="partner" className="bg-white py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">

          <div className="lg:col-span-6">
            <AnimatedElement>
              <div className="flex items-center gap-3 mb-6">
                <Anchor className="w-4 h-4" style={{ color: GOLD }} />
                <span className="text-[10px] tracking-[0.25em] uppercase font-semibold" style={{ color: GOLD }}>Founding Nonprofit Partner</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium mb-8 leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
                The organization<br />that opened the door.
              </h2>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-6 font-light">
                When Fuzion's team arrived in Gate, Oklahoma on February 17, 2026, they were not looking for a business opportunity. They were looking to help. What they found were two remarkable women running a remarkable nonprofit — and a problem we were uniquely equipped to solve.
              </p>
            </AnimatedElement>
          </div>

          <div className="lg:col-span-6">
            <AnimatedElement delay={200}>
              <div className="border border-gray-200 p-10 shadow-sm" style={{ borderLeft: '4px solid #1a8a6e' }}>
                <div className="flex items-center gap-3 mb-5">
                  <Anchor className="w-4 h-4" style={{ color: '#1a8a6e' }} />
                  <span className="text-gray-400 text-[11px] tracking-[0.15em] uppercase font-medium">Rancher Navy · 501(c)(3)</span>
                </div>
                <h3 className="text-3xl font-medium mb-4 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
                  Mobilizing relief when it matters most.
                </h3>
                <p className="text-gray-500 text-[14px] leading-relaxed mb-8 font-light">
                  A Texas-based 501(c)(3) nonprofit connecting donors, haulers, volunteers, and agricultural families in crisis — now powered by Support Beacon Relief.
                </p>
                <a href="https://ranchernavy.org/" target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold tracking-[0.15em] uppercase hover:opacity-70 transition-opacity" style={{ color: '#1a8a6e' }}>
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

/* ─── LEADERSHIP — Deep Navy ─── */
function LeadershipSection() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    LeadershipMemberEntity.list('sort_order', 10).then(setMembers).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const staticFallback = [
    { name: "Founder & Principal", role_badge: "Founder · Fuzion Consulting Group", bio: "Over 35 years of experience supporting large-scale engineering, construction, and enterprise technology programs. The leader who drove into the Ranger Road Fire and came back with a platform." },
    { name: "Donna · Principal Advisor", role_badge: "Co-Founder · Fuzion Chickasaw Group", bio: "A proud member of the Chickasaw Nation and co-founder of Fuzion Chickasaw Group. Donna brings decades of consulting expertise to tribal governments, nonprofits, and public sector organizations." },
    { name: "Andy · Platform Architect", role_badge: "Lead Developer · SB217 Platform", bio: "The developer who conceived the SB217 brand architecture and built the secure registration portal anchoring Support Beacon Relief." },
    { name: "Prag · Logistics Engineer", role_badge: "Senior Developer · Logistics & Mobile", bio: "The logistics and mobile development lead behind Support Beacon Relief — DOT-integrated dispatch, live hauler tracking, and iOS/Android applications." },
  ];

  const items = members.length > 0 ? members : staticFallback;

  return (
    <section id="leadership" className="py-32" style={{ background: `linear-gradient(160deg, ${NAVY} 0%, ${NAVY2} 100%)` }}>
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>Leadership</p>
          <h2 className="text-4xl sm:text-5xl font-medium text-white mb-6 leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            The people behind the mission.
          </h2>
          <p className="text-white/50 text-[15px] leading-relaxed max-w-2xl mb-16 font-light">
            Fuzion Companies is led by a team that has spent over three decades in the field. Every decision is made by people who have done the work themselves.
          </p>
        </AnimatedElement>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}>
          {items.map((member, i) => (
            <AnimatedElement key={i} delay={i * 100}>
              <div className="border border-white/10 p-8 h-full hover:border-white/25 transition-all duration-300">
                <p className="text-[9px] tracking-[0.2em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>{member.role_badge}</p>
                <h3 className="text-xl font-medium text-white mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{member.name}</h3>
                <p className="text-white/50 text-[13px] leading-relaxed font-light">{member.bio}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT — White ─── */
function ContactSection() {
  const [form, setForm] = useState({ firstName: "", lastName: "", organization: "", email: "", interest: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  const contacts = [
    { icon: Globe, label: "Fuzion Consulting Group", link: "https://fcghelps.com/", linkLabel: "fcghelps.com" },
    { icon: Building2, label: "Fuzion Chickasaw Group", link: "https://fuzionchickasawgroup.com/", linkLabel: "fuzionchickasawgroup.com" },
    { icon: Zap, label: "SB217 Platform", links: [{ href: "https://sb217platform.com/", label: "sb217platform.com" }, { href: "https://www.supportbeaconrelief.com/", label: "supportbeaconrelief.com" }] },
    { icon: Anchor, label: "Rancher Navy", links: [{ href: "https://ranchernavy.org/", label: "ranchernavy.org" }, { href: "tel:+18172646444", label: "(817) 264-6444" }] },
  ];

  return (
    <section id="contact" className="bg-white py-32 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">

          <div className="lg:col-span-5">
            <AnimatedElement>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>Get In Touch</p>
              <h2 className="text-4xl sm:text-5xl font-medium mb-8 leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
                Ready to build<br />something that matters?
              </h2>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-14 font-light">
                Whether you are a nonprofit, enterprise, tribal organization, or a team that wants to work with people who show up — we want to hear from you.
              </p>
              <div className="space-y-7">
                {contacts.map((c, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0">
                      <c.icon className="w-4 h-4" style={{ color: GOLD }} />
                    </div>
                    <div className="pt-0.5">
                      <p className="text-sm font-semibold mb-1.5" style={{ color: NAVY }}>{c.label}</p>
                      {c.link ? (
                        <a href={c.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 text-[12px] hover:text-primary transition-colors duration-200">{c.linkLabel}</a>
                      ) : (
                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                          {c.links?.map((l, li) => (
                            <a key={li} href={l.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 text-[12px] hover:text-primary transition-colors duration-200">{l.label}</a>
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
              <div className="border border-gray-200 p-8 sm:p-12">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                    <div className="w-16 h-16 rounded-full border flex items-center justify-center mb-6" style={{ borderColor: `${GOLD}50` }}>
                      <CheckCircle className="w-8 h-8" style={{ color: GOLD }} />
                    </div>
                    <h3 className="text-3xl font-medium mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>Message Sent</h3>
                    <p className="text-gray-400 text-[15px] font-light">Thank you for reaching out. We will be in touch soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-gray-400 text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block">First Name</label>
                        <input type="text" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} className="w-full bg-white border border-gray-200 text-gray-800 text-sm px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors duration-300" required />
                      </div>
                      <div>
                        <label className="text-gray-400 text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block">Last Name</label>
                        <input type="text" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} className="w-full bg-white border border-gray-200 text-gray-800 text-sm px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors duration-300" required />
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-400 text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block">Organization</label>
                      <input type="text" value={form.organization} onChange={e => setForm({...form, organization: e.target.value})} className="w-full bg-white border border-gray-200 text-gray-800 text-sm px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors duration-300" />
                    </div>
                    <div>
                      <label className="text-gray-400 text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block">Email Address</label>
                      <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-white border border-gray-200 text-gray-800 text-sm px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors duration-300" required />
                    </div>
                    <div>
                      <label className="text-gray-400 text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block">I am interested in</label>
                      <select value={form.interest} onChange={e => setForm({...form, interest: e.target.value})} className="w-full bg-white border border-gray-200 text-gray-800 text-sm px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors duration-300 appearance-none">
                        <option value="">Select one...</option>
                        <option>Fuzion Consulting Group</option>
                        <option>Fuzion Chickasaw Group</option>
                        <option>Support Beacon Relief</option>
                        <option>Support Beacon Logistics</option>
                        <option>Fortitude Junk Removal & Hauling</option>
                        <option>Partnership / Media / Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-gray-400 text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block">Message</label>
                      <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={5} className="w-full bg-white border border-gray-200 text-gray-800 text-sm px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors duration-300 resize-none" required />
                    </div>
                    <button type="submit" className="px-8 py-3.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-white hover:-translate-y-0.5 transition-all duration-300" style={{ background: NAVY }}>
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
    <div className="min-h-screen">
      <HeroSection />
      <QuoteBanner />
      <StorySection />
      <PortfolioSection />
      <MissionSection />
      <RancherNavySection />
      <LeadershipSection />
      <ContactSection />
    </div>
  );
}