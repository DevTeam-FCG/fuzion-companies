import { Link } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";

const NAVY = '#0a1628';
const GOLD = '#C8922A';
const CREAM = '#FAF8F4';

export default function Privacy() {
  return (
    <div className="min-h-screen pt-32 pb-20" style={{ background: CREAM }}>
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase mb-12 hover:opacity-70 transition-opacity" style={{ color: NAVY }}>
          <ArrowLeft className="w-4 h-4" /> Back to Fuzion Companies
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-5 h-5" style={{ color: GOLD }} />
          <p className="text-[10px] tracking-[0.3em] uppercase font-semibold" style={{ color: GOLD }}>Legal · Privacy Policy</p>
        </div>

        <h1 className="text-5xl sm:text-6xl font-medium leading-[1.1] mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>
          Privacy Policy.
        </h1>
        <p className="text-sm font-normal mb-16" style={{ color: NAVY, opacity: 0.6 }}>
          Effective Date: May 21, 2026  ·  Last Updated: May 21, 2026
        </p>

        <div className="prose max-w-none space-y-10" style={{ color: NAVY }}>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>1. Overview</h2>
            <p className="text-[15px] leading-relaxed font-normal" style={{ opacity: 0.85 }}>
              Fuzion Companies, LLC ("Fuzion," "we," "us," "our") respects your privacy. This Privacy Policy explains how we collect, use, and protect information when you visit FuzionCompanies.com or interact with our contact forms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>2. Information We Collect</h2>
            <p className="text-[15px] leading-relaxed font-normal mb-4" style={{ opacity: 0.85 }}>
              <strong>Information you provide:</strong> When you submit the contact form on our Site, we collect your first name, last name, organization, email address, area of interest, and the message you send. We use this information solely to respond to your inquiry.
            </p>
            <p className="text-[15px] leading-relaxed font-normal" style={{ opacity: 0.85 }}>
              <strong>Information collected automatically:</strong> Like most websites, we collect standard, non-identifying technical information (such as browser type, device type, referring page, and aggregate visit metrics) to maintain and improve the Site. We do not use cross-site tracking cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>3. How We Use Your Information</h2>
            <ul className="space-y-2 text-[15px] font-normal" style={{ opacity: 0.85 }}>
              <li>• To respond to your inquiry and communicate with you about your request</li>
              <li>• To provide the services you have requested</li>
              <li>• To comply with legal obligations</li>
              <li>• To protect the security and integrity of the Site</li>
            </ul>
            <p className="text-[15px] leading-relaxed font-normal mt-4" style={{ opacity: 0.85 }}>
              We do not sell, rent, or trade your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>4. How We Share Information</h2>
            <p className="text-[15px] leading-relaxed font-normal" style={{ opacity: 0.85 }}>
              We share information only with: (a) team members of Fuzion Companies and its subsidiaries who need it to respond to your inquiry; (b) service providers under confidentiality obligations; and (c) law enforcement or regulators when required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>5. Data Security</h2>
            <p className="text-[15px] leading-relaxed font-normal" style={{ opacity: 0.85 }}>
              We maintain industry-standard administrative, technical, and physical safeguards to protect your information against unauthorized access, alteration, disclosure, or destruction. The Site is served over HTTPS and contact-form submissions are transmitted securely.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>6. Your Rights</h2>
            <p className="text-[15px] leading-relaxed font-normal" style={{ opacity: 0.85 }}>
              Depending on your jurisdiction, you may have the right to access, correct, or delete the personal information we hold about you. To exercise these rights, email <a href="mailto:technology@fcghelps.com" style={{ color: GOLD }} className="hover:underline">technology@fcghelps.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>7. Children's Privacy</h2>
            <p className="text-[15px] leading-relaxed font-normal" style={{ opacity: 0.85 }}>
              The Site is not directed to children under 13, and we do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>8. Changes</h2>
            <p className="text-[15px] leading-relaxed font-normal" style={{ opacity: 0.85 }}>
              We may update this Privacy Policy from time to time. Material changes will be reflected by updating the "Last Updated" date above.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: NAVY }}>9. Contact</h2>
            <p className="text-[15px] leading-relaxed font-normal" style={{ opacity: 0.85 }}>
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