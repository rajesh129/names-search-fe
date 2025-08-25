// src/features/search/SearchResults.tsx
import * as React from 'react'
import { Stack, Paper, Typography, Pagination, CircularProgress, Divider, Box, IconButton } from '@mui/material'
import type { NameItem } from '../../types/get-names'
import { SearchResultTitle, SearchTypePrimary, SearchTypeSecondary } from './style'
import { useTranslation } from 'react-i18next'
import theme from '../../theme'
import { StyledChip } from '../../components/ui/FrequentlySearchedNames/style'
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { useTamilTTS } from '../../hooks/useTamilTTS'

export function SearchResults({
  items,
  total,
  page,
  pageCount,
  loading,
  error,
  onPageChange,
}: {
  items: NameItem[]
  total: number
  page: number
  pageCount: number
  loading: boolean
  error: string | null
  onPageChange: (p: number) => void
}) {
    const {t} = useTranslation();
    const { speak, stop, hasTamilVoice } = useTamilTTS();

  if (loading) {
    return (
      <Stack direction="row" alignItems="center" spacing={1}>
        <CircularProgress size={20} /> <span>Loading…</span>
      </Stack>
    )
  }

  if (error) {
    return (
      <Typography color="error" variant="body2">
        {error}
      </Typography>
    )
  }

  if (!items.length) {
    return <Typography variant="body2">No results</Typography>
  }

  return (
    <Stack spacing={1}>
        <SearchResultTitle>{t('search.searchResultsTitle')}</SearchResultTitle>
      <Typography variant="body2" sx={{ opacity: 0.8 }}>
        {total} results
      </Typography>

      {items.map((r, idx) => (
        <Paper key={`${r.tamil}-${idx}`} sx={{ p: 2 }}>
          <SearchTypePrimary variant="subtitle1">
            {r.tamil}
            <IconButton onClick={() => speak(r.tamil)}><VolumeUpIcon /></IconButton>
        </SearchTypePrimary>
          <SearchTypeSecondary variant="body2">
            <strong>English:</strong> {r.english.join(', ') || '—'}
          </SearchTypeSecondary>
          <SearchTypeSecondary variant="body2">
            <strong>French:</strong> {r.french.join(', ') || '—'}
          </SearchTypeSecondary>
          {r.description && (
            <Box sx={{marginBottom: theme.spacing(2)}}>
                <SearchTypeSecondary variant="body1" sx={{fontWeight: theme.typography.fontWeightMedium}}>Description</SearchTypeSecondary>
                <Typography variant="body2" sx={{ mt: 0.5 }}>
                {r.description}
                </Typography>
            </Box>
          )}
            <Stack direction="row" spacing={1.5} sx={{marginBottom: theme.spacing(1)}}>
                <StyledChip label="Tamil" />
                <StyledChip label="French" />
                <StyledChip label="English" />
            </Stack>
        </Paper>
      ))}

      {pageCount > 1 && (
        <Pagination
            color="secondary"
          count={pageCount}
          page={page}
          onChange={(_, p) => onPageChange(p)}
          sx={{ alignSelf: 'center', mt: 1 }}
        />
      )}
    </Stack>
  )
}
