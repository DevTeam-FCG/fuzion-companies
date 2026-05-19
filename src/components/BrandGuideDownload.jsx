import { useState } from "react";
import { BookOpen, Download, Loader2 } from "lucide-react";
import { generateBrandBookPDF } from "@/functions/generateBrandBookPDF";

const NAVY = '#0a1628';
const GOLD = '#C8922A';

export default function BrandGuideDownload() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await generateBrandBookPDF({}, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Fuzion_Editorial_System_v1.0.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 border-t border-gray-200" style={{ background: '#EEE9E2' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-4 h-4" style={{ color: GOLD }} />
              <p className="text-[10px] tracking-[0.3em] uppercase font-semibold" style={{ color: GOLD }}>Master Brand System</p>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-medium leading-[1.1] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
              The Fuzion <em className="italic" style={{ color: GOLD }}>Editorial System.</em>
            </h2>
            <p className="text-gray-600 text-[15px] leading-relaxed max-w-2xl font-normal">
              The complete brand and design system that powers every Fuzion property — Cream, Navy, and Gold. Color tokens, typography, components, per-property accents, and the guardrails that keep every site in the portfolio looking like family.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <button
              onClick={handleDownload}
              disabled={loading}
              className="inline-flex items-center gap-3 px-8 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase text-white hover:-translate-y-0.5 hover:opacity-90 transition-all duration-300 disabled:opacity-60 disabled:cursor-wait"
              style={{ background: NAVY }}
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
              {loading ? 'Generating…' : 'Download Brand Guide PDF'}
            </button>
            <p className="text-gray-500 text-[11px] mt-3 tracking-wide">v1.0 · 13 pages · May 2026</p>
          </div>
        </div>
      </div>
    </section>
  );
}