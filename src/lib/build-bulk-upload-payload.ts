// buildBulkPayload.ts
import { UploadedRow, BulkPayload, BulkRow, Meaning } from "../types/bulk-upload";

type Lang = "en" | "ta" | "fr";
type Variant = { lang: Lang; value: string };

const toVariant = (lang: Lang) => (v: string): Variant => ({
  lang,
  value: clamp(v, 100),
});

/** Split a comma/newline separated string into clean, unique parts. */
function splitAndClean(input?: string): string[] {
  if (!input) return [];
  return Array.from(
    new Set(
      input
        .split(/[,\n/]+/g)
        .map(s => s.trim())
        .filter(Boolean)
    )
  );
}

/** Normalize string spacing and punctuation. */
function normalizeValue(s: string): string {
  return s.replace(/\s+/g, " ").replace(/[.,]\s*$/g, "").trim();
}

/** Clamp to API length constraints (variants ≤ 100 chars, meanings ≤ 1000). */
function clamp(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) : str;
}

/** Transform a single FE row into a BulkRow. */
function transformRow(fe: UploadedRow): BulkRow | null {
  const frList = splitAndClean(fe.french).map(normalizeValue);
  const taList = splitAndClean(fe.tamil).map(normalizeValue);
  const enList = splitAndClean(fe.english).map(normalizeValue);

  const variants: Variant[] = [
    ...enList.map(toVariant("en")),
    ...taList.map(toVariant("ta")),
    ...frList.map(toVariant("fr")),
    ];

  // Deduplicate identical {lang,value} pairs
  const uniqVariants = Array.from(
    new Map(variants.map(v => [`${v.lang}::${v.value}`, v])).values()
  );

  if (uniqVariants.length === 0) {
    return null; // skip rows with no variants
  }

  const meanings: Meaning[] | undefined = fe.meaning && fe.meaning.trim()
    ? [{ lang: "en", value: clamp(normalizeValue(fe.meaning), 1000) }]
    : undefined;

  return {
    variants: uniqVariants,
    ...(meanings ? { meanings } : {})
  };
}

/** Convert FE rows into the minimal bulk payload. */
export function buildBulkPayload(feRows: UploadedRow[]): BulkPayload {
  const rows = feRows
    .map(transformRow)
    .filter((r): r is NonNullable<typeof r> => !!r);

  return { rows };
}
