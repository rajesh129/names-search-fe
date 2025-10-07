import React, { useState, useCallback } from 'react';
import ExcelUpload from '../../../components/ui/ExcelUpload/ExcelUpload';
import DataTable, { DataTableColumn } from '../../../components/ui/DataTable/DataTable';
import { useExcelWorker, ParsedRow } from '../../../hooks/useExcelWorker';
import { Button, Dialog, DialogContent, DialogTitle, Grid2 } from '@mui/material';
import { useUploadDataGridStore } from '../../../store/useUploadDataGridStore';
import { useTranslation } from 'react-i18next';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import AuthUserForm from '../../../components/forms/AuthUserForm';
import { StyledAuthDialogHeader } from './style';
import { useAuthUserStore } from '../../../store/useAuthStore';
import CodeAuthForm from '../../../components/forms/CodeAuthForm';
import { bulkUploadNames } from '../../../services/bulk-upload-names';
import { healthCheck } from '../../../services/health';
import { buildBulkPayload } from '../../../lib/build-bulk-upload-payload';

const columns: DataTableColumn[] = [
  { key: 'french', label: 'French names' },
  { key: 'tamil', label: 'Tamil names' },
  { key: 'english', label: 'English names' },
  { key: 'meaning', label: 'Meaning' },
];

const UploadExcelTable: React.FC = () => {
    const {t} = useTranslation()
  const [data, setData] = useState<ParsedRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { setSelectedRows, selectedRows, setRows, clearSelection } = useUploadDataGridStore();
  const [open, setOpen] = React.useState(false);
  const {authUser} = useAuthUserStore()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    // Load initial rows (you could also fetch from API)
    if (data.length === 0) {
      clearSelection([]);
    }
  }, [data]);

  const onResult = useCallback((rows: ParsedRow[]) => {
    setData(rows);
    setError(null);
    
  }, []);

  const onError = useCallback((err: string) => {
    setError(err);
    setData([]);
  }, []);

  const { parseFile } = useExcelWorker(onResult, onError);

  const onRowSelectionModelChange = (newSelection: any, gridRows) => {
      const selectedIds = Array.from(newSelection.ids);
      const selected = gridRows.filter((row) => selectedIds.includes(row.id));
        setSelectedRows(selected);
  }

    const onPublish = () => {
        handleOpen();
    }

    const uploadData = async (toBeUploaded) => {
        try {
            await healthCheck();
            console.log("Health check passed, proceeding to upload data...");
            const modifiedData = buildBulkPayload(toBeUploaded);
            await bulkUploadNames(modifiedData);
            
        } catch (e: any) {
            if (e?.name === 'CanceledError' || e?.code === 'ERR_CANCELED') return
            const msg = e?.message?.includes('Network Error')
            ? 'Network error. In dev, enable Vite proxy or API CORS.'
            : e?.message || 'Failed to fetch results'
        }
    }

    const handleSubmit = (_) => {
        // Here you can handle the publish logic, e.g., send data to server
        // For now, we'll just log the selected rows or all data
        if (selectedRows.length > 0) {
            console.log('Publishing selected rows:', selectedRows);
            uploadData(selectedRows);
        } else {
            console.log('Publishing all rows:', data);
            uploadData(data);
        }
        handleClose();
    }
    
  

  return (
    <Grid2 mt={2}>
      <ExcelUpload onFileSelected={parseFile} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {data.length > 0 && <DataTable columns={columns} data={data} onRowSelectionModelChange={onRowSelectionModelChange} />}
      {data.length > 0 && 
        <Button 
            variant="contained" 
            color="primary" 
            onClick={onPublish}
            >
                {
                    selectedRows.length > 0 ? t("uploadExcelTable.publishSelectedRowsBtnText", { rowLength: selectedRows.length }) : t(`uploadExcelTable.publishAllRowsBtnText`)
                }
        </Button>
      }
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xs"
        fullWidth
        sx={{ '& .MuiDialog-paper': { p: 2 } }}
      >
        <StyledAuthDialogHeader>
            <PriorityHighRoundedIcon color='info' fontSize='medium' sx={{alignSelf: 'center', mt: 2}}/> 
            <DialogTitle id="alert-dialog-title" sx={{ p: 0, pl: 1}}>
                Authorization Required
            </DialogTitle>
        </StyledAuthDialogHeader>
        <DialogContent sx={{ gap: 1 }}>
            {authUser.user.id.length === 0 && (
                <AuthUserForm onCancel={handleClose} />
            )}
            {authUser.user.id.length > 0 && (
                <CodeAuthForm onSubmit={handleSubmit} onCancel={handleClose} />
            )}
        </DialogContent>
      </Dialog>
    </Grid2>
  );
};

export default UploadExcelTable;
