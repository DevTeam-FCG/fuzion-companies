import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import { jsPDF } from 'npm:jspdf@4.0.0';

// ─── BRAND TOKENS ────────────────────────────────────────────────────────────
const NAVY = [10, 22, 40];
const GOLD = [200, 146, 42];
const CREAM = [250, 248, 244];
const TEXT = [60, 60, 65];
const MUTED = [120, 120, 128];
const RULE = [220, 218, 210];
const GREEN = [26, 138, 110];

const PAGE_W = 8.5;
const PAGE_H = 11;
const MARGIN = 0.6;

// ─── ENCODING-SAFE GLYPHS ────────────────────────────────────────────────────
// jsPDF's standard fonts use WinAnsi encoding — em-dashes and middle dots
// render as ï¿½. Use these ASCII-safe replacements throughout.
const SEP = '  /  ';          // section separator (was middle-dot)
const DASH = ' - ';            // dash (was em-dash)

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function fillBg(doc, color) {
  doc.setFillColor(...color);
  doc.rect(0, 0, PAGE_W, PAGE_H, 'F');
}

function hairline(doc, x1, y, x2, color = RULE, w = 0.005) {
  doc.setDrawColor(...color);
  doc.setLineWidth(w);
  doc.line(x1, y, x2, y);
}

// Tracked uppercase label — NO charSpace (it breaks alignment in jsPDF).
// We simulate light tracking by spacing letters via word-joined string only
// when needed. For most cases, plain uppercase is cleaner.
function eyebrow(doc, text, x, y, color = GOLD, size = 8) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(size);
  doc.setTextColor(...color);
  doc.text(text.toUpperCase(), x, y);
}

function eyebrowRight(doc, text, x, y, color = GOLD, size = 8) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(size);
  doc.setTextColor(...color);
  doc.text(text.toUpperCase(), x, y, { align: 'right' });
}

function eyebrowCenter(doc, text, x, y, color = GOLD, size = 8) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(size);
  doc.setTextColor(...color);
  doc.text(text.toUpperCase(), x, y, { align: 'center' });
}

function heading(doc, text, x, y, size = 28, color = NAVY, italic = false) {
  doc.setFont('times', italic ? 'italic' : 'normal');
  doc.setFontSize(size);
  doc.setTextColor(...color);
  doc.text(text, x, y);
}

function body(doc, text, x, y, maxWidth, size = 10, color = TEXT, lh = 1.45) {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(size);
  doc.setTextColor(...color);
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, y, { lineHeightFactor: lh });
  return y + lines.length * (size / 72) * lh;
}

function goldRule(doc, x, y, w = 0.5, h = 0.025) {
  doc.setFillColor(...GOLD);
  doc.rect(x, y, w, h, 'F');
}

function statusPill(doc, text, x, y, bg = GREEN, pillW = 1.4) {
  const h = 0.24;
  doc.setFillColor(...bg);
  doc.rect(x, y - h + 0.05, pillW, h, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text(text.toUpperCase(), x + pillW / 2, y - 0.03, { align: 'center' });
}

function bullet(doc, title, desc, x, y, maxWidth) {
  doc.setFillColor(...GOLD);
  doc.rect(x, y - 0.08, 0.05, 0.05, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...NAVY);
  doc.text(title, x + 0.18, y);
  let nextY = y + 0.18;
  if (desc) {
    nextY = body(doc, desc, x + 0.18, nextY, maxWidth - 0.18, 9, TEXT, 1.4);
  }
  return nextY + 0.16;
}

// ─── PAGE 1 ──────────────────────────────────────────────────────────────────
function renderPage1(doc) {
  // Cream background
  fillBg(doc, CREAM);

  // Navy hero block (top)
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, PAGE_W, 4.3, 'F');

  // Gold vertical accent bar (left edge)
  doc.setFillColor(...GOLD);
  doc.rect(0, 0, 0.35, 4.3, 'F');

  // Top eyebrow row
  eyebrow(doc, 'The Works Suite' + SEP + 'By Fuzion Consulting Group', MARGIN + 0.2, 0.8, GOLD, 8);

  // Product name — serif, two-line lockup
  heading(doc, 'Fuzion365', MARGIN + 0.2, 1.95, 40, [255, 255, 255]);
  heading(doc, 'Fieldworks', MARGIN + 0.2, 2.6, 40, GOLD, true);

  // Tagline
  doc.setFont('times', 'normal');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('M365-integrated field management.', MARGIN + 0.2, 3.15);

  // Status pill + category badge — give the pill a real width and keep gap
  statusPill(doc, 'Live - Available Now', MARGIN + 0.2, 3.85, GREEN, 1.7);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('Field Productivity'.toUpperCase() + SEP + 'Enterprise Ready'.toUpperCase(), MARGIN + 2.05, 3.82);

  // ─── BODY ──────────────────────────────────────────────────────────────────
  let y = 4.85;

  // Positioning paragraph
  goldRule(doc, MARGIN, y - 0.18);
  eyebrow(doc, 'What It Is', MARGIN, y + 0.02);
  y += 0.32;
  y = body(
    doc,
    'A field productivity platform built natively on Microsoft 365' + DASH + 'bringing site portals, dashboards, and Bluebeam-connected workflows into one place. Designed by people who have spent 35+ years inside large-scale construction, engineering, and utility programs.',
    MARGIN,
    y,
    PAGE_W - MARGIN * 2,
    10.5,
    TEXT,
    1.5
  );

  y += 0.4;
  hairline(doc, MARGIN, y, PAGE_W - MARGIN);
  y += 0.45;

  // Capabilities — 2 column grid
  eyebrow(doc, 'Core Capabilities', MARGIN, y);
  y += 0.4;

  const colW = (PAGE_W - MARGIN * 2 - 0.4) / 2;
  const col1X = MARGIN;
  const col2X = MARGIN + colW + 0.4;
  let leftY = y;
  let rightY = y;

  leftY = bullet(doc, 'Microsoft 365 Native', 'Built on SharePoint, PowerApps, and Teams. No bolt-ons, no proprietary silos. Works inside the tools your teams already use.', col1X, leftY, colW);
  leftY = bullet(doc, 'Bluebeam Connectivity', 'Direct integration with Bluebeam Studio for markups, RFIs, and submittals. Field-to-office in a single workflow.', col1X, leftY, colW);
  leftY = bullet(doc, 'Field Dashboards & Portals', 'Site-specific dashboards for superintendents, foremen, and program leads. Real-time visibility on what is happening today.', col1X, leftY, colW);

  rightY = bullet(doc, 'Modular Deployment', 'Pick the modules your program needs: daily reports, inspections, punch lists, safety observations. Pay for what you deploy.', col2X, rightY, colW);
  rightY = bullet(doc, 'PowerApps-Extensible', 'Customize without rebuilding. Your IT team can extend the platform using standard Microsoft tooling.', col2X, rightY, colW);
  rightY = bullet(doc, 'Audit-Grade Documentation', 'Every action logged. Every approval tracked. Built for regulated environments where documentation is evidence.', col2X, rightY, colW);

  // Footer band
  doc.setFillColor(255, 255, 255);
  doc.rect(0, PAGE_H - 0.7, PAGE_W, 0.7, 'F');
  hairline(doc, 0, PAGE_H - 0.7, PAGE_W, GOLD, 0.015);

  eyebrow(doc, 'Fuzion Consulting Group' + SEP + 'The Works Suite', MARGIN, PAGE_H - 0.32, NAVY, 7.5);
  eyebrowRight(doc, 'Page 1 of 2' + SEP + 'Product Brief' + SEP + '2026', PAGE_W - MARGIN, PAGE_H - 0.32, MUTED, 7.5);
}

// ─── PAGE 2 ──────────────────────────────────────────────────────────────────
function renderPage2(doc) {
  fillBg(doc, CREAM);

  // Header strip
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, PAGE_W, 0.55, 'F');
  eyebrow(doc, 'Fuzion365 Fieldworks' + SEP + 'Product Brief', MARGIN, 0.35, GOLD, 8);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text('theworkssuite.com', PAGE_W - MARGIN, 0.35, { align: 'right' });

  let y = 1.15;

  // Integration depth
  eyebrow(doc, 'Integration Depth', MARGIN, y);
  y += 0.35;
  heading(doc, 'Built to connect with the systems', MARGIN, y, 22);
  y += 0.4;
  heading(doc, 'enterprise programs already run on.', MARGIN, y, 22);
  y += 0.4;

  // Integration grid — 4 cols x 2 rows
  const integrations = [
    { name: 'Microsoft 365', tag: 'Native' },
    { name: 'SharePoint', tag: 'Native' },
    { name: 'PowerApps', tag: 'Native' },
    { name: 'Bluebeam', tag: 'Direct' },
    { name: 'Teams', tag: 'Native' },
    { name: 'AWS', tag: 'Infrastructure' },
    { name: 'Azure', tag: 'Infrastructure' },
    { name: 'REST API', tag: 'Open' },
  ];

  const gridW = PAGE_W - MARGIN * 2;
  const cellW = gridW / 4;
  const cellH = 0.75;
  integrations.forEach((it, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = MARGIN + col * cellW;
    const cy = y + row * cellH;
    doc.setDrawColor(...RULE);
    doc.setLineWidth(0.005);
    doc.rect(x, cy, cellW, cellH);
    doc.setFont('times', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(...NAVY);
    doc.text(it.name, x + cellW / 2, cy + 0.36, { align: 'center' });
    // Use the centered eyebrow helper (NO charSpace) so it stays inside the cell
    eyebrowCenter(doc, it.tag, x + cellW / 2, cy + 0.58, GOLD, 7);
  });
  y += cellH * 2 + 0.5;

  // Deployment & Built For — two columns
  const colW = (PAGE_W - MARGIN * 2 - 0.4) / 2;
  const col1X = MARGIN;
  const col2X = MARGIN + colW + 0.4;

  eyebrow(doc, 'Deployment', col1X, y);
  eyebrow(doc, 'Built For', col2X, y);
  y += 0.18;

  goldRule(doc, col1X, y, 0.5, 0.02);
  goldRule(doc, col2X, y, 0.5, 0.02);
  y += 0.28;

  let lY = y;
  let rY = y;

  const deployItems = [
    { name: 'SaaS', desc: 'Hosted by Fuzion in our secure Microsoft tenant. Fastest path to production.' },
    { name: 'Private Tenant', desc: 'Deployed in your Microsoft 365 tenant. Your data, your perimeter, your IT governance.' },
    { name: 'Hybrid Integration', desc: 'Federated with SAP, Oracle, Maximo, and existing program systems.' },
  ];
  deployItems.forEach((d) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...NAVY);
    doc.text(d.name, col1X, lY);
    lY = body(doc, d.desc, col1X, lY + 0.2, colW, 9, TEXT, 1.4) + 0.15;
  });

  const industries = ['EPC & Heavy Construction', 'Energy, Gas & Oil', 'Transmission & Distribution', 'Water & Waste Water', 'Infrastructure & Civil', 'Commercial Construction', 'Public Sector & Tribal'];
  industries.forEach((ind) => {
    doc.setFillColor(...GOLD);
    doc.rect(col2X, rY - 0.09, 0.05, 0.05, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...NAVY);
    doc.text(ind, col2X + 0.18, rY);
    rY += 0.3;
  });

  y = Math.max(lY, rY) + 0.25;

  // Built by credibility block
  const blockH = 1.55;
  doc.setFillColor(...NAVY);
  doc.rect(MARGIN, y, PAGE_W - MARGIN * 2, blockH, 'F');
  doc.setFillColor(...GOLD);
  doc.rect(MARGIN, y, 0.08, blockH, 'F');

  eyebrow(doc, 'Built By', MARGIN + 0.35, y + 0.35, GOLD, 8);

  doc.setFont('times', 'italic');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  const quote = '"35+ years inside large-scale capital programs. We built this for how the work actually gets done, not how software vendors imagine it does."';
  const quoteLines = doc.splitTextToSize(quote, PAGE_W - MARGIN * 2 - 0.7);
  doc.text(quoteLines, MARGIN + 0.35, y + 0.72, { lineHeightFactor: 1.35 });

  eyebrow(doc, 'Fuzion Consulting Group' + SEP + 'Est. 2019', MARGIN + 0.35, y + blockH - 0.22, GOLD, 7.5);

  y += blockH + 0.4;

  // Next steps / contact
  eyebrow(doc, 'Next Steps', MARGIN, y);
  y += 0.35;
  heading(doc, 'Schedule a 30-minute walkthrough.', MARGIN, y, 16);
  y += 0.3;
  body(doc, 'Bring your program lead. We will show you Fieldworks running against real data, and discuss how it fits your tenant, your team, and your timeline.', MARGIN, y, PAGE_W - MARGIN * 2, 10, TEXT, 1.45);

  // Footer
  doc.setFillColor(...NAVY);
  doc.rect(0, PAGE_H - 0.55, PAGE_W, 0.55, 'F');
  eyebrow(doc, 'FuzionConsultingGroup.com' + SEP + 'The Works Suite', MARGIN, PAGE_H - 0.22, GOLD, 7.5);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('Page 2 of 2' + SEP + 'Copyright Fuzion Consulting Group 2026', PAGE_W - MARGIN, PAGE_H - 0.22, { align: 'right' });
}

// ─── RATE LIMIT ──────────────────────────────────────────────────────────────
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

// ─── HANDLER ─────────────────────────────────────────────────────────────────
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

    const doc = new jsPDF({ unit: 'in', format: [PAGE_W, PAGE_H], orientation: 'portrait' });

    renderPage1(doc);
    doc.addPage();
    renderPage2(doc);

    const pdfBytes = doc.output('arraybuffer');

    return new Response(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Fuzion365-Fieldworks-Brief.pdf"',
      },
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});