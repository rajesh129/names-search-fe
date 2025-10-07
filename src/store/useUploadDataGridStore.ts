// store/useDataGridStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UploadedRow } from "../types/bulk-upload";

interface DataGridState {
  rows: UploadedRow[];
  selectedRows: UploadedRow[];
  setRows: (rows: UploadedRow[]) => void;
  setSelectedRows: (selectedRows: UploadedRow[]) => void;
  clearSelection: () => void;
}

export const useUploadDataGridStore = create<DataGridState>()(
  persist(
    (set) => ({
      rows: [],
      selectedRows: [],
      setRows: (rows) => set({ rows }),
      setSelectedRows: (selectedRows) => set({ selectedRows }),
      clearSelection: () => set({ selectedRows: [] }),
    }),
    {
      name: "upload-datagrid-storage", // key in localStorage
    }
  )
);
