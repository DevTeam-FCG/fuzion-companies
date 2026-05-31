import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import { jsPDF } from 'npm:jspdf@4.0.0';

// ─── Brand Tokens ─────────────────────────────────────────────────────────
const NAVY = [10, 22, 40];          // #0a1628
const NAVY2 = [13, 31, 60];         // #0d1f3c
const GOLD = [200, 146, 42];        // #C8922A
const CREAM = [250, 248, 244];      // #FAF8F4
const CREAM_DEEP = [238, 233, 226]; // #EEE9E2
const INK = [26, 32, 44];
const MUTED = [110, 118, 132];
const BORDER = [220, 215, 205];
const WHITE = [255, 255, 255];
const CHICKASAW_INDIGO = [61, 59, 142];  // #3D3B8E
const CHICKASAW_PURPLE = [155, 142, 196]; // #9B8EC4

const PAGE_W = 612;  // letter
const PAGE_H = 792;
const M = 54;

function setFill(doc, [r, g, b]) { doc.setFillColor(r, g, b); }
function setText(doc, [r, g, b]) { doc.setTextColor(r, g, b); }
function setDraw(doc, [r, g, b]) { doc.setDrawColor(r, g, b); }

function header(doc, pageNum, totalPages) {
  setFill(doc, CREAM);
  doc.rect(0, 0, PAGE_W, 36, 'F');
  setFill(doc, GOLD);
  doc.rect(M, 18, 18, 1, 'F');
  setText(doc, NAVY);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('FUZION COMPANIES · WEB STYLE GUIDE', M + 24, 22);
  setText(doc, MUTED);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text(`Page ${pageNum} / ${totalPages}`, PAGE_W - M, 22, { align: 'right' });
}

function footer(doc) {
  setDraw(doc, BORDER);
  doc.setLineWidth(0.5);
  doc.line(M, PAGE_H - 32, PAGE_W - M, PAGE_H - 32);
  setText(doc, MUTED);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text('Prepared by Fuzion Consulting Group · For internal media use only', M, PAGE_H - 20);
  doc.text('FuzionCompanies.com', PAGE_W - M, PAGE_H - 20, { align: 'right' });
}

function pageBg(doc, color = CREAM) {
  setFill(doc, color);
  doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
}

function sectionLabel(doc, label, y) {
  setText(doc, GOLD);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text(label.toUpperCase(), M, y, { charSpace: 1.5 });
  return y + 8;
}

function heading(doc, text, y, size = 28) {
  setText(doc, NAVY);
  doc.setFont('times', 'normal');
  doc.setFontSize(size);
  doc.text(text, M, y);
  return y + size * 0.9;
}

function body(doc, text, y, opts = {}) {
  const { size = 10, color = INK, lineH = 14, width = PAGE_W - M * 2, font = 'helvetica', style = 'normal' } = opts;
  setText(doc, color);
  doc.setFont(font, style);
  doc.setFontSize(size);
  const lines = doc.splitTextToSize(text, width);
  doc.text(lines, M, y);
  return y + lines.length * lineH;
}

function rule(doc, y, color = BORDER) {
  setDraw(doc, color);
  doc.setLineWidth(0.5);
  doc.line(M, y, PAGE_W - M, y);
  return y + 1;
}

function colorChip(doc, x, y, w, h, fillColor, label, hex, usage) {
  setFill(doc, fillColor);
  doc.rect(x, y, w, h, 'F');
  setDraw(doc, BORDER);
  doc.setLineWidth(0.3);
  doc.rect(x, y, w, h, 'S');
  setText(doc, NAVY);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(label, x, y + h + 14);
  setText(doc, MUTED);
  doc.setFont('courier', 'normal');
  doc.setFontSize(8);
  doc.text(hex, x, y + h + 26);
  setText(doc, INK);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  const lines = doc.splitTextToSize(usage, w);
  doc.text(lines, x, y + h + 38);
}

function calloutBox(doc, x, y, w, lines, accent = GOLD) {
  const padding = 14;
  const lineH = 13;
  const boxH = padding * 2 + lines.length * lineH;
  setFill(doc, WHITE);
  doc.rect(x, y, w, boxH, 'F');
  setFill(doc, accent);
  doc.rect(x, y, 3, boxH, 'F');
  setText(doc, NAVY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  lines.forEach((ln, i) => {
    doc.text(ln, x + padding + 6, y + padding + 8 + i * lineH);
  });
  return y + boxH + 12;
}

function codeBlock(doc, x, y, w, code, lineH = 11) {
  const lines = code.split('\n');
  const boxH = 18 + lines.length * lineH;
  setFill(doc, [248, 246, 240]);
  doc.rect(x, y, w, boxH, 'F');
  setDraw(doc, BORDER);
  doc.setLineWidth(0.3);
  doc.rect(x, y, w, boxH, 'S');
  setText(doc, NAVY);
  doc.setFont('courier', 'normal');
  doc.setFontSize(8);
  lines.forEach((ln, i) => {
    doc.text(ln, x + 10, y + 14 + i * lineH);
  });
  return y + boxH + 10;
}

// ─── COVER ────────────────────────────────────────────────────────────────
function drawCover(doc) {
  setFill(doc, NAVY);
  doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
  // gold radial glow accent
  setFill(doc, [200, 146, 42, 0.15]);
  // Top bar
  setFill(doc, GOLD);
  doc.rect(M, 100, 28, 2, 'F');
  setText(doc, [200, 146, 42]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('FUZION COMPANIES · BRAND ADAPTATION GUIDE', M + 38, 104, { charSpace: 1.8 });

  setText(doc, WHITE);
  doc.setFont('times', 'normal');
  doc.setFontSize(54);
  doc.text('Web Style Guide', M, 230);
  doc.setFont('times', 'italic');
  setText(doc, [200, 146, 42]);
  doc.text('for media adaptation.', M, 280);

  setText(doc, [255, 255, 255, 0.85]);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  const intro = doc.splitTextToSize(
    'Color palette, typography tokens, and brand application rules for adapting fuzionconsultinggroup.com and fuzionchickasawgroup.com to the unified Fuzion Companies editorial brand system. Existing site layouts remain unchanged — only colors, typography tokens, and styling rules update.',
    PAGE_W - M * 2 - 80
  );
  setText(doc, WHITE);
  doc.text(intro, M, 330);

  // Divider
  setDraw(doc, GOLD);
  doc.setLineWidth(0.5);
  doc.line(M, 460, M + 60, 460);

  setText(doc, [200, 146, 42]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('PREPARED FOR', M, 480, { charSpace: 1.5 });
  setText(doc, WHITE);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('Media & Web Development Team', M, 498);

  setText(doc, [200, 146, 42]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('SCOPE', M, 530, { charSpace: 1.5 });
  setText(doc, WHITE);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('Color tokens · Typography · Buttons · Headers · Footers · Imagery', M, 548);

  setText(doc, [200, 146, 42]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('LAYOUTS', M, 580, { charSpace: 1.5 });
  setText(doc, WHITE);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('Unchanged — adapt visual tokens only', M, 598);

  // Footer block
  setDraw(doc, [200, 146, 42, 0.4]);
  doc.setLineWidth(0.5);
  doc.line(M, PAGE_H - 90, PAGE_W - M, PAGE_H - 90);

  setText(doc, [200, 146, 42]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.text('FUZION CONSULTING GROUP', M, PAGE_H - 70, { charSpace: 1.5 });
  doc.text('FUZION CHICKASAW GROUP', M, PAGE_H - 58, { charSpace: 1.5 });
  setText(doc, [255, 255, 255, 0.6]);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('fuzionconsultinggroup.com  ·  fuzionchickasawgroup.com', M, PAGE_H - 42);
}

// ─── PAGE 2 — Brand Philosophy ────────────────────────────────────────────
function drawPhilosophy(doc) {
  pageBg(doc, CREAM);
  let y = 90;
  y = sectionLabel(doc, '01 · Brand Philosophy', y);
  y = heading(doc, 'Editorial. Engineered.', y + 4, 32);
  y = heading(doc, 'Unmistakable.', y + 6, 32);
  y += 18;

  y = body(doc,
    'The Fuzion Companies visual identity is built on the conviction that excellence and service are the same thing — and that should be visible in every pixel. The unified brand system applies across all Fuzion entities (Fuzion Consulting Group, Fuzion Chickasaw Group, SB217, Support Beacon Relief) to communicate sophistication, engineering discipline, and mission-driven purpose.',
    y, { color: INK, lineH: 15 }
  );
  y += 16;

  y = rule(doc, y);
  y += 18;

  y = sectionLabel(doc, 'Three Brand Pillars', y);
  y += 6;

  const pillars = [
    { t: 'Editorial', d: 'Cormorant Garamond serif headlines paired with DM Sans body. Generous whitespace. Sharp 0-radius corners. The visual language of a thoughtful publication, not a generic SaaS template.' },
    { t: 'Engineered', d: 'Deep navy authority. Audit-grade hierarchy. Bordered grids. Typography you can trust. The look of 35+ years of engineering discipline rendered as a brand system.' },
    { t: 'Mission-driven', d: 'Warm cream backgrounds. Gold accent for emphasis. Sub-brand colors (Chickasaw indigo, partner orange) used with intent. Every visual choice communicates that we show up.' },
  ];
  pillars.forEach((p) => {
    setText(doc, NAVY);
    doc.setFont('times', 'normal');
    doc.setFontSize(16);
    doc.text(p.t, M, y);
    y += 6;
    setFill(doc, GOLD);
    doc.rect(M, y, 14, 1, 'F');
    y += 12;
    y = body(doc, p.d, y, { size: 10, color: INK, lineH: 14 });
    y += 14;
  });
}

// ─── PAGE 3 — Color System ────────────────────────────────────────────────
function drawColorSystem(doc) {
  pageBg(doc, CREAM);
  let y = 90;
  y = sectionLabel(doc, '02 · Color System', y);
  y = heading(doc, 'The unified palette.', y + 4, 30);
  y += 18;

  y = body(doc,
    'These six colors define the Fuzion Companies visual system. Navy is the authority color. Gold is the emphasis color. Cream is the editorial canvas. Use white sparingly — cream is the preferred neutral. Sub-brand accents (indigo, purple) are reserved for Fuzion Chickasaw Group contexts.',
    y, { color: INK, lineH: 14 }
  );
  y += 18;

  // Primary palette
  y = sectionLabel(doc, 'Primary Palette', y + 4);
  y += 10;

  const chipW = 70;
  const chipH = 70;
  const gap = 18;
  const startX = M;

  colorChip(doc, startX, y, chipW, chipH, NAVY, 'Navy', '#0A1628', 'Headlines, nav, footers, dark sections');
  colorChip(doc, startX + (chipW + gap), y, chipW, chipH, NAVY2, 'Navy 2', '#0D1F3C', 'Gradient pair for dark hero sections');
  colorChip(doc, startX + (chipW + gap) * 2, y, chipW, chipH, GOLD, 'Gold', '#C8922A', 'Accents, CTAs, emphasis, dividers');
  colorChip(doc, startX + (chipW + gap) * 3, y, chipW, chipH, CREAM, 'Cream', '#FAF8F4', 'Default page background');
  colorChip(doc, startX + (chipW + gap) * 4, y, chipW, chipH, CREAM_DEEP, 'Cream Deep', '#EEE9E2', 'Alternating section background');

  y += chipH + 78;

  // Sub-brand palette
  y = sectionLabel(doc, 'Sub-brand Accents · Fuzion Chickasaw Group only', y);
  y += 10;

  colorChip(doc, startX, y, chipW, chipH, CHICKASAW_INDIGO, 'Chickasaw Indigo', '#3D3B8E', 'Primary FCG accent (flag indigo)');
  colorChip(doc, startX + (chipW + gap), y, chipW, chipH, CHICKASAW_PURPLE, 'Chickasaw Purple', '#9B8EC4', 'Secondary FCG accent (seal honor)');

  y += chipH + 78;

  y = calloutBox(doc, M, y, PAGE_W - M * 2, [
    'CRITICAL: Do NOT use light blue, gray-blue, or generic SaaS blues.',
    'The current Fuzion sites use a washed-out blue palette — replace it entirely.',
    'Navy + Gold + Cream is the only acceptable primary combination.',
  ], GOLD);
}

// ─── PAGE 4 — Typography ──────────────────────────────────────────────────
function drawTypography(doc) {
  pageBg(doc, CREAM);
  let y = 90;
  y = sectionLabel(doc, '03 · Typography', y);
  y = heading(doc, 'Two typefaces. One voice.', y + 4, 30);
  y += 20;

  // Cormorant Garamond
  setText(doc, GOLD);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('HEADING TYPEFACE', M, y, { charSpace: 1.5 });
  y += 14;
  setText(doc, NAVY);
  doc.setFont('times', 'normal');
  doc.setFontSize(36);
  doc.text('Cormorant Garamond', M, y + 26);
  y += 40;
  setText(doc, INK);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Weight 500 (medium) for headlines · Italic for emphasis · Loaded from Google Fonts', M, y);
  y += 18;
  setText(doc, MUTED);
  doc.setFont('courier', 'normal');
  doc.setFontSize(9);
  doc.text("font-family: 'Cormorant Garamond', serif;", M, y);
  y += 20;
  y = rule(doc, y);
  y += 18;

  // DM Sans
  setText(doc, GOLD);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('BODY TYPEFACE', M, y, { charSpace: 1.5 });
  y += 14;
  setText(doc, NAVY);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.text('DM Sans', M, y + 22);
  y += 36;
  setText(doc, INK);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text('Weight 400/500/700 · Body, UI, navigation, buttons · Loaded from Google Fonts', M, y);
  y += 18;
  setText(doc, MUTED);
  doc.setFont('courier', 'normal');
  doc.setFontSize(9);
  doc.text("font-family: 'DM Sans', sans-serif;", M, y);
  y += 24;
  y = rule(doc, y);
  y += 18;

  // Scale
  y = sectionLabel(doc, 'Type Scale (Desktop)', y);
  y += 12;

  const scale = [
    { name: 'Display', size: '5.5rem', usage: 'Hero headlines · Cormorant 500' },
    { name: 'H1', size: '3.5rem', usage: 'Section headers · Cormorant 500' },
    { name: 'H2', size: '2rem', usage: 'Sub-section · Cormorant 600' },
    { name: 'Lead', size: '1.0625rem', usage: 'Lead paragraphs · DM Sans 400' },
    { name: 'Body', size: '1rem', usage: 'Body text · DM Sans 400' },
    { name: 'Caption', size: '0.625rem', usage: 'Eyebrow · DM Sans 700 · letter-spacing 0.3em uppercase' },
  ];

  setDraw(doc, BORDER);
  doc.setLineWidth(0.3);
  scale.forEach((s) => {
    doc.line(M, y, PAGE_W - M, y);
    y += 14;
    setText(doc, NAVY);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(s.name, M, y);
    setText(doc, GOLD);
    doc.setFont('courier', 'normal');
    doc.setFontSize(9);
    doc.text(s.size, M + 90, y);
    setText(doc, INK);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(s.usage, M + 180, y);
    y += 10;
  });
  doc.line(M, y, PAGE_W - M, y);
}

// ─── PAGE 5 — CSS Tokens ──────────────────────────────────────────────────
function drawTokens(doc) {
  pageBg(doc, CREAM);
  let y = 90;
  y = sectionLabel(doc, '04 · Implementation Tokens', y);
  y = heading(doc, 'Drop-in CSS variables.', y + 4, 28);
  y += 18;

  y = body(doc,
    'Add these CSS variables to your root stylesheet. Both Fuzion sites should use the same token names so styles stay in sync across properties.',
    y, { color: INK, lineH: 14 }
  );
  y += 14;

  const css = `:root {
  /* Brand colors */
  --color-navy: #0A1628;
  --color-navy-2: #0D1F3C;
  --color-gold: #C8922A;
  --color-cream: #FAF8F4;
  --color-cream-deep: #EEE9E2;
  --color-ink: #1A202C;
  --color-muted: #6E7684;
  --color-border: #DCD7CD;

  /* Sub-brand (Fuzion Chickasaw Group only) */
  --color-chickasaw-indigo: #3D3B8E;
  --color-chickasaw-purple: #9B8EC4;

  /* Typography */
  --font-heading: 'Cormorant Garamond', serif;
  --font-body: 'DM Sans', sans-serif;

  /* Radii — sharp editorial */
  --radius: 0;

  /* Eyebrow caption */
  --caption-size: 0.625rem;
  --caption-tracking: 0.3em;
}`;
  y = codeBlock(doc, M, y, PAGE_W - M * 2, css);

  y += 6;
  y = sectionLabel(doc, 'Google Fonts Embed', y);
  y += 6;
  const fonts = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">`;
  y = codeBlock(doc, M, y, PAGE_W - M * 2, fonts);
}

// ─── PAGE 6 — Component Recipes ───────────────────────────────────────────
function drawComponents(doc) {
  pageBg(doc, CREAM);
  let y = 90;
  y = sectionLabel(doc, '05 · Component Recipes', y);
  y = heading(doc, 'The building blocks.', y + 4, 28);
  y += 18;

  // Eyebrow
  setText(doc, GOLD);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('CAPABILITY', M, y, { charSpace: 1.5 });
  setText(doc, MUTED);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('· Section eyebrow label', M + 70, y);
  y += 10;
  setText(doc, INK);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Gold #C8922A · DM Sans 700 · 0.625rem · uppercase · letter-spacing 0.3em', M, y);
  y += 16;
  y = rule(doc, y);
  y += 14;

  // Headline
  setText(doc, NAVY);
  doc.setFont('times', 'normal');
  doc.setFontSize(28);
  doc.text('Modern Technology', M, y + 18);
  y += 30;
  setText(doc, INK);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Navy #0A1628 · Cormorant Garamond 500 · serif · line-height 1.1', M, y);
  y += 16;
  y = rule(doc, y);
  y += 14;

  // Primary button
  setFill(doc, GOLD);
  doc.rect(M, y, 130, 28, 'F');
  setText(doc, WHITE);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('EXPLORE SERVICES →', M + 65, y + 17, { align: 'center', charSpace: 1.5 });
  y += 36;
  setText(doc, INK);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Primary CTA · Gold fill · White text · DM Sans 700 · 0.6875rem · uppercase · letter-spacing 0.2em · 0px radius', M, y);
  y += 18;

  // Secondary button
  setDraw(doc, NAVY);
  doc.setLineWidth(1);
  doc.rect(M, y, 130, 28, 'S');
  setText(doc, NAVY);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('LEARN MORE →', M + 65, y + 17, { align: 'center', charSpace: 1.5 });
  y += 36;
  setText(doc, INK);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Secondary CTA · Navy 1px border · Navy text · transparent fill · same type rules', M, y);
  y += 22;

  y = rule(doc, y);
  y += 14;

  // Section header / nav
  setFill(doc, NAVY);
  doc.rect(M, y, PAGE_W - M * 2, 36, 'F');
  setText(doc, WHITE);
  doc.setFont('times', 'normal');
  doc.setFontSize(12);
  doc.text('Fuzion Consulting Group', M + 14, y + 22);
  setFill(doc, GOLD);
  doc.rect(M + 14, y + 26, 14, 1, 'F');
  setText(doc, [255, 255, 255, 0.85]);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Capabilities    Industries    Projects    Company    News', PAGE_W - M - 14, y + 22, { align: 'right' });
  y += 44;
  setText(doc, INK);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Header · Navy background · Gold rule under wordmark · DM Sans nav links 0.875rem · white 85%', M, y);
  y += 22;

  // Card
  setFill(doc, WHITE);
  doc.rect(M, y, 200, 60, 'F');
  setDraw(doc, BORDER);
  doc.setLineWidth(0.5);
  doc.rect(M, y, 200, 60, 'S');
  setFill(doc, GOLD);
  doc.rect(M + 14, y + 14, 18, 2, 'F');
  setText(doc, NAVY);
  doc.setFont('times', 'normal');
  doc.setFontSize(13);
  doc.text('Service Title', M + 14, y + 36);
  setText(doc, INK);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('Short supporting description.', M + 14, y + 50);
  setText(doc, INK);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text('Card · White fill · 1px border · Gold top-bar accent · 0px radius', M + 216, y + 36);
}

// ─── PAGE 7 — Site Adaptation Map ─────────────────────────────────────────
function drawSiteMap(doc, siteName, siteUrl, isFCG) {
  pageBg(doc, CREAM);
  let y = 90;
  y = sectionLabel(doc, isFCG ? '06b · Fuzion Chickasaw Group · Adaptation Map' : '06a · Fuzion Consulting Group · Adaptation Map', y);
  y = heading(doc, siteName, y + 4, 26);
  setText(doc, MUTED);
  doc.setFont('courier', 'normal');
  doc.setFontSize(9);
  doc.text(siteUrl, M, y + 4);
  y += 18;

  y = body(doc,
    isFCG
      ? 'Keep the existing layout. Apply the unified Fuzion palette PLUS the Chickasaw sub-brand accents on FCG-specific elements (hero accents, leadership cards, tribal-services callouts). Indigo replaces gold ONLY in sub-brand contexts.'
      : 'Keep the existing layout. Replace all light-blue/gray-blue tokens with the navy + gold + cream system. Headlines move to Cormorant Garamond. Body stays sans-serif (DM Sans).',
    y, { color: INK, lineH: 14 }
  );
  y += 16;

  y = sectionLabel(doc, 'Token Replacement Map', y + 4);
  y += 10;

  const mappings = isFCG
    ? [
        { from: 'Light blue header background', to: 'Navy #0A1628' },
        { from: 'Dark text on light bg', to: 'Navy #0A1628 (unchanged hierarchy)' },
        { from: 'Page background (off-white blue)', to: 'Cream #FAF8F4' },
        { from: 'Alternating section background', to: 'Cream Deep #EEE9E2' },
        { from: 'Primary CTA (black pill)', to: 'Gold #C8922A · 0px radius · uppercase' },
        { from: 'Secondary CTA (light pill)', to: 'Navy 1px border · 0px radius · uppercase' },
        { from: 'Headline typeface', to: 'Cormorant Garamond 500 italic-emphasis' },
        { from: 'Body typeface', to: 'DM Sans 400' },
        { from: 'FCG hero accent / leadership cards', to: 'Chickasaw Indigo #3D3B8E' },
        { from: 'FCG honor / cultural callouts', to: 'Chickasaw Purple #9B8EC4' },
        { from: 'Border radius (rounded pills, cards)', to: '0px — sharp editorial' },
      ]
    : [
        { from: 'Light blue header background', to: 'Navy #0A1628' },
        { from: 'Dark text on light bg', to: 'Navy #0A1628 (unchanged hierarchy)' },
        { from: 'Page background (off-white blue)', to: 'Cream #FAF8F4' },
        { from: 'Alternating section background', to: 'Cream Deep #EEE9E2' },
        { from: 'Primary CTA (black pill)', to: 'Gold #C8922A · 0px radius · uppercase' },
        { from: 'Secondary CTA (light pill)', to: 'Navy 1px border · 0px radius · uppercase' },
        { from: 'Headline typeface', to: 'Cormorant Garamond 500 italic-emphasis' },
        { from: 'Body typeface', to: 'DM Sans 400' },
        { from: 'Section eyebrows', to: 'Gold uppercase · letter-spacing 0.3em · 0.625rem' },
        { from: 'Card borders', to: '1px solid #DCD7CD' },
        { from: 'Border radius (rounded pills, cards)', to: '0px — sharp editorial' },
      ];

  setDraw(doc, BORDER);
  doc.setLineWidth(0.3);
  doc.line(M, y, PAGE_W - M, y);
  y += 4;
  setText(doc, GOLD);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('CURRENT', M, y + 10, { charSpace: 1.5 });
  doc.text('REPLACE WITH', M + 230, y + 10, { charSpace: 1.5 });
  y += 18;
  doc.line(M, y, PAGE_W - M, y);
  y += 4;

  mappings.forEach((m) => {
    setText(doc, INK);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const fromLines = doc.splitTextToSize(m.from, 215);
    const toLines = doc.splitTextToSize(m.to, PAGE_W - M * 2 - 230);
    const rowH = Math.max(fromLines.length, toLines.length) * 12 + 8;
    doc.text(fromLines, M, y + 8);
    setText(doc, NAVY);
    doc.setFont('helvetica', 'bold');
    doc.text(toLines, M + 230, y + 8);
    y += rowH;
    setDraw(doc, BORDER);
    doc.setLineWidth(0.3);
    doc.line(M, y, PAGE_W - M, y);
    y += 4;
  });
}

// ─── PAGE 9 — Do / Don't ──────────────────────────────────────────────────
function drawDoDont(doc) {
  pageBg(doc, CREAM);
  let y = 90;
  y = sectionLabel(doc, '07 · Application Rules', y);
  y = heading(doc, 'Do this. Not that.', y + 4, 28);
  y += 20;

  const dos = [
    'Use navy + gold + cream as the primary palette across both sites.',
    'Render all headlines in Cormorant Garamond 500 (regular weight, not bold).',
    'Keep border-radius at 0 — sharp corners are the editorial signature.',
    'Use cream (#FAF8F4) as the default page background, not pure white.',
    'Apply gold ONLY for accents, CTAs, eyebrows, and dividers — never for body text.',
    'Reserve Chickasaw Indigo + Purple for Fuzion Chickasaw Group contexts only.',
    'Use uppercase + letter-spacing 0.3em for eyebrow labels.',
    'Maintain generous whitespace — minimum 80px section vertical padding.',
  ];
  const donts = [
    'Do not use light blue, gray-blue, or generic SaaS blues anywhere.',
    'Do not use rounded pills or rounded cards — radius is always 0.',
    'Do not use bold sans-serif for headlines — Cormorant Garamond only.',
    'Do not use gold or indigo for body text — readability suffers.',
    'Do not mix Chickasaw sub-brand accents into FCG (Fuzion Consulting) site.',
    'Do not use pure white #FFFFFF as the default background — use cream.',
    'Do not use drop shadows or gradients on cards — use 1px borders instead.',
    'Do not introduce additional typefaces — stick to Cormorant + DM Sans.',
  ];

  setText(doc, [26, 138, 110]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('DO', M, y, { charSpace: 1.5 });
  y += 14;
  dos.forEach((d) => {
    setText(doc, NAVY);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('✓', M, y);
    setText(doc, INK);
    const lines = doc.splitTextToSize(d, PAGE_W - M * 2 - 16);
    doc.text(lines, M + 14, y);
    y += lines.length * 12 + 4;
  });

  y += 6;
  y = rule(doc, y);
  y += 14;

  setText(doc, [200, 50, 50]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text("DON'T", M, y, { charSpace: 1.5 });
  y += 14;
  donts.forEach((d) => {
    setText(doc, [200, 50, 50]);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text('✗', M, y);
    setText(doc, INK);
    const lines = doc.splitTextToSize(d, PAGE_W - M * 2 - 16);
    doc.text(lines, M + 14, y);
    y += lines.length * 12 + 4;
  });
}

// ─── PAGE 10 — Implementation Checklist ───────────────────────────────────
function drawChecklist(doc) {
  pageBg(doc, CREAM);
  let y = 90;
  y = sectionLabel(doc, '08 · Implementation Checklist', y);
  y = heading(doc, 'For your media team.', y + 4, 28);
  y += 20;

  const checklist = [
    { phase: 'Phase 1 · Foundation', items: [
      'Embed Google Fonts (Cormorant Garamond + DM Sans) in <head>',
      'Add CSS variables from page 5 to root stylesheet',
      'Replace existing color tokens with new variable references',
      'Update body background to var(--color-cream)',
    ]},
    { phase: 'Phase 2 · Typography', items: [
      'Update all H1/H2/H3 to font-family: var(--font-heading)',
      'Update body to font-family: var(--font-body)',
      'Add uppercase eyebrow labels above section headers',
      'Verify hierarchy with type scale from page 4',
    ]},
    { phase: 'Phase 3 · Components', items: [
      'Restyle primary CTAs to gold fill, uppercase, 0px radius',
      'Restyle secondary CTAs to navy outline, uppercase, 0px radius',
      'Update header background to navy with white text',
      'Restyle cards with 1px border, no shadow, 0px radius',
    ]},
    { phase: 'Phase 4 · QA', items: [
      'Verify no light-blue / gray-blue remains anywhere on either site',
      'Verify both Fuzion sites look visually unified side-by-side',
      'Verify Chickasaw indigo accents appear ONLY on FCG site',
      'Test responsive — mobile should keep same color/type system',
    ]},
  ];

  checklist.forEach((section) => {
    setText(doc, GOLD);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(section.phase.toUpperCase(), M, y, { charSpace: 1.5 });
    y += 14;
    section.items.forEach((item) => {
      setDraw(doc, NAVY);
      doc.setLineWidth(0.8);
      doc.rect(M, y - 8, 10, 10, 'S');
      setText(doc, INK);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      const lines = doc.splitTextToSize(item, PAGE_W - M * 2 - 22);
      doc.text(lines, M + 18, y);
      y += lines.length * 12 + 6;
    });
    y += 10;
  });

  // Final note
  y += 6;
  calloutBox(doc, M, y, PAGE_W - M * 2, [
    'Questions or design review needed?',
    'Contact: technology@fcghelps.com',
    'Reference site: FuzionCompanies.com (canonical brand application)',
  ], GOLD);
}

// ─── RATE LIMIT ───────────────────────────────────────────────────────────
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

// ─── HANDLER ──────────────────────────────────────────────────────────────
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!checkRate(user.email)) {
      return Response.json({ error: 'Rate limit exceeded. Try again in a minute.' }, { status: 429 });
    }

    const doc = new jsPDF({ unit: 'pt', format: 'letter' });

    drawCover(doc);

    doc.addPage();
    drawPhilosophy(doc);

    doc.addPage();
    drawColorSystem(doc);

    doc.addPage();
    drawTypography(doc);

    doc.addPage();
    drawTokens(doc);

    doc.addPage();
    drawComponents(doc);

    doc.addPage();
    drawSiteMap(doc, 'Fuzion Consulting Group', 'fuzionconsultinggroup.com', false);

    doc.addPage();
    drawSiteMap(doc, 'Fuzion Chickasaw Group', 'fuzionchickasawgroup.com', true);

    doc.addPage();
    drawDoDont(doc);

    doc.addPage();
    drawChecklist(doc);

    // Header/footer on all but cover
    const totalPages = doc.getNumberOfPages();
    for (let i = 2; i <= totalPages; i++) {
      doc.setPage(i);
      header(doc, i, totalPages);
      footer(doc);
    }

    const pdfBytes = doc.output('arraybuffer');
    return new Response(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=Fuzion-Sites-Web-Style-Guide.pdf',
      },
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});