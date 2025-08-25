import { Divider, Grid2, Paper, Stack } from '@mui/material'
import theme from '../../../theme'
import { FrequentlySearchedItem, StyledChip } from './style'

export const FrequentlySearchedItems = () => {
  return (
    <Grid2 size={{ xs: 6, md: 3 }}>
      <Paper
        sx={{
          padding: theme.spacing(2),
        }}
      >
        <FrequentlySearchedItem>Aathya</FrequentlySearchedItem>
        <Divider />
        <p>Aadhi, Aathi</p>
        <Stack direction="row" spacing={1}>
          <StyledChip label="Tamil" />
          <StyledChip label="Sanskrit" />
          <StyledChip label="English" />
        </Stack>
      </Paper>
    </Grid2>
  )
}
