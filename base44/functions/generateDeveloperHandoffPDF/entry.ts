import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import { jsPDF } from 'npm:jspdf@2.5.1';

// ─── BRAND TOKENS (matches site index.css) ────────────────────────────────
const NAVY = [10, 22, 40];
const NAVY2 = [13, 31, 60];
const GOLD = [200, 146, 42];
const CREAM = [250, 248, 244];
const CREAM_DEEP = [238, 233, 226];
const GRAY = [107, 114, 128];
const DARK = [30, 30, 30];
const BORDER = [220, 220, 220];

// Fuzion Chickasaw — dark purple + gold accent system
const PURPLE_DEEP = [45, 27, 105];     // #2D1B69 — primary dark purple
const PURPLE = [61, 59, 142];          // #3D3B8E — Chickasaw indigo (secondary)
const PURPLE_SOFT = [155, 142, 196];   // #9B8EC4 — soft accent

const GREEN = [26, 138, 110];

const SEP = '  /  ';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const doc = new jsPDF({ unit: 'pt', format: 'letter' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginX = 56;
    const contentWidth = pageWidth - marginX * 2;
    let y = 0;

    // ── Helpers ───────────────────────────────────────────
    const ensureSpace = (needed) => {
      if (y + needed > pageHeight - 60) {
        addFooter();
        doc.addPage();
        addPageBackground();
        addHeader();
      }
    };

    const addPageBackground = () => {
      doc.setFillColor(...CREAM);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');
    };

    const addHeader = () => {
      doc.setFillColor(...NAVY);
      doc.rect(0, 0, pageWidth, 36, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...GOLD);
      doc.text('FUZION COMPANIES' + SEP + 'Developer Handoff Package', marginX, 22);
      doc.setTextColor(255, 255, 255);
      doc.text('v1.0', pageWidth - marginX, 22, { align: 'right' });
      y = 70;
    };

    const addFooter = () => {
      const fy = pageHeight - 30;
      doc.setDrawColor(...GOLD);
      doc.setLineWidth(0.5);
      doc.line(marginX, fy - 12, pageWidth - marginX, fy - 12);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(...GOLD);
      doc.text('FUZION COMPANIES' + SEP + 'fuzioncompanies.com', pageWidth / 2, fy, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...GRAY);
      doc.text('Page ' + doc.internal.getNumberOfPages(), pageWidth - marginX, fy, { align: 'right' });
      doc.text('Developer Handoff' + SEP + 'v1.0', marginX, fy);
    };

    const sectionTitle = (eyebrow, title) => {
      ensureSpace(80);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...GOLD);
      doc.text(eyebrow.toUpperCase(), marginX, y);
      y += 14;
      doc.setFont('times', 'normal');
      doc.setFontSize(24);
      doc.setTextColor(...NAVY);
      const lines = doc.splitTextToSize(title, contentWidth);
      doc.text(lines, marginX, y);
      y += lines.length * 26 + 6;
      doc.setDrawColor(...GOLD);
      doc.setLineWidth(1.5);
      doc.line(marginX, y, marginX + 40, y);
      y += 20;
    };

    const subheading = (text, color) => {
      ensureSpace(36);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...(color || NAVY));
      doc.text(text, marginX, y);
      y += 16;
    };

    const eyebrowLabel = (text, color) => {
      ensureSpace(18);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...(color || GOLD));
      doc.text(text.toUpperCase(), marginX, y);
      y += 14;
    };

    const paragraph = (text, opts) => {
      const o = opts || {};
      const fontSize = o.fontSize || 10;
      const color = o.color || GRAY;
      doc.setFont('helvetica', o.bold ? 'bold' : 'normal');
      doc.setFontSize(fontSize);
      doc.setTextColor(...color);
      const lines = doc.splitTextToSize(text, contentWidth);
      ensureSpace(lines.length * (fontSize + 3) + 8);
      doc.text(lines, marginX, y);
      y += lines.length * (fontSize + 3) + 6;
    };

    const bullet = (text) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...DARK);
      const lines = doc.splitTextToSize(text, contentWidth - 18);
      ensureSpace(lines.length * 13 + 4);
      doc.setFillColor(...GOLD);
      doc.circle(marginX + 4, y - 3, 1.5, 'F');
      doc.text(lines, marginX + 14, y);
      y += lines.length * 13 + 4;
    };

    const codeBlock = (lines) => {
      const lineH = 11;
      const padding = 14;
      const blockH = lines.length * lineH + padding * 2;
      ensureSpace(blockH + 8);
      doc.setFillColor(245, 245, 240);
      doc.rect(marginX, y, contentWidth, blockH, 'F');
      doc.setDrawColor(...GOLD);
      doc.setLineWidth(2);
      doc.line(marginX, y, marginX, y + blockH);
      doc.setFont('courier', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...DARK);
      lines.forEach((line, i) => {
        doc.text(line, marginX + 14, y + padding + 8 + i * lineH);
      });
      y += blockH + 10;
    };

    const swatchRow = (swatches) => {
      const rowH = 88;
      ensureSpace(rowH + 6);
      const cols = swatches.length;
      const gap = 10;
      const sw = (contentWidth - (cols - 1) * gap) / cols;
      swatches.forEach((s, i) => {
        const x = marginX + i * (sw + gap);
        doc.setFillColor(...s.rgb);
        doc.rect(x, y, sw, 48, 'F');
        if (s.border) {
          doc.setDrawColor(...BORDER);
          doc.setLineWidth(0.5);
          doc.rect(x, y, sw, 48, 'S');
        }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(...NAVY);
        doc.text(s.name, x, y + 60);
        doc.setFont('courier', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...DARK);
        doc.text(s.hex, x, y + 72);
        if (s.role) {
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7);
          doc.setTextColor(...GRAY);
          doc.text(s.role, x, y + 82);
        }
      });
      y += rowH;
    };

    const keyValueTable = (rows, colWidths) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...GOLD);
      const headers = rows[0];
      let x = marginX;
      ensureSpace(28);
      headers.forEach((h, i) => {
        doc.text(h.toUpperCase(), x, y);
        x += colWidths[i];
      });
      y += 6;
      doc.setDrawColor(...GOLD);
      doc.setLineWidth(0.5);
      doc.line(marginX, y, marginX + contentWidth, y);
      y += 10;
      for (let r = 1; r < rows.length; r++) {
        const cellLineCounts = rows[r].map((cell, i) => doc.splitTextToSize(String(cell), colWidths[i] - 8).length);
        const rowHeight = Math.max(16, ...cellLineCounts.map(c => c * 12)) + 4;
        ensureSpace(rowHeight + 4);
        x = marginX;
        rows[r].forEach((cell, i) => {
          doc.setFont(i === 0 ? 'helvetica' : 'helvetica', i === 0 ? 'bold' : 'normal');
          doc.setFontSize(9);
          doc.setTextColor(i === 0 ? NAVY[0] : DARK[0], i === 0 ? NAVY[1] : DARK[1], i === 0 ? NAVY[2] : DARK[2]);
          const cellLines = doc.splitTextToSize(String(cell), colWidths[i] - 8);
          doc.text(cellLines, x, y);
          x += colWidths[i];
        });
        y += rowHeight;
        doc.setDrawColor(...BORDER);
        doc.setLineWidth(0.3);
        doc.line(marginX, y - 4, marginX + contentWidth, y - 4);
      }
      y += 10;
    };

    const calloutBox = (title, body, color) => {
      const lines = doc.splitTextToSize(body, contentWidth - 36);
      const h = 30 + lines.length * 13 + 16;
      ensureSpace(h + 4);
      doc.setFillColor(255, 252, 246);
      doc.rect(marginX, y, contentWidth, h, 'F');
      doc.setFillColor(...color);
      doc.rect(marginX, y, 3, h, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...color);
      doc.text(title.toUpperCase(), marginX + 18, y + 18);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...DARK);
      doc.text(lines, marginX + 18, y + 36);
      y += h + 8;
    };

    // ═══════════════════════════════════════════════════════
    // COVER PAGE
    // ═══════════════════════════════════════════════════════
    doc.setFillColor(...NAVY);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.5);
    doc.line(marginX, 80, marginX + 200, 80);
    doc.line(marginX, pageHeight - 100, marginX + 60, pageHeight - 100);

    doc.setFillColor(...GOLD);
    doc.rect(marginX, 100, 40, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...GOLD);
    doc.text('FUZION COMPANIES' + SEP + 'DEVELOPER HANDOFF', marginX, 122);

    doc.setFont('times', 'normal');
    doc.setFontSize(48);
    doc.setTextColor(255, 255, 255);
    doc.text('Color Schema', marginX, 220);
    doc.setFont('times', 'italic');
    doc.setTextColor(...GOLD);
    doc.text('& Brand Tokens.', marginX, 270);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    const intro = doc.splitTextToSize(
      'Everything your developer needs to update fcghelps.com and fuzion-chickasaw-group.vercel.app to match the official Fuzion Companies brand system. Copy-paste CSS variables, Tailwind config, hex codes, and per-site application notes. No interpretation required.',
      contentWidth - 40
    );
    doc.text(intro, marginX, 320);

    // Bottom meta
    doc.setFillColor(...GOLD);
    doc.rect(marginX, pageHeight - 200, 2, 80, 'F');

    const coverMeta = [
      ['SITE 1', 'fcghelps.com  -  Fuzion Consulting Group'],
      ['SITE 2', 'fuzion-chickasaw-group.vercel.app  -  Fuzion Chickasaw Group'],
      ['VERSION', 'v1.0  -  May 2026'],
    ];
    coverMeta.forEach((row, i) => {
      const yPos = pageHeight - 185 + i * 30;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...GOLD);
      doc.text(row[0], marginX + 14, yPos);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text(row[1], marginX + 14, yPos + 12);
    });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...GOLD);
    doc.text('FUZIONCOMPANIES.COM', marginX, pageHeight - 40);
    doc.setTextColor(255, 255, 255);
    doc.text('Prepared for Developer Handoff', pageWidth - marginX, pageHeight - 40, { align: 'right' });

    // ═══════════════════════════════════════════════════════
    // PAGE 2 — QUICK START SUMMARY
    // ═══════════════════════════════════════════════════════
    doc.addPage();
    addPageBackground();
    addHeader();
    sectionTitle('Quick Start', 'Two sites. Two color recipes.');

    paragraph(
      'This document gives you exact hex codes, CSS variables, and Tailwind config for both Fuzion sites. You should be able to update both sites in a single afternoon by copy-pasting the snippets below into your existing globals.css and tailwind.config.js files.'
    );

    calloutBox(
      'Site 1  -  Fuzion Consulting Group  -  fcghelps.com',
      'Uses the standard Fuzion Companies hybrid color schema: Navy + Gold + Cream. This is the flagship palette. See Section 02 for the exact tokens and Section 04 for application notes.',
      NAVY
    );

    calloutBox(
      'Site 2  -  Fuzion Chickasaw Group  -  fuzion-chickasaw-group.vercel.app',
      'Uses the same base Fuzion palette PLUS a dark purple + gold accent layer. Replace any indigo or blue accents currently on the site with the Chickasaw Purple defined in Section 03.',
      PURPLE_DEEP
    );

    subheading('What is in this document');
    bullet('Section 02  -  Fuzion Companies core palette (used by both sites)');
    bullet('Section 03  -  Fuzion Chickasaw purple + gold accent palette');
    bullet('Section 04  -  Site-by-site application notes (what to change where)');
    bullet('Section 05  -  Copy-paste CSS variables for globals.css');
    bullet('Section 06  -  Copy-paste Tailwind config snippet');
    bullet('Section 07  -  Typography pairing (Cormorant Garamond + DM Sans)');
    bullet('Section 08  -  Logo usage and color treatments');
    bullet('Section 09  -  Final QA checklist');

    // ═══════════════════════════════════════════════════════
    // SECTION 02 — CORE PALETTE
    // ═══════════════════════════════════════════════════════
    doc.addPage();
    addPageBackground();
    addHeader();
    sectionTitle('02  -  Core Palette', 'Fuzion Companies hybrid color schema.');
    paragraph(
      'These are the foundation colors used across every Fuzion property. fcghelps.com uses this palette as-is, with no additional accents.'
    );

    eyebrowLabel('Primary');
    swatchRow([
      { name: 'Deep Navy', hex: '#0A1628', rgb: NAVY, role: 'Hero, headlines' },
      { name: 'Navy 2', hex: '#0D1F3C', rgb: NAVY2, role: 'Gradient end' },
      { name: 'Gold', hex: '#C8922A', rgb: GOLD, role: 'Accent, CTAs' },
    ]);

    eyebrowLabel('Surfaces');
    swatchRow([
      { name: 'Cream', hex: '#FAF8F4', rgb: CREAM, role: 'Page background', border: true },
      { name: 'Cream Deep', hex: '#EEE9E2', rgb: CREAM_DEEP, role: 'Alt sections' },
      { name: 'Border', hex: '#E5E7EB', rgb: BORDER, role: 'Card borders', border: true },
    ]);

    eyebrowLabel('Text');
    swatchRow([
      { name: 'Ink', hex: '#1E1E1E', rgb: DARK, role: 'Emphasis text' },
      { name: 'Gray', hex: '#6B7280', rgb: GRAY, role: 'Body copy' },
    ]);

    y += 4;
    paragraph(
      'Usage ratio across a typical page: roughly 60% cream surfaces, 25% navy sections, 5% gold accent (eyebrows, rules, one CTA per page), 10% gray body text. Gold is never used for body copy, large backgrounds, or shadows.',
      { color: DARK }
    );

    // ═══════════════════════════════════════════════════════
    // SECTION 03 — CHICKASAW ACCENT
    // ═══════════════════════════════════════════════════════
    doc.addPage();
    addPageBackground();
    addHeader();
    sectionTitle('03  -  Fuzion Chickasaw Accent', 'Dark purple + gold layer.');
    paragraph(
      'Fuzion Chickasaw Group uses the full Fuzion Companies core palette (navy + gold + cream from Section 02) AND layers in a dark purple accent that signals the Chickasaw identity. Purple is the single sub-brand accent — never combine it with another accent color on the same page.'
    );

    eyebrowLabel('Chickasaw Purple System', PURPLE_DEEP);
    swatchRow([
      { name: 'Purple Deep', hex: '#2D1B69', rgb: PURPLE_DEEP, role: 'Primary accent' },
      { name: 'Chickasaw Indigo', hex: '#3D3B8E', rgb: PURPLE, role: 'Secondary' },
      { name: 'Purple Soft', hex: '#9B8EC4', rgb: PURPLE_SOFT, role: 'Tints, hovers' },
    ]);

    subheading('Where to use purple', PURPLE_DEEP);
    bullet('Card top accent bars (3px tall) on partner cards and feature cards');
    bullet('Section heading underlines for tribal partnerships content');
    bullet('Pull-quote left vertical mark (3px wide)');
    bullet('Leadership card accent for Donna Webb (Founder/CEO)');
    bullet('Icons and small graphic elements in Tribal Services sections');

    subheading('Where NOT to use purple', PURPLE_DEEP);
    bullet('Body text  -  always use Gray #6B7280');
    bullet('Primary CTA buttons  -  use Navy or Gold');
    bullet('Large background fills  -  purple is an ACCENT, not a section background');
    bullet('Combined with teal, indigo, or any other sub-brand accent on the same page');

    y += 6;
    calloutBox(
      'Gold remains the primary accent',
      'Even on the Chickasaw site, GOLD is still the primary accent for eyebrow labels, decorative rules, and the highest-priority CTA. Purple is the SECONDARY accent that signals Chickasaw identity. Both should appear on the page  -  gold leading, purple supporting.',
      GOLD
    );

    // ═══════════════════════════════════════════════════════
    // SECTION 04 — APPLICATION NOTES
    // ═══════════════════════════════════════════════════════
    doc.addPage();
    addPageBackground();
    addHeader();
    sectionTitle('04  -  Application Notes', 'What changes on each site.');

    subheading('Site 1  -  fcghelps.com  (Fuzion Consulting Group)');
    paragraph(
      'Apply the Fuzion Companies core palette from Section 02. No additional accent colors.'
    );
    bullet('Page background  -  Cream #FAF8F4');
    bullet('Alternating sections  -  Cream Deep #EEE9E2 (light) and Deep Navy #0A1628 (dark)');
    bullet('Primary headings  -  Deep Navy #0A1628 on cream backgrounds, white on navy backgrounds');
    bullet('Eyebrow labels  -  Gold #C8922A, 10px uppercase, letter-spacing 0.3em');
    bullet('Body text  -  Gray #6B7280, 15px, line-height 1.6');
    bullet('Primary CTA buttons  -  Navy #0A1628 background, white text');
    bullet('Gold CTA (use once per page max)  -  Gold #C8922A background, white text');
    bullet('Card borders  -  1px solid #E5E7EB, border-radius 0');

    y += 6;
    subheading('Site 2  -  fuzion-chickasaw-group.vercel.app');
    paragraph(
      'Apply the Fuzion Companies core palette PLUS the Chickasaw Purple accent from Section 03.'
    );
    bullet('All of the above core palette rules apply');
    bullet('Replace existing blue or indigo accents with Purple Deep #2D1B69');
    bullet('Add 3px purple top accent bars to leadership cards and partner cards');
    bullet('Tribal Services or Tribal Partnerships section  -  purple section heading underline');
    bullet('Donna Webb leadership card  -  Purple Deep top accent bar');
    bullet('Pull-quote vertical mark  -  Purple Deep #2D1B69 instead of gold');
    bullet('Keep all eyebrow labels gold  -  do not change eyebrows to purple');

    // ═══════════════════════════════════════════════════════
    // SECTION 05 — CSS VARIABLES
    // ═══════════════════════════════════════════════════════
    doc.addPage();
    addPageBackground();
    addHeader();
    sectionTitle('05  -  CSS Variables', 'Drop these into globals.css.');
    paragraph(
      'Paste the entire block below into the :root selector of your globals.css or index.css file. Use these as CSS custom properties throughout your stylesheets.'
    );

    codeBlock([
      ':root {',
      '  /* Surfaces */',
      '  --fz-cream:        #FAF8F4;',
      '  --fz-cream-deep:   #EEE9E2;',
      '  --fz-border:       #E5E7EB;',
      '',
      '  /* Brand primary */',
      '  --fz-navy:         #0A1628;',
      '  --fz-navy-2:       #0D1F3C;',
      '  --fz-gold:         #C8922A;',
      '',
      '  /* Text */',
      '  --fz-ink:          #1E1E1E;',
      '  --fz-gray:         #6B7280;',
      '',
      '  /* Chickasaw accent (Chickasaw site only) */',
      '  --fz-purple-deep:  #2D1B69;',
      '  --fz-purple:       #3D3B8E;',
      '  --fz-purple-soft:  #9B8EC4;',
      '',
      '  /* System */',
      '  --fz-radius:       0px;',
      '  --fz-track-eyebrow: 0.3em;',
      '  --fz-track-button:  0.2em;',
      '}',
    ]);

    subheading('Example usage');
    codeBlock([
      '.hero {',
      '  background: linear-gradient(160deg, var(--fz-navy), var(--fz-navy-2));',
      '  color: white;',
      '}',
      '',
      '.eyebrow {',
      '  color: var(--fz-gold);',
      '  font-size: 10px;',
      '  letter-spacing: var(--fz-track-eyebrow);',
      '  text-transform: uppercase;',
      '  font-weight: 600;',
      '}',
      '',
      '.card {',
      '  background: var(--fz-cream);',
      '  border: 1px solid var(--fz-border);',
      '  border-radius: var(--fz-radius);',
      '  padding: 32px;',
      '}',
    ]);

    // ═══════════════════════════════════════════════════════
    // SECTION 06 — TAILWIND
    // ═══════════════════════════════════════════════════════
    doc.addPage();
    addPageBackground();
    addHeader();
    sectionTitle('06  -  Tailwind Config', 'Extend your theme.');
    paragraph(
      'If either site uses Tailwind CSS, paste the snippet below into the theme.extend.colors block of your tailwind.config.js file. This gives you classes like bg-fz-navy, text-fz-gold, border-fz-border, etc.'
    );

    codeBlock([
      '// tailwind.config.js',
      'module.exports = {',
      '  theme: {',
      '    extend: {',
      '      colors: {',
      '        fz: {',
      '          cream:       "#FAF8F4",',
      '          "cream-deep":"#EEE9E2",',
      '          border:      "#E5E7EB",',
      '          navy:        "#0A1628",',
      '          "navy-2":    "#0D1F3C",',
      '          gold:        "#C8922A",',
      '          ink:         "#1E1E1E",',
      '          gray:        "#6B7280",',
      '          // Chickasaw site only:',
      '          "purple-deep":"#2D1B69",',
      '          purple:      "#3D3B8E",',
      '          "purple-soft":"#9B8EC4",',
      '        },',
      '      },',
      '      fontFamily: {',
      '        heading: ["Cormorant Garamond", "serif"],',
      '        body:    ["DM Sans", "sans-serif"],',
      '      },',
      '      borderRadius: {',
      '        none: "0",',
      '      },',
      '    },',
      '  },',
      '};',
    ]);

    subheading('Example component classes');
    codeBlock([
      '<section class="bg-fz-navy text-white py-32">',
      '  <p class="text-fz-gold text-[10px] uppercase tracking-[0.3em] font-semibold">',
      '    Eyebrow Label',
      '  </p>',
      '  <h2 class="font-heading text-5xl text-white">Headline copy.</h2>',
      '</section>',
      '',
      '<button class="bg-fz-gold text-white text-[11px] font-bold',
      '               uppercase tracking-[0.2em] px-8 py-3.5">',
      '  Primary CTA',
      '</button>',
    ]);

    // ═══════════════════════════════════════════════════════
    // SECTION 07 — TYPOGRAPHY
    // ═══════════════════════════════════════════════════════
    doc.addPage();
    addPageBackground();
    addHeader();
    sectionTitle('07  -  Typography', 'Two fonts. One pairing.');
    paragraph(
      'Both sites use the same typography pairing: Cormorant Garamond for headlines and DM Sans for body and UI. Both fonts are free on Google Fonts.'
    );

    subheading('Google Fonts import (paste into <head>)');
    codeBlock([
      '<link rel="preconnect" href="https://fonts.googleapis.com">',
      '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
      '<link href="https://fonts.googleapis.com/css2?',
      '  family=Cormorant+Garamond:wght@400;500;600;700&',
      '  family=DM+Sans:wght@300;400;500;600;700&',
      '  display=swap" rel="stylesheet">',
    ]);

    subheading('Type scale');
    keyValueTable(
      [
        ['Role', 'Font', 'Spec'],
        ['H1 Display', 'Cormorant Garamond', '64-96px  -  weight 500  -  line-height 1.05'],
        ['H2 Section', 'Cormorant Garamond', '40-56px  -  weight 500  -  line-height 1.1'],
        ['H3 Card', 'Cormorant Garamond', '20-24px  -  weight 600'],
        ['Eyebrow', 'DM Sans', '10px  -  uppercase  -  tracking 0.3em  -  gold  -  weight 600'],
        ['Body', 'DM Sans', '15px  -  weight 400  -  gray  -  line-height 1.6'],
        ['Button', 'DM Sans', '11px  -  uppercase  -  tracking 0.2em  -  weight 700'],
      ],
      [90, 130, contentWidth - 220]
    );

    // ═══════════════════════════════════════════════════════
    // SECTION 08 — LOGO USAGE
    // ═══════════════════════════════════════════════════════
    doc.addPage();
    addPageBackground();
    addHeader();
    sectionTitle('08  -  Logo Usage', 'How each mark appears.');
    paragraph(
      'Below are the rules for displaying the Fuzion Companies wordmark and each sub-brand wordmark across both sites.'
    );

    subheading('Fuzion Companies (parent wordmark)');
    bullet('Always typeset in Cormorant Garamond, weight 500 or 600');
    bullet('On cream/light backgrounds  -  Deep Navy #0A1628');
    bullet('On navy/dark backgrounds  -  White or Gold #C8922A');
    bullet('Minimum size: 18px on screen, 0.5 inch in print');
    bullet('Always followed by the "FUZIONCOMPANIES.COM" URL in the footer of every page');

    subheading('Fuzion Consulting Group (fcghelps.com)');
    bullet('Wordmark in Cormorant Garamond  -  Deep Navy on cream, white on navy');
    bullet('Tagline (if shown): "Technology Consulting" in DM Sans 11px uppercase gold');
    bullet('Use the standard navy + gold + cream palette throughout');

    subheading('Fuzion Chickasaw Group');
    bullet('Wordmark in Cormorant Garamond  -  Deep Navy on cream, white on navy');
    bullet('When paired with the Chickasaw heritage section, may use Purple Deep #2D1B69');
    bullet('Tagline: "Minority Woman-Owned  -  Native American  -  Chickasaw Nation"');
    bullet('Purple accents appear on cards, rules, and pull-quotes  -  not on the wordmark itself');

    subheading('Fortitude Junk Removal');
    bullet('Wordmark in Cormorant Garamond  -  Deep Navy');
    bullet('Sub-tagline: "Veteran-Owned" in DM Sans 11px uppercase gold');
    bullet('No additional sub-brand accent  -  navy-forward only');

    subheading('A Fuzion Company sub-mark');
    bullet('Required above the footer on every page of both sites');
    bullet('DM Sans 11px weight 700 uppercase, letter-spacing 0.25em');
    bullet('Gold #C8922A on navy backgrounds, Deep Navy on cream backgrounds');
    bullet('Flanked by two thin 0.5px gold horizontal rules, 60-80px each side');
    bullet('Always links to fuzioncompanies.com');

    // ═══════════════════════════════════════════════════════
    // SECTION 09 — QA CHECKLIST
    // ═══════════════════════════════════════════════════════
    doc.addPage();
    addPageBackground();
    addHeader();
    sectionTitle('09  -  QA Checklist', 'Before you ship.');
    paragraph(
      'Run through this checklist on both sites before considering the update complete.'
    );

    subheading('Both sites');
    bullet('Page background is Cream #FAF8F4 (not pure white)');
    bullet('At least one navy section creates visual rhythm');
    bullet('Eyebrow labels appear above every section heading in gold');
    bullet('Body text is Gray #6B7280, not pure black');
    bullet('Headlines use Cormorant Garamond, body uses DM Sans');
    bullet('Border-radius is 0 throughout  -  no rounded buttons or cards');
    bullet('"A Fuzion Company" sub-mark appears above the footer');
    bullet('Footer includes the URL fuzioncompanies.com');
    bullet('No drop shadows used as primary decoration  -  borders only');

    subheading('Fuzion Chickasaw Group only');
    bullet('Purple Deep #2D1B69 appears on partner card top bars');
    bullet('Donna Webb leadership card has purple top accent');
    bullet('Tribal Services section heading has a purple underline');
    bullet('No teal, no other sub-brand accents  -  purple only');
    bullet('Eyebrow labels are STILL gold  -  not changed to purple');

    subheading('Verify URLs');
    bullet('Every "Fuzion Companies" mention in footer links to fuzioncompanies.com');
    bullet('Spelled F-U-Z-I-O-N-C-O-M-P-A-N-I-E-S  -  never FuzinoCompanies');
    bullet('Cross-link between fcghelps.com and fuzionchickasawgroup.com');

    // ═══════════════════════════════════════════════════════
    // CLOSING
    // ═══════════════════════════════════════════════════════
    doc.addPage();
    addPageBackground();
    addHeader();
    sectionTitle('Closing', 'Ship it.');
    paragraph(
      'Both sites should be updated within a single working day. Every value in this document is final  -  copy it exactly. If anything is unclear, refer to the live brand on fuzioncompanies.com as the source of truth.',
      { fontSize: 11, color: DARK }
    );

    y += 16;
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(2);
    doc.line(marginX, y, marginX + 40, y);
    y += 28;

    doc.setFont('times', 'italic');
    doc.setFontSize(20);
    doc.setTextColor(...NAVY);
    doc.text('"Excellence and service are the same thing."', marginX, y);
    y += 28;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...GOLD);
    doc.text('FUZION COMPANIES  -  DEVELOPER HANDOFF  -  v1.0  -  MAY 2026', marginX, y);

    addFooter();

    const pdfBytes = doc.output('arraybuffer');
    return new Response(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Fuzion_Developer_Handoff_Package.pdf"',
      },
    });
  } catch (error) {
    return Response.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
});