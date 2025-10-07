
import React from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface ExcelUploadProps {
  onFileSelected: (file: File) => void;
}

const ExcelUpload: React.FC<ExcelUploadProps> = ({ onFileSelected }) => {
    const { t } = useTranslation()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelected(e.target.files[0]);
    }
  };

  return (
    <Box>
        <label htmlFor="excel-upload-input">
        <input
            style={{ display: 'none' }}
            id="excel-upload-input"
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
        />
        <Button variant="contained" component="span" color="primary"> {}
            {t('excelUpload.title')}
        </Button>
        </label>
    </Box>
  );
};

export default ExcelUpload;
