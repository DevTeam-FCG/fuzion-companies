// @ts-nocheck
import { jsPDF } from "jspdf";

export function generateBrandGuidePDF() {
    const doc = new jsPDF({ unit: 'pt', format: 'letter' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginX = 56;
    const contentWidth = pageWidth - marginX * 2;
    let y = 0;

    // Palette
    const NAVY = [10, 22, 40];
    const NAVY2 = [13, 31, 60];
    const GOLD = [200, 146, 42];
    const CREAM = [250, 248, 244];
    const SAND = [238, 233, 226];
    const GRAY = [107, 114, 128];
    const DARK_GRAY = [55, 65, 81];
    const BORDER = [229, 231, 235];
    const INDIGO = [61, 59, 142];     // Chickasaw
    const PURPLE = [155, 142, 196];   // Chickasaw seal
    const GREEN = [26, 138, 110];     // Rancher Navy

    // ── HELPERS ─────────────────────────────────────────────
    const ensureSpace = (needed) => {
      if (y + needed > pageHeight - 60) {
        addFooter();
        doc.addPage();
        y = 56;
        addHeader();
      }
    };

    const addHeader = () => {
      doc.setFillColor(...NAVY);
      doc.rect(0, 0, pageWidth, 36, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...GOLD);
      doc.text('FUZION EDITORIAL SYSTEM  ·  MASTER BRAND GUIDE', marginX, 22);
      doc.setTextColor(255, 255, 255);
      doc.text('CREAM · NAVY · GOLD', pageWidth - marginX, 22, { align: 'right' });
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
      doc.text('FUZION COMPANIES  ·  FAITH · SERVICE · PRECISION · COMMUNITY', pageWidth / 2, fy, { align: 'center', charSpace: 1 });
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...GRAY);
      doc.text(`Page ${doc.internal.getNumberOfPages()}`, pageWidth - marginX, fy, { align: 'right' });
      doc.text('v1.0 · May 2026', marginX, fy);
    };

    const sectionTitle = (eyebrow, title) => {
      ensureSpace(80);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...GOLD);
      doc.text(eyebrow.toUpperCase(), marginX, y, { charSpace: 1.5 });
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

    const subheading = (text) => {
      ensureSpace(36);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...NAVY);
      doc.text(text, marginX, y);
      y += 16;
    };

    const eyebrow = (text) => {
      ensureSpace(20);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...GOLD);
      doc.text(text.toUpperCase(), marginX, y, { charSpace: 1.5 });
      y += 16;
    };

    const paragraph = (text, opts = {}) => {
      const fontSize = opts.fontSize || 10;
      const color = opts.color || DARK_GRAY;
      doc.setFont('helvetica', opts.bold ? 'bold' : (opts.italic ? 'italic' : 'normal'));
      doc.setFontSize(fontSize);
      doc.setTextColor(...color);
      const lines = doc.splitTextToSize(text, opts.width || contentWidth);
      ensureSpace(lines.length * (fontSize + 3) + 8);
      doc.text(lines, opts.x || marginX, y);
      y += lines.length * (fontSize + 3) + 6;
    };

    const bullet = (text) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...DARK_GRAY);
      const lines = doc.splitTextToSize(text, contentWidth - 18);
      ensureSpace(lines.length * 13 + 4);
      doc.setFillColor(...GOLD);
      doc.circle(marginX + 4, y - 3, 1.5, 'F');
      doc.text(lines, marginX + 14, y);
      y += lines.length * 13 + 4;
    };

    const keyValueTable = (rows, colWidths) => {
      const lineHeight = 18;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...GOLD);
      const headers = rows[0];
      let x = marginX;
      ensureSpace(28);
      headers.forEach((h, i) => {
        doc.text(h.toUpperCase(), x, y, { charSpace: 1 });
        x += colWidths[i];
      });
      y += 6;
      doc.setDrawColor(...GOLD);
      doc.setLineWidth(0.5);
      doc.line(marginX, y, marginX + contentWidth, y);
      y += 10;

      for (let r = 1; r < rows.length; r++) {
        // Measure tallest cell in row
        let tallest = lineHeight;
        rows[r].forEach((cell, i) => {
          const wrapped = doc.splitTextToSize(String(cell), colWidths[i] - 8);
          tallest = Math.max(tallest, wrapped.length * 12 + 6);
        });
        ensureSpace(tallest + 4);
        x = marginX;
        rows[r].forEach((cell, i) => {
          doc.setFont('helvetica', i === 0 ? 'bold' : 'normal');
          doc.setFontSize(9);
          doc.setTextColor(i === 0 ? NAVY[0] : DARK_GRAY[0], i === 0 ? NAVY[1] : DARK_GRAY[1], i === 0 ? NAVY[2] : DARK_GRAY[2]);
          const cellLines = doc.splitTextToSize(String(cell), colWidths[i] - 8);
          doc.text(cellLines, x, y);
          x += colWidths[i];
        });
        y += tallest;
        doc.setDrawColor(...BORDER);
        doc.setLineWidth(0.3);
        doc.line(marginX, y - 6, marginX + contentWidth, y - 6);
      }
      y += 10;
    };

    const swatchRow = (swatches, big = false) => {
      const sHeight = big ? 80 : 50;
      const labelOffset = big ? 96 : 62;
      ensureSpace(sHeight + 40);
      const sw = (contentWidth - (swatches.length - 1) * 8) / swatches.length;
      let x = marginX;
      swatches.forEach((s) => {
        doc.setFillColor(...s.rgb);
        doc.rect(x, y, sw, sHeight, 'F');
        if (s.border) {
          doc.setDrawColor(...BORDER);
          doc.setLineWidth(0.5);
          doc.rect(x, y, sw, sHeight);
        }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(...DARK_GRAY);
        doc.text(s.name.toUpperCase(), x, y + labelOffset - 22, { charSpace: 0.5 });
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...GRAY);
        doc.text(s.hex, x, y + labelOffset - 10);
        if (s.usage) {
          doc.setFontSize(7);
          const ul = doc.splitTextToSize(s.usage, sw - 4);
          doc.text(ul, x, y + labelOffset);
        }
        x += sw + 8;
      });
      y += sHeight + (big ? 70 : 40);
    };

    const dividerLine = () => {
      ensureSpace(18);
      doc.setDrawColor(...BORDER);
      doc.setLineWidth(0.3);
      doc.line(marginX, y, marginX + contentWidth, y);
      y += 14;
    };

    const codeBlock = (code) => {
      doc.setFont('courier', 'normal');
      doc.setFontSize(8);
      const lines = doc.splitTextToSize(code, contentWidth - 20);
      const h = lines.length * 11 + 20;
      ensureSpace(h);
      doc.setFillColor(245, 245, 240);
      doc.rect(marginX, y, contentWidth, h, 'F');
      doc.setDrawColor(...GOLD);
      doc.setLineWidth(0.5);
      doc.line(marginX, y, marginX, y + h);
      doc.setTextColor(...NAVY);
      doc.text(lines, marginX + 10, y + 14);
      y += h + 10;
    };

    const calloutBox = (label, text, accentRgb = GOLD) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      const labelHeight = 14;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(text, contentWidth - 30);
      const h = labelHeight + lines.length * 13 + 22;
      ensureSpace(h);
      doc.setFillColor(252, 250, 246);
      doc.rect(marginX, y, contentWidth, h, 'F');
      doc.setFillColor(...accentRgb);
      doc.rect(marginX, y, 3, h, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...accentRgb);
      doc.text(label.toUpperCase(), marginX + 14, y + 16, { charSpace: 1.5 });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...DARK_GRAY);
      doc.text(lines, marginX + 14, y + 32);
      y += h + 12;
    };

    // ══════════════════════════════════════════════════════════
    // ── COVER PAGE ────────────────────────────────────────────
    // ══════════════════════════════════════════════════════════
    doc.setFillColor(...NAVY);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Decorative gold accents
    doc.setFillColor(...GOLD);
    doc.rect(marginX, 100, 60, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...GOLD);
    doc.text('FUZION COMPANIES  ·  MASTER BRAND SYSTEM', marginX, 122, { charSpace: 2 });

    doc.setFont('times', 'normal');
    doc.setFontSize(52);
    doc.setTextColor(255, 255, 255);
    doc.text('The Fuzion', marginX, 210);
    doc.setFont('times', 'italic');
    doc.setTextColor(...GOLD);
    doc.text('Editorial System.', marginX, 264);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    const intro = doc.splitTextToSize(
      'Cream. Navy. Gold. A complete brand and design system for every property in the Fuzion Companies portfolio — Fuzion Consulting Group, Fuzion Chickasaw Group, SB217 Platform, and beyond.',
      contentWidth - 40
    );
    doc.text(intro, marginX, 306);

    // The "tell" — the three pillars
    doc.setFillColor(...GOLD);
    doc.rect(marginX, 400, 2, 80, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...GOLD);
    doc.text('THE THREE PILLARS', marginX + 14, 414, { charSpace: 1.5 });

    doc.setFont('times', 'italic');
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    const pillars = doc.splitTextToSize(
      '"Editorial serif headlines, cream-and-navy hybrid backgrounds, and gold used like a fountain pen — sparingly and with intent."',
      contentWidth - 40
    );
    doc.text(pillars, marginX + 14, 436);

    // Footer block
    doc.setFillColor(...GOLD);
    doc.rect(marginX, pageHeight - 190, 2, 110, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...GOLD);
    doc.text('APPLIES TO', marginX + 14, pageHeight - 175, { charSpace: 1.5 });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text('Fuzion Companies · Fuzion Consulting Group · Fuzion Chickasaw Group', marginX + 14, pageHeight - 160);
    doc.text('SB217 Platform · Support Beacon Relief · Fortitude Junk Removal', marginX + 14, pageHeight - 146);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...GOLD);
    doc.text('VERSION', marginX + 14, pageHeight - 124, { charSpace: 1.5 });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text('1.0 · The master brand guide for all Fuzion properties', marginX + 14, pageHeight - 109);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...GOLD);
    doc.text('AUTHORITY', marginX + 14, pageHeight - 88, { charSpace: 1.5 });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text('This document is the source of truth. When in doubt, this wins.', marginX + 14, pageHeight - 73);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...GOLD);
    doc.text('A FUZION COMPANY', marginX, pageHeight - 40, { charSpace: 2 });
    doc.setTextColor(255, 255, 255);
    doc.text('May 2026  ·  Est. February 17, 2026', pageWidth - marginX, pageHeight - 40, { align: 'right' });

    // ══════════════════════════════════════════════════════════
    // ── PAGE 2: TABLE OF CONTENTS ─────────────────────────────
    // ══════════════════════════════════════════════════════════
    doc.addPage();
    addHeader();
    sectionTitle('Contents', 'How to use this guide.');

    paragraph('Read in order the first time. Reference by section after.', { fontSize: 11 });
    y += 10;

    const toc = [
      ['01', 'The Philosophy', 'What the system stands for'],
      ['02', 'The Color System', 'Cream, Navy, Gold + property accents'],
      ['03', 'Typography', 'Cormorant Garamond + DM Sans'],
      ['04', 'Layout & Geometry', 'Sharp corners, editorial spacing'],
      ['05', 'The Five Signatures', 'The visual "tells" of the system'],
      ['06', 'Components', 'Buttons, cards, eyebrows, sub-marks'],
      ['07', 'Sectional Background Strategy', 'When to use cream vs. navy'],
      ['08', 'Per-Property Application', 'FCG, Chickasaw, SB217, others'],
      ['09', 'Code Tokens', 'CSS variables and Tailwind config'],
      ['10', 'Do & Do Not', 'The guardrails'],
      ['11', 'Versioning & Governance', 'Who owns the system'],
    ];

    toc.forEach(([num, title, desc]) => {
      ensureSpace(28);
      doc.setFont('times', 'italic');
      doc.setFontSize(16);
      doc.setTextColor(...GOLD);
      doc.text(num, marginX, y);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...NAVY);
      doc.text(title, marginX + 40, y - 2);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...GRAY);
      doc.text(desc, marginX + 40, y + 12);
      y += 32;
      doc.setDrawColor(...BORDER);
      doc.setLineWidth(0.3);
      doc.line(marginX, y - 8, marginX + contentWidth, y - 8);
    });

    // ══════════════════════════════════════════════════════════
    // ── 01. THE PHILOSOPHY ────────────────────────────────────
    // ══════════════════════════════════════════════════════════
    doc.addPage();
    addHeader();
    sectionTitle('01 · The Philosophy', 'What the system stands for.');

    paragraph(
      'The Fuzion Editorial System is built on a single conviction: that excellence and service are not competing values — they are the same thing. Every visual decision in this system flows from that idea.',
      { fontSize: 11 }
    );

    y += 6;
    calloutBox(
      'The North Star',
      'When in doubt, choose the option that reads more like a published magazine and less like a marketing brochure. We are building something that lasts — not something that trends.'
    );

    subheading('Visual references');
    bullet('Editorial publishing — The New York Times, The Atlantic, Harper\'s, Monocle.');
    bullet('Classical typography — books, broadsheets, formal correspondence.');
    bullet('Architectural restraint — Apple\'s product pages, but warmer. More cream, less stark white.');
    bullet('Heritage institutions — established law firms, universities, financial advisories.');

    subheading('What this system rejects');
    bullet('Trendy gradients, neumorphism, glassmorphism, or any "of-the-moment" effect.');
    bullet('Rounded pill buttons. Heavy shadows. Decorative icons.');
    bullet('Pure white backgrounds (too cold) or pure black (too aggressive).');
    bullet('Stock-photo "tech startup" energy — abstract polygons, blurred shapes, neon.');

    // ══════════════════════════════════════════════════════════
    // ── 02. THE COLOR SYSTEM ──────────────────────────────────
    // ══════════════════════════════════════════════════════════
    doc.addPage();
    addHeader();
    sectionTitle('02 · The Color System', 'Cream. Navy. Gold.');

    paragraph(
      'Three colors do 95% of the work. Cream is the foundation. Navy is the authority. Gold is the accent — used sparingly, never decoratively.'
    );

    subheading('Core palette');
    swatchRow([
      { name: 'Cream', hex: '#FAF8F4', rgb: CREAM, border: true, usage: 'Page backgrounds' },
      { name: 'Sand', hex: '#EEE9E2', rgb: SAND, border: true, usage: 'Alt sections' },
      { name: 'Deep Navy', hex: '#0A1628', rgb: NAVY, usage: 'Headlines, anchor sections' },
      { name: 'Navy Gradient', hex: '#0D1F3C', rgb: NAVY2, usage: 'Gradient end-stop' },
      { name: 'Gold', hex: '#C8922A', rgb: GOLD, usage: 'Accent only' },
    ], true);

    subheading('Supporting colors');
    swatchRow([
      { name: 'Dark Gray', hex: '#374151', rgb: DARK_GRAY, usage: 'Body emphasis' },
      { name: 'Gray', hex: '#6B7280', rgb: GRAY, usage: 'Body text' },
      { name: 'Border', hex: '#E5E7EB', rgb: BORDER, border: true, usage: 'Card borders' },
    ]);

    subheading('Per-property accents');
    paragraph('Each property in the portfolio gets one — and only one — secondary accent color that signals its identity within the larger system.');
    swatchRow([
      { name: 'Chickasaw Indigo', hex: '#3D3B8E', rgb: INDIGO, usage: 'Fuzion Chickasaw Group' },
      { name: 'Chickasaw Purple', hex: '#9B8EC4', rgb: PURPLE, usage: 'Chickasaw secondary' },
      { name: 'Rancher Green', hex: '#1A8A6E', rgb: GREEN, usage: 'Rancher Navy partner' },
    ], true);

    calloutBox(
      'Hierarchy rule',
      'Gold is sacred. If everything is gold, nothing is gold. Use it for eyebrows, accent lines, the sub-mark, and high-priority CTAs. Never for body text, never for large backgrounds, never decoratively.'
    );

    // ══════════════════════════════════════════════════════════
    // ── 03. TYPOGRAPHY ────────────────────────────────────────
    // ══════════════════════════════════════════════════════════
    doc.addPage();
    addHeader();
    sectionTitle('03 · Typography', 'Editorial serif. Modern sans.');

    paragraph(
      'Two typefaces. One does the talking. One does the structure. Together they create the editorial voice.'
    );

    subheading('The pairing');
    keyValueTable(
      [
        ['Role', 'Typeface', 'Specification'],
        ['Headlines', 'Cormorant Garamond', 'Weight 500. Serif. Line-height 1.05–1.1. Sizes 32–96px.'],
        ['Eyebrows', 'DM Sans', '10px. Weight 600. Uppercase. Letter-spacing 0.3em. Gold #C8922A.'],
        ['Body', 'DM Sans', '15–16px. Weight 400. Line-height 1.6. Color #6B7280.'],
        ['Body emphasis', 'DM Sans', '15–16px. Weight 500–600. Color #0A1628.'],
        ['Buttons / Labels', 'DM Sans', '11px. Weight 700. Uppercase. Letter-spacing 0.2em.'],
        ['Stat numerals', 'Cormorant Garamond', 'Large serif numerals for impact. 32–80px.'],
        ['Captions', 'DM Sans', '12–13px. Weight 400. Color #6B7280.'],
      ],
      [110, 130, contentWidth - 240]
    );

    subheading('Google Fonts import');
    codeBlock(`<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">`);

    subheading('The italic move');
    paragraph(
      'A signature move of the system: in many headlines, the second line is set in italic and colored gold. This creates an editorial pull-quote effect that anchors the page.'
    );
    paragraph('Example: "Technology built on the conviction of showing up." — where "the conviction of showing up" is italic, gold.', { italic: true, color: NAVY });

    // ══════════════════════════════════════════════════════════
    // ── 04. LAYOUT & GEOMETRY ─────────────────────────────────
    // ══════════════════════════════════════════════════════════
    doc.addPage();
    addHeader();
    sectionTitle('04 · Layout & Geometry', 'Sharp. Editorial. Spacious.');

    subheading('Corners and shapes');
    bullet('Border-radius: 0px on cards, buttons, and containers. Sharp corners only.');
    bullet('Optional exception: 4px maximum on small UI inputs if absolutely needed.');
    bullet('No rounded pills. No fully circular buttons. No blob shapes.');

    subheading('Spacing scale');
    keyValueTable(
      [
        ['Use case', 'Spacing', 'Tailwind'],
        ['Section vertical padding', '128px', 'py-32'],
        ['Card interior padding', '32–48px', 'p-8 to p-12'],
        ['Hero vertical padding', '160px+', 'py-40+'],
        ['Element gap (cards)', '24px', 'gap-6'],
        ['Element gap (text blocks)', '16px', 'gap-4 / mb-4'],
      ],
      [200, 100, contentWidth - 300]
    );

    subheading('Lines and rules');
    bullet('Section divider: 1px solid #E5E7EB.');
    bullet('Gold accent line: 1.5–2px, 40px wide, color #C8922A, beneath section headlines.');
    bullet('Card top accent: 1px or 3px colored bar at the top of category cards.');
    bullet('No drop shadows for decoration. Subtle shadow-sm only on hover.');

    subheading('Grid');
    bullet('Max content width: 1280px (max-w-7xl). Centered with 24px horizontal padding.');
    bullet('Two-column on desktop (lg:grid-cols-2). Single-column below 1024px.');
    bullet('Four-column stat or feature grids collapse to 2 columns on mobile.');

    // ══════════════════════════════════════════════════════════
    // ── 05. THE FIVE SIGNATURES ───────────────────────────────
    // ══════════════════════════════════════════════════════════
    doc.addPage();
    addHeader();
    sectionTitle('05 · The Five Signatures', 'The visual "tells" of the system.');

    paragraph(
      'If a page is missing these five signatures, it is not yet on the system. If a page has them, it belongs to the family — regardless of property.'
    );

    const signatures = [
      { n: '01', title: 'Gold Eyebrow Labels', body: 'Every section heading is preceded by a tiny gold uppercase label with letter-spacing 0.3em. This is the single most recognizable element of the system.' },
      { n: '02', title: 'Cream + Navy Sectional Backgrounds', body: 'Pages alternate between cream (#FAF8F4) content sections and deep navy (#0A1628) anchor sections (hero, mission, footer). Never pure white.' },
      { n: '03', title: 'Serif Headlines With Italic Gold Phrase', body: 'Cormorant Garamond at weight 500. Critical phrase italicized and colored gold. Creates the editorial pull-quote effect.' },
      { n: '04', title: 'Sharp Corners Everywhere', body: 'No rounded buttons. No rounded cards. The geometry is consistently architectural and intentional.' },
      { n: '05', title: '"A Fuzion Company" Sub-Mark', body: 'Every property page carries a small gold sub-mark linking back to the parent — 11px, uppercase, letter-spacing 0.25em, with thin gold rules on either side.' },
    ];

    signatures.forEach((c) => {
      ensureSpace(80);
      doc.setFont('times', 'italic');
      doc.setFontSize(32);
      doc.setTextColor(...GOLD);
      doc.text(c.n, marginX, y + 10);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(...NAVY);
      doc.text(c.title, marginX + 58, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...DARK_GRAY);
      const lines = doc.splitTextToSize(c.body, contentWidth - 58);
      doc.text(lines, marginX + 58, y + 16);
      y += Math.max(70, lines.length * 13 + 28);
      dividerLine();
    });

    // ══════════════════════════════════════════════════════════
    // ── 06. COMPONENTS ────────────────────────────────────────
    // ══════════════════════════════════════════════════════════
    doc.addPage();
    addHeader();
    sectionTitle('06 · Components', 'The building blocks.');

    subheading('Button system');
    keyValueTable(
      [
        ['Variant', 'Background', 'Treatment'],
        ['Primary', '#0A1628 Navy', 'White text, 11px bold uppercase, letter-spacing 0.2em'],
        ['Secondary', 'Transparent', '1px navy border, navy text, same typography'],
        ['Gold CTA', '#C8922A Gold', 'White text. Sparingly — only highest priority'],
        ['Inverse', 'Transparent', '1px white border, white text. For navy sections'],
      ],
      [80, 130, contentWidth - 210]
    );

    paragraph(
      'All buttons: sharp corners. Padding 14px 32px. Hover: 2px translate-Y lift + 10% opacity reduction. Transitions duration-300.',
      { color: GRAY }
    );

    subheading('Card system');
    bullet('Background: #FAF8F4 (cream) or #FFFFFF (white).');
    bullet('Border: 1px solid #E5E7EB.');
    bullet('Optional 1–3px top accent bar in property accent color.');
    bullet('Padding: 32–48px (p-8 to p-12).');
    bullet('Hover: shadow-sm appears. No transform.');

    subheading('Eyebrow label');
    codeBlock(`<p className="text-[10px] tracking-[0.3em] uppercase font-semibold"
   style={{ color: '#C8922A' }}>
  Section Name
</p>`);

    subheading('Section headline');
    codeBlock(`<h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-medium
   leading-[1.1]"
   style={{ fontFamily: "'Cormorant Garamond', serif", color: '#0A1628' }}>
  The headline.<br />
  <em className="italic" style={{ color: '#C8922A' }}>The italic gold phrase.</em>
</h2>
<div className="h-[2px] w-10 mt-6" style={{ background: '#C8922A' }} />`);

    subheading('"A Fuzion Company" sub-mark');
    codeBlock(`<div className="flex items-center justify-center gap-3 py-6">
  <div className="h-px w-12" style={{ background: '#C8922A' }} />
  <a href="https://fuzioncompanies.com" target="_blank"
     className="text-[11px] tracking-[0.25em] uppercase font-semibold"
     style={{ color: '#C8922A' }}>
    A Fuzion Company
  </a>
  <div className="h-px w-12" style={{ background: '#C8922A' }} />
</div>`);

    // ══════════════════════════════════════════════════════════
    // ── 07. SECTIONAL BACKGROUND STRATEGY ─────────────────────
    // ══════════════════════════════════════════════════════════
    doc.addPage();
    addHeader();
    sectionTitle('07 · Sectional Backgrounds', 'When to use cream. When to use navy.');

    paragraph(
      'The hybrid background strategy is what makes the system feel like a published magazine — not a marketing site. Sections alternate by purpose.'
    );

    subheading('Cream sections (light content)');
    keyValueTable(
      [
        ['Section type', 'Background'],
        ['Story / About / History', '#FAF8F4 Cream'],
        ['Team / Leadership', '#FAF8F4 or #EEE9E2 Sand'],
        ['Services / Capabilities', '#FAF8F4 Cream'],
        ['Portfolio / Case Studies', '#EEE9E2 Sand'],
        ['Contact / Form', '#FAF8F4 Cream'],
        ['News / Blog content', '#FAF8F4 Cream'],
      ],
      [240, contentWidth - 240]
    );

    subheading('Navy sections (anchor / impact)');
    keyValueTable(
      [
        ['Section type', 'Background'],
        ['Hero / Page header', 'Navy gradient #0A1628 → #0D1F3C'],
        ['Mission / Values statement', 'Navy gradient'],
        ['Final CTA banner', 'Navy or Gold solid'],
        ['Footer band', 'Navy solid #0A1628'],
      ],
      [240, contentWidth - 240]
    );

    subheading('Gold sections (rare — emphasis only)');
    paragraph(
      'Solid gold sections are reserved for pull-quote banners or extraordinary announcements (date anchors, founding events). Maximum one per page. Never use as a generic CTA background.',
      { color: DARK_GRAY }
    );

    calloutBox(
      'The rhythm rule',
      'Aim for roughly 70% cream/sand sections, 25% navy anchor sections, and 5% gold accent moments per page. Pages that are all cream feel flat. Pages that are all navy feel oppressive.'
    );

    // ══════════════════════════════════════════════════════════
    // ── 08. PER-PROPERTY APPLICATION ──────────────────────────
    // ══════════════════════════════════════════════════════════
    doc.addPage();
    addHeader();
    sectionTitle('08 · Per-Property Application', 'Same system. Different accent.');

    paragraph(
      'Every Fuzion property uses the identical color system, typography, and layout. The only differences are the property-specific accent color, the logo, and the content. This is what creates family resemblance.'
    );

    // Property cards
    const properties = [
      {
        name: 'Fuzion Companies (Parent)',
        accent: 'Gold only',
        rgb: GOLD,
        tone: 'Editorial holding-company voice. The portfolio narrative — origin story, all properties, leadership, mission.',
        homeFeel: 'Cream story sections, navy anchor moments, gold restraint throughout.',
      },
      {
        name: 'Fuzion Consulting Group',
        accent: 'Gold + Deep Navy',
        rgb: NAVY,
        tone: 'Enterprise consulting authority. Capabilities, industries, projects, principal advisors, careers.',
        homeFeel: 'More project-detail pages and case studies. Heavier in cream content sections. Navy used to anchor capability and project headers.',
      },
      {
        name: 'Fuzion Chickasaw Group',
        accent: 'Gold + Chickasaw Indigo #3D3B8E',
        rgb: INDIGO,
        tone: 'Tribal, minority woman-owned, public-sector serving. Heritage tone with Chickasaw Nation pride.',
        homeFeel: 'Indigo replaces some navy usage in card top accents and hover states. Purple #9B8EC4 as secondary for honor/ceremony moments.',
      },
      {
        name: 'SB217 Platform',
        accent: 'Gold + Mission Gold (primary)',
        rgb: GOLD,
        tone: 'Mission-driven technology platform. Born from the Ranger Road Fire.',
        homeFeel: 'Strong "2/17/2026" date anchor moment in solid gold. Heavier on navy hero and impact sections. Showcases Support Beacon Relief + Logistics.',
      },
      {
        name: 'Support Beacon Relief',
        accent: 'Gold + Rancher Green #1A8A6E',
        rgb: GREEN,
        tone: 'Nonprofit logistics application. Trust, urgency, capability.',
        homeFeel: 'Green for "active mission" / "in-the-field" indicators. Otherwise pure system.',
      },
      {
        name: 'Fortitude Junk Removal',
        accent: 'Gold + Deep Navy',
        rgb: NAVY,
        tone: 'Veteran-owned. Honest. Earned.',
        homeFeel: 'Same system, simpler page count. Service-business voice but never loud.',
      },
    ];

    properties.forEach((p, i) => {
      ensureSpace(110);
      doc.setFillColor(252, 250, 246);
      doc.rect(marginX, y, contentWidth, 100, 'F');
      doc.setFillColor(...p.rgb);
      doc.rect(marginX, y, 3, 100, 'F');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...NAVY);
      doc.text(p.name, marginX + 16, y + 18);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...GOLD);
      doc.text('ACCENT', marginX + 16, y + 34, { charSpace: 1 });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...DARK_GRAY);
      doc.text(p.accent, marginX + 70, y + 34);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...GOLD);
      doc.text('TONE', marginX + 16, y + 50, { charSpace: 1 });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...DARK_GRAY);
      const toneLines = doc.splitTextToSize(p.tone, contentWidth - 90);
      doc.text(toneLines, marginX + 70, y + 50);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...GOLD);
      doc.text('FEEL', marginX + 16, y + 80, { charSpace: 1 });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...DARK_GRAY);
      const feelLines = doc.splitTextToSize(p.homeFeel, contentWidth - 90);
      doc.text(feelLines, marginX + 70, y + 80);

      y += 112;
    });

    // ══════════════════════════════════════════════════════════
    // ── 09. CODE TOKENS ───────────────────────────────────────
    // ══════════════════════════════════════════════════════════
    doc.addPage();
    addHeader();
    sectionTitle('09 · Code Tokens', 'Copy. Paste. Ship.');

    paragraph('Drop these into any Fuzion property — React, plain HTML, or any framework. The system is portable.');

    subheading('CSS variables (index.css)');
    codeBlock(`:root {
  --cream: #FAF8F4;
  --sand: #EEE9E2;
  --navy: #0A1628;
  --navy-2: #0D1F3C;
  --gold: #C8922A;
  --gray: #6B7280;
  --dark-gray: #374151;
  --border: #E5E7EB;

  /* Per-property accents */
  --chickasaw-indigo: #3D3B8E;
  --chickasaw-purple: #9B8EC4;
  --rancher-green: #1A8A6E;
}

.bg-navy-gradient {
  background: linear-gradient(160deg, var(--navy) 0%, var(--navy-2) 100%);
  color: white;
}`);

    subheading('Tailwind theme extension');
    codeBlock(`fontFamily: {
  heading: ['"Cormorant Garamond"', 'serif'],
  body: ['"DM Sans"', 'sans-serif'],
  sans: ['"DM Sans"', 'sans-serif'],
},
colors: {
  cream: '#FAF8F4',
  sand: '#EEE9E2',
  navy: { DEFAULT: '#0A1628', 2: '#0D1F3C' },
  gold: '#C8922A',
}`);

    subheading('Required Google Fonts');
    codeBlock(`<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">`);

    // ══════════════════════════════════════════════════════════
    // ── 10. DO & DO NOT ───────────────────────────────────────
    // ══════════════════════════════════════════════════════════
    doc.addPage();
    addHeader();
    sectionTitle('10 · Do & Do Not', 'The guardrails.');

    eyebrow('Always');
    bullet('Use gold eyebrow labels above every section heading.');
    bullet('Pair editorial serif headlines with sans-serif body.');
    bullet('Alternate cream content sections with navy anchor sections.');
    bullet('Keep corners sharp. Border-radius 0 is the default.');
    bullet('Italicize and gold-color the key phrase in headlines when possible.');
    bullet('Include the "A Fuzion Company" sub-mark on every property page.');
    bullet('Use generous vertical spacing (py-32 on sections).');
    bullet('Treat gold as sacred — use it for accent, never decoration.');

    y += 6;
    eyebrow('Never');
    bullet('Pure white (#FFFFFF) page backgrounds. Use cream.');
    bullet('Rounded pill buttons or fully circular CTAs.');
    bullet('Drop shadows used decoratively. Subtle hover shadows only.');
    bullet('Gradient overlays on photos, neumorphism, glassmorphism, or other trends.');
    bullet('Decorative icons inside large illustrations. Lucide icons only, used sparingly.');
    bullet('Gold body text or gold backgrounds beyond the one-per-page exception.');
    bullet('Mixing serif body text. Headlines only.');
    bullet('Loud emojis, exclamation points, or "salesy" copy. Read like an editorial, not a brochure.');

    // ══════════════════════════════════════════════════════════
    // ── 11. VERSIONING & GOVERNANCE ───────────────────────────
    // ══════════════════════════════════════════════════════════
    doc.addPage();
    addHeader();
    sectionTitle('11 · Versioning & Governance', 'Who owns the system.');

    paragraph(
      'A brand system only stays a system if someone owns it. This document is version 1.0. It is the source of truth across every Fuzion property.'
    );

    subheading('Ownership');
    bullet('System owner: Dan Goretskie (Fuzion Consulting Group) and Donna Webb (Fuzion Chickasaw Group).');
    bullet('Daily steward: The Fuzion Companies design lead.');
    bullet('Implementation review: Required before any new property goes live.');

    subheading('Changing the system');
    bullet('Color additions must be approved by both founders.');
    bullet('Typography changes require a new version (2.0).');
    bullet('Per-property accents may be added without changing the master system.');
    bullet('Components may be added to this guide as new patterns emerge.');

    subheading('Distribution');
    bullet('This PDF is the authoritative reference. Share with every developer, designer, agency, or contractor working on any Fuzion property.');
    bullet('When pitching new agency partners, lead with this document.');
    bullet('No work begins on any Fuzion property without first acknowledging this system.');

    y += 12;
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(2);
    doc.line(marginX, y, marginX + 40, y);
    y += 24;

    doc.setFont('times', 'italic');
    doc.setFontSize(20);
    doc.setTextColor(...NAVY);
    const close = doc.splitTextToSize(
      '"SB217 is our anchor. February 17 is our founding date. The Ranger Road Fire is our origin. That is a brand that can go a long way."',
      contentWidth
    );
    doc.text(close, marginX, y);
    y += close.length * 22 + 8;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...GOLD);
    doc.text('— THE FUZION EDITORIAL SYSTEM  ·  v1.0', marginX, y, { charSpace: 1.5 });

    addFooter();

    const pdfBytes = doc.output('arraybuffer');
    return Buffer.from(pdfBytes);
}
