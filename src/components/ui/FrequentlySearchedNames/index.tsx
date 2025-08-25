import { Grid2, Paper, Stack } from '@mui/material'
import theme from '../../../theme'
import { FrequentlySearchedItems } from './FrequentlySearchedItems'

export const FrequentlySearchedNames = () => {
  return (
    <>
      <Grid2 container direction="row" spacing={4} sx={{ marginTop: theme.spacing(4) }}>
        <FrequentlySearchedItems />
        <FrequentlySearchedItems />
        <FrequentlySearchedItems />
        <FrequentlySearchedItems />
        <FrequentlySearchedItems />
        <FrequentlySearchedItems />
        <FrequentlySearchedItems />
        <FrequentlySearchedItems />
      </Grid2>
    </>
  )
}
