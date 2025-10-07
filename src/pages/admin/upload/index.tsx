import React from 'react';
import UploadExcelTable from './UploadExcelTable';
import { Container, Grid2, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const UploadPage: React.FC = () => {
    const { t } = useTranslation()
    return (
         <div style={{ display: 'grid', gap: 24 }}>
            <Container maxWidth="lg">
                <h2>{t('uploadPage.title')}</h2>
                <Typography variant="body1">
                    {t('uploadPage.description')}
                </Typography>
                <UploadExcelTable />
            </Container>
         </div>
    );
};

export default UploadPage;