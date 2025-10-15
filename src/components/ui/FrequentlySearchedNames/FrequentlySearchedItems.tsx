import { Divider, Grid2, Paper, Stack } from '@mui/material'
import theme from '../../../theme'
import { FrequentlySearchedItem, StyledChip } from './style'

interface FrequentlySearchedItemsProps {
  title: string;
  alias?: string[];
  languages?: string[];
}

export const FrequentlySearchedItems = ({ title, alias, languages }: FrequentlySearchedItemsProps) => {
  console.log({ title, alias, languages });
  
  return (
    <Grid2 size={{ xs: 6, md: 3 }}>
      <Paper
        sx={{
          padding: theme.spacing(2),
        }}
      >
        <FrequentlySearchedItem>{title}</FrequentlySearchedItem>
        <Divider />
        <p>{alias?.join(', ')}</p>
        <Stack direction="row" spacing={1}>
          {languages?.map((lang) => (
            <StyledChip key={lang} label={lang} />
          ))}
          <StyledChip label="English" />
        </Stack>
      </Paper>
    </Grid2>
  )
}
