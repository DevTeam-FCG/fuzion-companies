import { useState, useEffect, useRef } from "react";

const NAVY = '#0a1628';
const GOLD = '#C8922A';
const CREAM = '#FAF8F4';

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

const TIMELINE = [
  { date: "January 2026", title: "A major project pauses", desc: "Fuzion's largest engagement is placed on hold. The team stays together. The horizon opens. Faith holds." },
  { date: "February 17, 2026 — The Ranger Road Fire", title: "Fuzion drives in", desc: "Our founder pulls a truck out of storage, picks up a loaned trailer and donated hay from CM Cattle Company in Prairie City, Iowa, and drives to Gate, Oklahoma — delivering hay to ranchers who lost everything." },
  { date: "Gate, Oklahoma", title: "Rancher Navy connection", desc: "Fuzion meets Morgan Broome and Amy Houston Gaddis — running an entire disaster response from spreadsheets. Fuzion offers to change that. For free." },
  { date: "Six Weeks Later", title: "Support Beacon Relief is born", desc: "The entire Fuzion team volunteers. What starts as a spreadsheet becomes a full logistics platform — described by nonprofit leaders as better than enterprise tools they have paid for." },
  { date: "Today", title: "A new door — wide open", desc: "SB217, Support Beacon Relief, Support Beacon Logistics, Fuzion Chickasaw Group, Fortitude — an entire ecosystem born from one decision to show up." },
];

const STATS = [
  { value: "35+", label: "Years of Combined Team Experience" },
  { value: "6", label: "Weeks to Build SBR" },
  { value: "$0", label: "Charged to Rancher Navy" },
  { value: "2/17", label: "The Date Everything Changed" },
];

export default function FoundingStory() {
  return (
    <section id="origin" className="py-32" style={{ background: CREAM }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          <div className="lg:col-span-7">
            <AnimatedElement>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>How It Started</p>
              <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium mb-8 leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
                Born from boots<br />on the ground.
              </h2>
              <p className="text-base leading-relaxed mb-16 max-w-2xl font-normal" style={{ color: NAVY, opacity: 0.75 }}>
                In January 2026, a major project pauses — and with it, the certainty of what comes next. Our founder found himself in Olathe, Kansas, searching and praying that a new door would open. It did. On February 17.
              </p>
            </AnimatedElement>

            <div className="space-y-10">
              {TIMELINE.map((item, i) => (
                <AnimatedElement key={i} delay={i * 100}>
                  <div className="flex gap-6 group">
                    <div className="flex flex-col items-center mt-1 flex-shrink-0">
                      <div className="w-3 h-3 rounded-full border-2 bg-white group-hover:bg-yellow-600 transition-colors duration-300 relative z-10" style={{ borderColor: GOLD }} />
                      {i < TIMELINE.length - 1 && <div className="w-px flex-1 mt-2" style={{ background: '#e5e7eb' }} />}
                    </div>
                    <div className="pb-6">
                      <p className="text-[11px] tracking-[0.2em] uppercase font-semibold mb-2" style={{ color: GOLD }}>{item.date}</p>
                      <p className="text-lg font-semibold mb-2 tracking-wide" style={{ color: NAVY }}>{item.title}</p>
                      <p className="text-[15px] leading-relaxed font-normal" style={{ color: NAVY, opacity: 0.75 }}>{item.desc}</p>
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <AnimatedElement delay={300}>
              <div className="border border-gray-200 p-8 relative overflow-hidden shadow-sm" style={{ borderLeft: `4px solid ${GOLD}`, background: CREAM }}>
                <blockquote className="text-lg italic leading-relaxed mb-6" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
                  "This application is better than many of the enterprise logistics tools I have ever seen."
                </blockquote>
                <cite className="text-[10px] tracking-[0.2em] uppercase font-semibold block not-italic" style={{ color: GOLD }}>— Amy Houston Gaddis, Co-Founder, Rancher Navy</cite>
              </div>
            </AnimatedElement>

            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s, i) => (
                <AnimatedElement key={i} delay={400 + (i * 100)}>
                  <div className="border border-gray-200 p-6 shadow-sm hover:border-yellow-400 transition-colors duration-300 flex flex-col justify-between h-full min-h-[120px]" style={{ background: CREAM }}>
                    <div className="text-4xl font-medium mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>{s.value}</div>
                    <div className="text-[12px] tracking-wide uppercase leading-snug font-medium" style={{ color: NAVY, opacity: 0.6 }}>{s.label}</div>
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