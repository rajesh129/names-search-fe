import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Grid2 } from '@mui/material';

export interface DataTableColumn {
  key: string;
  label: string;
}

export interface DataTableProps {
  columns: DataTableColumn[];
  data: Record<string, string>[];
  onRowSelectionModelChange: (newSelection: any, gridRows: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({ columns, data, onRowSelectionModelChange }) => {
  // DataGrid expects columns as GridColDef[] and rows with unique id
  const gridColumns: GridColDef[] = columns.map((col) => ({
    field: col.key,
    headerName: col.label,
    flex: 1,
    minWidth: 120,
  }));

  const gridRows = data.map((row, idx) => ({ id: idx + 1, ...row }));

  return (
    <Grid2 mt={2}>
      <DataGrid
        rows={gridRows}
        columns={gridColumns}
        checkboxSelection
        disableRowSelectionOnClick
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
        onRowSelectionModelChange={(newSelection) => onRowSelectionModelChange(newSelection, gridRows)}

      />
    </Grid2>
  );
};

export default DataTable;
