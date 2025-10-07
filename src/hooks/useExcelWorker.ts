import { useRef, useEffect } from 'react';

export interface ParsedRow {
  french: string;
  tamil: string;
  english: string;
  meaning: string;
}

export function useExcelWorker(onResult: (data: ParsedRow[]) => void, onError?: (err: string) => void) {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(new URL('../workers/excelParser.worker.ts', import.meta.url), { type: 'module' });
    workerRef.current.onmessage = (e: MessageEvent) => {
      const { success, data, error } = e.data;
      if (success) {
        onResult(data);
      } else if (onError) {
        onError(error);
      }
    };
    return () => {
      workerRef.current?.terminate();
    };
  }, [onResult, onError]);

  const parseFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && e.target.result) {
        workerRef.current?.postMessage({ fileBuffer: e.target.result });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return { parseFile };
}
