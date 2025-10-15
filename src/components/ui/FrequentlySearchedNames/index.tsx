import { Grid2, Paper, Stack } from '@mui/material'
import theme from '../../../theme'
import { FrequentlySearchedItems } from './FrequentlySearchedItems'
import { useGetPopularNames } from '../../../hooks/useGetPopularNames'
import React from 'react'

export const FrequentlySearchedNames = () => {
  const { data, loading, error } = useGetPopularNames();
  return (
    <>
      <Grid2 container direction="row" spacing={4} sx={{ marginTop: theme.spacing(4) }}>
        {data && data.map((nameObj: any) => {
          let languages: string[] = [];
          if (nameObj.tamil.length > 0 && !languages.includes('Tamil')) {
            languages.push('Tamil');
          }
          if (nameObj.english.length > 0 && !languages.includes('English')) {
            languages.push('English');
          }
          if (nameObj.french.length > 0 && !languages.includes('French')) {
            languages.push('French');
          }
          return (
          <FrequentlySearchedItems key={nameObj.id} title={nameObj.tamil} alias={nameObj.english} languages={languages} />
        )
        })}
      </Grid2>
    </>
  )
}
