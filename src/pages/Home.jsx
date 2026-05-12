import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";
import { ExternalLink, ChevronRight, Anchor, Globe, Building2, Zap, Shield, Users, Star, CheckCircle, ArrowRight } from "lucide-react";

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

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-background pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] mix-blend-screen" style={{ animation: 'floatA 12s ease-in-out infinite' }} />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] mix-blend-screen" style={{ animation: 'floatB 15s ease-in-out infinite alternate' }} />
        
        {/* Dark Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full flex flex-col justify-center min-h-[80vh]">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          
          <div className="flex items-center gap-4 mb-8">
            <span className="text-muted-foreground text-[10px] tracking-[0.3em] uppercase font-semibold">Fuzion Companies</span>
            <span className="w-8 h-[1px] bg-border/40" />
            <span className="text-muted-foreground text-[10px] tracking-[0.3em] uppercase font-semibold">FuzionCompanies.com</span>
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-[6.5rem] font-medium tracking-tight leading-[1.05] mb-8 text-foreground" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Technology built<br />
            on <em className="text-primary italic font-semibold">35 years</em><br />
            of showing up.
          </h1>

          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mb-12 leading-relaxed font-light">
            A portfolio of technology, consulting, and mission-driven businesses united by a single conviction — that excellence and service are not competing values. They are the same thing.
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-14">
            {["Faith", "Service", "Precision", "Community"].map((val, i) => (
              <div key={val} className="flex items-center gap-4">
                <span className="text-primary text-[11px] tracking-[0.25em] uppercase font-semibold">
                  {val}
                </span>
                {i < 3 && <span className="w-1 h-1 rounded-full bg-primary/40" />}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-5">
            <a href="#portfolio" className="group relative overflow-hidden inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-3.5 text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.4)] hover:-translate-y-0.5">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <span className="relative">Explore the Portfolio</span>
            </a>
            <a href="#story" className="inline-flex items-center justify-center gap-3 border border-border/40 bg-background/20 backdrop-blur-sm text-foreground px-8 py-3.5 text-[11px] font-semibold tracking-[0.2em] uppercase hover:bg-muted/30 hover:border-border transition-all duration-300">
              Read Our Story
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function QuoteBanner() {
  return (
    <AnimatedElement>
      <div className="bg-primary text-primary-foreground py-6 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:4px_4px]" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 relative z-10 text-center md:text-left">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase whitespace-nowrap opacity-90">February 17, 2026</span>
          <p className="text-sm md:text-[15px] italic font-medium leading-relaxed opacity-95 max-w-3xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            "SB217 is our anchor. February 17 is our founding date. The Ranger Road Fire is our origin. That is a brand that can go a long way."
          </p>
        </div>
      </div>
    </AnimatedElement>
  );
}

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
    <section id="story" className="bg-background py-32 relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          <div className="lg:col-span-7">
            <AnimatedElement>
              <p className="text-primary text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold">How It Started</p>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium text-foreground mb-8 leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Born from boots<br />on the ground.
              </h2>
              <p className="text-muted-foreground text-[15px] leading-relaxed mb-16 max-w-2xl font-light">
                In January 2026, Fuzion lost one of its largest contracts. In February, our founder was in Olathe, Kansas — stressed, searching, and praying that a new door would open. It did. On February 17.
              </p>
            </AnimatedElement>

            <div className="space-y-10">
              {timeline.map((item, i) => (
                <AnimatedElement key={i} delay={i * 100}>
                  <div className="flex gap-6 group">
                    <div className="flex flex-col items-center mt-1">
                      <div className="w-3 h-3 rounded-full border border-primary bg-background shadow-[0_0_10px_rgba(var(--primary),0.5)] group-hover:bg-primary transition-colors duration-300 relative z-10" />
                      {i < timeline.length - 1 && <div className="w-[1px] h-full bg-border/30 mt-2 absolute -z-0 translate-y-3" />}
                    </div>
                    <div className="pb-2">
                      <p className="text-primary text-[10px] tracking-[0.2em] uppercase font-semibold mb-2">{item.date}</p>
                      <p className="text-foreground text-base font-semibold mb-2 tracking-wide">{item.title}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
            <AnimatedElement delay={300}>
              <div className="bg-card/40 backdrop-blur-md border border-border/20 p-8 relative overflow-hidden group hover:border-primary/30 transition-colors duration-500">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
                <blockquote className="text-foreground text-lg italic leading-relaxed mb-6 pl-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  "This application is better than many of the enterprise logistics tools I have ever seen."
                </blockquote>
                <cite className="text-primary text-[10px] tracking-[0.2em] uppercase font-semibold pl-2 block">— Amy Houston Gaddis, Co-Founder, Rancher Navy</cite>
              </div>
            </AnimatedElement>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <AnimatedElement key={i} delay={400 + (i * 100)}>
                  <div className="bg-card/40 backdrop-blur-sm border border-border/20 p-6 hover:bg-card/60 transition-all duration-300">
                    <div className="text-4xl font-medium text-foreground mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{s.value}</div>
                    <div className="text-muted-foreground text-[11px] tracking-wide uppercase leading-snug">{s.label}</div>
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

function PortfolioSection() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    PortfolioCompanyEntity.list('sort_order', 10).then(setCompanies).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const staticFallback = [
    { name: "Fuzion Consulting Group", tagline: "Technology Consulting · Primary", badge: "Flagship", description: "The flagship firm. Over 35 years of combined experience supporting large-scale engineering, construction, utility, and enterprise programs.", features: ["PowerApps, AWS, AI Engineering, M365", "Project & Program Management · Project Controls", "Engineering & Construction Technology", "Cloud Architecture & Digital Transformation"], link_url: "https://fcghelps.com/", link_label: "fcghelps.com", status: "Live" },
    { name: "Fuzion Chickasaw Group", tagline: "Minority Woman-Owned · Native American · Chickasaw Nation", badge: "Minority Owned", description: "Founded by Donna — a proud Chickasaw Nation member — to serve tribal governments, Native American enterprises, nonprofits, and public sector organizations.", features: ["Tribal Government & Enterprise Technology", "Certified Minority & Native American Owned", "Oklahoma & Texas Nonprofit Technology", "Government & Public Sector Contracting"], link_url: "https://fuzionchickasawgroup.com/", link_label: "fuzionchickasawgroup.com", status: "Launching" },
    { name: "SB217 — Support Beacon Platform", tagline: "Born February 17, 2026 · SB217 Platform", badge: "Born 2/17", description: "The parent technology platform born from the Ranger Road Fire. S = Support. B = Beacon. 2/17 = the date Fuzion drove into the disaster zone.", features: ["Support Beacon Relief — Nonprofit disaster logistics · Free", "Support Beacon Logistics — Enterprise · Licensed SaaS", "AWS Platform · DOT-Integrated · Mobile iOS & Android", "Founding partner: Rancher Navy"], link_url: "https://sb217platform.com/", link_label: "sb217platform.com", status: "Live" },
    { name: "Rancher Navy", tagline: "501(c)(3) · Founding Partner · Texas-Based", badge: "Founding Partner", description: "The nonprofit that started it all. Founded by Morgan Broome and Amy Houston Gaddis to mobilize volunteers, equipment, and logistics for agricultural communities.", features: ["First adopter of Support Beacon Relief", "24/7 disaster dispatch · Multi-state coverage", "National volunteer & donor network", "(817) 264-6444 · info@ranchernavy.org"], link_url: "https://ranchernavy.org/", link_label: "ranchernavy.org", status: "Live" },
    { name: "Fortitude Junk Removal & Hauling", tagline: "Coming Soon · Veteran-Owned", badge: "Coming Soon", description: "A veteran-owned junk removal and hauling company co-founded with a proud U.S. veteran and actively supported by Fuzion Companies technology.", features: ["Veteran-Owned & Operated", "Integrated with Support Beacon Relief dispatch", "Supported by Fuzion Companies technology", "Disaster relief hauling & residential removal"], link_url: "#contact", link_label: "Inquire about Fortitude", status: "Coming Soon" },
  ];
  
  const items = companies.length > 0 ? companies : staticFallback;

  return (
    <section id="portfolio" className="bg-secondary/5 py-32 border-y border-border/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <AnimatedElement>
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-20 items-end">
            <div className="lg:w-1/2">
              <p className="text-primary text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold">The Portfolio</p>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium text-foreground leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Every company.<br />One mission.
              </h2>
            </div>
            <div className="lg:w-1/2 pb-2">
              <p className="text-muted-foreground text-[15px] leading-relaxed font-light">
                Fuzion Companies is a portfolio of technology consulting firms, a proprietary logistics platform, a veteran-owned hauling company, and a founding nonprofit partnership — each distinct, all united by the same values and the same conviction that great work done with integrity changes things.
              </p>
            </div>
          </div>
        </AnimatedElement>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}>
          {items.map((company, i) => (
            <AnimatedElement key={i} delay={i * 100}>
              <div className="bg-card/40 backdrop-blur-md border border-border/20 p-8 h-full flex flex-col hover:border-primary/40 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 group">
                
                <div className="flex items-start justify-between gap-4 mb-6 border-b border-border/10 pb-4">
                  <p className="text-primary text-[10px] tracking-[0.2em] uppercase font-semibold leading-relaxed">{company.tagline}</p>
                  <span className={`text-[10px] tracking-widest uppercase px-2.5 py-1 flex-shrink-0 font-medium ${company.status === 'Live' ? 'text-foreground border border-border/40' : company.status === 'Coming Soon' ? 'text-primary border border-primary/30' : 'text-muted-foreground border border-border/20'}`}>
                    {company.status}
                  </span>
                </div>

                <h3 className="text-2xl lg:text-3xl font-medium text-foreground mb-4 group-hover:text-primary transition-colors duration-300" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {company.name}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1 font-light">{company.description}</p>
                
                {company.features && (
                  <ul className="space-y-3 mb-8">
                    {company.features.map((f, fi) => (
                      <li key={fi} className="text-muted-foreground text-[13px] flex items-start gap-3 font-light">
                        <span className="w-1 h-1 rounded-full bg-primary/60 mt-1.5 flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
                
                <div className="mt-auto pt-6 border-t border-border/10">
                  <a href={company.link_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary text-[11px] font-semibold tracking-[0.15em] uppercase hover:text-foreground transition-colors duration-300 group/link">
                    {company.link_label}
                    <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

function MissionSection() {
  const values = [
    { title: "Faith", desc: "The conviction that a new door opens when you keep showing up — even in the hard seasons." },
    { title: "Service", desc: "We drove our own trucks. We donated our own time. That is what we mean when we say service." },
    { title: "Precision", desc: "35 years of engineering-grade discipline applied to every line of code, every project plan, every delivery." },
    { title: "Community", desc: "Rancher Navy. Chickasaw Nation. Veterans. Nonprofits. Rural communities. These are the people we build for." },
  ];
  
  const sbFeatures = [
    "Secure registration — volunteers, donors, haulers, recipients",
    "Real-time dispatch dashboard and live hauler tracking",
    "DOT-integrated routing for compliant load transport",
    "NDA and waiver management built in",
    "Mobile iOS and Android — built on AWS Platform",
    "Available to qualifying nonprofits at no cost",
  ];

  return (
    <section id="mission" className="bg-background py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          <div className="lg:col-span-6">
            <AnimatedElement>
              <p className="text-primary text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold">Our Mission</p>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium text-foreground mb-8 leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Excellence and service<br />are the same thing.
              </h2>
              <p className="text-muted-foreground text-[15px] leading-relaxed mb-6 font-light">
                Every company in the Fuzion portfolio was built on a belief that doing extraordinary work for the right reasons — not despite serving others, but because of it — is both a competitive advantage and a calling.
              </p>
              <p className="text-muted-foreground text-[15px] leading-relaxed mb-12 font-light">
                We have spent 35 years proving that in engineering yards, utility control rooms, construction sites, and disaster zones. February 17, 2026 is the date that conviction became a product.
              </p>
            </AnimatedElement>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {values.map((v, i) => (
                <AnimatedElement key={i} delay={i * 100}>
                  <div>
                    <p className="text-foreground text-base font-medium mb-3 tracking-wide">{v.title}</p>
                    <p className="text-muted-foreground text-[13px] leading-relaxed font-light">{v.desc}</p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            <AnimatedElement delay={200}>
              <div className="bg-[#0f141d] border border-border/20 p-10 sm:p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-primary/10 transition-colors duration-700" />
                
                <p className="text-primary text-[10px] tracking-[0.2em] uppercase mb-6 font-semibold border border-primary/20 inline-block px-3 py-1.5 bg-primary/5">SB217 Platform</p>
                
                <h3 className="text-3xl font-medium text-foreground mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  The technology<br />born from the mission.
                </h3>
                
                <p className="text-muted-foreground text-[14px] leading-relaxed mb-10 font-light">
                  Support Beacon Relief is the direct result of Fuzion's values meeting Rancher Navy's need. Built in six weeks. Donated entirely. Now expanding into enterprise logistics for private and public sector clients.
                </p>
                
                <ul className="space-y-4 mb-12">
                  {sbFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground text-[13px] font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0 shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
                      {f}
                    </li>
                  ))}
                </ul>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="https://beacon-relief-hub.replit.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 text-[10px] font-semibold tracking-[0.15em] uppercase hover:-translate-y-0.5 hover:shadow-[0_5px_20px_-5px_rgba(var(--primary),0.5)] transition-all duration-300">
                    Support Beacon Relief →
                  </a>
                  <a href="https://sb217platform.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border/40 text-foreground px-6 py-3.5 text-[10px] font-semibold tracking-[0.15em] uppercase hover:bg-muted/30 transition-all duration-300">
                    SB217 Platform →
                  </a>
                </div>
              </div>
            </AnimatedElement>
          </div>

        </div>
      </div>
    </section>
  );
}

function RancherNavySection() {
  return (
    <section id="partner" className="bg-secondary/5 border-t border-border/10 py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          <div className="lg:col-span-6">
            <AnimatedElement>
              <div className="flex items-center gap-3 mb-6">
                <Anchor className="w-4 h-4 text-primary" />
                <span className="text-primary text-[10px] tracking-[0.25em] uppercase font-semibold">Founding Nonprofit Partner</span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium text-foreground mb-8 leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                The organization<br />that opened the door.
              </h2>
              
              <p className="text-muted-foreground text-[15px] leading-relaxed mb-6 font-light">
                When Fuzion's team arrived in Gate, Oklahoma on February 17, 2026, they were not looking for a business opportunity. They were looking to help. What they found were two remarkable women running a remarkable nonprofit — and a problem Fuzion was uniquely equipped to solve.
              </p>
              
              <p className="text-muted-foreground text-[15px] leading-relaxed mb-12 font-light">
                Rancher Navy did not just inspire Support Beacon Relief. They trusted Fuzion with their operations, their donors, their volunteers, and their mission. That trust is the foundation of everything SB217 has become.
              </p>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { v: "24/7", l: "Disaster Dispatch" },
                  { v: "Multi", l: "State Coverage" },
                  { v: "100%", l: "Volunteer Driven" },
                  { v: "2/17", l: "Partnership Founded" }
                ].map((s, i) => (
                  <div key={i} className="border-l border-primary/40 pl-5 py-2">
                    <div className="text-2xl font-medium text-foreground mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{s.v}</div>
                    <div className="text-muted-foreground text-[10px] tracking-widest uppercase">{s.l}</div>
                  </div>
                ))}
              </div>
            </AnimatedElement>
          </div>

          <div className="lg:col-span-6">
            <AnimatedElement delay={300}>
              <div className="bg-card/40 backdrop-blur-md border border-border/20 p-10 sm:p-12 hover:border-primary/20 transition-colors duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <Anchor className="w-4 h-4 text-primary" />
                  <span className="text-muted-foreground text-[11px] tracking-[0.15em] uppercase font-medium">Rancher Navy · ranchernavy.org</span>
                </div>
                
                <h3 className="text-3xl font-medium text-foreground mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  Mobilizing relief<br />when it matters most.
                </h3>
                
                <p className="text-muted-foreground text-[14px] leading-relaxed mb-10 font-light">
                  A Texas-based 501(c)(3) nonprofit connecting donors, haulers, volunteers, and agricultural families in crisis — now powered by Support Beacon Relief.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4 mb-10">
                  <div className="bg-background/40 border border-border/10 p-5">
                    <p className="text-foreground text-sm font-semibold mb-1">Morgan Broome</p>
                    <p className="text-primary text-[10px] tracking-widest uppercase">Co-Founder, Rancher Navy</p>
                  </div>
                  <div className="bg-background/40 border border-border/10 p-5">
                    <p className="text-foreground text-sm font-semibold mb-1">Amy Houston Gaddis</p>
                    <p className="text-primary text-[10px] tracking-widest uppercase">Co-Founder, Rancher Navy</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="https://ranchernavy.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 text-[10px] font-semibold tracking-[0.15em] uppercase hover:-translate-y-0.5 hover:shadow-[0_5px_20px_-5px_rgba(var(--primary),0.5)] transition-all duration-300">
                    Visit Rancher Navy →
                  </a>
                  <a href="https://beacon-relief-hub.replit.app/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-border/40 text-foreground px-6 py-3.5 text-[10px] font-semibold tracking-[0.15em] uppercase hover:bg-muted/30 transition-all duration-300">
                    Support Beacon Relief →
                  </a>
                </div>
              </div>
            </AnimatedElement>
          </div>

        </div>
      </div>
    </section>
  );
}

function FortitudeBanner() {
  return (
    <AnimatedElement>
      <div className="border-y border-border/20 py-4 px-6 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center md:text-left">
            <span className="text-primary text-[9px] font-bold tracking-[0.2em] uppercase border border-primary/40 px-2 py-1 flex-shrink-0 bg-primary/5">Coming Soon</span>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
              <strong className="text-foreground text-sm font-medium tracking-wide">Fortitude Junk Removal & Hauling, LLC</strong>
              <span className="text-muted-foreground text-[11px] font-light hidden lg:inline">— A veteran-owned ground operations partner · Integrated with Support Beacon Relief</span>
            </div>
          </div>
          <a href="#contact" className="text-primary text-[10px] font-semibold tracking-[0.15em] uppercase whitespace-nowrap hover:text-foreground transition-colors duration-200 flex items-center gap-1.5">
            Stay Informed <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </AnimatedElement>
  );
}

function LeadershipSection() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    LeadershipMemberEntity.list('sort_order', 10).then(setMembers).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const staticFallback = [
    { name: "Founder & Principal", title: "Founder & Principal", role_badge: "Founder · Fuzion Consulting Group", bio: "Over 35 years of experience supporting large-scale engineering, construction, and enterprise technology programs. The leader who pulled a hay trailer out of storage and drove into the Ranger Road Fire — and came back with a platform. Builder of the Fuzion Companies portfolio and the SB217 initiative." },
    { name: "Donna · Principal Advisor", title: "Principal Advisor", role_badge: "Co-Founder · Fuzion Chickasaw Group", bio: "A proud member of the Chickasaw Nation and co-founder of Fuzion Chickasaw Group. Donna brings decades of consulting and program management expertise to tribal governments, nonprofits, and public sector organizations — and the cultural understanding that comes from being part of the community you serve." },
    { name: "Andy · Platform Architect", title: "Platform Architect", role_badge: "Lead Developer · SB217 Platform", bio: "The developer who conceived the parent brand architecture behind SB217 and built the secure registration portal that anchors Support Beacon Relief. Andy's insight that great technology needs a great brand story — and a great brand story needs great technology — is baked into every layer of the platform." },
    { name: "Prag · Logistics Engineer", title: "Logistics Engineer", role_badge: "Senior Developer · Logistics & Mobile", bio: "The logistics and mobile development lead behind Support Beacon Relief's most powerful features — the DOT-integrated dispatch dashboard, the live hauler tracking system, and the iOS and Android mobile applications. Prag's 2:30am conversation about SB415 sparked the idea that became SB217." },
  ];
  
  const items = members.length > 0 ? members : staticFallback;

  return (
    <section id="leadership" className="bg-background py-32">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <p className="text-primary text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold">Leadership</p>
          <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium text-foreground mb-6 leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            The people<br />behind the mission.
          </h2>
          <p className="text-muted-foreground text-[15px] leading-relaxed max-w-2xl mb-16 font-light">
            Fuzion Companies is led by a team that has spent over three decades in the field — on engineering sites, in utility control rooms, and now in disaster zones. Every decision is made by people who have done the work themselves.
          </p>
        </AnimatedElement>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-700`}>
          {items.map((member, i) => (
            <AnimatedElement key={i} delay={i * 100}>
              <div className="bg-card/30 border border-border/10 p-8 h-full hover:border-primary/30 hover:bg-card/50 transition-all duration-500 group">
                <p className="text-primary text-[9px] tracking-[0.2em] uppercase mb-4 font-semibold">{member.role_badge}</p>
                <h3 className="text-2xl font-medium text-foreground mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{member.name}</h3>
                <p className="text-muted-foreground text-[13px] leading-relaxed font-light">{member.bio}</p>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

function DigitalFootprintSection() {
  const domains = [
    { domain: "FuzionCompanies.com", desc: "Parent Brand Homepage", status: "Secured" },
    { domain: "FuzionEnterprise.com", desc: "Enterprise Redirect", status: "Secured" },
    { domain: "FuzionGroup.com", desc: "Premium Domain", status: "Pending" },
    { domain: "SB217platform.com", desc: "SB217 Parent Platform", status: "Secured" },
    { domain: "SB217.co · SB217.org", desc: "SB217 Backup Redirects", status: "Secured" },
    { domain: "SupportBeaconRelief.com", desc: "Support Beacon Relief App", status: "Live" },
    { domain: "fcghelps.com", desc: "Fuzion Consulting Group", status: "Live" },
    { domain: "fuzionchickasawgroup.com", desc: "Fuzion Chickasaw Group", status: "Launching" },
    { domain: "ranchernavy.org", desc: "Rancher Navy · Partner", status: "Live" },
  ];

  const statusColor = (s) => {
    if (s === "Live") return "text-foreground border-border/50";
    if (s === "Launching") return "text-primary border-primary/40";
    if (s === "Pending") return "text-muted-foreground border-border/20";
    return "text-muted-foreground border-border/20";
  };

  return (
    <section className="bg-secondary/5 py-32 border-t border-border/10">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedElement>
          <p className="text-primary text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold">Digital Footprint</p>
          <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium text-foreground mb-16 leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Secured &amp; ready<br />to launch.
          </h2>
        </AnimatedElement>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {domains.map((d, i) => (
            <AnimatedElement key={i} delay={i * 50}>
              <div className="bg-card/20 border border-border/10 p-5 flex flex-col justify-between h-full hover:bg-card/40 hover:border-border/30 transition-all duration-300">
                <div className="mb-4">
                  <p className="text-foreground text-sm font-medium mb-1 tracking-wide">{d.domain}</p>
                  <p className="text-muted-foreground text-[11px] font-light">{d.desc}</p>
                </div>
                <div className="mt-auto">
                  <span className={`text-[9px] font-semibold tracking-[0.15em] uppercase px-2 py-1 border inline-block ${statusColor(d.status)}`}>{d.status}</span>
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}

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
    <section id="contact" className="bg-background py-32 border-t border-border/10 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          
          <div className="lg:col-span-5">
            <AnimatedElement>
              <p className="text-primary text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold">Get In Touch</p>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium text-foreground mb-8 leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Ready to build<br />something that matters?
              </h2>
              <p className="text-muted-foreground text-[15px] leading-relaxed mb-14 font-light">
                Whether you are a nonprofit looking for disaster logistics technology, an enterprise exploring Support Beacon Logistics, a tribal organization seeking a certified technology partner, or anyone who wants to work with a team that shows up — we want to hear from you.
              </p>
              
              <div className="space-y-8">
                {contacts.map((c, i) => (
                  <div key={i} className="flex items-start gap-5">
                    <div className="w-10 h-10 rounded-full border border-border/30 flex items-center justify-center flex-shrink-0 bg-secondary/10">
                      <c.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="pt-1">
                      <p className="text-foreground text-sm font-medium mb-1.5 tracking-wide">{c.label}</p>
                      {c.link ? (
                        <a href={c.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-[12px] hover:text-primary transition-colors duration-200">{c.linkLabel}</a>
                      ) : (
                        <div className="flex flex-wrap gap-x-4 gap-y-2">
                          {c.links?.map((l, li) => (
                            <a key={li} href={l.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground text-[12px] hover:text-primary transition-colors duration-200">{l.label}</a>
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
              <div className="bg-card/20 border border-border/10 p-8 sm:p-12">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                    <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center mb-6 bg-primary/5">
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-3xl font-medium text-foreground mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Message Sent</h3>
                    <p className="text-muted-foreground text-[15px] font-light">Thank you for reaching out. We will be in touch soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="text-muted-foreground text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block">First Name</label>
                        <input type="text" value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})} className="w-full bg-background border border-border/20 text-foreground text-sm px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors duration-300" required />
                      </div>
                      <div>
                        <label className="text-muted-foreground text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block">Last Name</label>
                        <input type="text" value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})} className="w-full bg-background border border-border/20 text-foreground text-sm px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors duration-300" required />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-muted-foreground text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block">Organization</label>
                      <input type="text" value={form.organization} onChange={e => setForm({...form, organization: e.target.value})} className="w-full bg-background border border-border/20 text-foreground text-sm px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors duration-300" />
                    </div>
                    
                    <div>
                      <label className="text-muted-foreground text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block">Email Address</label>
                      <input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full bg-background border border-border/20 text-foreground text-sm px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors duration-300" required />
                    </div>
                    
                    <div>
                      <label className="text-muted-foreground text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block">I am interested in</label>
                      <select value={form.interest} onChange={e => setForm({...form, interest: e.target.value})} className="w-full bg-background border border-border/20 text-foreground text-sm px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors duration-300 appearance-none">
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
                      <label className="text-muted-foreground text-[10px] uppercase tracking-[0.15em] font-semibold mb-2 block">Message</label>
                      <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} rows={5} className="w-full bg-background border border-border/20 text-foreground text-sm px-4 py-3 focus:outline-none focus:border-primary/50 transition-colors duration-300 resize-none" required />
                    </div>
                    
                    <button type="submit" className="group relative overflow-hidden bg-primary text-primary-foreground px-8 py-3.5 text-[11px] font-semibold tracking-[0.2em] uppercase hover:-translate-y-0.5 hover:shadow-[0_5px_20px_-5px_rgba(var(--primary),0.5)] transition-all duration-300">
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                      <span className="relative">Send Message</span>
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
    <div className="bg-background min-h-screen text-foreground selection:bg-primary/30">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatA { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-30px) scale(1.05); } }
        @keyframes floatB { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-20px) scale(0.95); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      `}} />
      <HeroSection />
      <QuoteBanner />
      <StorySection />
      <PortfolioSection />
      <MissionSection />
      <RancherNavySection />
      <FortitudeBanner />
      <LeadershipSection />
      <DigitalFootprintSection />
      <ContactSection />
    </div>
  );
}