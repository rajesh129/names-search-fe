/// <reference lib="webworker" />
import * as XLSX from "xlsx";

self.onmessage = (e: MessageEvent) => {
  const { fileBuffer } = e.data;
  try {
    // Read workbook
    const workbook = XLSX.read(fileBuffer, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON
    const json = XLSX.utils.sheet_to_json<Record<string, any>>(worksheet, {
      defval: "",
    });

    // Map columns: Names -> French names, Tamil -> Tamil names, English -> English names, Meaning -> Meaning
    const mapped = json.map((row) => ({
      french: row["Names"] || "",
      tamil: row["Tamil"] || "",
      english: row["English"] || "",
      meaning: row["Meaning"] || "",
    }));

    self.postMessage({ success: true, data: mapped });
  } catch (error: any) {
    self.postMessage({ success: false, error: error.message });
  }
};
