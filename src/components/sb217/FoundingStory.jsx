import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";

const NAVY = '#0a1628';
const NAVY2 = '#0d1f3c';
const GOLD = '#C8922A';

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

// Updated content from the Fuzion Companies original timeline — 5 moments.
const TIMELINE = [
  { date: "January 2026", title: "A major project pauses", desc: "Fuzion's largest engagement is placed on hold. The team stays together. The horizon opens. Faith holds.", side: "right" },
  { date: "February 17, 2026 — The Ranger Road Fire", title: "Fuzion drives in", desc: "Our founder pulls a truck out of storage, picks up a loaned trailer and donated hay from CM Cattle Company in Prairie City, Iowa, and drives to Gate, Oklahoma — delivering hay to ranchers who lost everything.", side: "right" },
  { date: "Gate, Oklahoma", title: "Rancher Navy connection", desc: "Fuzion meets Morgan Broome and Amy Houston Gaddis — running an entire disaster response from spreadsheets. Fuzion offers to change that. For free.", side: "left" },
  { date: "Six Weeks Later", title: "Support Beacon Relief is born", desc: "The entire Fuzion team volunteers. What starts as a spreadsheet becomes a full logistics platform — described by nonprofit leaders as better than enterprise tools they have paid for.", side: "right" },
  { date: "Today", title: "A new door — wide open", desc: "SB217, Support Beacon Relief, Support Beacon Logistics, Fuzion Chickasaw Group, Fortitude — an entire ecosystem born from one decision to show up.", side: "left" },
];

function TimelineCard({ item }) {
  return (
    <div className="border p-6 max-w-md" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
      <div className="flex items-center gap-2 mb-3">
        <Send className="w-3 h-3" style={{ color: GOLD }} />
        <p className="text-[10px] tracking-[0.2em] uppercase font-bold" style={{ color: GOLD }}>{item.date}</p>
      </div>
      <h3 className="text-white text-lg font-semibold mb-3 leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{item.title}</h3>
      <p className="text-white/65 text-[14px] leading-relaxed font-normal">{item.desc}</p>
    </div>
  );
}

export default function FoundingStory() {
  return (
    <section id="origin" className="py-32" style={{ background: `linear-gradient(160deg, ${NAVY} 0%, ${NAVY2} 100%)` }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          {/* Left intro */}
          <div className="lg:col-span-7">
            <AnimatedElement>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-[1px]" style={{ background: GOLD }} />
                <p className="text-[10px] tracking-[0.3em] uppercase font-bold" style={{ color: GOLD }}>How It Started</p>
              </div>
              <h2 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-medium mb-8 leading-[1.05] text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Born from<br />boots on the ground.
              </h2>
              <p className="text-white/65 text-base leading-relaxed font-normal max-w-xl">
                In January 2026, a major project pauses — and with it, the certainty of what comes next. Our founder found himself in Olathe, Kansas, searching and praying that a new door would open. It did. On February 17.
              </p>
            </AnimatedElement>
          </div>

          {/* Right sidebar — quote + mission */}
          <div className="lg:col-span-5 space-y-5">
            <AnimatedElement delay={150}>
              <div className="border p-7 relative" style={{ borderColor: 'rgba(200,146,42,0.4)', background: 'rgba(200,146,42,0.08)' }}>
                <span className="absolute top-3 right-4 text-7xl leading-none opacity-20" style={{ color: GOLD, fontFamily: "'Cormorant Garamond', serif" }}>"</span>
                <blockquote className="text-white text-lg italic leading-snug mb-5 font-medium relative z-10" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  "This application is better than many of the enterprise logistics tools I have ever seen."
                </blockquote>
                <cite className="text-[10px] tracking-[0.2em] uppercase font-bold block not-italic" style={{ color: GOLD }}>— Amy Houston Gaddis, Co-Founder, Rancher Navy</cite>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={250}>
              <div className="border p-7" style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)' }}>
                <p className="text-[10px] tracking-[0.2em] uppercase font-bold mb-4" style={{ color: GOLD }}>The Mission</p>
                <p className="text-white/70 text-[14px] leading-relaxed mb-6 font-normal">
                  Natural disasters do not wait for logistics systems to catch up. SB217 exists to close that gap — giving nonprofits, haulers, donors, volunteers, and recipients a single coordinated platform that deploys hope exactly when and where it is needed.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="https://www.supportbeaconrelief.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase text-white hover:-translate-y-0.5 transition-all duration-300" style={{ background: GOLD }}>
                    Support Beacon Relief
                  </a>
                  <a href="https://ranchernavy.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2.5 border text-[10px] font-bold tracking-[0.2em] uppercase text-white hover:bg-white/10 transition-all duration-300" style={{ borderColor: 'rgba(255,255,255,0.3)' }}>
                    Rancher Navy
                  </a>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>

        {/* Zig-zag timeline */}
        <div className="relative max-w-4xl mx-auto pt-10">
          {/* Center vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2" style={{ background: 'rgba(255,255,255,0.1)' }} />

          <div className="space-y-12">
            {TIMELINE.map((item, i) => (
              <AnimatedElement key={i} delay={i * 80}>
                <div className="relative flex items-start">
                  {/* Center dot */}
                  <div className="absolute left-1/2 top-3 w-3 h-3 rounded-full -translate-x-1/2 z-10" style={{ background: GOLD }} />

                  {item.side === "left" ? (
                    <>
                      <div className="w-1/2 pr-8 flex justify-end">
                        <TimelineCard item={item} />
                      </div>
                      <div className="w-1/2" />
                    </>
                  ) : (
                    <>
                      <div className="w-1/2" />
                      <div className="w-1/2 pl-8">
                        <TimelineCard item={item} />
                      </div>
                    </>
                  )}
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}