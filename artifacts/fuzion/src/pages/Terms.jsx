import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";

const NAVY = '#0a1628';
const GOLD = '#C8922A';
const CREAM = '#FAF8F4';

export default function Terms() {
  return (
    <div className="min-h-screen pt-32 pb-20" style={{ background: CREAM }}>
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase mb-12 hover:opacity-70 transition-opacity" style={{ color: NAVY }}>
          <ArrowLeft className="w-4 h-4" /> Back to Fuzion Companies
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-5 h-5" style={{ color: GOLD }} />
          <p className="text-[10px] tracking-[0.3em] uppercase font-semibold" style={{ color: GOLD }}>Legal · Terms of Use</p>
        </div>

        <h1 className="text-5xl sm:text-6xl font-medium leading-[1.1] mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
          Terms of Use.
        </h1>
        <p className="text-sm font-normal mb-16" style={{ color: NAVY, opacity: 0.6 }}>
          Effective Date: May 21, 2026  ·  Last Updated: May 21, 2026
        </p>

        <div className="prose max-w-none space-y-10" style={{ color: NAVY }}>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>1. Acceptance of Terms</h2>
            <p className="text-[15px] leading-relaxed font-normal" style={{ opacity: 0.85 }}>
              By accessing or using FuzionCompanies.com and any associated Fuzion Companies properties (including but not limited to fuzionconsultinggroup.com, fuzionchickasawgroup.com, sb217platform.com, and supportbeaconrelief.com — collectively, the "Sites"), you agree to be bound by these Terms of Use. If you do not agree, do not use the Sites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>2. Intellectual Property — All Rights Reserved</h2>
            <p className="text-[15px] leading-relaxed font-normal mb-4" style={{ opacity: 0.85 }}>
              All content on the Sites — including but not limited to text, graphics, logos, photographs, brand identity systems, typography systems, color palettes, design tokens, source code, page layouts, component architecture, written copy, taglines, business names, and the underlying technology platform — is the exclusive property of Fuzion Companies, LLC and its subsidiaries, and is protected by United States and international copyright, trademark, trade dress, and other intellectual property laws.
            </p>
            <p className="text-[15px] leading-relaxed font-normal" style={{ opacity: 0.85 }}>
              <strong>Registered and common-law trademarks</strong> of Fuzion Companies, LLC include: "Fuzion Companies," "Fuzion Consulting Group," "Fuzion Chickasaw Group," "SB217," "Support Beacon Relief," "Support Beacon Logistics," "The Works Suite," "Fuzion365 Fieldworks," "Construct Works," "ProjectWorks," "Fuzion Storm Works," and "Take Cover."
            </p>
          </section>

          <section>
            <div className="border-l-4 p-6" style={{ borderColor: GOLD, background: '#FAF5EA' }}>
              <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>3. Prohibited Uses</h2>
              <p className="text-[15px] leading-relaxed font-normal mb-4" style={{ opacity: 0.9 }}>
                You may NOT, without express prior written authorization from Fuzion Companies, LLC:
              </p>
              <ul className="space-y-2 text-[15px] font-normal" style={{ opacity: 0.85 }}>
                <li>• Copy, reproduce, mirror, republish, or redistribute any portion of the Sites, in whole or in part</li>
                <li>• Reverse-engineer, decompile, or attempt to extract the source code or underlying architecture</li>
                <li>• Use any automated system — including bots, scrapers, spiders, crawlers, or AI ingestion agents — to access, collect, or extract content from the Sites</li>
                <li>• Use the Sites or their content to train, fine-tune, or evaluate any artificial intelligence or machine learning model</li>
                <li>• Create derivative works based on the brand identity, design system, copy, or visual language of the Sites</li>
                <li>• Use any Fuzion Companies trademark, logo, brand element, color system, or typography pairing in connection with any competing product, service, or business without written authorization</li>
                <li>• Frame, embed, or hot-link the Sites or their assets within any third-party property</li>
                <li>• Remove, obscure, or alter any copyright, trademark, or proprietary notice</li>
                <li>• Use the Sites for any unlawful purpose or in any manner that could damage, disable, overburden, or impair the Sites</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>4. Limited License</h2>
            <p className="text-[15px] leading-relaxed font-normal" style={{ opacity: 0.85 }}>
              Subject to your compliance with these Terms, Fuzion Companies grants you a limited, non-exclusive, non-transferable, revocable license to access and view the Sites for personal, non-commercial informational purposes only. This license does not include any right to download (other than page caching), modify, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any content obtained from the Sites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>5. Enforcement</h2>
            <p className="text-[15px] leading-relaxed font-normal" style={{ opacity: 0.85 }}>
              Fuzion Companies actively monitors for unauthorized use of its intellectual property and brand assets. Violations of these Terms will be pursued to the full extent of applicable law, including injunctive relief, monetary damages, statutory damages under the U.S. Copyright Act and Lanham Act, attorney's fees, and disgorgement of profits.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>6. No Warranty</h2>
            <p className="text-[15px] leading-relaxed font-normal" style={{ opacity: 0.85 }}>
              The Sites and their content are provided "as is" and "as available" without warranties of any kind, either express or implied. Fuzion Companies disclaims all warranties to the fullest extent permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>7. Limitation of Liability</h2>
            <p className="text-[15px] leading-relaxed font-normal" style={{ opacity: 0.85 }}>
              In no event shall Fuzion Companies, LLC, its officers, directors, employees, agents, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Sites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>8. Governing Law</h2>
            <p className="text-[15px] leading-relaxed font-normal" style={{ opacity: 0.85 }}>
              These Terms are governed by and construed in accordance with the laws of the State of Oklahoma, United States, without regard to its conflict of law principles. Any dispute arising from these Terms shall be resolved exclusively in the state or federal courts located in Bryan County, Oklahoma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>9. Changes to These Terms</h2>
            <p className="text-[15px] leading-relaxed font-normal" style={{ opacity: 0.85 }}>
              Fuzion Companies reserves the right to update or modify these Terms at any time without prior notice. Continued use of the Sites following any changes constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>10. Contact</h2>
            <p className="text-[15px] leading-relaxed font-normal" style={{ opacity: 0.85 }}>
              For licensing inquiries, IP concerns, or to report a violation:<br />
              <strong>Fuzion Companies, LLC</strong><br />
              Email: <a href="mailto:technology@fcghelps.com" style={{ color: GOLD }} className="hover:underline">technology@fcghelps.com</a><br />
              Calera, Oklahoma · United States
            </p>
          </section>

          <p className="text-sm font-normal pt-10 border-t border-gray-200 mt-12" style={{ opacity: 0.55 }}>
            © 2019–2026 Fuzion Companies, LLC. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}