import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import { jsPDF } from 'npm:jspdf@2.5.1';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const doc = new jsPDF({ unit: 'pt', format: 'letter' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const marginX = 56;
    const contentWidth = pageWidth - marginX * 2;
    let y = 0;

    const NAVY = [10, 22, 40];
    const GOLD = [200, 146, 42];
    const GRAY = [107, 114, 128];
    const DARK = [30, 30, 30];
    const BORDER = [220, 220, 220];

    // ── Helpers ──────────────────────────────────────────────
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
      doc.setTextColor(200, 146, 42);
      doc.text('FUZION COMPANIES  ·  fcghelps.com Visual Refresh Brief', marginX, 22);
      doc.setTextColor(255, 255, 255);
      doc.text('CONFIDENTIAL', pageWidth - marginX, 22, { align: 'right' });
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
      doc.text('Prepared May 2026', marginX, fy);
    };

    const sectionTitle = (eyebrow, title) => {
      ensureSpace(70);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...GOLD);
      doc.text(eyebrow.toUpperCase(), marginX, y, { charSpace: 1.5 });
      y += 14;
      doc.setFont('times', 'normal');
      doc.setFontSize(22);
      doc.setTextColor(...NAVY);
      const lines = doc.splitTextToSize(title, contentWidth);
      doc.text(lines, marginX, y);
      y += lines.length * 24 + 6;
      doc.setDrawColor(...GOLD);
      doc.setLineWidth(1.5);
      doc.line(marginX, y, marginX + 40, y);
      y += 18;
    };

    const subheading = (text) => {
      ensureSpace(36);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...NAVY);
      doc.text(text, marginX, y);
      y += 16;
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
        ensureSpace(lineHeight + 4);
        x = marginX;
        rows[r].forEach((cell, i) => {
          doc.setFont('helvetica', i === 0 ? 'bold' : 'normal');
          doc.setFontSize(9);
          doc.setTextColor(i === 0 ? NAVY[0] : DARK[0], i === 0 ? NAVY[1] : DARK[1], i === 0 ? NAVY[2] : DARK[2]);
          const cellLines = doc.splitTextToSize(String(cell), colWidths[i] - 8);
          doc.text(cellLines, x, y);
          x += colWidths[i];
        });
        y += lineHeight;
        doc.setDrawColor(...BORDER);
        doc.setLineWidth(0.3);
        doc.line(marginX, y - 4, marginX + contentWidth, y - 4);
      }
      y += 10;
    };

    const swatchRow = (swatches) => {
      ensureSpace(70);
      const sw = (contentWidth - (swatches.length - 1) * 8) / swatches.length;
      let x = marginX;
      swatches.forEach((s) => {
        doc.setFillColor(...s.rgb);
        doc.rect(x, y, sw, 40, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(...DARK);
        doc.text(s.name, x, y + 52);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(...GRAY);
        doc.text(s.hex, x, y + 63);
        x += sw + 8;
      });
      y += 80;
    };

    const dividerLine = () => {
      ensureSpace(18);
      doc.setDrawColor(...BORDER);
      doc.setLineWidth(0.3);
      doc.line(marginX, y, marginX + contentWidth, y);
      y += 14;
    };

    // ── COVER PAGE ───────────────────────────────────────────
    doc.setFillColor(...NAVY);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    doc.setFillColor(...GOLD);
    doc.rect(marginX, 100, 40, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...GOLD);
    doc.text('FUZION COMPANIES  ·  BRAND ARCHITECTURE', marginX, 120, { charSpace: 2 });

    doc.setFont('times', 'normal');
    doc.setFontSize(42);
    doc.setTextColor(255, 255, 255);
    doc.text('fcghelps.com', marginX, 200);
    doc.setFont('times', 'italic');
    doc.setTextColor(...GOLD);
    doc.text('Visual Refresh Brief.', marginX, 248);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    const intro = doc.splitTextToSize(
      'A complete styling specification for unifying Fuzion Consulting Group with the Fuzion Companies parent brand — without rebuilding the site. Apply the system to what already works.',
      contentWidth - 40
    );
    doc.text(intro, marginX, 290);

    doc.setFillColor(...GOLD);
    doc.rect(marginX, pageHeight - 180, 2, 60, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...GOLD);
    doc.text('PREPARED FOR', marginX + 14, pageHeight - 165, { charSpace: 1.5 });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text('Fuzion Consulting Group Development Team', marginX + 14, pageHeight - 150);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...GOLD);
    doc.text('SCOPE', marginX + 14, pageHeight - 130, { charSpace: 1.5 });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text('Visual styling refresh only · No content or structural changes', marginX + 14, pageHeight - 115);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...GOLD);
    doc.text('TIMELINE', marginX + 14, pageHeight - 95, { charSpace: 1.5 });
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text('Approximately 1 week of focused work', marginX + 14, pageHeight - 80);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(...GOLD);
    doc.text('A FUZION COMPANY', marginX, pageHeight - 40, { charSpace: 2 });
    doc.setTextColor(255, 255, 255);
    doc.text('Prepared May 2026', pageWidth - marginX, pageHeight - 40, { align: 'right' });

    // ── PAGE 2: OBJECTIVE ───────────────────────────────────
    doc.addPage();
    addHeader();
    sectionTitle('01 · The Objective', 'Apply the new system to what already works.');
    paragraph(
      'Apply a unified visual system to fcghelps.com to align it with the Fuzion Companies parent brand. This is a visual refresh only — no changes to content, structure, navigation, page hierarchy, forms, or functionality. The existing site works. This brief upgrades how it feels, not how it operates.',
      { fontSize: 11 }
    );
    y += 8;

    subheading('Why a refresh, not a rebuild');
    bullet('Zero risk to the live revenue-generating site.');
    bullet('No platform migration, no SEO loss, no DNS swap, no analytics reset.');
    bullet('All existing photos, forms, and integrations remain untouched.');
    bullet('Achieves full brand cohesion across the Fuzion Companies portfolio.');
    bullet('Delivered in approximately one week of focused styling work.');

    // ── PAGE: DESIGN SYSTEM — COLOR ─────────────────────────
    doc.addPage();
    addHeader();
    sectionTitle('02 · The Color System', 'Cream. Navy. Gold.');
    paragraph(
      'The system shifts from pure white to a warmer cream foundation. Deep navy anchors hierarchy. Gold provides accent — used sparingly, never decoratively.'
    );
    swatchRow([
      { name: 'Cream', hex: '#FAF8F4', rgb: [250, 248, 244] },
      { name: 'Deep Navy', hex: '#0A1628', rgb: NAVY },
      { name: 'Navy 2', hex: '#0D1F3C', rgb: [13, 31, 60] },
      { name: 'Gold', hex: '#C8922A', rgb: GOLD },
    ]);

    keyValueTable(
      [
        ['Token', 'Hex', 'Usage'],
        ['Cream (background)', '#FAF8F4', 'Replace pure white on all page backgrounds'],
        ['Deep Navy (primary)', '#0A1628', 'Headlines, primary buttons, footer band'],
        ['Navy 2 (gradient end)', '#0D1F3C', 'Footer gradient end-stop'],
        ['Gold (accent)', '#C8922A', 'Eyebrows, accent lines, sub-mark, dividers'],
        ['Gray (body text)', '#6B7280', 'Body paragraphs'],
        ['Border gray', '#E5E7EB', 'Card borders, dividers'],
      ],
      [140, 90, contentWidth - 230]
    );

    // ── PAGE: TYPOGRAPHY ────────────────────────────────────
    doc.addPage();
    addHeader();
    sectionTitle('03 · Typography', 'Editorial serif. Modern sans.');
    paragraph(
      'Headlines shift to Cormorant Garamond — a classical serif that brings editorial weight without feeling dated. Body remains in a clean modern sans. Eyebrow labels in gold uppercase letter-spacing tie the system together across every page.'
    );

    keyValueTable(
      [
        ['Element', 'Font', 'Spec'],
        ['Headlines (H1, H2, H3)', 'Cormorant Garamond', 'Weight 500. Serif. Tight line-height ~1.1.'],
        ['Eyebrows', 'DM Sans', '10px, uppercase, letter-spacing 0.3em, gold #C8922A.'],
        ['Body text', 'DM Sans', '15px, weight 300–400, gray #6B7280.'],
        ['Buttons / Labels', 'DM Sans', '11px, weight 700, uppercase, letter-spacing 0.2em.'],
        ['Stat numerals', 'Cormorant Garamond', 'Large serif numerals for impact (422+, 6 Weeks).'],
      ],
      [130, 130, contentWidth - 260]
    );

    subheading('Google Fonts import');
    doc.setFillColor(245, 245, 240);
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

    // ── PAGE: FIVE CHANGES ──────────────────────────────────
    doc.addPage();
    addHeader();
    sectionTitle('04 · The Five Changes', 'Apply site-wide. That is the whole job.');

    const changes = [
      { n: '01', title: 'Background → Cream', body: 'Change all page backgrounds from #FFFFFF to #FAF8F4. Cards may stay cream with subtle borders, or use #FFFFFF with thin gray borders for contrast.' },
      { n: '02', title: 'Headlines → Cormorant Garamond Serif', body: 'All H1, H2, H3 change from current sans-serif to Cormorant Garamond, weight 500. Body remains in current sans. Increase headline size slightly; tighten line-height to ~1.1.' },
      { n: '03', title: 'Add Gold Accent Eyebrows', body: 'Above every section heading, add a tiny gold uppercase eyebrow label: 10px, weight 600, letter-spacing 0.3em, color #C8922A. Examples: CONSULTING SERVICES, CAPABILITIES, PROJECT EXPERIENCE, FUZION VALUES.' },
      { n: '04', title: 'Dark Navy Footer Band', body: 'Replace the current footer with: linear-gradient(160deg, #0A1628 0%, #0D1F3C 100%). Footer text white at 60–70% opacity. Add a thin gold horizontal line (1–2px) as the top accent of the footer.' },
      { n: '05', title: '"A Fuzion Company" Sub-Mark', body: 'Add a small sub-mark badge at the bottom of every page (just above the footer): 11px, uppercase, letter-spacing 0.25em, gold #C8922A, with thin gold rules on either side. Link to fuzioncompanies.com.' },
    ];

    changes.forEach((c) => {
      ensureSpace(70);
      doc.setFont('times', 'italic');
      doc.setFontSize(28);
      doc.setTextColor(...GOLD);
      doc.text(c.n, marginX, y + 6);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(...NAVY);
      doc.text(c.title, marginX + 50, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(...DARK);
      const lines = doc.splitTextToSize(c.body, contentWidth - 50);
      doc.text(lines, marginX + 50, y + 16);
      y += Math.max(60, lines.length * 13 + 24);
      dividerLine();
    });

    // ── PAGE: BUTTONS & LAYOUT ─────────────────────────────
    doc.addPage();
    addHeader();
    sectionTitle('05 · Buttons & Layout', 'Sharp. Editorial. Spacious.');

    subheading('Button system');
    keyValueTable(
      [
        ['Variant', 'Background', 'Treatment'],
        ['Primary', '#0A1628 Navy', 'White text, 11px bold uppercase, letter-spaced 0.2em.'],
        ['Secondary', 'Transparent', '1px navy border, navy text, same typography.'],
        ['Gold CTA', '#C8922A Gold', 'White text. Use sparingly — only highest-priority actions.'],
      ],
      [90, 130, contentWidth - 220]
    );

    paragraph('All buttons: sharp corners (border-radius 0–4px max). Padding 14px 32px. Hover: subtle 2px translate-Y lift and 10% opacity reduction. No rounded pill buttons.');

    y += 4;
    subheading('Layout rules');
    bullet('Section vertical padding: ~128px top and bottom (py-32 equivalent) for editorial spacing.');
    bullet('Card padding: 32px minimum.');
    bullet('Card borders: 1px solid #E5E7EB.');
    bullet('Card hover: subtle shadow lift only — no dramatic transforms.');
    bullet('Keep all existing photos. They work with the new palette without modification.');

    // ── PAGE: PAGES TO APPLY ───────────────────────────────
    doc.addPage();
    addHeader();
    sectionTitle('06 · Pages To Apply', 'Restyle every page. Touch no content.');

    const pages = [
      ['Home', 'Hero, capabilities carousel, contact form.'],
      ['Capabilities', 'Preserve both sections (Business Consulting + Technology Consulting). Restyle card grid.'],
      ['Industries', 'Same content. Restyle hero and card grid.'],
      ['Projects', 'Featured project cards. Stats row in Cormorant Garamond serif numerals (422+, 6 Weeks).'],
      ['Project Detail Pages', 'EPMS, 3P App, ARL, ESL, GDMP, PMB, etc. Restyle headers and Key Challenges / Delivered sections.'],
      ['Company', 'Restyle About content.'],
      ['Principal Advisors', 'Restyle bio cards and modal pop-outs.'],
      ['Social Responsibility', 'Numbered values 01–06 in elegant serif gold.'],
      ['News / Announcements', 'Apply card restyle. Preserve order.'],
      ['Careers', 'Restyle job listing cards.'],
      ['Contact', 'Restyle form (cream background, navy submit button).'],
    ];

    keyValueTable(
      [['Page', 'Treatment'], ...pages],
      [150, contentWidth - 150]
    );

    // ── PAGE: DO NOT CHANGE ────────────────────────────────
    doc.addPage();
    addHeader();
    sectionTitle('07 · Do Not Change', 'The guardrails. Visual only.');
    paragraph('This is a styling refresh, not a rebuild. The following must remain identical to the current production site:', { fontSize: 11, color: DARK });

    const restrictions = [
      'Page content and copy',
      'Page structure and section order',
      'Navigation menu items and routes',
      'URLs and routing',
      'Forms and form functionality',
      'Photos and images (keep current Unsplash and custom photos)',
      'Logo (may update later — see closing note)',
      'Analytics, tracking, third-party integrations',
    ];
    restrictions.forEach((r) => bullet(r));

    // ── PAGE: TIMELINE & COST ──────────────────────────────
    doc.addPage();
    addHeader();
    sectionTitle('08 · Timeline & Cost', 'One week. CSS-level work.');

    keyValueTable(
      [
        ['Day', 'Work'],
        ['Day 1–2', 'Global CSS variables, fonts, button system, footer band, sub-mark component.'],
        ['Day 3–4', 'Apply to all top-level pages (Home, Capabilities, Industries, Projects, Company, Social Responsibility, Careers, Contact).'],
        ['Day 5', 'Apply to all project detail pages and Principal Advisors modals.'],
        ['Day 6', 'Polish, responsive testing, QA.'],
        ['Day 7', 'Final review and push to production.'],
      ],
      [70, contentWidth - 70]
    );

    subheading('Cost expectation');
    paragraph(
      'This is component-level CSS work, not a rebuild. Expect this to cost a small fraction of a full site rebuild. If pricing quoted approaches rebuild-tier, seek a second opinion — the brief above defines a clear, scoped, one-week engagement.',
      { color: DARK }
    );

    // ── PAGE: REFERENCE MOCKUPS ────────────────────────────
    doc.addPage();
    addHeader();
    sectionTitle('09 · Reference Mockups', 'Visual targets for the developer.');
    paragraph('Four high-fidelity reference mockups demonstrating the system applied across the most important page types. Share these alongside this brief.');
    y += 4;

    const mockups = [
      ['Homepage', 'https://media.base44.com/images/public/6a02527a727fcfaa45765426/44f7474c2_generated_image.png'],
      ['Capabilities', 'https://media.base44.com/images/public/6a02527a727fcfaa45765426/48d2ffc49_generated_image.png'],
      ['Projects', 'https://media.base44.com/images/public/6a02527a727fcfaa45765426/60feb336d_generated_image.png'],
      ['Social Responsibility', 'https://media.base44.com/images/public/6a02527a727fcfaa45765426/8d7dbff49_generated_image.png'],
    ];

    mockups.forEach(([label, url]) => {
      ensureSpace(36);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...NAVY);
      doc.text(label, marginX, y);
      y += 12;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...GOLD);
      doc.textWithLink(url, marginX, y, { url });
      y += 18;
      dividerLine();
    });

    // ── CLOSING ────────────────────────────────────────────
    doc.addPage();
    addHeader();
    sectionTitle('10 · Closing Note', 'The logo question.');
    paragraph(
      'The logo may be updated separately. Build the system referencing a single replaceable logo asset so that swapping marks is a one-file change, not a site-wide hunt. The current FCG logo stays for launch — the brand architecture exercise (FCG as "A Fuzion Company") is the priority.',
      { fontSize: 11, color: DARK }
    );

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
    doc.text('— FUZION COMPANIES BRAND ARCHITECTURE', marginX, y, { charSpace: 1.5 });

    addFooter();

    const pdfBytes = doc.output('arraybuffer');
    return new Response(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Fuzion_FCG_Visual_Refresh_Brief.pdf"',
      },
    });
  } catch (error) {
    return Response.json({ error: error.message, stack: error.stack }, { status: 500 });
  }
});