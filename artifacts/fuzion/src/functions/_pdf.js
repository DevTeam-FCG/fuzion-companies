// Thin client that requests a generated PDF from the API server and returns it
// as a Blob in an axios-like shape ({ data }) to match the original consumers.
export async function fetchPdf(name) {
  const res = await fetch(`/api/functions/${name}`, { method: "POST" });
  if (!res.ok) {
    throw new Error(`Failed to generate ${name} (${res.status})`);
  }
  const data = await res.blob();
  return { data };
}
