import { useState } from "react";
import { Download, FileText, Loader2 } from "lucide-react";
import { generateFuzionSitesStyleGuide } from "@/functions/generateFuzionSitesStyleGuide";

const NAVY = '#0a1628';
const GOLD = '#C8922A';
const CREAM = '#FAF8F4';

export default function FuzionSitesGuideDownload() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await generateFuzionSitesStyleGuide({});
      const blob = res.data instanceof Blob ? res.data : new Blob([res.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Fuzion-Sites-Web-Style-Guide.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 border-t border-gray-200" style={{ background: CREAM }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <p className="text-[10px] tracking-[0.3em] uppercase mb-4 font-semibold" style={{ color: GOLD }}>For Media & Web Teams</p>
            <h2 className="text-4xl sm:text-5xl font-medium mb-6 leading-[1.1]" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
              Fuzion sites web style guide.
            </h2>
            <p className="text-base leading-relaxed mb-8 font-normal max-w-2xl" style={{ color: NAVY, opacity: 0.75 }}>
              A 10-page brand adaptation guide for <strong>fuzionconsultinggroup.com</strong> and <strong>fuzionchickasawgroup.com</strong> — color tokens, typography, component recipes, and a token-by-token replacement map. Layouts stay the same; only colors, type, and styling tokens update to match the Fuzion Companies editorial system.
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-2 mb-10 text-[12px]" style={{ color: NAVY, opacity: 0.7 }}>
              <span className="flex items-center gap-2"><span className="w-2 h-2" style={{ background: NAVY }} /> Color system</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2" style={{ background: GOLD }} /> Typography</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2" style={{ background: '#3D3B8E' }} /> Sub-brand rules</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 border" style={{ borderColor: NAVY }} /> CSS variables</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 border" style={{ borderColor: NAVY }} /> QA checklist</span>
            </div>
            <button
              onClick={handleDownload}
              disabled={loading}
              className="inline-flex items-center gap-3 px-8 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60"
              style={{ background: GOLD }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download Style Guide PDF
                </>
              )}
            </button>
          </div>

          <div className="lg:col-span-5">
            <div className="border border-gray-200 p-10 relative" style={{ background: '#FAF8F4', borderTop: `3px solid ${GOLD}` }}>
              <FileText className="w-6 h-6 mb-6" style={{ color: GOLD }} />
              <p className="text-[10px] tracking-[0.25em] uppercase font-bold mb-4" style={{ color: NAVY, opacity: 0.55 }}>What's Inside</p>
              <ul className="space-y-3 text-[13px] font-normal" style={{ color: NAVY, opacity: 0.8 }}>
                <li className="flex justify-between gap-4 border-b border-gray-100 pb-2"><span>01 · Brand Philosophy</span><span style={{ color: GOLD }}>p.2</span></li>
                <li className="flex justify-between gap-4 border-b border-gray-100 pb-2"><span>02 · Color System</span><span style={{ color: GOLD }}>p.3</span></li>
                <li className="flex justify-between gap-4 border-b border-gray-100 pb-2"><span>03 · Typography</span><span style={{ color: GOLD }}>p.4</span></li>
                <li className="flex justify-between gap-4 border-b border-gray-100 pb-2"><span>04 · CSS Tokens</span><span style={{ color: GOLD }}>p.5</span></li>
                <li className="flex justify-between gap-4 border-b border-gray-100 pb-2"><span>05 · Component Recipes</span><span style={{ color: GOLD }}>p.6</span></li>
                <li className="flex justify-between gap-4 border-b border-gray-100 pb-2"><span>06 · FCG Adaptation Map</span><span style={{ color: GOLD }}>p.7</span></li>
                <li className="flex justify-between gap-4 border-b border-gray-100 pb-2"><span>06b · FCG Chickasaw Map</span><span style={{ color: GOLD }}>p.8</span></li>
                <li className="flex justify-between gap-4 border-b border-gray-100 pb-2"><span>07 · Do / Don't Rules</span><span style={{ color: GOLD }}>p.9</span></li>
                <li className="flex justify-between gap-4"><span>08 · Implementation Checklist</span><span style={{ color: GOLD }}>p.10</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}