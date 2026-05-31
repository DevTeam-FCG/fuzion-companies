import { useState } from "react";
import { Download, Code } from "lucide-react";
import { generateDeveloperHandoffPDF } from "@/functions/generateDeveloperHandoffPDF";

const NAVY = '#0a1628';
const GOLD = '#C8922A';
const PURPLE = '#2D1B69';
const CREAM = '#FAF8F4';

export default function DeveloperHandoffDownload() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await generateDeveloperHandoffPDF({});
      const blob = res.data instanceof Blob ? res.data : new Blob([res.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Fuzion-Developer-Handoff-Package.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24" style={{ background: CREAM }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="border border-gray-200 grid lg:grid-cols-12 gap-0 overflow-hidden">

          <div className="lg:col-span-7 p-10 lg:p-14" style={{ background: NAVY }}>
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-4 h-4" style={{ color: GOLD }} />
              <span className="text-[10px] tracking-[0.3em] uppercase font-semibold" style={{ color: GOLD }}>Developer Handoff Package</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-medium mb-5 leading-tight text-white" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              One PDF. Two sites updated by tomorrow.
            </h2>
            <p className="text-white/70 text-[15px] leading-relaxed mb-8 font-normal max-w-xl">
              A copy-paste ready brand handoff for your developer. Includes CSS variables, Tailwind config, hex codes, typography pairing, logo rules, and site-specific application notes for both fcghelps.com and the Fuzion Chickasaw Group site.
            </p>

            <div className="space-y-3 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2" style={{ background: GOLD }} />
                <span className="text-white/85 text-[13px]">Fuzion Companies core palette  ·  Navy + Gold + Cream</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2" style={{ background: PURPLE }} />
                <span className="text-white/85 text-[13px]">Fuzion Chickasaw accent  ·  Dark Purple + Gold</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2" style={{ background: GOLD }} />
                <span className="text-white/85 text-[13px]">Drop-in CSS variables &amp; Tailwind config</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2" style={{ background: GOLD }} />
                <span className="text-white/85 text-[13px]">QA checklist  ·  ready to ship</span>
              </div>
            </div>

            <button
              onClick={handleDownload}
              disabled={loading}
              className="inline-flex items-center gap-3 px-8 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60"
              style={{ background: GOLD }}
            >
              <Download className="w-4 h-4" />
              {loading ? 'Generating PDF...' : 'Download Handoff Package'}
            </button>
          </div>

          <div className="lg:col-span-5 p-10 lg:p-14 flex flex-col justify-between" style={{ background: CREAM }}>
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase font-semibold mb-4" style={{ color: GOLD }}>What is inside</p>
              <ul className="space-y-3 text-[14px]" style={{ color: NAVY }}>
                <li className="border-b border-gray-200 pb-3">01  ·  Quick Start Summary</li>
                <li className="border-b border-gray-200 pb-3">02  ·  Fuzion Core Palette</li>
                <li className="border-b border-gray-200 pb-3">03  ·  Chickasaw Purple Accent</li>
                <li className="border-b border-gray-200 pb-3">04  ·  Site-by-Site Application</li>
                <li className="border-b border-gray-200 pb-3">05  ·  CSS Variables</li>
                <li className="border-b border-gray-200 pb-3">06  ·  Tailwind Config</li>
                <li className="border-b border-gray-200 pb-3">07  ·  Typography Pairing</li>
                <li className="border-b border-gray-200 pb-3">08  ·  Logo Usage</li>
                <li className="pb-1">09  ·  QA Checklist</li>
              </ul>
            </div>
            <p className="text-gray-500 text-[12px] italic mt-8 font-normal">
              Designed so your developer has zero reasons to delay shipping.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}