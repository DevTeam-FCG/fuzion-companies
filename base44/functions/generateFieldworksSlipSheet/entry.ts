import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import { jsPDF } from 'npm:jspdf@4.0.0';

// ─── BRAND TOKENS ────────────────────────────────────────────────────────────
const NAVY = [10, 22, 40];
const NAVY2 = [13, 31, 60];
const GOLD = [200, 146, 42];
const GOLD_SOFT = [232, 212, 170];
const CREAM = [250, 248, 244];
const TEXT = [60, 60, 65];
const MUTED = [120, 120, 128];
const RULE = [220, 218, 210];
const GREEN = [26, 138, 110];

const PAGE_W = 8.5;
const PAGE_H = 11;
const MARGIN = 0.6;

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

function eyebrow(doc, text, x, y, color = GOLD) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...color);
  doc.setCharSpace(0.04);
  doc.text(text.toUpperCase(), x, y);
  doc.setCharSpace(0);
}

function heading(doc, text, x, y, size = 28, color = NAVY) {
  doc.setFont('times', 'normal');
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

function label(doc, text, x, y, color = MUTED) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...color);
  doc.setCharSpace(0.05);
  doc.text(text.toUpperCase(), x, y);
  doc.setCharSpace(0);
}

function goldRule(doc, x, y, w = 0.5) {
  doc.setFillColor(...GOLD);
  doc.rect(x, y, w, 0.025, 'F');
}

function statusPill(doc, text, x, y, bg = GREEN) {
  doc.setFillColor(...bg);
  const w = 0.85;
  const h = 0.22;
  doc.rect(x, y - h + 0.05, w, h, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.setCharSpace(0.06);
  doc.text(text.toUpperCase(), x + w / 2, y - 0.04, { align: 'center' });
  doc.setCharSpace(0);
}

function bullet(doc, title, desc, x, y, maxWidth) {
  doc.setFillColor(...GOLD);
  doc.rect(x, y - 0.08, 0.04, 0.04, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...NAVY);
  doc.text(title, x + 0.16, y);
  let nextY = y + 0.16;
  if (desc) {
    nextY = body(doc, desc, x + 0.16, nextY, maxWidth - 0.16, 9, TEXT, 1.4);
  }
  return nextY + 0.12;
}

// ─── PAGE 1 ──────────────────────────────────────────────────────────────────
function renderPage1(doc) {
  // Navy hero block (top third)
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, PAGE_W, 4.2, 'F');

  // Subtle gold corner accent
  doc.setFillColor(...GOLD);
  doc.rect(0, 0, 0.35, 4.2, 'F');

  // Top eyebrow row
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...GOLD);
  doc.setCharSpace(0.18);
  doc.text('THE WORKS SUITE  ·  BY FUZION CONSULTING GROUP', MARGIN + 0.2, 0.75);
  doc.setCharSpace(0);

  // Product name
  doc.setFont('times', 'normal');
  doc.setFontSize(38);
  doc.setTextColor(255, 255, 255);
  doc.text('Fuzion365', MARGIN + 0.2, 1.85);
  doc.setFont('times', 'italic');
  doc.setTextColor(...GOLD);
  doc.text('Fieldworks', MARGIN + 0.2, 2.45);

  // Tagline
  doc.setFont('times', 'normal');
  doc.setFontSize(15);
  doc.setTextColor(255, 255, 255);
  doc.text('M365-integrated field management.', MARGIN + 0.2, 3.0);

  // Status + category row
  statusPill(doc, 'Live · Available Now', MARGIN + 0.2, 3.65);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.setCharSpace(0.12);
  doc.text('FIELD PRODUCTIVITY  ·  ENTERPRISE READY', MARGIN + 1.25, 3.62);
  doc.setCharSpace(0);

  // ─── BODY ──────────────────────────────────────────────────────────────────
  let y = 4.7;

  // Positioning paragraph
  goldRule(doc, MARGIN, y - 0.15);
  eyebrow(doc, 'What it is', MARGIN, y);
  y += 0.25;
  y = body(
    doc,
    'A field productivity platform built natively on Microsoft 365 — bringing site portals, dashboards, and Bluebeam-connected workflows into one place. Designed by people who have spent 35+ years inside large-scale construction, engineering, and utility programs.',
    MARGIN,
    y,
    PAGE_W - MARGIN * 2,
    10.5,
    TEXT,
    1.5
  );

  y += 0.35;
  hairline(doc, MARGIN, y, PAGE_W - MARGIN);
  y += 0.4;

  // Capabilities — 2 column grid
  eyebrow(doc, 'Core Capabilities', MARGIN, y);
  y += 0.35;

  const colW = (PAGE_W - MARGIN * 2 - 0.4) / 2;
  const col1X = MARGIN;
  const col2X = MARGIN + colW + 0.4;
  let leftY = y;
  let rightY = y;

  leftY = bullet(doc, 'Microsoft 365 Native', 'Built on SharePoint, PowerApps, and Teams. No bolt-ons, no proprietary silos — works inside the tools your teams already use.', col1X, leftY, colW);
  leftY = bullet(doc, 'Bluebeam Connectivity', 'Direct integration with Bluebeam Studio for markups, RFIs, and submittals. Field-to-office in a single workflow.', col1X, leftY, colW);
  leftY = bullet(doc, 'Field Dashboards & Portals', 'Site-specific dashboards for superintendents, foremen, and program leads. Real-time visibility on what is happening today.', col1X, leftY, colW);

  rightY = bullet(doc, 'Modular Module Deployment', 'Pick the modules your program needs — daily reports, inspections, punch lists, safety observations. Pay for what you deploy.', col2X, rightY, colW);
  rightY = bullet(doc, 'PowerApps-Extensible', 'Customize without rebuilding. Your IT team can extend the platform using standard Microsoft tooling.', col2X, rightY, colW);
  rightY = bullet(doc, 'Audit-Grade Documentation', 'Every action logged. Every approval tracked. Built for regulated environments where documentation is evidence.', col2X, rightY, colW);

  y = Math.max(leftY, rightY) + 0.2;

  // Footer band
  doc.setFillColor(...CREAM);
  doc.rect(0, PAGE_H - 0.8, PAGE_W, 0.8, 'F');
  hairline(doc, 0, PAGE_H - 0.8, PAGE_W, GOLD, 0.015);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...NAVY);
  doc.setCharSpace(0.15);
  doc.text('FUZION CONSULTING GROUP  ·  THE WORKS SUITE', MARGIN, PAGE_H - 0.4);
  doc.setCharSpace(0);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(...MUTED);
  doc.text('Page 1 of 2  ·  Product Brief  ·  2026', PAGE_W - MARGIN, PAGE_H - 0.4, { align: 'right' });
}

// ─── PAGE 2 ──────────────────────────────────────────────────────────────────
function renderPage2(doc) {
  fillBg(doc, CREAM);

  // Header strip
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, PAGE_W, 0.55, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...GOLD);
  doc.setCharSpace(0.18);
  doc.text('FUZION365 FIELDWORKS  ·  PRODUCT BRIEF', MARGIN, 0.35);
  doc.setCharSpace(0);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(255, 255, 255);
  doc.text('theworkssuite.com', PAGE_W - MARGIN, 0.35, { align: 'right' });

  let y = 1.1;

  // Integration depth
  eyebrow(doc, 'Integration Depth', MARGIN, y);
  y += 0.2;
  heading(doc, 'Built to connect with the systems', MARGIN, y + 0.25, 22);
  heading(doc, 'enterprise programs already run on.', MARGIN, y + 0.62, 22);
  y += 1.05;

  // Integration grid — 4 cols x 2 rows
  const integrations = [
    { name: 'Microsoft 365', tag: 'Native' },
    { name: 'SharePoint', tag: 'Native' },
    { name: 'PowerApps', tag: 'Native' },
    { name: 'Bluebeam', tag: 'Direct' },
    { name: 'Teams', tag: 'Native' },
    { name: 'AWS', tag: 'Infrastructure' },
    { name: 'Azure', tag: 'Infrastructure' },
    { name: 'REST / API', tag: 'Open' },
  ];

  const gridW = PAGE_W - MARGIN * 2;
  const cellW = gridW / 4;
  const cellH = 0.7;
  integrations.forEach((it, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = MARGIN + col * cellW;
    const cy = y + row * cellH;
    doc.setDrawColor(...RULE);
    doc.setLineWidth(0.005);
    doc.rect(x, cy, cellW, cellH);
    doc.setFont('times', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(...NAVY);
    doc.text(it.name, x + cellW / 2, cy + 0.32, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(...GOLD);
    doc.setCharSpace(0.1);
    doc.text(it.tag.toUpperCase(), x + cellW / 2, cy + 0.52, { align: 'center' });
    doc.setCharSpace(0);
  });
  y += cellH * 2 + 0.5;

  // Deployment & Built For — two columns
  const colW = (PAGE_W - MARGIN * 2 - 0.4) / 2;
  const col1X = MARGIN;
  const col2X = MARGIN + colW + 0.4;

  eyebrow(doc, 'Deployment', col1X, y);
  eyebrow(doc, 'Built For', col2X, y);
  y += 0.3;

  goldRule(doc, col1X, y - 0.05);
  goldRule(doc, col2X, y - 0.05);
  y += 0.2;

  let lY = y;
  let rY = y;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...NAVY);
  doc.text('SaaS', col1X, lY);
  lY = body(doc, 'Hosted by Fuzion in our secure Microsoft tenant. Fastest path to production.', col1X, lY + 0.18, colW, 9, TEXT, 1.4) + 0.1;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...NAVY);
  doc.text('Private Tenant', col1X, lY);
  lY = body(doc, 'Deployed in your Microsoft 365 tenant. Your data, your perimeter, your IT governance.', col1X, lY + 0.18, colW, 9, TEXT, 1.4) + 0.1;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...NAVY);
  doc.text('Hybrid Integration', col1X, lY);
  lY = body(doc, 'Federated with SAP, Oracle, Maximo, and existing program systems.', col1X, lY + 0.18, colW, 9, TEXT, 1.4) + 0.1;

  const industries = ['EPC & Heavy Construction', 'Utilities (Electric / Gas / Water)', 'Energy & Industrial', 'Infrastructure & Civil', 'Commercial Construction', 'Public Sector & Tribal'];
  industries.forEach((ind) => {
    doc.setFillColor(...GOLD);
    doc.rect(col2X, rY - 0.08, 0.04, 0.04, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(...NAVY);
    doc.text(ind, col2X + 0.16, rY);
    rY += 0.26;
  });

  y = Math.max(lY, rY) + 0.3;

  // Built by credibility block
  doc.setFillColor(...NAVY);
  doc.rect(MARGIN, y, PAGE_W - MARGIN * 2, 1.4, 'F');
  doc.setFillColor(...GOLD);
  doc.rect(MARGIN, y, 0.06, 1.4, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...GOLD);
  doc.setCharSpace(0.15);
  doc.text('BUILT BY', MARGIN + 0.3, y + 0.32);
  doc.setCharSpace(0);

  doc.setFont('times', 'italic');
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  const quote = '"35+ years inside large-scale capital programs. We built this for how the work actually gets done — not how software vendors imagine it does."';
  const quoteLines = doc.splitTextToSize(quote, PAGE_W - MARGIN * 2 - 0.6);
  doc.text(quoteLines, MARGIN + 0.3, y + 0.7, { lineHeightFactor: 1.3 });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...GOLD);
  doc.setCharSpace(0.12);
  doc.text('FUZION CONSULTING GROUP  ·  EST. 2019', MARGIN + 0.3, y + 1.22);
  doc.setCharSpace(0);

  y += 1.7;

  // Next steps / contact
  eyebrow(doc, 'Next Steps', MARGIN, y);
  y += 0.3;
  doc.setFont('times', 'normal');
  doc.setFontSize(16);
  doc.setTextColor(...NAVY);
  doc.text('Schedule a 30-minute walkthrough.', MARGIN, y);
  y += 0.3;
  body(doc, 'Bring your program lead. We will show you Fieldworks running against real data — and discuss how it fits your tenant, your team, and your timeline.', MARGIN, y, PAGE_W - MARGIN * 2, 10, TEXT, 1.45);

  // Footer
  doc.setFillColor(...NAVY);
  doc.rect(0, PAGE_H - 0.55, PAGE_W, 0.55, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...GOLD);
  doc.setCharSpace(0.15);
  doc.text('FUZIONCONSULTINGGROUP.COM  ·  THE WORKS SUITE', MARGIN, PAGE_H - 0.22);
  doc.setCharSpace(0);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text('Page 2 of 2  ·  © Fuzion Consulting Group 2026', PAGE_W - MARGIN, PAGE_H - 0.22, { align: 'right' });
}

// ─── HANDLER ─────────────────────────────────────────────────────────────────
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
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