import { Chip, styled } from '@mui/material'

export const FrequentlySearchedItem = styled('p')(({ theme }) => ({
  ...theme.typography.h5,
  color: theme.palette.text.primary,
  margin: 0,
  fontWeight: theme.typography.fontWeightMedium,
  marginBottom: theme.spacing(1),
}))

export const StyledChip = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  color: theme.palette.secondary.contrastText,
}))
