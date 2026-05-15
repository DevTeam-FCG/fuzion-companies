import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { generateBriefPDF } from "@/functions/generateBriefPDF";

export default function BriefDownloadButton() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await generateBriefPDF({}, { responseType: "blob" });
      const blob = response.data instanceof Blob ? response.data : new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Fuzion_FCG_Visual_Refresh_Brief.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error("PDF download failed", e);
      alert("Could not generate the PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleDownload}
        disabled={loading}
        className="flex items-center gap-3 px-5 py-3 text-[11px] font-bold tracking-[0.2em] uppercase text-white shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70"
        style={{ background: "#0a1628", borderLeft: "3px solid #C8922A" }}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Generating…
          </>
        ) : (
          <>
            <Download className="w-4 h-4" style={{ color: "#C8922A" }} />
            Download FCG Brief PDF
          </>
        )}
      </button>
    </div>
  );
}