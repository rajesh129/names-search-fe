import { Box, styled } from '@mui/material'

export const StyledAuthDialogHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
}))