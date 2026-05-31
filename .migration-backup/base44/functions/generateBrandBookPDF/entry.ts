import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import { jsPDF } from 'npm:jspdf@2.5.1';

// Rate limit: max 5 PDF generations per user per minute
const rateBuckets = new Map();
function checkRate(email) {
  const now = Date.now();
  const b = rateBuckets.get(email) || { count: 0, resetAt: now + 60_000 };
  if (now > b.resetAt) { b.count = 0; b.resetAt = now + 60_000; }
  b.count += 1;
  rateBuckets.set(email, b);
  if (rateBuckets.size > 1000) for (const [k, v] of rateBuckets) if (now > v.resetAt) rateBuckets.delete(k);
  return b.count <= 5;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (!checkRate(user.email)) return Response.json({ error: 'Rate limit exceeded. Try again in a minute.' }, { status: 429 });

    const doc = new jsPDF({ unit: 'pt', format: 'letter' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginX = 56;
    const contentWidth = pageWidth - marginX * 2;
    let y = 0;

    // ── Tokens ────────────────────────────────────────────
    const NAVY = [10, 22, 40];
    const NAVY2 = [13, 31, 60];
    const GOLD = [200, 146, 42];
    const CREAM = [250, 248, 244];
    const CREAM_DEEP = [238, 233, 226];
    const GRAY = [107, 114, 128];
    const DARK = [30, 30, 30];
    const BORDER = [220, 220, 220];
    const INDIGO = [61, 59, 142]; // Chickasaw
    const TEAL = [26, 138, 110];  // Rancher Navy

    // ── Helpers ───────────────────────────────────────────
    const ensureSpace = (needed) => {
      if (y + needed > pageHeight - 60) {
        addFooter();
        doc.addPage();
        addPageBackground();
        y = 56;
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
      doc.text('FUZION EDITORIAL SYSTEM  ·  The Master Brand Book', marginX, 22);
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
      doc.text('A FUZION COMPANY', pageWidth / 2, fy, { align: 'center' });
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...GRAY);
      doc.text(`Page ${doc.internal.getNumberOfPages()}`, pageWidth - marginX, fy, { align: 'right' });
      doc.text('Fuzion Editorial System · v1.0', marginX, fy);
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

    const eyebrowLabel = (text) => {
      ensureSpace(18);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...GOLD);
      doc.text(text.toUpperCase(), marginX, y, { charSpace: 1.5 });
      y += 14;
    };

    const paragraph = (text, opts = {}) => {
      const fontSize = opts.fontSize || 10;
      const color = opts.color || GRAY;
      doc.setFont('helvetica', opts.bold ? 'bold' : 'normal');
      doc.setFontSize(fontSize);
      doc.setTextColor(...color);
      const lines = doc.splitTextToSize(text, contentWidth);
      ensureSpace(lines.length * (fontSize + 3) + 8);
      doc.text(lines, marginX, y);
      y += lines.length * (fontSize + 3) + 6;
    };

    const pullQuote = (text, attribution) => {
      ensureSpace(100);
      doc.setFillColor(...CREAM_DEEP);
      doc.rect(marginX, y, contentWidth, 4, 'F');
      doc.setFillColor(...GOLD);
      doc.rect(marginX, y, 3, 80, 'F');
      doc.setFont('times', 'italic');
      doc.setFontSize(16);
      doc.setTextColor(...NAVY);
      const lines = doc.splitTextToSize(text, contentWidth - 30);
      doc.text(lines, marginX + 18, y + 28);
      const used = lines.length * 18;
      if (attribution) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(...GOLD);
        doc.text(attribution.toUpperCase(), marginX + 18, y + 38 + used, { charSpace: 1.5 });
      }
      y += Math.max(80, 50 + used + 10);
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

    const keyValueTable = (rows, colWidths) => {
      const lineHeight = 16;
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
        const cellLineCounts = rows[r].map((cell, i) => doc.splitTextToSize(String(cell), colWidths[i] - 8).length);
        const rowHeight = Math.max(lineHeight, ...cellLineCounts.map(c => c * 12)) + 4;
        ensureSpace(rowHeight + 4);
        x = marginX;
        rows[r].forEach((cell, i) => {
          doc.setFont('helvetica', i === 0 ? 'bold' : 'normal');
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

    const swatchGrid = (swatches, cols = 4) => {
      const gap = 8;
      const sw = (contentWidth - (cols - 1) * gap) / cols;
      const rowH = 90;
      const rows = Math.ceil(swatches.length / cols);
      ensureSpace(rows * rowH + 10);
      swatches.forEach((s, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = marginX + col * (sw + gap);
        const yPos = y + row * rowH;
        doc.setFillColor(...s.rgb);
        doc.rect(x, yPos, sw, 50, 'F');
        if (s.border) {
          doc.setDrawColor(...BORDER);
          doc.setLineWidth(0.5);
          doc.rect(x, yPos, sw, 50, 'S');
        }
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(...NAVY);
        doc.text(s.name, x, yPos + 62);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...GRAY);
        doc.text(s.hex, x, yPos + 74);
        if (s.role) {
          doc.setFontSize(7);
          doc.text(s.role, x, yPos + 84);
        }
      });
      y += rows * rowH + 6;
    };

    const dividerLine = () => {
      ensureSpace(18);
      doc.setDrawColor(...BORDER);
      doc.setLineWidth(0.3);
      doc.line(marginX, y, marginX + contentWidth, y);
      y += 14;
    };

    const doDontBox = (doText, dontText) => {
      ensureSpace(110);
      const colW = (contentWidth - 12) / 2;
      // DO
      doc.setFillColor(245, 250, 245);
      doc.rect(marginX, y, colW, 100, 'F');
      doc.setFillColor(...TEAL);
      doc.rect(marginX, y, 3, 100, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...TEAL);
      doc.text('DO', marginX + 12, y + 16, { charSpace: 1.5 });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...DARK);
      const doLines = doc.splitTextToSize(doText, colW - 24);
      doc.text(doLines, marginX + 12, y + 32);
      // DON'T
      const x2 = marginX + colW + 12;
      doc.setFillColor(252, 246, 246);
      doc.rect(x2, y, colW, 100, 'F');
      doc.setFillColor(180, 60, 60);
      doc.rect(x2, y, 3, 100, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(180, 60, 60);
      doc.text("DON'T", x2 + 12, y + 16, { charSpace: 1.5 });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...DARK);
      const dontLines = doc.splitTextToSize(dontText, colW - 24);
      doc.text(dontLines, x2 + 12, y + 32);
      y += 110;
    };

    // ═══════════════════════════════════════════════════════
    // COVER PAGE
    // ═══════════════════════════════════════════════════════
    doc.setFillColor(...NAVY);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Decorative gold lines
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.5);
    doc.line(marginX, 80, marginX + 200, 80);
    doc.line(marginX, pageHeight - 100, marginX + 60, pageHeight - 100);

    doc.setFillColor(...GOLD);
    doc.rect(marginX, 100, 40, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...GOLD);
    doc.text('FUZION COMPANIES  ·  MASTER BRAND BOOK', marginX, 122, { charSpace: 2 });

    doc.setFont('times', 'normal');
    doc.setFontSize(56);
    doc.setTextColor(255, 255, 255);
    doc.text('The Fuzion', marginX, 220);
    doc.setFont('times', 'italic');
    doc.setTextColor(...GOLD);
    doc.text('Editorial', marginX, 270);
    doc.setFont('times', 'normal');
    doc.setTextColor(255, 255, 255);
    doc.text('System.', marginX, 320);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    const intro = doc.splitTextToSize(
      'A complete design system, brand language, and application guide for every Fuzion Companies property. Cream. Navy. Gold. Editorial serif headlines. Restraint as a virtue. The system that ties Fuzion Consulting Group, Fuzion Chickasaw Group, SB217, Support Beacon Relief, and every future Fuzion brand into a single, coherent voice.',
      contentWidth - 40
    );
    doc.text(intro, marginX, 360);

    // Bottom badges
    doc.setFillColor(...GOLD);
    doc.rect(marginX, pageHeight - 200, 2, 80, 'F');

    const coverMeta = [
      ['DESIGN SYSTEM', 'Cream. Navy. Gold. Editorial.'],
      ['APPLIES TO', 'FCG · Fuzion Chickasaw · SB217 · SBR · Future properties'],
      ['VERSION', 'v1.0 · May 2026'],
    ];
    coverMeta.forEach((row, i) => {
      const yPos = pageHeight - 185 + i * 30;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...GOLD);
      doc.text(row[0], marginX + 14, yPos, { charSpace: 1.5 });
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text(row[1], marginX + 14, yPos + 12);
    });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...GOLD);
    doc.text('A FUZION COMPANY', marginX, pageHeight - 40, { charSpace: 2 });
    doc.setTextColor(255, 255, 255);
    doc.text('fuzioncompanies.com', pageWidth - marginX, pageHeight - 40, { align: 'right' });

    // ═══════════════════════════════════════════════════════
    // PAGE 2 — TABLE OF CONTENTS
    // ═══════════════════════════════════════════════════════
    doc.addPage();
    addPageBackground();
    addHeader();
    sectionTitle('Contents', 'What is inside.');
    const toc = [
      ['01', 'The Philosophy', 'Why this system exists'],
      ['02', 'The Voice', 'Restraint. Editorial. Service.'],
      ['03', 'Color System', 'Cream. Navy. Gold. Accents.'],
      ['04', 'Typography', 'Serif headlines. Sans body.'],
      ['05', 'Layout & Spacing', 'Editorial breathing room.'],
      ['06', 'Components', 'Buttons, cards, eyebrows, dividers.'],
      ['07', 'Photography', 'What to show. What to avoid.'],
      ['08', 'Sub-Brand Accents', 'Chickasaw · SB217 · Rancher Navy'],
      ['09', '"A Fuzion Company" Sub-Mark', 'The unifying signature.'],
      ['10', 'Application Recipes', 'FCG · Chickasaw · SB217.'],
      ['11', 'Do\'s & Don\'ts', 'Guardrails.'],
      ['12', 'Token Reference', 'Hex values, CSS, font specs.'],
    ];
    toc.forEach((row) => {
      ensureSpace(28);
      doc.setFont('times', 'italic');
      doc.setFontSize(18);
      doc.setTextColor(...GOLD);
      doc.text(row[0], marginX, y + 4);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...NAVY);
      doc.text(row[1], marginX + 36, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...GRAY);
      doc.text(row[2], marginX + 36, y + 12);
      y += 28;
      dividerLine();
    });

    // ═══════════════════════════════════════════════════════
    // 01 PHILOSOPHY
    // ═══════════════════════════════════════════════════════
    doc.addPage();
    addPageBackground();
    addHeader();
    sectionTitle('01 · The Philosophy', 'Excellence and service are the same thing.');
    paragraph(
      'The Fuzion Editorial System is built on a conviction: that great work done with integrity, communicated with restraint, reads as authority. Every choice in this system — cream over white, serif over sans, gold used like a fountain pen rather than a highlighter — exists to communicate the same thing the founders communicated by driving a hay trailer to Gate, Oklahoma. We show up. We do the work. We do not need to shout.',
      { fontSize: 11, color: DARK }
    );
    y += 6;
    pullQuote(
      'SB217 is our anchor. February 17 is our founding date. The Ranger Road Fire is our origin. That is a brand that can go a long way.',
      '— Fuzion Companies Brand Architecture'
    );
    subheading('The three convictions');
    bullet('Restraint reads as authority. We do not decorate. We compose.');
    bullet('Editorial pacing communicates substance. Long-form journalism, not landing-page hype.');
    bullet('The system is consistent across properties. Cohesion is the brand.');

    // ═══════════════════════════════════════════════════════
    // 02 VOICE
    // ═══════════════════════════════════════════════════════
    doc.addPage();
    addPageBackground();
    addHeader();
    sectionTitle('02 · The Voice', 'How Fuzion speaks.');
    paragraph(
      'The Fuzion voice is measured. It does not oversell. It does not hedge. When a Fuzion property says something is "live," it is live. When it says "coming soon," there is a real date. The voice is editorial, not marketing — closer to a well-written annual report than a startup landing page.'
    );
    y += 4;
    keyValueTable(
      [
        ['We Are', 'We Are Not'],
        ['Measured, plainspoken, confident', 'Hype-driven, jargon-heavy, "disruptive"'],
        ['Editorial, like a feature article', 'Salesy, like a sales deck'],
        ['Specific (dates, names, places)', 'Vague ("solutions," "synergies")'],
        ['Founder-voiced, present-tense', 'Corporate-voiced, future-tense'],
        ['Faith · Service · Precision · Community', 'Anything that conflicts with those four'],
      ],
      [contentWidth / 2, contentWidth / 2]
    );

    // ═══════════════════════════════════════════════════════
    // 03 COLOR SYSTEM
    // ═══════════════════════════════════════════════════════
    doc.addPage();
    addPageBackground();
    addHeader();
    sectionTitle('03 · Color System', 'Cream. Navy. Gold.');
    paragraph(
      'The system uses a three-tier palette. Cream is the foundation — warmer than white, easier on the eye, immediately distinct from every competitor still using #FFFFFF. Navy is the anchor — used for hero, mission, and footer sections to create rhythm. Gold is the accent — eyebrows, rules, sub-marks, and the highest-priority CTA. Gold is never decorative.'
    );

    eyebrowLabel('Core Palette');
    swatchGrid([
      { name: 'Cream', hex: '#FAF8F4', rgb: CREAM, role: 'Page background', border: true },
      { name: 'Cream Deep', hex: '#EEE9E2', rgb: CREAM_DEEP, role: 'Alt section bg' },
      { name: 'Deep Navy', hex: '#0A1628', rgb: NAVY, role: 'Headlines, hero' },
      { name: 'Navy 2', hex: '#0D1F3C', rgb: NAVY2, role: 'Gradient end' },
      { name: 'Gold', hex: '#C8922A', rgb: GOLD, role: 'Accent, eyebrows' },
      { name: 'Gray', hex: '#6B7280', rgb: GRAY, role: 'Body text' },
      { name: 'Border', hex: '#E5E7EB', rgb: BORDER, role: 'Card borders' },
      { name: 'Ink', hex: '#1E1E1E', rgb: DARK, role: 'Emphasis text' },
    ]);

    eyebrowLabel('Sub-Brand Accents (use sparingly)');
    swatchGrid([
      { name: 'Chickasaw Indigo', hex: '#3D3B8E', rgb: INDIGO, role: 'Fuzion Chickasaw' },
      { name: 'Rancher Teal', hex: '#1A8A6E', rgb: TEAL, role: 'Rancher Navy / SBR' },
    ], 2);

    paragraph(
      'Rule: any single page may use ONE sub-brand accent in addition to the core palette. Never combine indigo and teal in the same view.',
      { color: DARK, bold: true }
    );

    // ═══════════════════════════════════════════════════════
    // 04 TYPOGRAPHY
    // ═══════════════════════════════════════════════════════
    doc.addPage();
    addPageBackground();
    addHeader();
    sectionTitle('04 · Typography', 'Editorial serif. Modern sans.');
    paragraph(
      'Cormorant Garamond is the headline voice — classical, editorial, unmistakably "considered." DM Sans handles body, labels, and UI. Eyebrow labels in 10px uppercase gold tracking are the signature element that ties every section of every Fuzion property together.'
    );
    y += 8;

    // Specimen
    ensureSpace(180);
    doc.setFillColor(...CREAM_DEEP);
    doc.rect(marginX, y, contentWidth, 160, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...GOLD);
    doc.text('A SPECIMEN', marginX + 20, y + 22, { charSpace: 1.5 });
    doc.setFont('times', 'normal');
    doc.setFontSize(32);
    doc.setTextColor(...NAVY);
    doc.text('We show up.', marginX + 20, y + 60);
    doc.setFont('times', 'italic');
    doc.setTextColor(...GOLD);
    doc.text('That is the work.', marginX + 20, y + 95);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...GRAY);
    const spec = doc.splitTextToSize(
      'Body text in DM Sans, 15px on screen / 10pt in print, weight 400, line-height 1.6. The pairing is the brand.',
      contentWidth - 40
    );
    doc.text(spec, marginX + 20, y + 122);
    y += 175;

    keyValueTable(
      [
        ['Role', 'Font', 'Spec'],
        ['H1 Display', 'Cormorant Garamond', '64–96px screen · weight 500 · line-height 1.05'],
        ['H2 Section', 'Cormorant Garamond', '40–56px · weight 500 · line-height 1.1'],
        ['H3 Card', 'Cormorant Garamond', '20–24px · weight 600'],
        ['Eyebrow', 'DM Sans', '10px · uppercase · tracking 0.3em · gold #C8922A · weight 600'],
        ['Body', 'DM Sans', '15px · weight 400 · gray #6B7280 · line-height 1.6'],
        ['Button / Label', 'DM Sans', '11px · uppercase · tracking 0.2em · weight 700'],
        ['Stat Numerals', 'Cormorant Garamond', 'Large serif numerals · weight 500'],
      ],
      [110, 130, contentWidth - 240]
    );

    subheading('Google Fonts import');
    doc.setFillColor(245, 245, 240);
    ensureSpace(50);
    doc.rect(marginX, y, contentWidth, 38, 'F');
    doc.setFont('courier', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...DARK);
    const code = doc.splitTextToSize(
      `<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">`,
      contentWidth - 20
    );
    doc.text(code, marginX + 10, y + 14);
    y += 50;

    // ═══════════════════════════════════════════════════════
    // 05 LAYOUT & SPACING
    // ═══════════════════════════════════════════════════════
    doc.addPage();
    addPageBackground();
    addHeader();
    sectionTitle('05 · Layout & Spacing', 'Editorial breathing room.');
    paragraph(
      'The system is generous with space. Section padding is ~128px (8rem) top and bottom. Card padding is 32px minimum. The result reads as confident — content stands on its own without compensating with density.'
    );
    keyValueTable(
      [
        ['Token', 'Value', 'Application'],
        ['Section padding (vertical)', '128px / 8rem', 'py-32 on all major sections'],
        ['Section padding (horizontal)', '24px / 1.5rem', 'px-6 (or container max-w-7xl)'],
        ['Container max-width', '1280px', 'max-w-7xl'],
        ['Card padding', '32px / 2rem', 'p-8 minimum, p-10/p-12 for hero cards'],
        ['Card border', '1px solid #E5E7EB', 'No box-shadow as decoration'],
        ['Border radius', '0px', 'Sharp corners only · no rounded pills'],
        ['Grid gap', '24–32px / 1.5–2rem', 'gap-6 to gap-8'],
        ['Eyebrow margin-bottom', '16px / 1rem', 'mb-4 between eyebrow and heading'],
      ],
      [180, 110, contentWidth - 290]
    );

    subheading('Section rhythm');
    paragraph(
      'Alternate cream and navy sections to create rhythm. Never run three light or three dark sections in a row. A typical page reads: HERO (navy) → STORY (cream) → PORTFOLIO (cream-deep) → MISSION (navy) → CONTACT (cream).'
    );

    // ═══════════════════════════════════════════════════════
    // 06 COMPONENTS
    // ═══════════════════════════════════════════════════════
    doc.addPage();
    addPageBackground();
    addHeader();
    sectionTitle('06 · Components', 'The building blocks.');

    subheading('Buttons');
    keyValueTable(
      [
        ['Variant', 'Background', 'Treatment'],
        ['Primary', '#0A1628 Navy', 'White text · 11px bold uppercase · tracking 0.2em · padding 14×32px'],
        ['Secondary', 'Transparent', '1px navy border · navy text · same typography'],
        ['Gold CTA', '#C8922A Gold', 'White text · only for highest-priority single CTA per page'],
      ],
      [80, 120, contentWidth - 200]
    );
    paragraph('Hover state: 2px translate-Y lift + 10% opacity reduction. Sharp corners (radius 0). No drop shadows.');

    subheading('Eyebrow labels');
    paragraph(
      'The signature element. Place above every section heading. Format: 10px DM Sans, weight 600, uppercase, letter-spacing 0.3em, color #C8922A. Examples: OUR STORY, PORTFOLIO, PRODUCTS & PLATFORMS, LEADERSHIP, GET IN TOUCH.'
    );

    subheading('Cards');
    bullet('Background: #FAF8F4 (cream) or white');
    bullet('Border: 1px solid #E5E7EB');
    bullet('Padding: 32px (p-8) minimum');
    bullet('Optional 3px top accent bar in NAVY, GOLD, INDIGO, or TEAL — picks up sub-brand accent');
    bullet('Hover: subtle shadow lift only, no transforms');

    subheading('Dividers & rules');
    bullet('Gold rule: 40px wide × 1.5px tall, below every section title');
    bullet('Gray rule: 1px #E5E7EB, between repeating items in a list');
    bullet('Gold vertical mark: 3px × 60–80px, left edge of pull-quotes');

    // ═══════════════════════════════════════════════════════
    // 07 PHOTOGRAPHY
    // ═══════════════════════════════════════════════════════
    doc.addPage();
    addPageBackground();
    addHeader();
    sectionTitle('07 · Photography', 'What to show. What to avoid.');
    paragraph(
      'Photography in the Fuzion system favors specificity over polish. A real hay trailer in a real Oklahoma field outranks a stock image of "teamwork." Documentary always beats lifestyle.'
    );
    doDontBox(
      'Documentary photography. Real people, real places, real work. Founders in the field. Ranchers, volunteers, equipment, weather. Warm natural light. Slight grain is fine. Use sparingly — let typography lead.',
      "Generic corporate stock. Smiling people in headsets. Glossy 'business handshake' images. Heavy filters. Anything that could appear on ten other consulting firm websites."
    );
    y += 10;
    subheading('Treatment');
    bullet('Slight desaturation acceptable; never heavy black-and-white unless documentary');
    bullet('Allow images to bleed to edges of sections; do not always frame in cards');
    bullet('When in doubt, use less. Whitespace + typography outperforms a weak image every time');

    // ═══════════════════════════════════════════════════════
    // 08 SUB-BRAND ACCENTS
    // ═══════════════════════════════════════════════════════
    doc.addPage();
    addPageBackground();
    addHeader();
    sectionTitle('08 · Sub-Brand Accents', 'One accent per property.');
    paragraph(
      'Each Fuzion property uses the core system (cream, navy, gold) and adds exactly ONE sub-brand accent that signals its identity. The accent appears in top card bars, sub-heading colors, and partner-section borders. Never in body text. Never on buttons (except as the rare third-tier CTA).'
    );

    keyValueTable(
      [
        ['Property', 'Accent', 'Where it appears'],
        ['Fuzion Consulting Group', 'Gold only (no sub-accent)', 'Default — flagship uses pure core system'],
        ['Fuzion Chickasaw Group', 'Chickasaw Indigo #3D3B8E', 'Card top bars · partner cards · honor section'],
        ['SB217 Platform', 'Gold-forward + soft amber tints', 'Carries the "born from the fire" warmth'],
        ['Support Beacon Relief', 'Rancher Teal #1A8A6E', 'Partner card · nonprofit-coded sections'],
        ['Fortitude Junk Removal', 'Navy-forward + gold', 'Veteran-coded — disciplined, no extra accent'],
      ],
      [150, 130, contentWidth - 280]
    );

    // ═══════════════════════════════════════════════════════
    // 09 SUB-MARK
    // ═══════════════════════════════════════════════════════
    doc.addPage();
    addPageBackground();
    addHeader();
    sectionTitle('09 · "A Fuzion Company" Sub-Mark', 'The unifying signature.');
    paragraph(
      'Every Fuzion property displays the "A Fuzion Company" sub-mark above its footer. This is the single most important element of brand cohesion — it tells every visitor, on every site, that they are inside a connected portfolio.'
    );

    // Visual specimen
    ensureSpace(120);
    doc.setFillColor(...NAVY);
    doc.rect(marginX, y, contentWidth, 90, 'F');
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.6);
    const midX = marginX + contentWidth / 2;
    doc.line(marginX + 80, y + 45, midX - 70, y + 45);
    doc.line(midX + 70, y + 45, marginX + contentWidth - 80, y + 45);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...GOLD);
    doc.text('A FUZION COMPANY', midX, y + 49, { align: 'center', charSpace: 3 });
    y += 110;

    subheading('Specification');
    keyValueTable(
      [
        ['Property', 'Value'],
        ['Position', 'Above footer, centered, on every page'],
        ['Typography', 'DM Sans · 11px · weight 700 · uppercase · tracking 0.25em'],
        ['Color', 'Gold #C8922A on navy background OR navy on cream'],
        ['Rule lines', '0.5px gold, 60–80px each side, vertically centered with text'],
        ['Link', 'fuzioncompanies.com (the parent portfolio site)'],
      ],
      [110, contentWidth - 110]
    );

    // ═══════════════════════════════════════════════════════
    // 10 APPLICATION RECIPES
    // ═══════════════════════════════════════════════════════
    doc.addPage();
    addPageBackground();
    addHeader();
    sectionTitle('10 · Application Recipes', 'Three properties. One system.');
    paragraph(
      'How to take this system and apply it to each Fuzion property. Each recipe is a complete brief: palette, accents, what changes, what stays.'
    );

    const recipes = [
      {
        name: 'Fuzion Consulting Group  ·  fcghelps.com',
        eyebrow: 'FLAGSHIP — PURE CORE SYSTEM',
        accent: NAVY,
        body: 'The flagship application. Uses the core palette with no sub-brand accent. Hero sections in navy, content in cream. Eyebrows: CONSULTING SERVICES, CAPABILITIES, PROJECT EXPERIENCE, FUZION VALUES. Stats in serif numerals (35+, etc.). Project detail pages use the same component grammar as the FCG project cards on the parent site.',
        signature: 'Sub-mark "A Fuzion Company" in footer linking to fuzioncompanies.com',
      },
      {
        name: 'Fuzion Chickasaw Group  ·  fuzionchickasawgroup.com',
        eyebrow: 'CHICKASAW INDIGO ACCENT',
        accent: INDIGO,
        body: 'Adds Chickasaw Indigo #3D3B8E as the single sub-brand accent. Use indigo for top accent bars on partner cards, the "Tribal Partnerships" section heading underline, and the leadership accent for Donna Webb. Honor-section pull-quote uses the indigo vertical mark. The Chickasaw Nation flag and seal heritage is honored through the indigo — never through ornament or pattern.',
        signature: 'Sub-mark "A Fuzion Company" in footer · property tagline: "Minority Woman-Owned · Native American · Chickasaw Nation"',
      },
      {
        name: 'SB217 Platform  ·  sb217platform.com',
        eyebrow: 'GOLD-FORWARD · BORN FROM THE FIRE',
        accent: GOLD,
        body: 'SB217 leans into gold more than any other property. The platform was born from the Ranger Road Fire — the warmth of that gold tells the story. Hero section may use a soft amber-to-cream gradient. Support Beacon Relief sub-section uses the Rancher Teal accent. Support Beacon Logistics sub-section uses indigo for enterprise contrast. Founding date 2/17/2026 appears in serif numerals on the hero.',
        signature: 'Sub-mark "A Fuzion Company" in footer · prominent Rancher Navy partner credit',
      },
    ];

    recipes.forEach((r) => {
      ensureSpace(180);
      doc.setFillColor(...CREAM_DEEP);
      doc.rect(marginX, y, contentWidth, 4, 'F');
      doc.setFillColor(...r.accent);
      doc.rect(marginX, y, 60, 4, 'F');
      y += 14;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(r.accent[0], r.accent[1], r.accent[2]);
      doc.text(r.eyebrow, marginX, y, { charSpace: 1.5 });
      y += 14;
      doc.setFont('times', 'normal');
      doc.setFontSize(18);
      doc.setTextColor(...NAVY);
      doc.text(r.name, marginX, y);
      y += 22;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...DARK);
      const bodyLines = doc.splitTextToSize(r.body, contentWidth);
      doc.text(bodyLines, marginX, y);
      y += bodyLines.length * 13 + 8;
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9);
      doc.setTextColor(...GRAY);
      const sigLines = doc.splitTextToSize('Signature: ' + r.signature, contentWidth);
      doc.text(sigLines, marginX, y);
      y += sigLines.length * 12 + 10;
      dividerLine();
    });

    // ═══════════════════════════════════════════════════════
    // 11 DOS AND DONTS
    // ═══════════════════════════════════════════════════════
    doc.addPage();
    addPageBackground();
    addHeader();
    sectionTitle('11 · Do\'s & Don\'ts', 'Guardrails.');

    const guardrails = [
      ['Pair Cormorant Garamond headlines with DM Sans body.', 'Mix in a third typeface "for variety."'],
      ['Use gold only for eyebrows, rules, sub-marks, and one CTA per page.', 'Use gold for body text, large backgrounds, or shadows.'],
      ['Alternate cream and navy sections to create rhythm.', 'Stack three light or three dark sections in a row.'],
      ['Keep border-radius at 0 — sharp corners, editorial.', 'Use rounded pill buttons or "fully rounded" cards.'],
      ['Place "A Fuzion Company" above the footer on every page.', 'Hide the sub-mark in fine print, sidebar, or settings.'],
      ['Use one sub-brand accent per property.', 'Combine Chickasaw Indigo and Rancher Teal on the same page.'],
      ['Photograph real people, real work, real places.', 'Use generic stock photos of "business teamwork."'],
      ['Let whitespace do the work.', 'Compensate for weak content with decoration.'],
    ];

    guardrails.forEach(([d, dn]) => {
      doDontBox(d, dn);
      y += 6;
    });

    // ═══════════════════════════════════════════════════════
    // 12 TOKEN REFERENCE
    // ═══════════════════════════════════════════════════════
    doc.addPage();
    addPageBackground();
    addHeader();
    sectionTitle('12 · Token Reference', 'Copy. Paste. Ship.');
    paragraph('All tokens needed to implement the Fuzion Editorial System in any framework.');

    subheading('CSS variables (root)');
    ensureSpace(150);
    doc.setFillColor(245, 245, 240);
    doc.rect(marginX, y, contentWidth, 140, 'F');
    doc.setFont('courier', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(...DARK);
    const cssCode = [
      ':root {',
      '  --cream:        #FAF8F4;',
      '  --cream-deep:   #EEE9E2;',
      '  --navy:         #0A1628;',
      '  --navy-2:       #0D1F3C;',
      '  --gold:         #C8922A;',
      '  --gray:         #6B7280;',
      '  --border:       #E5E7EB;',
      '  --ink:          #1E1E1E;',
      '  --indigo:       #3D3B8E;  /* Fuzion Chickasaw */',
      '  --teal:         #1A8A6E;  /* Rancher Navy / SBR */',
      '  --radius:       0px;',
      '}',
    ];
    cssCode.forEach((line, i) => {
      doc.text(line, marginX + 10, y + 14 + i * 10);
    });
    y += 155;

    subheading('Typography tokens');
    keyValueTable(
      [
        ['Token', 'Value'],
        ['--font-heading', '"Cormorant Garamond", serif'],
        ['--font-body', '"DM Sans", sans-serif'],
        ['--track-eyebrow', '0.3em'],
        ['--track-button', '0.2em'],
        ['--weight-heading', '500'],
        ['--weight-eyebrow', '600'],
        ['--weight-button', '700'],
      ],
      [180, contentWidth - 180]
    );

    subheading('Spacing tokens');
    keyValueTable(
      [
        ['Token', 'Value'],
        ['--section-py', '128px / 8rem'],
        ['--container-max', '1280px / max-w-7xl'],
        ['--card-padding', '32px / 2rem'],
        ['--card-border', '1px solid var(--border)'],
        ['--grid-gap', '24–32px / 1.5–2rem'],
      ],
      [180, contentWidth - 180]
    );

    // ═══════════════════════════════════════════════════════
    // CLOSING
    // ═══════════════════════════════════════════════════════
    doc.addPage();
    addPageBackground();
    addHeader();
    sectionTitle('Closing', 'The system is the brand.');
    paragraph(
      'The Fuzion Editorial System is not a coat of paint. It is the brand. Every property that adopts it is recognizably part of the same portfolio — not because of a logo, but because of the system: the cream, the navy, the gold, the serif, the eyebrows, the restraint. Apply it faithfully and Fuzion Consulting Group, Fuzion Chickasaw Group, SB217, and every future Fuzion property will read as members of the same family.',
      { fontSize: 11, color: DARK }
    );

    y += 16;
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(2);
    doc.line(marginX, y, marginX + 40, y);
    y += 28;

    doc.setFont('times', 'italic');
    doc.setFontSize(22);
    doc.setTextColor(...NAVY);
    const close = doc.splitTextToSize(
      '"Technology built on the conviction of showing up."',
      contentWidth
    );
    doc.text(close, marginX, y);
    y += close.length * 24 + 16;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...GOLD);
    doc.text('— THE FUZION EDITORIAL SYSTEM  ·  v1.0  ·  MAY 2026', marginX, y, { charSpace: 1.5 });

    addFooter();

    const pdfBytes = doc.output('arraybuffer');
    return new Response(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Fuzion_Editorial_System_Brand_Book.pdf"',
      },
    });
  } catch (error) {
    return Response.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
});