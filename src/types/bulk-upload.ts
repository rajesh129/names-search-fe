// types.ts
export interface UploadedRow {
    id?: number | string;
    french?: string;
    tamil?: string;
    english?: string;
    meaning?: string;
}

export type Variant = { lang: "en" | "ta" | "fr"; value: string };
export type Meaning = { lang: "en" | "ta" | "fr"; value: string };

export type BulkRow = {
  variants: Variant[];
  meanings?: Meaning[];
};

export type BulkPayload = {
  rows: BulkRow[];
};
