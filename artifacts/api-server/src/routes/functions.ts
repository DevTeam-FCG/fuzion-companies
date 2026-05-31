import { Router, type IRouter, type Response } from "express";
import { generateBrandBookPDF } from "../lib/pdf/generateBrandBookPDF";
import { generateBrandGuidePDF } from "../lib/pdf/generateBrandGuidePDF";
import { generateBriefPDF } from "../lib/pdf/generateBriefPDF";
import { generateDeveloperHandoffPDF } from "../lib/pdf/generateDeveloperHandoffPDF";
import { generateFieldworksSlipSheet } from "../lib/pdf/generateFieldworksSlipSheet";
import { generateFuzionSitesStyleGuide } from "../lib/pdf/generateFuzionSitesStyleGuide";

const router: IRouter = Router();

const generators: Record<string, { fn: () => Buffer; filename: string }> = {
  generateBrandBookPDF: {
    fn: generateBrandBookPDF,
    filename: "Fuzion_Editorial_System_Brand_Book.pdf",
  },
  generateBrandGuidePDF: {
    fn: generateBrandGuidePDF,
    filename: "Fuzion_Brand_Guide.pdf",
  },
  generateBriefPDF: {
    fn: generateBriefPDF,
    filename: "Fuzion_Brief.pdf",
  },
  generateDeveloperHandoffPDF: {
    fn: generateDeveloperHandoffPDF,
    filename: "Fuzion-Developer-Handoff-Package.pdf",
  },
  generateFieldworksSlipSheet: {
    fn: generateFieldworksSlipSheet,
    filename: "Fuzion365-Fieldworks-Slip-Sheet.pdf",
  },
  generateFuzionSitesStyleGuide: {
    fn: generateFuzionSitesStyleGuide,
    filename: "Fuzion-Sites-Web-Style-Guide.pdf",
  },
};

function sendPdf(res: Response, name: string): void {
  const gen = generators[name];
  if (!gen) {
    res.status(404).json({ error: "Unknown function" });
    return;
  }
  const buf = gen.fn();
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `inline; filename="${gen.filename}"`);
  res.send(buf);
}

router.post("/functions/:name", (req, res): void => {
  const raw = Array.isArray(req.params.name)
    ? req.params.name[0]
    : req.params.name;
  sendPdf(res, raw);
});

router.get("/functions/:name", (req, res): void => {
  const raw = Array.isArray(req.params.name)
    ? req.params.name[0]
    : req.params.name;
  sendPdf(res, raw);
});

export default router;
